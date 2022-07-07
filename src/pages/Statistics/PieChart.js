import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ dataPieChart }) => {

    let data;
    if (Object.keys(dataPieChart).length !== 0) {
        data = {
           labels: dataPieChart.labels,
           datasets: [],
       }
        data.datasets.push({
            data: dataPieChart.values,
            backgroundColor: [
                '#e8920b',
                '#075eee',
                '#8338ec',
            ],
            borderColor: [
                '#e8920b',
                '#075eee',
                '#8338ec',
            ],
            borderWidth: 1,
        })
    }


    return (
        <>
            {
                Object.keys(dataPieChart).length !== 0
                ? (
                    <Pie
                        data={data}
                        options = {{
                            plugins: {
                                title: {
                                    display: true,
                                    text: dataPieChart.name
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

export default PieChart;