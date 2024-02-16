import { ErrorFeedback } from "common/ErrorFeedback";
import { Bar } from "react-chartjs-2";

import Box from "@mui/material/Box";

import {
    greenPaletteConfig,
    redPaletteConfig,
    tooltipConfig,
} from "./graphUtils";

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
        scales: {
            y: {
                ticks: {
                    font: {
                        weight: "bold",
                    },
                },
            },
            x: {
                ticks: {
                    font: {
                        weight: "bold",
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
            tooltip: tooltipConfig,
            annotation: {
                annotations: {
                    zeroLine: {
                        type: "line",
                        yMin: 0,
                        yMax: 0,
                        borderColor: "#878787",
                        borderWidth: 2,
                    },
                },
            },
        },
    };

    if (chartData?.success) {
        let datasetsDaily = [];
        Object.entries(chartData.data).forEach(([key, value], index) => {
            datasetsDaily.push({
                label: key,
                data: DAILY_LABELS.map((day) => value[day]),
                backgroundColor: Object.values(value).map((result) =>
                    result > 0
                        ? greenPaletteConfig[index]
                        : redPaletteConfig[index]
                ),
            });
        });
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
