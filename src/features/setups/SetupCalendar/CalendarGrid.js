import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import { selectCurrentDate } from "features/calendar/calendarSlice";
import Day from "features/setups/SetupCalendar/Day";
import { getMonth } from "features/setups/SetupCalendar/utils.js";

const CalendarGrid = ({ calendarData }) => {
    const calendarDate = useSelector(selectCurrentDate);

    const [currentMonth, setCurrentMonth] = useState(getMonth());

    useEffect(() => {
        setCurrentMonth(getMonth(calendarDate));
    }, [calendarDate]);

    return (
        // TODO: max width could even be set to vertical view size

        <Grid container columns={7} className="calendar-grid">
            {currentMonth.map((row, rowIdx) => (
                <Fragment key={rowIdx}>
                    {row.map((day, cellIdx) => (
                        <Day
                            day={day}
                            key={cellIdx}
                            rowIdx={rowIdx}
                            cellIdx={cellIdx}
                            calendarData={calendarData}
                        />
                    ))}
                </Fragment>
            ))}
        </Grid>
    );
};

export default CalendarGrid;
