import StateTable from "common/StateTable";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import PieChart from "../../common/PieChart";
import SimpleTable from "../../common/SimpleTable";
import Notes from "../../pages/Analysis/Notes";
import BarGraph from "../graphs/BarGraph";
import LineGraph from "../graphs/LineGraph";
import ScatterGraph from "../graphs/ScatterGraph";
import { useGetChartsQuery } from "../statistics/statisticsApiSlice";
import "./Setups.css";
import SingleRecordDialog from "./SingleSetup/SingleRecordDialog";
import FilterList from "./filters/FilterList";

let dataPieChart = {};

const Item = styled(Box)({
    borderRadius: "6px",
    border: "1px solid #E5E9EB",
});

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

            <Box className="setup-dashboard">
                <Box className="setup-equity">
                    {setup?.id && <LineGraph setupId={setup?.id} />}
                </Box>
                <Item className="setup-result-distribution" sx={{ p: 2 }}>
                    <PieChart dataPieChart={dataPieChart} />
                </Item>
                <Box className="setup-bar">
                    {setup?.id && <BarGraph setupId={setup?.id} />}
                </Box>
                <Box className="setup-scatter">
                    {setup?.id && <ScatterGraph setupId={setup?.id} />}
                </Box>
                <Item className="setup-stats">
                    {setup?.id && <SimpleTable id={setup?.id} />}
                </Item>
                <Item className="setup-notes">
                    <Notes setupId={setup?.id} notes={setup?.notes} />
                </Item>
                <Box className="setup-table">
                    <StateTable
                        setup={setup}
                        setOpen={setOpen}
                        setSelectedRow={setSelectedRow}
                    />
                </Box>
            </Box>

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
