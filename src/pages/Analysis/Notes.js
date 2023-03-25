import { useEffect, useState } from "react";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

import { useUpdateSetupsMutation } from "../../features/setups/setupsSlice";

const useStyles = makeStyles((theme) =>
    createStyles({
        inputMultiline: {
            height: "100%",
            "& .MuiInputBase-root": {
                height: "100%",
                display: "flex",
                alignItems: "start",
            },
        },
    })
);

const Notes = ({ setupId, notes }) => {
    const classes = useStyles();
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
            sx={{
                border: "1px solid #E5E9EB",
                borderRadius: "6px 6px 6px 6px",
            }}
        >
            <Typography sx={{ px: 2, py: "8px" }}>Notes</Typography>
            <TextField
                className={classes.inputMultiline}
                label={null}
                sx={{
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
                rows={14}
                variant="outlined"
                onChange={(e) => setSetupNotes(e.target.value)}
                InputProps={{
                    endAdornment:
                        notes !== setupNotes ? (
                            <InputAdornment position="end">
                                <IconButton
                                    sx={{ mt: 4, fontSize: 16 }}
                                    color="primary"
                                    variant="outlined"
                                    disableRipple
                                    onClick={() => handleSaveNote()}
                                >
                                    Save
                                    <LockOpenOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        ) : (
                            <></>
                        ),
                }}
            />
        </Box>
    );
};

export default Notes;
