import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
    selectDateFormat,
    selectResultDisplay,
    setDateFormat,
    setResultDisplay,
} from "features/calendar/calendarSlice";
import { useGetCalendarTableQuery } from "features/documents/documentSlice";

const DrawerContainer = styled(Box)({
    backgroundColor: "#F0F1F2",
    borderRadius: "5px",
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

const CalendarDrawer = () => {
    const { documentId } = useParams();
    const dispatch = useDispatch();

    const currentDate = useSelector(selectCurrentDate);
    const dateFormat = useSelector(selectDateFormat);
    const resultDisplay = useSelector(selectResultDisplay);

    const { data } = useGetCalendarTableQuery({
        documentId,
        date: dateFormat,
        metric: resultDisplay,
    });

    return (
        <DrawerContainer sx={{ ml: 2, p: 2, flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <IconButton
                    aria-label="decrese-month"
                    size="small"
                    onClick={() => dispatch(decreaseMonth())}
                    sx={{
                        "& .MuiTouchRipple-root .MuiTouchRipple-child": {
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
                        "& .MuiTouchRipple-root .MuiTouchRipple-child": {
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
                    value={data?.active_date || ""}
                    onChange={(e) =>
                        dispatch(setDateFormat({ dateFormat: e.target.value }))
                    }
                    sx={{
                        my: 1,
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                        width: "100%",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "inherit",
                            borderWidth: "1px",
                        },
                    }}
                >
                    {data
                        ? data?.dates.map(([date, parsedDate], idx) => (
                              <FilterMenuItem key={idx} id={idx} value={date}>
                                  {parsedDate}
                              </FilterMenuItem>
                          ))
                        : null}
                </Select>
            </Box>
            <Box>
                <Typography>Select result format:</Typography>
                <Select
                    size="small"
                    value={data?.active_metric || ""}
                    onChange={(e) =>
                        dispatch(
                            setResultDisplay({ resultDisplay: e.target.value })
                        )
                    }
                    sx={{
                        my: 1,
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                        width: "100%",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                    {data
                        ? data?.metrics.map(([metric, parsedMetric], idx) => (
                              <FilterMenuItem key={idx} id={idx} value={metric}>
                                  {parsedMetric}
                              </FilterMenuItem>
                          ))
                        : null}
                </Select>
            </Box>
        </DrawerContainer>
    );
};

export default CalendarDrawer;
