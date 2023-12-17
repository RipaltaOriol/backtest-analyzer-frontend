import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
            backgroundColor: ["#2CDDC7", "#C479F3", "#59A7FF"],
            borderColor: ["#2CDDC7", "#C479F3", "#59A7FF"],
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
