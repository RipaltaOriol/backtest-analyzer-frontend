import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { breakDownConfig, tooltipConfig } from "./graphs/graphUtils";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({
    dataPieChart = [],
    title = true,
    success = true,
    position = "bottom",
}) => {
    let data = {
        labels: [],
        datasets: [],
    };
    if (Object.keys(dataPieChart).length !== 0) {
        data = {
            labels: dataPieChart.labels,
            datasets: [],
        };
        data.datasets.push({
            data: dataPieChart.values,
            backgroundColor: breakDownConfig,
            borderColor: breakDownConfig,
            borderWidth: 1,
        });
    }

    return (
        <>
            {!success && (
                <Typography
                    sx={{
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "red",
                    }}
                >
                    No outcome data
                </Typography>
            )}
            <Box>
                {success && title && (
                    <Typography gutterBottom align="center" sx={{ mb: 2 }}>
                        {dataPieChart.name}
                    </Typography>
                )}

                {success && (
                    <Doughnut
                        data={data}
                        options={{
                            plugins: {
                                tooltip: tooltipConfig,
                                legend: {
                                    labels: {
                                        usePointStyle: true,
                                    },
                                    position,
                                },
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                )}
            </Box>
        </>
    );
};

export default PieChart;
