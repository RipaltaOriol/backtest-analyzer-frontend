import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { ErrorFeedback } from "common/ErrorFeedback";
import { Doughnut } from "react-chartjs-2";
import { parseColumn } from "utils/displayUtils";

import Box from "@mui/material/Box";

import { breakDownConfig, tooltipConfig } from "./graphUtils";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ statsData }) => {
    let data = {
        labels: ["Win", "Loss", "Break Even"],
        datasets: [],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: tooltipConfig,
        },
    };

    if (statsData) {
        let dataSets = [];

        for (const [key, value] of Object.entries(statsData?.data)) {
            dataSets.push({
                label: parseColumn(key),
                data: [value.wins, value.breakEvens, value.losses],
                backgroundColor: breakDownConfig,
            });
        }
        data.datasets = dataSets;
    }

    return (
        <Box>
            {Object.keys(statsData?.data).length ? (
                <Doughnut data={data} options={options} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default DoughnutChart;
