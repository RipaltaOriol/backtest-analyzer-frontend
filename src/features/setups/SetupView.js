import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";

import SetupCalendar from "features/setups/SetupCalendar";
import SetupGeneral from "features/setups/SetupGeneral";
import SetupStats from "features/setups/SetupStats";
import SetupTable from "features/setups/SetupTable";
import { renderTemplate } from "features/templates/utilsRenderTemplate";

import "./Setups.css";
import FilterList from "./filters/FilterList";

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

            {/* popup to display a trade */}
            {renderTemplate(
                setup?.template,
                setup?.documentId,
                selectedRow,
                open,
                setOpen
            )}
        </Box>
    );
};

export default SetupView;
