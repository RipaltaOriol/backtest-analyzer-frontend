import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { ErrorFeedback } from "common/ErrorFeedback";
import { Doughnut } from "react-chartjs-2";

import Box from "@mui/material/Box";

ChartJS.register(ArcElement, Tooltip, Legend, autocolors);

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
            autocolors: {
                mode: "label",
            },
        },
    };

    if (statsData) {
        let dataSets = [];

        for (const [key, value] of Object.entries(statsData)) {
            dataSets.push({
                label: key,
                data: [value.wins, value.losses, value.breakEvens],
            });
        }
        data.datasets = dataSets;
    }

    return (
        <Box>
            {Object.keys(statsData).length ? (
                <Doughnut data={data} options={options} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default DoughnutChart;
