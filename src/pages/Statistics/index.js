import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { selectSetupId } from '../../features/setups/setupSlice';

import { selectDocumentById } from "../../features/documents/documentsApiSlice";
import { useGetChartsQuery } from "../../features/statistics/statisticsApiSlice";

import PieChart from "./PieChart";
import LineChart from './LineChart';
import SimpleTable from '../../components/SimpleTable';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

let dataLineChart = {}

let dataPieChart = {}

const Statistics = () => {

    const navigate = useNavigate();

    const { documentId } = useParams();

    const setupId = useSelector(selectSetupId);

    const doc = useSelector((state) => selectDocumentById(state, documentId));

    const { data, isSuccess } = useGetChartsQuery({ documentId, setupId });

    if (isSuccess) {
        if (data) {
            dataLineChart = data.line
            dataPieChart = data.pie
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
                    <LineChart dataLineChart={dataLineChart} />
                </Grid>
                <Grid item xs={6}>
                    <SimpleTable />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={2}>
                    <PieChart dataPieChart={dataPieChart} />
                </Grid>
            </Grid>
            

        </>
    )
}

export default Statistics;