import { CustomMenuItem } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import StateTable from "common/StateTable";
import { useEffect, useState } from "react";
import { getResultAdornment } from "utils";
import parseColumnName from "utils/parseColumns";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";
import { renderTemplate } from "features/templates/utilsRenderTemplate";

import Notes from "../../pages/Analysis/Notes";
import LineGraph from "../graphs/LineGraph";

const SetupGeneral = (props) => {
    const { children, value, setup, index, ...other } = props;
    const [resultMetric, setResultMetric] = useState();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
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

    const statisticsPanel = () => {
        return (
            <>
                <Box>
                    <Typography variant="body2" gutterBottom>
                        Result Metric
                    </Typography>
                    <Select
                        size="small"
                        autoWidth={true}
                        value={resultMetric || ""}
                        onChange={(e) => setResultMetric(e.target.value)}
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        sx={{
                            color: "#0e73f6",
                            fontWeight: "500",
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                            "&.MuiOutlinedInput-root:hover fieldset": {
                                borderColor: "#0e73f6",
                            },

                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "inherit",
                                borderWidth: "1px",
                            },
                        }}
                    >
                        {Object.keys(setupStatistics?.data).map(
                            (column, idx) => (
                                <CustomMenuItem value={column} key={idx}>
                                    {parseColumnName(column)}
                                </CustomMenuItem>
                            )
                        )}
                    </Select>
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
                            {setupStatistics?.data[resultMetric]?.total}
                            {getResultAdornment(resultMetric)}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Win %
                        </Typography>
                        <Typography variant="h3">
                            {setupStatistics?.data[resultMetric]?.win_rate}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Average PnL
                        </Typography>
                        <Typography
                            variant="h3"
                            color={
                                setupStatistics?.data[resultMetric]
                                    ?.expectancy >= 0
                                    ? "green"
                                    : "red"
                            }
                        >
                            {setupStatistics?.data[resultMetric]?.expectancy}
                            {getResultAdornment(resultMetric)}
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
                                px: 5,
                                py: 3,
                            }}
                        >
                            {setupStatistics?.success ? (
                                statisticsPanel()
                            ) : (
                                <ErrorFeedback />
                            )}
                        </Box>
                    )}
                    <Box
                        className="setup-open-trades"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Open Trades
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Alert severity="info">
                            Coming soon! - This widget is under construction.
                        </Alert>
                    </Box>
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
                                setOpen={setOpen}
                                setSelectedRow={setSelectedRow}
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
                selectedRow,
                open,
                setOpen
            )}
        </div>
    );
};

export default SetupGeneral;
