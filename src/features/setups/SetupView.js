import StateTable from "common/StateTable";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import SetupCalendar from "features/setups/SetupCalendar";
import SetupGeneral from "features/setups/SetupGeneral";
import SetupStats from "features/setups/SetupStats";
import SetupTable from "features/setups/SetupTable";
import PPTTemplate from "features/templates/PPTTemplate";
import { renderTemplate } from "features/templates/utilsRenderTemplate";

import PieChart from "../../common/PieChart";
import SimpleTable from "../../common/SimpleTable";
import Notes from "../../pages/Analysis/Notes";
import BarGraph from "../graphs/BarGraph";
import LineGraph from "../graphs/LineGraph";
import ScatterGraph from "../graphs/ScatterGraph";
import { useGetChartsQuery } from "../statistics/statisticsApiSlice";
import "./Setups.css";
import FilterList from "./filters/FilterList";

let dataPieChart = {};
let dataPieSuccess = false;

const Item = styled(Box)({
    borderRadius: "6px",
    border: "1px solid #E5E9EB",
});

const CustomTabs = styled(Tabs)({
    height: "36px",
    minHeight: "36px",
});

const CustomTab = styled(Tab)({
    height: "36px",
    minHeight: "36px",
    "&.Mui-selected": {
        backgroundColor: "#D7EDFF",
    },
    textTransform: "none",
    fontSize: "14px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
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
            dataPieSuccess = data.success;
            dataPieChart = data.pie;
        }
    }

    useEffect(() => {
        setSelectedRow({});
    }, [setup?.id]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <FilterList setupId={setup?.id} filters={setup?.filters} />

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <CustomTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <CustomTab label="General" disableRipple />
                    <CustomTab label="Table" disableRipple />
                    <CustomTab label="Stats" disableRipple />
                    <CustomTab label="Calendar" disableRipple />
                </CustomTabs>
            </Box>

            <SetupGeneral value={value} index={0} setup={setup} />
            <SetupTable value={value} index={1} setup={setup} />
            <SetupStats value={value} index={2} setup={setup} />
            <SetupCalendar value={value} index={3} setup={setup} />

            <Box className="setup-dashboard">
                {/* <Box className="setup-equity">
                    {setup?.id && <LineGraph setupId={setup?.id} />}
                </Box>
                <Item className="setup-result-distribution" sx={{ p: 2 }}>
                    <PieChart
                        dataPieChart={dataPieChart}
                        success={dataPieSuccess}
                    />
                </Item>
                <Box className="setup-bar">
                    {setup?.id && <BarGraph setupId={setup?.id} />}
                </Box>
                <Box className="setup-scatter">
                    {setup?.id && <ScatterGraph setupId={setup?.id} />}
                </Box>
                <Item className="setup-stats"> */}
                {/* <SimpleTable id={setup?.id} /> */}
                {/* {setup?.id && <SimpleTable id={setup?.id} />}
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
                </Box> */}
            </Box>
            {/* popup to display a trade */}
            {renderTemplate(
                setup?.template,
                setup?.id,
                selectedRow,
                open,
                setOpen
            )}
            <PPTTemplate />
        </Box>
    );
};

export default SetupView;
