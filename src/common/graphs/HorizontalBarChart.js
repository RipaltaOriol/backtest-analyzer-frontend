import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    RadialLinearScale,
    Tooltip,
} from "chart.js";
import { ErrorFeedback } from "common/ErrorFeedback";
import { Bar } from "react-chartjs-2";
import parseColumnName from "utils/parseColumns";

import Box from "@mui/material/Box";

import { multipleColorsConfig, tooltipConfig } from "./graphUtils";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const HorizontalBarChart = ({ statsData }) => {
    let data = {
        labels: [],
        datasets: [
            {
                label: "Win Ratio",
                data: [],
                // barThickness: 100,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        scales: {
            x: {
                max: 1,
                min: 0,
                title: {
                    display: true,
                    text: "Win Rate",
                    font: {
                        weight: "bold",
                    },
                },

                ticks: {
                    font: {
                        weight: "bold",
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    autoSkip: false,
                    font: {
                        weight: "bold",
                    },
                    // minRotation: 90,
                    // font: {
                    //     size: 14,
                    // },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: tooltipConfig,
        },
    };

    if (statsData?.success) {
        let dataValues = [];
        let dataLabels = [];
        for (const [key, value] of Object.entries(statsData?.data)) {
            dataValues.push(value.win_rate);
            dataLabels.push(parseColumnName(key));
        }
        data.datasets[0].data = dataValues;
        data.datasets[0].backgroundColor = multipleColorsConfig;
        data.labels = dataLabels;
    }

    return (
        <Box>
            {statsData?.success ? (
                <Bar data={data} options={options} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default HorizontalBarChart;
