import { tooltipConfig } from "common/graphs/graphUtils";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import parseDataValues from "utils/displayUtils";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { selectResultDisplay } from "features/calendar/calendarSlice";

const RangeChart = ({ rangeData }) => {
    let max_win, max_loss, average_profit;
    ({ max_win = 0, max_loss = 0, average_profit = 0 } = rangeData || {});

    const resultMetric = useSelector(selectResultDisplay);

    const options = {
        indexAxis: "y",
        responsive: true,
        aspectRatio: 5,
        layout: {
            bottom: 10,
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                border: { display: false },
            },
            y: {
                stacked: true,
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                ...tooltipConfig,
                yAlign: "bottom",
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || "";
                        let value = parseDataValues(
                            resultMetric,
                            context.parsed.x || "",
                            true
                        );
                        return label + ": " + value;
                    },
                },
            },
            annotation: {
                annotations: {
                    line1: {
                        type: "line",
                        xMin: average_profit,
                        xMax: average_profit,
                        yMax: 0.2,
                        yMin: -0.2,
                        borderColor: "#0e73f6",
                        borderWidth: 5,
                        label: {
                            backgroundColor: "rgba(0,0,0,0)",
                            content: `Average Return: ${parseDataValues(
                                resultMetric,
                                average_profit,
                                true
                            )}`,
                            color: "black",
                            font: {
                                weight: "normal",
                                size: 14,
                                family: "Inter",
                            },
                            position: "start",
                            display: true,
                            yAdjust: -12,
                        },
                    },
                },
            },
        },
    };

    const labels = [""];

    const data = {
        labels,
        datasets: [
            {
                label: "Max. Win",
                data: [max_win],
                backgroundColor: "#74C69D",
                borderColor: "#1B4332",
                barThickness: 25,
            },
            {
                label: "Max. Loss",
                data: [max_loss],
                backgroundColor: "#FA4C58",
                borderColor: "#77030B",
                barThickness: 25,
            },
        ],
    };

    return (
        <Box className="calendar-range-chart" sx={{ pb: 0 }}>
            <Typography gutterBottom>Result Breakdown</Typography>
            <Bar options={options} data={data} />
        </Box>
    );
};

export default RangeChart;
