import { useDispatch, useSelector } from "react-redux";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import {
    decreaseMonth,
    getToday,
    increaseMonth,
    selectCurrentDate,
    setDateFormat,
    setResultDisplay,
} from "features/calendar/calendarSlice";

const DrawerContainer = styled(Box)({
    // backgroundColor: "#F0F1F2",
    border: "1px solid #e5e9eb",
    borderRadius: "5px",
    padding: "1rem",
});

const FilterMenuItem = styled(MenuItem)({
    fontSize: "14px",
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
    "&:focus": {
        color: "inherit",
        backgroundColor: "inherit",
    },
    "&.Mui-selected": {
        "&:focus": {
            color: "inherit",
            backgroundColor: "inherit",
        },
    },
    "&:hover:focus": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
});

const CalendarDrawer = ({ calendarData }) => {
    const dispatch = useDispatch();

    const currentDate = useSelector(selectCurrentDate);

    // const { data } = useGetCalendarTableQuery(
    //     {
    //         setupId,
    //         date: dateFormat,
    //         metric: resultDisplay,
    //     },
    //     { skip: !setupId }
    // );

    // TODO: create new API for this
    // const { data: setupStatistics } = useGetStatisticsQuery(
    //     {
    //         setupId,
    //     },
    //     { skip: !setupId }
    // );

    return (
        <Box className="calendar-drawer">
            <DrawerContainer sx={{ mb: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <IconButton
                            aria-label="decrese-month"
                            size="small"
                            onClick={() => dispatch(decreaseMonth())}
                            sx={{
                                "& .MuiTouchRipple-root .MuiTouchRipple-child":
                                    {
                                        borderRadius: "6px",
                                    },
                            }}
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <IconButton
                            aria-label="increase-month"
                            size="small"
                            onClick={() => dispatch(increaseMonth())}
                            sx={{
                                "& .MuiTouchRipple-root .MuiTouchRipple-child":
                                    {
                                        borderRadius: "6px",
                                    },
                            }}
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            {currentDate.format("MMMM YYYY")}
                        </Typography>
                    </Box>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ width: "100%" }}
                        onClick={() => dispatch(getToday())}
                    >
                        Today
                    </Button>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography>Select date display format:</Typography>
                        <Select
                            size="small"
                            value={calendarData?.active_date || ""}
                            onChange={(e) =>
                                dispatch(
                                    setDateFormat({
                                        dateFormat: e.target.value,
                                    })
                                )
                            }
                            sx={{
                                my: 1,
                                "& legend": { display: "none" },
                                "& fieldset": { top: 0 },
                                width: "100%",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "inherit",
                                        borderWidth: "1px",
                                    },
                            }}
                        >
                            {calendarData
                                ? calendarData?.dates.map(
                                      ([date, parsedDate], idx) => (
                                          <FilterMenuItem
                                              key={idx}
                                              id={idx}
                                              value={date}
                                          >
                                              {parsedDate}
                                          </FilterMenuItem>
                                      )
                                  )
                                : null}
                        </Select>
                    </Box>
                    <Box>
                        <Typography>Select result format:</Typography>
                        <Select
                            size="small"
                            value={calendarData?.active_metric || ""}
                            onChange={(e) =>
                                dispatch(
                                    setResultDisplay({
                                        resultDisplay: e.target.value,
                                    })
                                )
                            }
                            sx={{
                                my: 1,
                                "& legend": { display: "none" },
                                "& fieldset": { top: 0 },
                                width: "100%",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "inherit",
                                        borderWidth: "1px",
                                    },
                                MuiSelect: {
                                    select: {
                                        "&:focus": {
                                            background: "red",
                                        },
                                    },
                                },
                            }}
                        >
                            {calendarData
                                ? calendarData?.metrics.map(
                                      ([metric, parsedMetric], idx) => (
                                          <FilterMenuItem
                                              key={idx}
                                              id={idx}
                                              value={metric}
                                          >
                                              {parsedMetric}
                                          </FilterMenuItem>
                                      )
                                  )
                                : null}
                        </Select>
                    </Box>
                </Box>
                {/* TODO: put this outisde */}
            </DrawerContainer>
            {/* <DrawerContainer>
                <Typography variant="h6">Month Outlook</Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "1rem",
                    }}
                >
                    <Box sx={{ borderRight: "1px solid #d7edff" }}>
                        <Typography variant="h6" gutterBottom>
                            Cumulative Return
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "1rem",
                            }}
                        >
                            <Box>
                                <Typography>Return</Typography>
                                <Typography variant="h3">56%</Typography>
                            </Box>
                            <Box>
                                <Typography>Return @ 50% SL</Typography>
                                <Typography variant="h3">56%</Typography>
                            </Box>
                            <Box>
                                <Typography>Return @ 50% SL</Typography>
                                <Typography variant="h3">56%</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h6" gutterBottom>
                            Result Breakdown
                        </Typography>
                        <DoghnutChart statsData={setupStatistics} />
                    </Box>
                </Box>
            </DrawerContainer> */}
        </Box>
    );
};

export default CalendarDrawer;
