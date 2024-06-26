import { ErrorFeedback } from "common/ErrorFeedback";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import {
    deselectTrade,
    isTradeSelected,
    selectSelectedTrade,
    setDateFormat,
    setResultDisplay,
} from "features/calendar/calendarSlice";
import {
    selectDateFormat,
    selectResultDisplay,
} from "features/calendar/calendarSlice";
import CalendarDrawer from "features/setups/SetupCalendar/CalendarDrawer";
import CalendarGrid from "features/setups/SetupCalendar/CalendarGrid";
import "features/setups/SetupCalendar/index.css";
// import CalendarHeader from "features/setups/SetupCalendar/CalendarHeader"; TO REMOVE
import { useGetCalendarTableQuery } from "features/setups/setupsSlice";
import { renderTemplate } from "features/templates/utilsRenderTemplate";

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
    const isOpen = useSelector(isTradeSelected);
    const resultDisplay = useSelector(selectResultDisplay);

    const {
        data: calendarData,
        isLoading,
        isUninitialized,
    } = useGetCalendarTableQuery(
        {
            setupId: setup?.id,
            date: dateFormat,
            metric: resultDisplay,
        },
        { skip: !setup?.id }
    );

    useEffect(() => {
        if (calendarData) {
            dispatch(
                setResultDisplay({ resultDisplay: calendarData?.active_metric })
            );
            dispatch(setDateFormat({ dateFormat: calendarData?.active_date }));
        }
    }, [calendarData, dispatch]);

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {/* TODO: this might be best as a grid - but have to test widths */}
            {isLoading || isUninitialized ? (
                <Skeleton
                    variant="rounded"
                    className="setup-overview"
                    height={200}
                />
            ) : calendarData?.success ? (
                <Box className="calendar-tab" sx={{ mt: 3 }}>
                    <CalendarGrid calendarData={calendarData} />

                    <CalendarDrawer
                        versionId={setup?.id}
                        calendarData={calendarData}
                    />
                </Box>
            ) : (
                <ErrorFeedback msg={calendarData?.msg} />
            )}

            {/* Single Setup */}
            {/* TODO: cannot figure out why we need the `isOpen` */}
            {isOpen &&
                renderTemplate(
                    setup?.template,
                    documentId,
                    currentTrade,
                    isOpen,
                    closeDialog
                )}
        </Box>
    );
};

export default SetupCalendar;
