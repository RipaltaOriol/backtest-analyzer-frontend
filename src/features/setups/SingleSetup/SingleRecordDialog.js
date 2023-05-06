// import DialogTitle from "@mui/material/DialogTitle";
import ImagesCarousel from "common/ImageCarousel";
import ImagePreviewDialog from "common/ImagePreviewDialog";
import Message from "common/Message";
import TipTapEditor, { useTextEditor } from "common/TipTapEditor";
import { EditorView } from "prosemirror-view";
import { useEffect, useState } from "react";
import parseColumnName from "utils/parseColumns";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { useUpdateDocumentMutation } from "features/documents/documentSlice";
import { useUpdateRowNoteSetupMutation } from "features/setups/setupsSlice";

const FieldText = styled(Typography)({
    color: "#6E7C87",
});

// hacky solution for reload editor
EditorView.prototype.updateState = function updateState(state) {
    if (!this.docView) return; // This prevents the matchesNode error on hot reloads
    this.updateStateInner(state, this.state.plugins !== state.plugins);
};

const HighlightBox = styled(Box)({
    backgroundColor: "#F0F1F2",
    borderRadius: "6px",
    marginBottom: 15,
});

const HighlightText = styled("span")({
    marginLeft: 10,
    color: "#252C32",
    fontWeight: "400",
});

const AddImageBox = styled(Box)({
    backgroundColor: "#fff",
    border: "1px solid #E5E9EB",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px 0",
});

const LighTextField = styled(TextField)({
    background: "#F0F1F2",
    outline: null,
    borderRadius: "6px",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#E5E9EB",
        },
        "&:hover fieldset": {
            borderColor: "#E5E9EB",
        },
        "&.Mui-focused fieldset": {
            border: "#E5E9EB",
        },
    },
});

// this should be improved
function isMetric(metric) {
    if (
        metric === ".d" ||
        metric === "tableData" ||
        metric === "note" ||
        metric === "imgs" ||
        metric === "index" ||
        metric === "rowId"
    ) {
        return false;
    }
    return true;
}

function isResultColumn(column) {
    return column.startsWith("col_r");
}

