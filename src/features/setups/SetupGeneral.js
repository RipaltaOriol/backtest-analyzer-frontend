import { CustomMenuItem } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import StateTable from "common/StateTable";
import { useEffect, useState } from "react";
import { getResultAdornment } from "utils";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";

import Notes from "../../pages/Analysis/Notes";
import LineGraph from "../graphs/LineGraph";

const SetupGeneral = (props) => {
    const { children, value, setup, index, ...other } = props;
    const [resultMetric, setResultMetric] = useState();

    const {
        data: setupStatistics,
        isLoading,
        isFetching,
    } = useGetStatisticsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );

    useEffect(() => {
        if (setupStatistics) setResultMetric(Object.keys(setupStatistics)[0]);
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
                        {Object.keys(setupStatistics).map((column) => (
                            <CustomMenuItem value={column}>
                                {column}
                            </CustomMenuItem>
                        ))}
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
                            {setupStatistics[resultMetric]?.count}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Net PnL
                        </Typography>
                        <Typography
                            variant="h3"
                            color={
                                setupStatistics[resultMetric]?.total >= 0
                                    ? "green"
                                    : "red"
                            }
                        >
                            {setupStatistics[resultMetric]?.total}
                            {getResultAdornment(resultMetric)}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Win %
                        </Typography>
                        <Typography variant="h3">
                            {setupStatistics[resultMetric]?.win_rate}
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant="body2" gutterBottom>
                            Average PnL
                        </Typography>
                        <Typography
                            variant="h3"
                            color={
                                setupStatistics[resultMetric]?.expectancy >= 0
                                    ? "green"
                                    : "red"
                            }
                        >
                            {setupStatistics[resultMetric]?.expectancy}
                            {getResultAdornment(resultMetric)}
                        </Typography>
                    </Box>
                </Box>
            </>
        );
    };

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            // id={`simple-tabpanel-${index}`}
            // aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className="setup-general">
                    {setupStatistics && (
                        <Box
                            className="setup-overview"
                            sx={{
                                border: "1px solid #e5e9eb",
                                borderRadius: "5px",
                                px: 5,
                                py: 3,
                            }}
                        >
                            {isLoading || isFetching ? (
                                <CircularProgress />
                            ) : Object.keys(setupStatistics).length ? (
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
                        {setup?.id && <LineGraph setupId={setup?.id} />}
                    </Box>
                    <Box className="setup-table">
                        <StateTable
                            setup={setup}
                            // setOpen={setOpen}
                            // setSelectedRow={setSelectedRow}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default SetupGeneral;
