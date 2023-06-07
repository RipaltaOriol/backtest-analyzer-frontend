import StateTable from "common/StateTable";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import PieChart from "../../common/PieChart";
import SimpleTable from "../../common/SimpleTable";
import Notes from "../../pages/Analysis/Notes";
import BarGraph from "../graphs/BarGraph";
import LineGraph from "../graphs/LineGraph";
import ScatterGraph from "../graphs/ScatterGraph";
import { useGetChartsQuery } from "../statistics/statisticsApiSlice";
import SingleRecordDialog from "./SingleSetup/SingleRecordDialog";
import FilterList from "./filters/FilterList";

let dataPieChart = {};

let SetupView = ({ setup }) => {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const { data, isSuccess } = useGetChartsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );

    if (isSuccess) {
        if (data) {
            dataPieChart = data.pie;
        }
    }

    useEffect(() => {
        setSelectedRow({});
    }, [setup?.id]);

    return (
        <Box>
            <FilterList setupId={setup?.id} filters={setup?.filters} />

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {setup?.id && <LineGraph setupId={setup?.id} />}
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            border: "1px solid #E5E9EB",
                            borderRadius: "6px",
                            p: 2,
                        }}
                    >
                        <PieChart dataPieChart={dataPieChart} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    {setup?.id && <BarGraph setupId={setup?.id} />}
                </Grid>
                <Grid item xs={6}>
                    {setup?.id && <ScatterGraph setupId={setup?.id} />}
                </Grid>
                <Grid item xs={6}>
                    {setup?.id && <SimpleTable id={setup?.id} />}
                </Grid>
                <Grid item xs={6}>
                    <Notes setupId={setup?.id} notes={setup?.notes} />
                </Grid>
                <Grid item xs={12}>
                    <StateTable
                        setup={setup}
                        setOpen={setOpen}
                        setSelectedRow={setSelectedRow}
                    />
                </Grid>
            </Grid>

            {/* popup to display a trade */}
            <SingleRecordDialog
                open={open}
                onClose={() => setOpen(false)}
                setupId={setup?.id}
                rowRecord={selectedRow}
            />
        </Box>
    );
};

export default SetupView;
