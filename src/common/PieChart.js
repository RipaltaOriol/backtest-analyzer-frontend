import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ dataPieChart, title = true }) => {
    let data;
    if (Object.keys(dataPieChart).length !== 0) {
        data = {
           labels: dataPieChart.labels,
           datasets: [],
        }
        data.datasets.push({
            data: dataPieChart.values,
            backgroundColor: [
                '#2CDDC7',
                '#C479F3',
                '#59A7FF',
            ],
            borderColor: [
                '#2CDDC7',
                '#C479F3',
                '#59A7FF',
            ],
            borderWidth: 1,
        })
    }


    return (
        <Box>
            {
                title && <Typography gutterBottom align="center">{dataPieChart.name}</Typography>
            }
            {
                Object.keys(dataPieChart).length !== 0
                ? (
                    <Doughnut
                        data={data}
                        options = {{
                            plugins: {
                                legend: {
                                    labels: {
                                        usePointStyle: true,
                                    },
                                    position: 'bottom'
                                }
                            }
                        }}
                    />
                )
                : <p>Loading...</p>
            }
        </Box>
    )
}

export default PieChart;