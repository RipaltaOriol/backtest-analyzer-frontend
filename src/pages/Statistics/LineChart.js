import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";


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
                    borderColor: idx % 2 === 0 ? '#e8920b': '#075eee',
                    backgroundColor: idx % 2 === 0 ? '#e8920b': '#075eee',
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