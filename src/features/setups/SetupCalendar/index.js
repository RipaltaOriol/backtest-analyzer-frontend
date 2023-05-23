import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import {
    deselectTrade,
    selectSelectedTrade,
} from "features/calendar/calendarSlice";
import CalendarDrawer from "features/setups/SetupCalendar/CalendarDrawer";
import CalendarGrid from "features/setups/SetupCalendar/CalendarGrid";
import CalendarHeader from "features/setups/SetupCalendar/CalendarHeader";
import SingleRecordDialog from "features/setups/SingleSetup/SingleRecordDialog";

const SetupCalendar = () => {
    const { documentId } = useParams();

    const dispatch = useDispatch();

    const currentTrade = useSelector(selectSelectedTrade);

    const closeDialog = () => {
        dispatch(deselectTrade());
    };

    return (
        <Box>
            <CalendarHeader />

            <Divider sx={{ my: 2 }} />
            {/* TODO: this might be best as a grid - but have to test widths */}
            <Box sx={{ display: "flex" }}>
                <CalendarGrid />

                <CalendarDrawer />
            </Box>

            {/* Single Setup Dialog */}
            {currentTrade && (
                <SingleRecordDialog
                    open={Boolean(currentTrade)}
                    onClose={closeDialog}
                    setupId={documentId}
                    rowRecord={currentTrade}
                    isSetup={false}
                />
            )}
        </Box>
    );
};

export default SetupCalendar;
