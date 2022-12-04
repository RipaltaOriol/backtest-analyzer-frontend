import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

import { useGetGraphQuery } from './graphsSlice'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const colors = ['#C479F3', '#38D9B9', '#F39C87', '#59A7FF']

const options = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Result'
            }
        },
        x: {
            beginAtZero: true,
            title: {
                display: true,
                text: ''
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
};

const ScatterGraph = ({ setupId }) => {

    let scatterData = {
        datasets: [],
    }

    const { data, isSuccess, isLoading, isError } = useGetGraphQuery({ setupId, type: 'scatter' })    

    if (isSuccess) {
        let scatterDatasets = []
        data?.data.forEach((dataset, idx) => {
            scatterDatasets.push({...dataset, backgroundColor: colors[idx % colors.length]})
        })
        scatterData.datasets = scatterDatasets
        options.scales.x.title.text = data.labels.axes;
    }

    return (
        <Box sx={{ border: '1px solid #E5E9EB', borderRadius: '6px', p: 2 }}>
            <Typography align="center">{data?.labels?.title || 'Loading' }</Typography>
            <Scatter
                options={options}
                data={scatterData}
            />
        </Box>
    )
}

export default ScatterGraph;