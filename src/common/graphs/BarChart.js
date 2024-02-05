import { ErrorFeedback } from "common/ErrorFeedback";
import { Bar } from "react-chartjs-2";

import Box from "@mui/material/Box";

const DAILY_LABELS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const BarChart = ({ chartData }) => {
    let data = {
        labels: DAILY_LABELS,
        datasets: [],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
            autocolors: {
                offset: 8,
            },
        },
    };

    if (chartData?.success) {
        let datasetsDaily = [];
        for (const [key, value] of Object.entries(chartData.data)) {
            datasetsDaily.push({
                label: key,
                data: DAILY_LABELS.map((day) => value[day]),
            });
        }
        data.datasets = datasetsDaily;
    }

    return (
        <Box>
            {chartData?.success ? (
                <Bar data={data} options={options} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default BarChart;
