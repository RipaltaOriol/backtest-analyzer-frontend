import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { ErrorFeedback } from "common/ErrorFeedback";
import { multipleColorsConfig, tooltipConfig } from "common/graphs/graphUtils";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import {
    selectCurrentMetric,
    setCurrentMetric,
} from "features/graphs/lineGraphSlice";

import { useGetGraphQuery } from "./graphsSlice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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

const LineGraph = ({ setupId }) => {
    const dispatch = useDispatch();
    const currentMetric = useSelector(selectCurrentMetric);

    let options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Equity",
                    font: {
                        weight: "bold",
                    },
                },
                ticks: {
                    font: {
                        weight: "bold",
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: "",
                    font: {
                        weight: "bold",
                    },
                },
                ticks: {
                    autoSkip: true,
                    maxRotation: 45,
                    // font: {
                    //     weight: "bold",
                    // },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
            tooltip: tooltipConfig,
        },
    };

    const { data, isLoading, isUninitialized } = useGetGraphQuery(
        {
            setupId,
            type: "line",
            currentMetric: currentMetric,
        },
        { skip: !setupId }
    );

    const lineData = {
        labels: [],
        datasets: [],
    };
    if (data?.success) {
        lineData.labels = data?.xLabels;

        let lineDatasets = [];
        data?.data.forEach((dataset, idx) => {
            lineDatasets.push({
                ...dataset,
                backgroundColor: multipleColorsConfig[idx],
                borderColor: multipleColorsConfig[idx],
            });
        });
        lineData.datasets = lineDatasets;
        options.scales.x.title.text = String(data.labels.axes);
    }

    return (
        <Box
            sx={{
                border: "1px solid #E5E9EB",
                borderRadius: "5px",
                p: 2,
                pb: 6,
                maxHeight: "500px",
            }}
        >
            {isLoading || isUninitialized ? (
                <Skeleton variant="rounded" height={60} />
            ) : data?.success ? (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            my: 1,
                        }}
                    >
                        <Typography align="center">
                            {data?.labels?.title || "Loading"}
                        </Typography>

                        <Select
                            size="small"
                            value={data?.active_metric || ""}
                            onChange={(e) =>
                                dispatch(
                                    setCurrentMetric({
                                        currentMetric: e.target.value,
                                    })
                                )
                            }
                            sx={{
                                "& legend": { display: "none" },
                                "& fieldset": { top: 0 },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "inherit",
                                        borderWidth: "1px",
                                    },
                                position: "absolute",
                                right: 0,
                            }}
                        >
                            {data
                                ? data?.metric_list.map(
                                      ([metric, parsedDate], idx) => (
                                          <FilterMenuItem
                                              key={idx}
                                              id={idx}
                                              value={metric}
                                          >
                                              {parsedDate}
                                          </FilterMenuItem>
                                      )
                                  )
                                : null}
                        </Select>
                    </Box>
                    <Line data={lineData} options={options} />
                </>
            ) : (
                <ErrorFeedback msg={data?.msg} />
            )}
        </Box>
    );
};

export default LineGraph;
