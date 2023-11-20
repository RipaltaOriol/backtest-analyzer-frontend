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
import autocolors from "chartjs-plugin-autocolors";
import { ErrorFeedback } from "common/ErrorFeedback";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
    Legend,
    autocolors
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
                },
            },
            x: {
                title: {
                    display: true,
                    text: "",
                },
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
        },
    };

    const { data, isSuccess } = useGetGraphQuery({
        setupId,
        type: "line",
        currentMetric: currentMetric,
    });

    const lineData = {
        labels: [],
        datasets: [],
    };
    if (isSuccess && data?.success) {
        lineData.labels = data?.xLabels;

        let lineDatasets = [];
        data?.data.forEach((dataset, idx) => {
            lineDatasets.push({
                ...dataset,
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    my: 1,
                }}
            >
                {!data?.success && <ErrorFeedback msg={data?.msg} />}
                {data?.success && (
                    <Typography align="center">
                        {data?.labels?.title || "Loading"}
                    </Typography>
                )}
                {data?.success && (
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
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                )}
            </Box>

            {data?.success && <Line data={lineData} options={options} />}
        </Box>
    );
};

export default LineGraph;
