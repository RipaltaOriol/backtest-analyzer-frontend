import { ErrorFeedback } from "common/ErrorFeedback";
import { Bar } from "react-chartjs-2";
import parseColumnName from "utils/parseColumns";

import Box from "@mui/material/Box";

import { useGetNetReturnQuery } from "features/graphs/graphsSlice";

const NetBarChart = ({ setupId }) => {
    const { data: getNetReturn } = useGetNetReturnQuery(
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
    if (getNetReturn?.success) {
        let datasetsDaily = [];
        for (const [key, value] of Object.entries(getNetReturn?.data)) {
            datasetsDaily.push({
                label: parseColumnName(key),
                data: value,
            });
        }
        data.datasets = datasetsDaily;
        data.labels = getNetReturn?.labels;
    }

    return (
        <Box>
            {getNetReturn?.success ? (
                <Bar options={options} data={data} />
            ) : (
                <ErrorFeedback />
            )}
        </Box>
    );
};

export default NetBarChart;
