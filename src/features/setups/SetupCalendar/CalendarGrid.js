import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import { selectCurrentDate } from "features/calendar/calendarSlice";
import Day from "features/setups/SetupCalendar/Day";
import { getMonth } from "features/setups/SetupCalendar/utils.js";

const CalendarGrid = () => {
    const calendarDate = useSelector(selectCurrentDate);

    const [currentMonth, setCurrentMonth] = useState(getMonth());

    useEffect(() => {
        setCurrentMonth(getMonth(calendarDate));
    }, [calendarDate]);

    return (
        // TODO: max width could even be set to vertical view size
        <Grid container columns={7} sx={{ maxWidth: 1600 }}>
            {currentMonth.map((row, rowIdx) => (
                <Fragment key={rowIdx}>
                    {row.map((day, cellIdx) => (
                        <Day day={day} rowIdx={rowIdx} cellIdx={cellIdx} />
                    ))}
                </Fragment>
            ))}
        </Grid>
    );
};

export default CalendarGrid;
