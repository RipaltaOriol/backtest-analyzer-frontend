import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useGetSetupOpenPositionsQuery } from "features/setups/setupsSlice";

const OpenTrades = ({ setupId, className, setOpen, setSelectedRow }) => {
    const {
        data: openPositions,
        isLoading,
        isUninitialized,
    } = useGetSetupOpenPositionsQuery(
        {
            versionId: setupId,
        },
        { skip: !Boolean(setupId) }
    );

    const openSelectedTrade = (positionId, position) => {
        const positionAsRow = { ...position, rowId: positionId };
        setOpen(true);
        setSelectedRow(positionAsRow);
    };

    return (
        <Box
            className={className}
            sx={{
                border: "1px solid #e5e9eb",
                borderRadius: "5px",
            }}
        >
            <Typography variant="h6" sx={{ p: 1.5, px: 2 }}>
                Open Trades
            </Typography>
            {isLoading || isUninitialized ? (
                <Skeleton sx={{ mx: 2 }} variant="rounded" height={60} />
            ) : (
                <Box>
                    {Object.entries(openPositions?.openTrades || {}).map(
                        ([positionId, position]) => {
                            return (
                                <Box
                                    key={positionId}
                                    sx={{
                                        display: "flex",
                                        fontSize: 16,
                                        py: 1.5,
                                        px: 2,
                                        letterSpacing: 0.25,
                                        borderTop: "1px solid #e5e9eb",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                    onDoubleClick={() =>
                                        openSelectedTrade(positionId, position)
                                    }
                                >
                                    {position?.col_d && (
                                        <Box
                                            sx={{ mr: 1 }}
                                            className={
                                                position?.col_d.toLowerCase() ===
                                                "long"
                                                    ? "trade-long-decoration"
                                                    : "trade-short-decoration"
                                            }
                                        >
                                            {position?.col_d}
                                        </Box>
                                    )}
                                    {position?.col_p && (
                                        <Box sx={{ mr: 1, fontWeight: 600 }}>
                                            {position?.col_p}
                                        </Box>
                                    )}
                                    {position?.col_o && (
                                        <Box>at {position?.col_o}</Box>
                                    )}
                                </Box>
                            );
                        }
                    )}
                </Box>
            )}
        </Box>
    );
};

export default OpenTrades;
