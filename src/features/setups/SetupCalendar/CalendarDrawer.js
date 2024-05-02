import { TSMainButton, TSMenuItem, TSSelect } from "common/CustomComponents";
import DoghnutChart from "common/graphs/DoughnutChart";
import RangeChart from "common/graphs/RangeChart";
import { useDispatch, useSelector } from "react-redux";
import { getResultDecorator } from "utils/displayUtils";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import {
    selectDateFormat,
    selectResultDisplay,
} from "features/calendar/calendarSlice";
import {
    decreaseMonth,
    getToday,
    increaseMonth,
    selectCurrentDate,
    setDateFormat,
    setResultDisplay,
} from "features/calendar/calendarSlice";
import { useGetCalendarStatisticsQuery } from "features/setups/setupsSlice";

const BoxElement = styled(Box)({
    border: "1px solid #e5e9eb",
    borderRadius: "5px",
    padding: "16px",
});

const CalendarDrawer = ({ versionId, calendarData }) => {
    const dispatch = useDispatch();

    const currentDate = useSelector(selectCurrentDate);

    const { data: calendarStatistics } = useGetCalendarStatisticsQuery(
        {
            versionId,
            date: calendarData?.active_date,
            metric: calendarData?.active_metric,
            offset: new Date().getTimezoneOffset(),
            monthYear: `${currentDate.month() + 1}/${currentDate.year()}`,
        },
        {
            skip:
                !versionId ||
                !calendarData?.active_date ||
                !calendarData?.active_metric,
        } // skip if any parameters are missing
    );

    const decorator = getResultDecorator(calendarData?.active_metric);

    const dateFormat = useSelector(selectDateFormat);
    const resultDisplay = useSelector(selectResultDisplay);

    const renderStatistic = (
        value,
        isDecorator = false,
        renderSkeleton = true
    ) => {
        if (value || value === 0) {
            if (isDecorator) {
                return value.toString() + decorator;
            } else {
                return value.toString();
            }
        } else if (renderSkeleton) {
            return <Skeleton variant="rounded" sx={{ my: 1 }} />;
        }
    };

    return (
        <Box className="calendar-drawer">
            <Box className="calendar-metrics">
                <BoxElement className="calendar-controller">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
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
                        <TSMainButton
                            variant="contained"
                            onClick={() => dispatch(getToday())}
                        >
                            Today
                        </TSMainButton>
                    </Box>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography>Select date display format:</Typography>
                        <TSSelect
                            size="small"
                            value={dateFormat || ""}
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
                                          <TSMenuItem
                                              key={idx}
                                              id={idx}
                                              value={date}
                                          >
                                              {parsedDate}
                                          </TSMenuItem>
                                      )
                                  )
                                : null}
                        </TSSelect>
                    </Box>
                    <Box>
                        <Typography>Select result format:</Typography>
                        <TSSelect
                            size="small"
                            value={resultDisplay || ""}
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
                                          <TSMenuItem
                                              key={idx}
                                              id={idx}
                                              value={metric}
                                          >
                                              {parsedMetric}
                                          </TSMenuItem>
                                      )
                                  )
                                : null}
                        </TSSelect>
                    </Box>
                </BoxElement>

                <BoxElement className="calendar-pnl">
                    <Typography
                        sx={{
                            color: "#46505A",
                            fontSize: 16,
                            LineHeight: 30,
                        }}
                    >
                        Net PnL
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 30,
                        }}
                    >
                        {renderStatistic(
                            calendarStatistics?.current?.net_pnl,
                            true
                        )}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                        <Box
                            display="inline"
                            color={
                                calendarStatistics?.previous?.net_pnl >= 0
                                    ? "green"
                                    : "red"
                            }
                        >
                            {renderStatistic(
                                calendarStatistics?.previous?.net_pnl,
                                false,
                                false
                            )}
                            %
                        </Box>{" "}
                        vs. last month
                    </Typography>
                </BoxElement>
                <BoxElement className="calendar-profit-factor">
                    <Typography
                        sx={{
                            color: "#46505A",
                            fontSize: 16,
                            LineHeight: 30,
                        }}
                    >
                        Profit Factor
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 30,
                        }}
                    >
                        {renderStatistic(
                            calendarStatistics?.current?.profit_factor,
                            false
                        )}
                    </Typography>
                </BoxElement>
                <BoxElement className="calendar-trades-number">
                    <Typography
                        sx={{
                            color: "#46505A",
                            fontSize: 16,
                            LineHeight: 30,
                        }}
                    >
                        Number of Trades
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 30,
                        }}
                    >
                        {renderStatistic(
                            calendarStatistics?.current?.total_trades,
                            false
                        )}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                        {renderStatistic(
                            calendarStatistics?.previous?.total_trades,
                            false,
                            false
                        )}
                        % vs. last month
                    </Typography>
                </BoxElement>
                <RangeChart
                    rangeData={calendarStatistics?.current}
                    decorator={decorator}
                />

                <BoxElement
                    className="calendar-result-breakdown"
                    sx={{
                        alignSelf: "start",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography gutterBottom>Result Breakdown</Typography>
                    <DoghnutChart
                        statsData={{
                            data: {
                                [calendarData?.active_metric]: {
                                    ...calendarStatistics?.current,
                                },
                            },
                        }}
                        props={{ alignSelf: "center", width: "70%" }}
                    />
                </BoxElement>
            </Box>
        </Box>
    );
};

export default CalendarDrawer;
