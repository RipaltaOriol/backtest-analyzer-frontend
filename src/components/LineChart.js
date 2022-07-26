import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

const chartColours = ['#e8920b', '#075eee', '#8338ec', '#ffdb43', '#f2d2e6', '#09080d']

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
        <>
            {
                Object.keys(dataLineChart).length !== 0
                ? (
                    <Line
                        data={data}
                        options = {{
                            plugins: {
                                title: {
                                    display: true,
                                    text: dataLineChart.name
                                }
                            }
                        }}
                    />
                )
                : <p>Loading...</p>
            }
        </>
    )
}

export default LineChart;