function SingleRecordDialog({
    open,
    onClose,
    setupId,
    rowRecord,
    isSetup = true,
}) {
    // TODO: change setupId to something like itemId
    const [imagePreview, setImagePreview] = useState(false);
    const [isSync, setIsSync] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [images, setImages] = useState(rowRecord.imgs || []);
    const [msg, setMsg] = useState("");
    const [msgStatus, setMsgStatus] = useState(true); // true reflects success, false reflects failure

    const [updateRowNoteSetup] = useUpdateRowNoteSetupMutation();
    const [updateDocument] = useUpdateDocumentMutation();

    const handleChange = (event) => {
        setIsSync(event.target.checked);
    };

    const handleClose = () => {
        onClose();
    };

    let editor = useTextEditor(rowRecord?.note);

    const handleSave = async () => {
        let res = null;
        if (isSetup) {
            res = await updateRowNoteSetup({
                setupId,
                rowId: rowRecord.index,
                note: editor?.getHTML(),
                images,
                isSync,
            });
        } else {
            let data = {
                ...rowRecord,
                note: editor?.getHTML(),
                imgs: images,
                rowId: rowRecord.index,
            };
            delete data["index"];
            res = await updateDocument({
                id: setupId,
                method: "update",
                data,
            });
        }

        setMsg(res?.data.msg);
        setMsgStatus(res?.data.success);
    };

    const addNewImage = () => {
        setImages([...images, newImageUrl]);
        setNewImageUrl("");
    };

    const removeImage = (idx) => {
        var newImages = [...images];
        newImages.splice(idx, 1);
        console.log(idx);
        console.log(newImages);
        setImages(newImages);
    };

    useEffect(() => {
        editor?.commands.setContent(rowRecord?.note || "");
        setImages(rowRecord?.imgs || []);
    }, [rowRecord, editor]);

    return (
        <Box>
            <ImagePreviewDialog
                url={imagePreviewUrl}
                open={imagePreview}
                close={() => setImagePreview(false)}
            />
            <Dialog
                onClose={handleClose}
                open={open}
                fullWidth
                maxWidth="xl"
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: "6px",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F6F8F9",
                        border: "1px solid #E5E9EB",
                        px: 4,
                        py: 1.5,
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontWeight: 600,
                            lineHeight: "24px",
                            display: "flex",
                            p: 0,
                        }}
                    >
                        Trade in {rowRecord["col_p"]?.toUpperCase() || ""}
                    </DialogTitle>
                    {isSetup && (
                        <Tooltip
                            sx={{ maxWidth: 300 }}
                            title="Sync this changes with parent document"
                            placement="right"
                            arrow
                        >
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isSync}
                                        onChange={handleChange}
                                    />
                                }
                                label="Sync"
                            />
                        </Tooltip>
                    )}
                </Box>

                <DialogContent sx={{ p: 4, pt: msg ? 1 : 4 }}>
                    {msg && (
                        <Message
                            message={msg}
                            setMessage={setMsg}
                            isError={!msgStatus}
                            sx={{ my: 1 }}
                        />
                    )}
                    {/* have this header not scrollabel */}
                    <Grid container spacing={3}>
                        <Grid item xs={6} sx={{ mb: 1 }}>
                            {/* General Info */}
                            <HighlightBox display="flex" sx={{ p: 2 }}>
                                <Box width="50%">
                                    <FieldText>
                                        Entry
                                        <HighlightText>
                                            {rowRecord?.col_o ?? "NA"}
                                        </HighlightText>
                                    </FieldText>
                                    <FieldText>
                                        SL
                                        <HighlightText>
                                            {rowRecord?.col_sl ?? "NA"}
                                        </HighlightText>
                                    </FieldText>
                                    <FieldText>
                                        TP
                                        <HighlightText>
                                            {rowRecord?.col_tp ?? "NA"}
                                        </HighlightText>
                                    </FieldText>
                                </Box>
                                <Box width="50%">
                                    <FieldText>
                                        Risk Reward
                                        <HighlightText>
                                            {rowRecord?.col_m_RRR ?? "NA"}
                                        </HighlightText>
                                    </FieldText>
                                    {rowRecord &&
                                        Object.entries(rowRecord).map(
                                            ([key, value], idx) => {
                                                if (isResultColumn(key)) {
                                                    return (
                                                        <FieldText key={idx}>
                                                            {parseColumnName(
                                                                key
                                                            )}
                                                            <HighlightText>
                                                                {/* todo: change this */}
                                                                {value}
                                                            </HighlightText>
                                                        </FieldText>
                                                    );
                                                }
                                                return null;
                                            }
                                        )}
                                </Box>
                            </HighlightBox>
                            {/* Other Info */}
                            <Typography sx={{ fontWeight: "600" }} gutterBottom>
                                Metrics
                            </Typography>
                            <Grid container spacing={0.5} sx={{ mb: 1 }}>
                                {rowRecord &&
                                    Object.entries(rowRecord).map(
                                        ([key, value], idx) => {
                                            if (isMetric(key)) {
                                                return (
                                                    <Grid item xs={6}>
                                                        {/* have this props in case a word is very large and cannot be wrapped */}
                                                        <FieldText
                                                            sx={{
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                            }}
                                                        >
                                                            {parseColumnName(
                                                                key
                                                            )}
                                                            <HighlightText>
                                                                {value}
                                                            </HighlightText>
                                                        </FieldText>
                                                    </Grid>
                                                );
                                            }
                                            return null;
                                        }
                                    )}
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sx={{ mb: 2 }}>
                            {/* Notes */}
                            <Typography variant="h6">Notes</Typography>
                            <TipTapEditor
                                editor={editor}
                                sx={{ height: "100%" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <AddImageBox>
                                <Typography variant="subtitle3">
                                    Upload your image
                                </Typography>
                                <Typography color="#6E7C87">
                                    Add url or browse from your computer
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <LighTextField
                                        placeholder="url link"
                                        size="small"
                                        sx={{ mr: 2 }}
                                        value={newImageUrl}
                                        onChange={(e) =>
                                            setNewImageUrl(e.target.value)
                                        }
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CloudUploadOutlinedIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={addNewImage}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </AddImageBox>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Images */}
                            <ImagesCarousel
                                images={images}
                                setImagePreview={setImagePreview}
                                setImagePreviewUrl={setImagePreviewUrl}
                                removeImage={removeImage}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <Box display="flex" justifyContent="center" sx={{ m: 2 }}>
                    <Button
                        color="secondary"
                        sx={{ py: 0, px: 5, mx: 1 }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ py: 0.5, px: 5, mx: 1 }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Dialog>
        </Box>
    );
}

export default SingleRecordDialog;
