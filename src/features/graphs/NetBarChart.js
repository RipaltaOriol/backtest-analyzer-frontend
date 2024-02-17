import { ErrorFeedback } from "common/ErrorFeedback";
import {
    greenPaletteConfig,
    redPaletteConfig,
    tooltipConfig,
} from "common/graphs/graphUtils";
import { Bar } from "react-chartjs-2";
import parseColumnName from "utils/parseColumns";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { useGetNetReturnQuery } from "features/graphs/graphsSlice";

const NetBarChart = ({ setupId }) => {
    const {
        data: getNetReturn,
        isLoading,
        isUninitialized,
    } = useGetNetReturnQuery(
        {
            setupId,
        },
        { skip: !setupId }
    );

    let options = {
        responsive: true,
        scales: {
            y: {
                gridLines: {
                    zeroLineColor: "#ffcc33",
                },
                ticks: {
                    font: {
                        weight: "bold",
                    },
                },
            },
            x: {
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

    let data = {
        labels: [],
        datasets: [],
    };
    if (getNetReturn?.success) {
        let datasetsDaily = [];
        Object.entries(getNetReturn?.data).forEach(([key, value], index) => {
            datasetsDaily.push({
                label: parseColumnName(key),
                data: value,
                backgroundColor: value.map((result) =>
                    result > 0
                        ? greenPaletteConfig[index]
                        : redPaletteConfig[index]
                ),
            });
        });
        data.datasets = datasetsDaily;
        data.labels = getNetReturn?.labels;
    }

    return (
        <Box>
            {isLoading || isUninitialized ? (
                <Skeleton variant="rounded" height={60} />
            ) : getNetReturn?.success ? (
                <Bar options={options} data={data} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default NetBarChart;
