import {
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { CustomSelect } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import { useState } from "react";
import { Bubble } from "react-chartjs-2";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useGetBubbleQuery } from "features/graphs/graphsSlice";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, autocolors);

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

const RadarChart = ({ setupId }) => {
    let bubbleData = {
        datasets: [],
    };

    const [currentMetric, setCurrentMetric] = useState(null);

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Result",
                },
            },
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "",
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return `Risk-Reward: ${(context.raw.r / 5).toFixed(2)}`;
                    },
                },
            },
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
            autocolors: {
                offset: 30,
            },
            annotation: {
                annotations: {
                    line1: {
                        type: "line",
                        yMin: 0,
                        yMax: 0,
                        borderColor: "#878787",
                        borderWidth: 2,
                    },
                },
            },
        },
    };

    const { data, isLoading, isUninitialized } = useGetBubbleQuery(
        {
            setupId,
            currentMetric,
        },
        { skip: !setupId }
    );

    if (data?.success) {
        let bubbleDatasets = [];
        data?.data.forEach((dataset, idx) => {
            bubbleDatasets.push({
                ...dataset,
            });
        });
        bubbleData.datasets = bubbleDatasets;

        options.scales.x.title.text = data.labels.axes;
    }

    return (
        <Box>
            {isLoading || isUninitialized ? (
                <Skeleton variant="rounded" height={60} />
            ) : data?.success ? (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            mb: 1,
                        }}
                    >
                        <Typography variant="h6">
                            {data?.labels?.title || "Loading"}
                        </Typography>
                        <CustomSelect
                            size="small"
                            value={data?.active_metric || ""}
                            onChange={(e) => setCurrentMetric(e.target.value)}
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
                        </CustomSelect>
                    </Box>
                    <Bubble options={options} data={bubbleData} />
                </>
            ) : (
                <ErrorFeedback msg={data?.msg} />
            )}
        </Box>
    );
};

export default RadarChart;
