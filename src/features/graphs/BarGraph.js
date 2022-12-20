import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useGetGraphQuery } from "./graphsSlice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const colors = ["#C479F3", "#38D9B9", "#F39C87", "#59A7FF"];

const options = {
    scales: {
        y: {
            title: {
                display: true,
                text: "Result",
            },
        },
        x: {
            title: {
                display: true,
                text: "",
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
            },
        },
    },
};

const BarGraph = ({ setupId }) => {
    const barData = {
        labels: [],
        datasets: [],
    };

    const { data, isSuccess } = useGetGraphQuery({ setupId, type: "bar" });

    if (isSuccess) {
        barData.labels = data?.dataLabels;
        let barDatasets = [];
        data?.data.forEach((dataset, idx) => {
            barDatasets.push({
                ...dataset,
                backgroundColor: colors[idx % colors.length],
                barThickness: 30,
            });
        });
        barData.datasets = barDatasets;
        options.scales.x.title.text = data.labels.axes;
    }

    return (
        <Box sx={{ border: "1px solid #E5E9EB", borderRadius: "6px", p: 2 }}>
            <Typography align="center">
                {data?.labels?.title || "Loading"}
            </Typography>
            <Bar options={options} data={barData} />
        </Box>
    );
};

export default BarGraph;
