import { TSMenuItem, TSSelect } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import StateTable from "common/StateTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayWinRate, parseDataValues } from "utils/displayUtils";
import parseColumnName from "utils/parseColumns";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";
import { renderTemplate } from "features/templates/utilsRenderTemplate";
import OpenTrades from "features/trades/OpenTrades";
import { setOpen, setTrade } from "features/trades/tradeSlice";
import { selectOpen, selectTrade } from "features/trades/tradeSlice";

import Notes from "../../pages/Analysis/Notes";
import LineGraph from "../graphs/LineGraph";

const SetupGeneral = (props) => {
    const { children, value, setup, index, ...other } = props;
    const [resultMetric, setResultMetric] = useState();
    const trade = useSelector(selectTrade);
    const tradeOpen = useSelector(selectOpen);
    const dispatch = useDispatch();

    const {
        data: setupStatistics,
        isLoading,
        isUninitialized,
    } = useGetStatisticsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );

    useEffect(() => {
        if (setupStatistics?.success)
            setResultMetric(Object.keys(setupStatistics?.data)[0]);
    }, [setupStatistics]);

    const closeTradeDialog = () => {
        handleSetTradeOpen(false);
        handeSetTrade({});
    };

    const handeSetTrade = (trade) => {
        dispatch(setTrade(trade));
    };

    const handleSetTradeOpen = (open) => {
        dispatch(setOpen(open));
    };

    const statisticsPanel = () => {
        return (
            <>
                <Box>
                    <Typography variant="body2" gutterBottom>
                        Result Metric
                    </Typography>
                    <TSSelect
                        autoWidth={true}
                        value={resultMetric || ""}
                        onChange={(e) => setResultMetric(e.target.value)}
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        sx={{
                            color: "#0e73f6",
                            fontWeight: "500",
                        }}
                    >
                        {Object.keys(setupStatistics?.data).map(
                            (column, idx) => (
                                <TSMenuItem value={column} key={idx}>
                                    {parseColumnName(column)}
                                </TSMenuItem>
                            )
                        )}
                    </TSSelect>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexGrow: 1,
                    }}
                >
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Total Trades
                        </Typography>
                        <Typography variant="h3">
                            {setupStatistics?.data[resultMetric]?.count}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Net PnL
                        </Typography>
                        <Typography
                            variant="h3"
                            color={
                                setupStatistics?.data[resultMetric]?.total >= 0
                                    ? "green"
                                    : "red"
                            }
                        >
                            {parseDataValues(
                                resultMetric,
                                setupStatistics?.data[resultMetric]?.total
                            )}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Win %
                        </Typography>
                        <Typography variant="h3">
                            {displayWinRate(
                                setupStatistics?.data[resultMetric]?.win_rate
                            )}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Tooltip
                            placement="top"
                            title="Estimates the average amount a trader can expect to win or lose per trade based on their historical performance."
                        >
                            <Typography variant="body2" gutterBottom>
                                Trade Expectancy
                            </Typography>
                        </Tooltip>
                        <Typography
                            variant="h3"
                            color={
                                setupStatistics?.data[resultMetric]
                                    ?.expectancy >= 0
                                    ? "green"
                                    : "red"
                            }
                        >
                            {parseDataValues(
                                resultMetric,
                                setupStatistics?.data[resultMetric]?.expectancy
                            )}
                        </Typography>
                    </Box>
                </Box>
            </>
        );
    };

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box className="setup-general">
                    {isLoading || isUninitialized ? (
                        <Skeleton
                            variant="rounded"
                            className="setup-overview"
                            height={60}
                        />
                    ) : (
                        <Box
                            className="setup-overview"
                            sx={{
                                border: "1px solid #e5e9eb",
                                borderRadius: "5px",
                                p: 3,
                            }}
                        >
                            {setupStatistics?.success ? (
                                statisticsPanel()
                            ) : (
                                <ErrorFeedback />
                            )}
                        </Box>
                    )}

                    <OpenTrades
                        className="setup-open-trades"
                        setupId={setup?.id}
                        setOpen={handleSetTradeOpen}
                        setSelectedRow={handeSetTrade}
                    />
                    <Notes
                        setupId={setup?.id}
                        notes={setup?.notes}
                        className="setup-notes"
                    />
                    <Box className="setup-pnl">
                        <LineGraph setupId={setup?.id} />
                    </Box>
                    <Box className="setup-table">
                        {setup?.id ? (
                            <StateTable // avoid re-rendering this component. Only load if setup.id is provided.
                                setup={setup}
                                setOpen={handleSetTradeOpen}
                                setSelectedRow={handeSetTrade}
                            />
                        ) : (
                            <Skeleton variant="rounded" height={60} />
                        )}
                    </Box>
                </Box>
            )}
            {renderTemplate(
                setup?.template,
                setup?.documentId,
                trade,
                tradeOpen,
                closeTradeDialog
            )}
        </div>
    );
};

export default SetupGeneral;
