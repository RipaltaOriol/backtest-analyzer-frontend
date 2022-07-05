import { Line, Pie, Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import { useParams, useNavigate } from "react-router-dom";

import { selectSetupId } from '../../features/setups/setupSlice';

import { selectDocumentById } from "../../features/documents/documentsApiSlice";
import { useGetChartsQuery } from "../../features/statistics/statisticsApiSlice";

import SimpleTable from '../../components/SimpleTable';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const dataLineChart = {
  labels,
  datasets: [
    {
      label: '$1,000 Equity Curve',
      data: [],
      borderColor: '#e8920b',
      backgroundColor: '#e8920b',
    }
  ],
};

const dataPieChart = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
  
const dataBarChart = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [1, 1, 1, 1, 1, 1, 1],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [1, 1, 1, 1, 1, 1, 1],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const Statistics = () => {

    const navigate = useNavigate();

    const { documentId } = useParams();

    const setupId = useSelector(selectSetupId);

    const doc = useSelector((state) => selectDocumentById(state, documentId));

    const { data, isSuccess } = useGetChartsQuery({ documentId, setupId });

    if (isSuccess) {
        if (data) {
            dataLineChart.labels = data.line.labels
            dataBarChart.labels = data.bar.labels
            dataPieChart.labels = data.pie.labels
            console.log(data.values)
            dataLineChart.datasets[0].data = data.line.values
            dataPieChart.datasets[0].data = data.pie.values
            data.bar.datasets.forEach((values, idx) => {
                dataBarChart.datasets[idx].label = values.name
                dataBarChart.datasets[idx].data = values.values
            })
        }
    }

    let documentName = "Loading";
    if (doc) {
        documentName = doc.name;
    }

    const handleAnalysis = () => {
        navigate("/" + documentId)
    }

    return (
        <>
            <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                <Typography variant="h1" color="primary" sx={{ mr: 2 }}>
                    {documentName}
                </Typography>
                <ButtonGroup color="secondary" variant="contained">
                    <Button onClick={() => handleAnalysis()}>Analysis</Button>
                </ButtonGroup>
            </Box>
            <Divider />

            <Typography variant="h6">Charts &amp; Data</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                    <Line data={dataLineChart} />
                </Grid>
                <Grid item xs={6}>
                    <SimpleTable />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                    <Bar data={dataBarChart}
                    options = {{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Results by Measurements'
                            }
                        }
                    }}
                    />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={3}>
                    <Pie data={dataPieChart}
                    options = {{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Outcome Distribution'
                            }
                        }
                    }}
                    />
                <Grid item xs={1}/>
                </Grid>
            </Grid>
            

        </>
    )
}

export default Statistics;