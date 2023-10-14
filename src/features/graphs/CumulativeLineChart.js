import { ErrorFeedback } from "common/ErrorFeedback";
import { Line } from "react-chartjs-2";
import parseColumnName from "utils/parseColumns";

import Box from "@mui/material/Box";

import { useGetCumulativeReturnQuery } from "features/graphs/graphsSlice";

const CumulativeLineChart = ({ setupId }) => {
    const { data: getCumulativeReturn } = useGetCumulativeReturnQuery(
        {
            setupId,
        },
        { skip: !setupId }
    );

    let options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
            },
            autocolors: {
                offset: 10,
            },
        },
    };

    let data = {
        labels: [],
        datasets: [],
    };

    if (getCumulativeReturn?.success) {
        let datasetsDaily = [];
        for (const [key, value] of Object.entries(getCumulativeReturn?.data)) {
            datasetsDaily.push({
                label: parseColumnName(key),
                data: value,
            });
        }
        data.datasets = datasetsDaily;
        data.labels = getCumulativeReturn?.labels;
    }

    return (
        <Box>
            {getCumulativeReturn?.success ? (
                <Line options={options} data={data} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default CumulativeLineChart;
