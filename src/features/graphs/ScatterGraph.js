import {
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";
import { CustomSelect } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import { multipleColorsConfig, tooltipConfig } from "common/graphs/graphUtils";
import { Scatter } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { calculateLinearRegression } from "utils/statistics";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import {
    selectCurrentMetric,
    setCurrentMetric,
} from "features/graphs/scatterGraphSlice";

import { useGetGraphQuery } from "./graphsSlice";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

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

const ScatterGraph = ({ setupId }) => {
    const dispatch = useDispatch();
    const currentMetric = useSelector(selectCurrentMetric);

    let scatterData = {
        datasets: [],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Result",
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
                beginAtZero: true,
                title: {
                    display: true,
                    text: "",
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
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
            tooltip: tooltipConfig,
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

    const { data, isLoading, isUninitialized } = useGetGraphQuery(
        {
            setupId,
            type: "scatter",
            currentMetric: currentMetric,
        },
        { skip: !setupId }
    );

    if (data?.success) {
        let scatterDatasets = [];
        data?.data.forEach((dataset, idx) => {
            // Get the regression coefficients
            const { m, b } = calculateLinearRegression(dataset.data);

            // Generate two points for the regression line
            const minX = Math.min(...dataset.data.map((d) => d.x));
            const maxX = Math.max(...dataset.data.map((d) => d.x));

            const regressionLine = [
                { x: minX, y: m * minX + b },
                { x: maxX, y: m * maxX + b },
            ];

            scatterDatasets.push({
                ...dataset,
                pointRadius: 5,
                backgroundColor: multipleColorsConfig[idx],
                borderColor: multipleColorsConfig[idx],
            });

            scatterDatasets.push({
                type: "line",
                label: dataset?.label + " Regression",
                borderColor: multipleColorsConfig[idx],
                backgroundColor: multipleColorsConfig[idx],
                borderWidth: 2,
                data: regressionLine,
                pointRadius: 0,
            });
        });
        scatterData.datasets = scatterDatasets;
        options.scales.x.title.text = data.labels.axes;
    }

    return (
        <Box>
            {isLoading || isUninitialized ? (
                <Skeleton variant="rounded" height={60} />
            ) : data?.success ? (
                <>
                    <CustomSelect
                        size="small"
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        value={data?.active_metric || ""}
                        onChange={(e) =>
                            dispatch(
                                setCurrentMetric({
                                    currentMetric: e.target.value,
                                })
                            )
                        }
                        sx={{
                            mr: 0.8,
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
                    <Typography variant="h6" component="span" gutterBottom>
                        to Results
                    </Typography>
                    <Scatter options={options} data={scatterData} />
                </>
            ) : (
                <ErrorFeedback msg={data?.msg} />
            )}
        </Box>
    );
};

export default ScatterGraph;
