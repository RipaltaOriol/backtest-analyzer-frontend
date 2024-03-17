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
import { TSMenuItem, TSSelect } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import { multipleColorsConfig, tooltipConfig } from "common/graphs/graphUtils";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

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

                        <TSSelect
                            value={data?.active_metric || ""}
                            onChange={(e) =>
                                dispatch(
                                    setCurrentMetric({
                                        currentMetric: e.target.value,
                                    })
                                )
                            }
                            sx={{
                                width: "auto",
                                position: "absolute",
                                right: 0,
                            }}
                        >
                            {data
                                ? data?.metric_list.map(
                                      ([metric, parsedDate], idx) => (
                                          <TSMenuItem
                                              key={idx}
                                              id={idx}
                                              value={metric}
                                              sx={{ fontSize: 14 }}
                                          >
                                              {parsedDate}
                                          </TSMenuItem>
                                      )
                                  )
                                : null}
                        </TSSelect>
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
