import { TSMainButton } from "common/CustomComponents";
import { useEffect, useState } from "react";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useUpdateSetupsMutation } from "../../features/setups/setupsSlice";

const Notes = ({ setupId, notes, className }) => {
    const [setupNotes, setSetupNotes] = useState(notes);

    const [updateSetups] = useUpdateSetupsMutation();

    useEffect(() => {
        setSetupNotes(notes);
    }, [notes]);

    const handleSaveNote = async () => {
        await updateSetups({ setupId, notes: setupNotes }).unwrap();
    };

    return (
        <Box
            className={className}
            sx={{ borderRadius: "6px", border: "1px solid #E5E9EB" }}
        >
            <Box
                sx={{
                    px: 2,
                    py: 1.25,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography>Notes</Typography>
                <TSMainButton
                    variant="contained"
                    sx={{ fontSize: 14, py: 0.5 }}
                    disabled={notes === setupNotes}
                    onClick={() => handleSaveNote()}
                    endIcon={<LockOpenOutlinedIcon />}
                >
                    Save
                </TSMainButton>
            </Box>
            <Box>
                <TextField
                    label={null}
                    sx={{
                        height: "100%",
                        "& .MuiInputBase-root": {
                            height: "100%",
                            display: "flex",
                            alignItems: "start",
                        },
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: "none",
                                borderTop: "1px solid #E5E9EB",
                                borderRadius: "0px 0px 6px 6px",
                            },
                            "&.Mui-focused fieldset": {
                                borderTop: "1px solid #E5E9EB",
                            },
                            "&:hover fieldset": {
                                borderColor: "#E5E9EB",
                            },
                        },
                    }}
                    multiline
                    fullWidth
                    value={setupNotes || ""}
                    rows={15}
                    variant="outlined"
                    onChange={(e) => setSetupNotes(e.target.value)}
                />
            </Box>
        </Box>
    );
};

export default Notes;
