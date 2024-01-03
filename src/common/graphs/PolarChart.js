import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    RadialLinearScale,
    Tooltip,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { ErrorFeedback } from "common/ErrorFeedback";
import { PolarArea } from "react-chartjs-2";
import { parseColumnList } from "utils/displayUtils";

import Box from "@mui/material/Box";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, autocolors);

const PolarChart = ({ statsData }) => {
    let data = {
        labels: [],
        datasets: [
            {
                label: "Profit Factor",
                data: [],
                borderWidth: 1,
            },
        ],
    };

    let options = {
        responsive: true,
        scales: {
            r: {},
        },
        plugins: {
            legend: {
                display: false,
            },
            autocolors: {
                mode: "data",
            },
        },
    };

    if (statsData) {
        let dataValues = [];
        let dataLabels = [];
        let maxValue = -Infinity;
        let minValue = Infinity;

        for (const [key, value] of Object.entries(statsData?.data)) {
            dataValues.push(value.profit_factor);
            dataLabels.push(key);
            maxValue = Math.max(maxValue, value.profit_factor);
            minValue = Math.min(minValue, value.profit_factor);
        }
        data.datasets[0].data = dataValues;
        data.labels = parseColumnList(dataLabels);
        options.scales.r = {
            min: minValue - 1,
            max: maxValue,
            ticks: {
                stepSize: 0.5,
            },
        };
    }

    return (
        <Box>
            {Object.keys(statsData?.data).length ? (
                <PolarArea data={data} options={options} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default PolarChart;
