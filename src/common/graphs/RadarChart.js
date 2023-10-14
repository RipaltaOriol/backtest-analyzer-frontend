import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    RadialLinearScale,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { ErrorFeedback } from "common/ErrorFeedback";
import { Radar } from "react-chartjs-2";
import parseColumnName from "utils/parseColumns";

import Box from "@mui/material/Box";

ChartJS.register(RadialLinearScale, PointElement, LineElement, autocolors);

const RadarChart = ({ statsData }) => {
    let data = {
        labels: ["Win Rate", "Trade Expectancy %", "Profit Factor / 4"],
        datasets: [],
    };

    const options = {
        // maintainAspectRatio: false,
        responsive: true,
        options: {
            rotation: -0.5 * Math.PI - (25 / 180) * Math.PI,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            autocolors: {
                offset: 7,
            },
        },
    };

    if (statsData) {
        let datasets = [];
        for (const [key, value] of Object.entries(statsData)) {
            datasets.push({
                data: [
                    value.win_rate * 100,
                    100 * (value.mean / value.max_win),
                    100 * (value.profit_factor / 4),
                ],
                label: parseColumnName(key),
            });
        }

        data.datasets = datasets;
    }

    return (
        <Box>
            {false ? (
                // {Object.keys(statsData).length ? (
                <Radar data={data} options={options} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default RadarChart;
