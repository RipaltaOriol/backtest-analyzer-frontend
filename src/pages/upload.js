import { useState } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

import Message from "../common/Message";
import { useUploadDocumentMutation } from "../features/documents/documentSlice";

const Upload = ({ open, onClose }) => {
    const [msg, setMsg] = useState("");
    const [file, setFile] = useState("");
    const [isError, setIsError] = useState(false);
    const [fileName, setFileName] = useState("Choose File");
    const [fileSource, setFileSource] = useState("default");

    const [uploadDocument, { isLoading: isUpdating }] =
        useUploadDocumentMutation();

    const closeDialog = () => {
        setMsg("");
        setFile("");
        setFileName("Choose File");
        setFileSource("default");
        onClose();
    };

    const onChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    let progress;

    if (isUpdating) {
        progress = (
            <Box sx={{ width: "100%", mt: 1 }}>
                <LinearProgress />
            </Box>
        );
    } else {
        progress = <></>;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (
            file.type !== "text/csv" &&
            file.type !==
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            setIsError(true);
            if (file.type === undefined) {
                setMsg("Document not selected");
            } else {
                setMsg("This file is not of type CSV");
            }

            return true;
        }

        const data = new FormData();

        data.append("file", file);
        data.append("fileName", fileName);
        data.append("filesourcetype", fileSource);

        uploadDocument(data)
            .unwrap()
            .then((response) => {
                setIsError(!response.success);
                if (response.success) {
                    setMsg(response.msg);
                } else {
                    setMsg(response.msg);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Dialog
            onClose={closeDialog}
            open={open}
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle sx={{ color: "inherit" }}>
                <Typography align="center" variant="h5" sx={{ mt: 1 }}>
                    File Upload
                </Typography>
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {msg ? (
                    <Message
                        message={msg}
                        setMessage={setMsg}
                        isError={isError}
                        sx={{ mt: 0 }}
                    />
                ) : null}
                <p>{isUpdating}</p>
                <UploadFileRoundedIcon sx={{ fontSize: 50 }} color="primary" />
                <form onSubmit={onSubmit}>
                    <Box sx={{ mt: 2 }}>
                        <FormLabel>File Source:</FormLabel>
                        <RadioGroup
                            row
                            value={fileSource}
                            onChange={(e) => setFileSource(e.target.value)}
                        >
                            <FormControlLabel
                                value="default"
                                control={<Radio size="small" />}
                                label="Default"
                            />
                            <FormControlLabel
                                value="mt4"
                                control={<Radio size="small" />}
                                label="MT4"
                            />
                            <FormControlLabel
                                value="trading_view"
                                disabled
                                control={<Radio size="small" />}
                                label="TraginView Paper Trade"
                            />
                        </RadioGroup>
                        <label htmlFor="upload-file">
                            <input
                                style={{ display: "none" }}
                                id="upload-file"
                                name="upload-file"
                                type="file"
                                onChange={onChange}
                            />
                            <Button
                                variant="outlined"
                                component="span"
                                startIcon={<FileUploadIcon />}
                                size="small"
                                sx={{
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    textTransform: "none",
                                }}
                            >
                                Upload File
                            </Button>
                        </label>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {fileName === "Choose File" ? "" : fileName || ""}
                        </Typography>
                    </Box>
                    {/* Progress Bar */}
                    {progress}
                    <Button
                        sx={{ mt: 1 }}
                        variant="contained"
                        type="submit"
                        fullWidth
                        disableRipple
                    >
                        Upload
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Upload;
