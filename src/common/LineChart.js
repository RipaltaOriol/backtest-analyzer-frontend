import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const chartColours = ['#F39C87', '#59A7FF', '#8338ec', '#ffdb43', '#f2d2e6', '#09080d']

const LineChart = ({ dataLineChart }) => {

    let data;
    if (Object.keys(dataLineChart).length !== 0) {
        data = {
            labels: dataLineChart.labels,
            datasets: [],
        }
        dataLineChart.datasets.forEach((dataset, idx) => {
            data.datasets.push(
                {
                    label: dataset.name,
                    data: dataset.values,
                    borderColor: chartColours[idx],
                    backgroundColor: chartColours[idx],
                }
            )
        })
    }
       
    return (
        <Box sx={{ border: '1px solid #E5E9EB', borderRadius: '6px', p: 2 }}>
            <Typography align="center">{dataLineChart.name}</Typography>
            {
                Object.keys(dataLineChart).length !== 0
                ? (
                    <Line
                        data={data}
                        options = {{
                            plugins: {
                                legend: {
                                    labels: {
                                        usePointStyle: true,
                                    }
                                },
                                title: {
                                    // display: true,
                                    // text: dataLineChart.name
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

export default LineChart;