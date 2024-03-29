import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useDeleteFilterSetupMutation } from "../setupsSlice";

const FilterList = ({ setupId, filters }) => {
    const [deleteFilterSetup, { isLoading }] = useDeleteFilterSetupMutation();

    const handleDelete = async (filterId) => {
        try {
            await deleteFilterSetup({ setupId, filterId }).unwrap();
        } catch (err) {
            console.error("Something went wrong", err);
        }
    };

    return (
        <>
            <Box>
                {filters && filters.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {filters.map((filter, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #DDE2E4",
                                    borderRadius: "6px",
                                    width: "fit-content",
                                    padding: "4px 4px 4px 12px",
                                }}
                            >
                                <Typography>Filter</Typography>
                                &nbsp;
                                <Typography>{filter.name}</Typography>
                                <IconButton
                                    sx={{ py: 0 }}
                                    onClick={() => handleDelete(filter.id)}
                                >
                                    <CloseRoundedIcon
                                        sx={{ color: "#F76659" }}
                                    />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>
            <Dialog open={isLoading} fullWidth={true}>
                <Box sx={{ m: 2 }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Removing filter from version. Please wait...
                    </Typography>
                    <LinearProgress color="info" />
                </Box>
            </Dialog>
        </>
    );
};

export default FilterList;
