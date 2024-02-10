import {
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { CustomSelect } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import { Scatter } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

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

ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
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
            legend: {
                labels: {
                    usePointStyle: true,
                },
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
            scatterDatasets.push({
                ...dataset,
                pointRadius: 5,
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
