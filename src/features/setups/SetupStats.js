import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import autocolors from "chartjs-plugin-autocolors";
import BarChart from "common/graphs/BarChart";
import RadarChart from "common/graphs/BubbleChart";
import HorizontalBarChart from "common/graphs/HorizontalBarChart";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import CumulativeLineChart from "features/graphs/CumulativeLineChart";
import NetBarChart from "features/graphs/NetBarChart";
import { useGetDailyDistributionQuery } from "features/graphs/graphsSlice";
import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";

import SimpleTable from "../../common/SimpleTable";
import BarGraph from "../graphs/BarGraph";
import ScatterGraph from "../graphs/ScatterGraph";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    autocolors,
    annotationPlugin
);

const SetupStats = (props) => {
    const { children, value, setup, index, ...other } = props;

    const {
        data: setupStatistics,
        isLoading: statsLoading,
        isUninitialized: statsMissing,
    } = useGetStatisticsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );
    const {
        data: dailyDistribution,
        isLoading,
        isUninitialized,
    } = useGetDailyDistributionQuery(
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
                        {statsLoading || statsMissing ? (
                            <Skeleton variant="rounded" height={60} />
                        ) : (
                            <HorizontalBarChart statsData={setupStatistics} />
                        )}
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
                        <RadarChart setupId={setup?.id} />
                    </Box>
                    <Box
                        className="stats-metric"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <BarGraph setupId={setup?.id} />
                    </Box>
                    <Box
                        className="stats-scatter"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <ScatterGraph setupId={setup?.id} />
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
                        {isLoading || isUninitialized ? (
                            <Skeleton variant="rounded" height={60} />
                        ) : (
                            <BarChart chartData={dailyDistribution} />
                        )}
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
                        {statsLoading || statsMissing ? (
                            <Skeleton variant="rounded" height={60} />
                        ) : (
                            <SimpleTable statsData={setupStatistics} />
                        )}
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default SetupStats;
