import StateTable from "common/StateTable";
import DoghnutChart from "common/graphs/DoughnutChart";
import PolarChart from "common/graphs/PolarChart";
import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useGetStatisticsQuery } from "features/statistics/statisticsApiSlice";
import { renderTemplate } from "features/templates/utilsRenderTemplate";

const SetupTable = (props) => {
    const { children, value, setup, index, ...other } = props;
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const { data: setupStatistics } = useGetStatisticsQuery(
        {
            setupId: setup?.id,
        },
        { skip: !setup?.id }
    );

    const closeTradeDialog = () => {
        setOpen(false);
        setSelectedRow({});
    };

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
                            {setupStatistics?.success ? (
                                <PolarChart statsData={setupStatistics} />
                            ) : (
                                <Skeleton variant="rounded" height={60} />
                            )}
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
                            {setupStatistics?.success ? (
                                <DoghnutChart statsData={setupStatistics} />
                            ) : (
                                <Skeleton variant="rounded" height={60} />
                            )}
                        </Box>
                    </Box>
                    <Box className="setup-table">
                        {setup?.id ? (
                            <StateTable
                                setup={setup}
                                setOpen={setOpen}
                                setSelectedRow={setSelectedRow}
                            />
                        ) : (
                            <Skeleton variant="rounded" height={60} />
                        )}
                    </Box>
                </Box>
            )}
            {renderTemplate(
                setup?.template,
                setup?.documentId,
                selectedRow,
                open,
                closeTradeDialog
            )}
        </div>
    );
};

export default SetupTable;
