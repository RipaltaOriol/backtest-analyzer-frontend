import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import LineChart from "../../common/LineChart";
import PieChart from "../../common/PieChart";
import SimpleTable from "../../common/SimpleTable";
import BarGraph from "../graphs/BarGraph";
import ScatterGraph from "../graphs/ScatterGraph";
import { useGetChartsQuery } from "../statistics/statisticsApiSlice";

let dataLineChart = {};

let dataPieChart = {};

const SetupData = ({ setup }) => {
    const { data, isSuccess } = useGetChartsQuery({ setupId: setup?.id });

    if (isSuccess) {
        if (data) {
            dataLineChart = data.line;
            dataPieChart = data.pie;
        }
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <LineChart dataLineChart={dataLineChart} />
                </Grid>
                <Grid item xs={6}>
                    <SimpleTable id={setup?.id} />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={2}>
                    <PieChart dataPieChart={dataPieChart} />
                </Grid>
                <Grid item xs={6}>
                    {/* Loading message */}
                    {setup?.id && <ScatterGraph setupId={setup?.id} />}
                </Grid>
                <Grid item xs={6}>
                    {/* Loading message */}
                    {setup?.id && <BarGraph setupId={setup?.id} />}
                </Grid>
            </Grid>
        </Box>
    );
};

export default SetupData;
