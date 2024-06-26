import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { parseDataValues } from "utils/displayUtils";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import {
    selectCurrentDate,
    setSelectedTrade,
} from "features/calendar/calendarSlice";

const GRID_X_LENGTH = 6;
const GRID_Y_LENGTH = 5;
const PAIR_METRIC = "col_p";

const Item = styled(Box)({
    position: "relative",
    paddingBottom: "100%",
    overflowY: "auto",
    "&::before": {
        display: "block",
        content: "''",
    },
});

const Day = ({ day, rowIdx, cellIdx, calendarData }) => {
    const dispatch = useDispatch();

    const currentDate = useSelector(selectCurrentDate);

    let trades = [];

    if (calendarData) {
        trades = calendarData?.table.reduce((filtered, trade) => {
            if (
                dayjs(trade[calendarData?.active_date]).format("DD-MM-YYYY") ===
                day.format("DD-MM-YYYY")
            ) {
                filtered.push(trade);
            }
            return filtered;
        }, []);
    }

    function getIsNotCurrentMonthClass() {
        return day.format("MM") !== currentDate.format("MM")
            ? "not-current-month"
            : "";
    }

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "current-day"
            : "";
    }

    function getTradeClass(tradeResult) {
        tradeResult = parseFloat(tradeResult);
        if (tradeResult > 0) {
            return "trade-win";
        } else if (tradeResult < 0) {
            return "trade-loss";
        } else if (tradeResult === 0) {
            return "trade-be";
        } else {
            return "trade-missing";
        }
    }

    function assignBorders(x, y) {
        let classes = "";
        if (y === 0) {
            classes += " calendar-grid-top";
            if (x === 0) {
                classes += " border-top-left";
            } else if (x === GRID_X_LENGTH) {
                classes += " border-top-right";
            }
        }
        if (y === GRID_Y_LENGTH) {
            if (x === 0) {
                classes += " border-bottom-left";
            } else if (x === GRID_X_LENGTH) {
                classes += " border-bottom-right";
            }
        }
        if (x === 0) {
            classes += " calendar-grid-left";
        }
        return classes;
    }

    function openSingleTrade(trade) {
        dispatch(setSelectedTrade({ trade }));
    }

    return (
        <Grid item xs={1}>
            {/* TODO I can potentially move this outside here */}
            {rowIdx === 0 && (
                <Box sx={{ mb: 1 }}>
                    <Typography variant="caption">
                        {day.format("dddd")}
                        {/* {day.format("dddd").toUpperCase()} */}
                    </Typography>
                </Box>
            )}
            <Item
                className={`calendar-grid-item  ${getIsNotCurrentMonthClass()} ${assignBorders(
                    cellIdx,
                    rowIdx
                )}`}
            >
                <Box className="calendar-day-text">
                    <Box sx={{ m: 1.5, mt: 2, mb: 1 }}>
                        <Typography
                            className={getCurrentDayClass()}
                            component="span"
                            sx={{ p: 0.5 }}
                        >
                            {day.format("DD")}
                        </Typography>
                    </Box>
                    {trades?.map((trade, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                mx: 1.5,
                                px: 1,
                                py: 0.5,
                                mb: 0.5,
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                            className={`trade ${getTradeClass(
                                trade[calendarData?.active_metric]
                            )}`}
                            onClick={() => openSingleTrade(trade)}
                        >
                            <Typography>
                                {trade[PAIR_METRIC] &&
                                    trade[PAIR_METRIC].toUpperCase()}
                            </Typography>
                            <Typography>
                                {parseDataValues(
                                    calendarData?.active_metric,
                                    trade[calendarData?.active_metric],
                                    true
                                )}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Item>
        </Grid>
    );
};

export default Day;
