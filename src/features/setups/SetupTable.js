import StateTable from "common/StateTable";
import DoghnutChart from "common/graphs/DoughnutChart";
import PolarChart from "common/graphs/PolarChart";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";
import { renderTemplate } from "features/templates/utilsRenderTemplate";
import OpenTrades from "features/trades/OpenTrades";
import { setOpen, setTrade } from "features/trades/tradeSlice";
import { selectOpen, selectTrade } from "features/trades/tradeSlice";

const SetupTable = (props) => {
    const { children, value, setup, index, ...other } = props;
    const trade = useSelector(selectTrade);
    const tradeOpen = useSelector(selectOpen);
    const dispatch = useDispatch();
    const { data: setupStatistics } = useGetStatisticsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );

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

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className="setup-table-view">
                    <OpenTrades
                        className="setup-open-trades"
                        setupId={setup?.id}
                        setOpen={handleSetTradeOpen}
                        setSelectedRow={handeSetTrade}
                    />
                    <Box className="setup-table-stats">
                        <Box
                            className="setup-table-polar"
                            sx={{
                                border: "1px solid #e5e9eb",
                                borderRadius: "5px",
                                p: 3,
                            }}
                        >
                            <Tooltip
                                placement="bottom-start"
                                title="Profit factor is a ratio that compares the total profits generated by winning trades to the total losses incurred by losing trades. A higher profit factor indicates that a strategy is generating more profits relative to its losses, which is essential for long-term trading success."
                            >
                                <Typography variant="h6" gutterBottom>
                                    Profit Factor
                                </Typography>
                            </Tooltip>
                            {setupStatistics?.success ? (
                                <PolarChart statsData={setupStatistics} />
                            ) : (
                                <Skeleton variant="rounded" height={60} />
                            )}
                        </Box>
                        <Box
                            className="setup-table-radar"
                            sx={{
                                border: "1px solid #e5e9eb",
                                borderRadius: "5px",
                                p: 3,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Win/Loss
                            </Typography>
                            {setupStatistics?.success ? (
                                <DoghnutChart statsData={setupStatistics} />
                            ) : (
                                <Skeleton variant="rounded" height={60} />
                            )}
                        </Box>
                    </Box>
                    <Box className="setup-table">
                        {setup?.id ? (
                            <StateTable
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

export default SetupTable;
