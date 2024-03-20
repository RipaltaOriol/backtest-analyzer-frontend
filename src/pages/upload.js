import { memo, useState } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import Message from "../common/Message";
import {
    useConnectDcoumentMutation,
    useUploadDocumentMutation,
} from "../features/documents/documentSlice";

const UploadBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#F6F8F9",
    border: "1px dashed #CBD0D3",
    borderRadius: "8px",
});

// TODO: this should be a component not a page
const Upload = memo(({ open, onClose }) => {
    const [msg, setMsg] = useState("");
    const [file, setFile] = useState("");
    const [isError, setIsError] = useState(false);
    const [fileName, setFileName] = useState("Choose File");
    const [fileSource, setFileSource] = useState("DEFAULT");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [server, setServer] = useState("");

    const [uploadDocument, { isLoading: isUpdating }] =
        useUploadDocumentMutation();
    const [connectDocument, { isLoading: isConnecting }] =
        useConnectDcoumentMutation();

    const closeDialog = () => {
        setMsg("");
        setFile("");
        setFileName("Choose File");
        setFileSource("DEFAULT");
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

    const onSubmitConnet = async (e) => {
        if (account && password && server) {
            connectDocument({ account, password, server, platform: fileSource })
                .unwrap()
                .then((response) => {
                    setIsError(!response.success);
                    setMsg(response.msg);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            setIsError(true);
            setMsg("Some credentials are missing");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (fileSource.endsWith("API")) {
            onSubmitConnet();
        } else {
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
                    setMsg(response.msg);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <Dialog
            onClose={closeDialog}
            open={open}
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogTitle sx={{ color: "inherit" }}>
                <Typography
                    align="center"
                    variant="h5"
                    component="div"
                    sx={{ mt: 1 }}
                >
                    {fileSource.endsWith("API")
                        ? "Connect Meta Trader"
                        : "File Upload"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {msg ? (
                    <Message
                        message={msg}
                        setMessage={setMsg}
                        isError={isError}
                        sx={{ mt: 0, mb: 2 }}
                    />
                ) : null}
                <form onSubmit={onSubmit}>
                    <UploadBox
                        sx={{
                            p: fileSource.endsWith("API") ? 4 : 6,
                        }}
                    >
                        {fileSource.endsWith("API") ? (
                            <Box>
                                {!isConnecting && (
                                    <Box>
                                        <TextField
                                            label="Account"
                                            variant="standard"
                                            value={account}
                                            onChange={(e) =>
                                                setAccount(e.target.value)
                                            }
                                            sx={{
                                                mb: 2,
                                                width: "100%",
                                                input: {
                                                    fontSize: "14px",
                                                },
                                            }}
                                        />
                                        <TextField
                                            label="Password"
                                            variant="standard"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            sx={{
                                                mb: 2,
                                                width: "100%",
                                                input: {
                                                    fontSize: "14px",
                                                },
                                            }}
                                        />
                                        <TextField
                                            label="Server"
                                            variant="standard"
                                            value={server}
                                            onChange={(e) =>
                                                setServer(e.target.value)
                                            }
                                            sx={{
                                                mb: 1,
                                                width: "100%",
                                                input: {
                                                    fontSize: "14px",
                                                },
                                            }}
                                        />
                                    </Box>
                                )}
                                {isConnecting && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            color: "#5B6871",
                                        }}
                                    >
                                        <Typography sx={{ mb: 5 }}>
                                            Please wait. This might take a few
                                            minutes.
                                        </Typography>
                                        <CircularProgress size={80} sx={{}} />
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <>
                                <UploadFileRoundedIcon
                                    sx={{ fontSize: 50, mb: 4 }}
                                    color="primary"
                                />
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
                                        startIcon={
                                            <FileUploadIcon color="primary" />
                                        }
                                        size="small"
                                        sx={{
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            textTransform: "none",
                                            background: "#fff",
                                            color: "#000",
                                        }}
                                    >
                                        Upload File
                                    </Button>
                                </label>
                            </>
                        )}
                    </UploadBox>

                    <Box sx={{ mt: 2 }}>
                        <FormLabel sx={{ fontWeight: "600" }}>
                            File Source:
                        </FormLabel>
                        <RadioGroup
                            row
                            value={fileSource}
                            onChange={(e) => setFileSource(e.target.value)}
                        >
                            <FormControlLabel
                                value="DEFAULT"
                                control={<Radio size="small" />}
                                label="Default"
                            />
                            <FormControlLabel
                                value="MT4_FILE"
                                control={<Radio size="small" />}
                                label="MT4 Trade History"
                            />
                            <FormControlLabel
                                value="MT4_API"
                                control={<Radio size="small" />}
                                label="Connect MT4"
                            />
                            <FormControlLabel
                                value="MT5_API"
                                control={<Radio size="small" />}
                                label="Connect MT5"
                            />
                        </RadioGroup>

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
                        {fileSource.endsWith("API") ? "Connect" : "Upload"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
});

export default Upload;
