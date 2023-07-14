import {
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { Scatter } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
        },
    };

    const { data, isSuccess } = useGetGraphQuery({
        setupId,
        type: "scatter",
        currentMetric: currentMetric,
    });

    if (isSuccess && data?.success) {
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
        <Box sx={{ border: "1px solid #E5E9EB", borderRadius: "6px", p: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    my: 1,
                }}
            >
                {data?.success && (
                    <Typography align="center">
                        {data?.labels?.title || "Loading"}
                    </Typography>
                )}

                {!data?.success && (
                    <Typography align="center" sx={{ color: "red" }}>
                        {data?.msg}
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
            <Scatter options={options} data={scatterData} />
        </Box>
    );
};

export default ScatterGraph;
