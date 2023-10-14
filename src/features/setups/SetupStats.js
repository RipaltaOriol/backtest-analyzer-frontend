import StateTable from "common/StateTable";
import BarChart from "common/graphs/BarChart";
import HorizontalBarChart from "common/graphs/HorizontalBarChart";
import RadarChart from "common/graphs/RadarChart";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import CumulativeLineChart from "features/graphs/CumulativeLineChart";
import NetBarChart from "features/graphs/NetBarChart";
import { useGetDailyDistributionQuery } from "features/graphs/graphsSlice";
import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";

import SimpleTable from "../../common/SimpleTable";
import BarGraph from "../graphs/BarGraph";
import ScatterGraph from "../graphs/ScatterGraph";

const SetupStats = (props) => {
    const { children, value, setup, index, ...other } = props;

    const { data: setupStatistics } = useGetStatisticsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );
    const { data: dailyDistribution } = useGetDailyDistributionQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className="setup-stats-view">
                    <Box
                        className="stats-cumulative"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Cumulative Profit
                        </Typography>
                        <CumulativeLineChart setupId={setup?.id} />
                    </Box>
                    <Box
                        className="stats-outcome-pie"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Win Rate
                        </Typography>
                        <HorizontalBarChart statsData={setupStatistics} />
                    </Box>
                    <Box
                        className="stats-net"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Net PnL
                        </Typography>
                        <NetBarChart setupId={setup?.id} />
                    </Box>
                    <Box
                        className="stats-radar"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Performance Radar - TO BE BUILD
                        </Typography>
                        <RadarChart statsData={setupStatistics} />
                    </Box>
                    <Box
                        className="stats-metric"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        {setup?.id && <BarGraph setupId={setup?.id} />}
                    </Box>
                    <Box
                        className="stats-scatter"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        {setup?.id && <ScatterGraph setupId={setup?.id} />}
                    </Box>
                    <Box
                        className="stats-daily-dist"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Daily Distribution
                        </Typography>
                        <BarChart chartData={dailyDistribution} />
                    </Box>
                    <Box
                        className="stats-table"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Stats Table
                        </Typography>
                        <SimpleTable statsData={setupStatistics} />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default SetupStats;
