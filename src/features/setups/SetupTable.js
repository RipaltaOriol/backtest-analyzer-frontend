import StateTable from "common/StateTable";
import DoghnutChart from "common/graphs/DoughnutChart";
import PolarChart from "common/graphs/PolarChart";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";

const SetupTable = (props) => {
    const { children, value, setup, index, ...other } = props;

    const { data: setupStatistics } = useGetStatisticsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className="setup-table-view">
                    <Box
                        className="setup-open-trades"
                        sx={{
                            border: "1px solid #e5e9eb",
                            borderRadius: "5px",
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Open Trades
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Alert severity="info">
                            Coming soon! - This widget is under construction.
                        </Alert>
                    </Box>
                    <Box className="setup-table-stats">
                        <Box
                            className="setup-table-polar"
                            sx={{
                                border: "1px solid #e5e9eb",
                                borderRadius: "5px",
                                p: 3,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Profit Factor
                            </Typography>
                            <PolarChart statsData={setupStatistics} />
                        </Box>
                        <Box
                            className="setup-table-radar"
                            sx={{
                                border: "1px solid #e5e9eb",
                                borderRadius: "5px",
                                p: 3,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Win/Loss
                            </Typography>
                            <DoghnutChart statsData={setupStatistics} />
                        </Box>
                    </Box>
                    <Box className="setup-table">
                        <StateTable
                            setup={setup}
                            // setOpen={setOpen}
                            // setSelectedRow={setSelectedRow}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default SetupTable;
