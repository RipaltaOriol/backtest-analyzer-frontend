import { ErrorFeedback } from "common/ErrorFeedback";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import {
    deselectTrade,
    selectSelectedTrade,
} from "features/calendar/calendarSlice";
import {
    selectDateFormat,
    selectResultDisplay,
} from "features/calendar/calendarSlice";
import CalendarDrawer from "features/setups/SetupCalendar/CalendarDrawer";
import CalendarGrid from "features/setups/SetupCalendar/CalendarGrid";
import "features/setups/SetupCalendar/index.css";
// import CalendarHeader from "features/setups/SetupCalendar/CalendarHeader"; TO REMOVE
import SingleRecordDialog from "features/setups/SingleSetup/SingleRecordDialog";
import { useGetCalendarTableQuery } from "features/setups/setupsSlice";

import "./index.css";

const SetupCalendar = (props) => {
    const { children, value, setup, index, ...other } = props;
    const { documentId } = useParams();

    const dispatch = useDispatch();

    const currentTrade = useSelector(selectSelectedTrade);

    const closeDialog = () => {
        dispatch(deselectTrade());
    };

    const dateFormat = useSelector(selectDateFormat);
    const resultDisplay = useSelector(selectResultDisplay);

    const { data: calendarData } = useGetCalendarTableQuery(
        {
            setupId: setup?.id,
            date: dateFormat,
            metric: resultDisplay,
        },
        { skip: !setup?.id }
    );

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {/* TODO: this might be best as a grid - but have to test widths */}
            {calendarData?.success ? (
                <Box className="calendar-tab" sx={{ mt: 3 }}>
                    <CalendarGrid calendarData={calendarData} />

                    <CalendarDrawer calendarData={calendarData} />
                </Box>
            ) : (
                <ErrorFeedback msg={calendarData?.msg} />
            )}

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
