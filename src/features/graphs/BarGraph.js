import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { CustomSelect } from "common/CustomComponents";
import { ErrorFeedback } from "common/ErrorFeedback";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import {
    selectCurrentMetric,
    setCurrentMetric,
} from "features/graphs/barGraphSlice";

import { useGetGraphQuery } from "./graphsSlice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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

const BarGraph = ({ setupId }) => {
    const dispatch = useDispatch();
    const currentMetric = useSelector(selectCurrentMetric);

    let options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Result",
                },
            },
            x: {
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

    const barData = {
        labels: [],
        datasets: [],
    };

    const { data, isSuccess } = useGetGraphQuery({
        setupId,
        type: "bar",
        currentMetric: currentMetric,
    });

    if (isSuccess && data?.success) {
        barData.labels = data?.dataLabels;
        let barDatasets = [];
        data?.data.forEach((dataset, idx) => {
            barDatasets.push({
                ...dataset,
                barThickness: 30,
            });
        });
        barData.datasets = barDatasets;
        options.scales.x.title.text = String(data.labels.axes);
    }

    return (
        <Box>
            {!data?.success && <ErrorFeedback msg={data?.msg} />}

            {data?.success && (
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
                    </CustomSelect>{" "}
                    <Typography variant="h6" component="span" gutterBottom>
                        by Result
                    </Typography>
                </>
            )}

            {data?.success && <Bar options={options} data={barData} />}
        </Box>
    );
};

export default BarGraph;
