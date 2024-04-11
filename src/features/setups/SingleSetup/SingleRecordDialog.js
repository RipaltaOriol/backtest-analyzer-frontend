import { uploadFile } from "api/awsS3";
import {
    TSBackButton,
    TSMainButton,
    TSTextField,
} from "common/CustomComponents";
import ImagesCarousel from "common/ImageCarousel";
import ImagePreviewDialog from "common/ImagePreviewDialog";
import TipTapEditor, { useTextEditor } from "common/TipTapEditor";
import { EditorView } from "prosemirror-view";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validateDirection } from "utils";

import { AddBoxRounded } from "@mui/icons-material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import {
    updateDateInput,
    updateNumberInput,
    updateTextInput,
} from "features/documents/UpdateDocumentHelper";
import { useGetDocumentColumnsQuery } from "features/documents/documentSlice";
import { setError, setMessage } from "features/messages/messagesSlice";
import {
    useDeleteTradeMutation,
    useUpdateTradeMutation,
} from "features/trades/tradeAPISlice";

EditorView.prototype.updateState = function updateState(state) {
    // hacky solution for reload editor
    if (!this.docView) return; // This prevents the matchesNode error on hot reloads
    this.updateStateInner(state, this.state.plugins !== state.plugins);
};

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const HighlightBox = styled(Box)({
    backgroundColor: "#F0F1F2",
    borderRadius: "10px",
    marginBottom: 16,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    columnGap: "16px",
    rowGap: "8px",
    alignItems: "center",
});

const MetricBox = styled(Box)({
    margin: "8px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    columnGap: "16px",
    rowGap: "8px",
    alignItems: "center",
    marginBottom: 16,
});

// TODO: optimize this logic
function isMetric(metric) {
    if (
        isResultColumn(metric) ||
        metric === "tableData" ||
        metric === "note" ||
        metric === "imgs" ||
        metric === "index" ||
        metric === "col_o" ||
        metric === "col_rr" ||
        metric === "col_sl" ||
        metric === "col_tp" ||
        metric === "rowId"
    ) {
        return false;
    }
    return true;
}

function isResultColumn(column) {
    return new RegExp("col_[vpr]_").test(column);
}

function SingleRecordDialog({ open, onClose, documentId, rowRecord }) {
    const [imagePreview, setImagePreview] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [tradeData, setTradeData] = useState(rowRecord);
    const [images, setImages] = useState(rowRecord.imgs || []);
    const dispatch = useDispatch();

    const [updateTrade] = useUpdateTradeMutation();
    const [deleteTrade] = useDeleteTradeMutation();

    const { data: accountColumns } = useGetDocumentColumnsQuery(
        { documentId },
        { skip: !documentId }
    );

    const handleClose = () => {
        onClose();
    };

    const handleDelete = async () => {
        try {
            const response = await deleteTrade({
                documentId,
                tradeId: rowRecord.rowId,
            }).unwrap();

            setUserMessage(response.msg);
            setUserError(!response.success);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const setUserMessage = useCallback(
        (newMessage) => {
            dispatch(setMessage({ msg: newMessage }));
        },
        [dispatch]
    );

    const setUserError = (isError) => {
        dispatch(setError({ error: isError }));
    };

    let editor = useTextEditor(rowRecord?.note);

    const handleSave = async () => {
        console.log(tradeData.hasOwnProperty("col_d"), tradeData?.col_d);
        if (
            tradeData.hasOwnProperty("col_d") &&
            !validateDirection(tradeData?.col_d)
        ) {
            setUserMessage(
                "Direction value is incorrect. Value should be long or short."
            );
            setUserError(true);
            return false;
        }

        let data = {
            ...tradeData,
            note: editor?.getHTML(),
            imgs: images,
            rowId: rowRecord.rowId, // NOTE: this has been changed from index to rowId. Be careful it it triggers more errors.
        };

        delete data["index"];

        try {
            const updatedTrade = await updateTrade({
                documentId,
                tradeId: rowRecord.rowId,
                trade: data,
            });
            setUserMessage(updatedTrade?.data.msg);
            setUserError(!updatedTrade?.data.success);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange =
        (key, type = "string") =>
        (event) => {
            let newValue = event.target.value;
            if (type === "number") {
                newValue =
                    event.target.valueAsNumber === 0
                        ? 0
                        : event.target.valueAsNumber || null;
            }
            setTradeData({ ...tradeData, [key]: newValue });
        };

    const handleDateTimeChange = (key, newValue) => {
        try {
            setTradeData({ ...tradeData, [key]: newValue.toISOString() });
        } catch (err) {
            if (err instanceof RangeError) {
                console.log(err);
            }
        }
    };

    const addNewImage = () => {
        setImages([...images, newImageUrl]);
        setNewImageUrl("");
    };

    const removeImage = (idx) => {
        var newImages = [...images];
        newImages.splice(idx, 1);
        setImages(newImages);
    };

    useEffect(() => {
        editor?.commands.setContent(rowRecord?.note || "");
        setTradeData(rowRecord);
        setImages(rowRecord?.imgs || []);
    }, [rowRecord, editor]);

    const generateField = (columnId, columnValue) => {
        switch (true) {
            case columnId === "note":
                return null;
            case columnId === "imgs":
                return null;
            case accountColumns[columnId].type === "float64" ||
                accountColumns[columnId].type === "int64":
                return (
                    <Box key={columnId}>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            {accountColumns[columnId].name}
                        </InputLabel>

                        {updateNumberInput(columnId, columnValue, handleChange)}
                    </Box>
                );
            case accountColumns[columnId].type === "object":
                return (
                    <Box key={columnId}>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            {accountColumns[columnId].name}
                        </InputLabel>

                        {updateTextInput(columnId, columnValue, handleChange)}
                    </Box>
                );
            case columnId.startsWith("col_d_"):
                return (
                    <Box key={columnId}>
                        <InputLabel shrink={false} sx={{ mb: 1 }}>
                            {accountColumns[columnId].name}
                        </InputLabel>

                        {updateDateInput(
                            columnId,
                            columnValue,
                            handleDateTimeChange
                        )}
                    </Box>
                );

            default:
                return null;
        }
    };

    const handleFileChange = async (e) => {
        try {
            const file = e.target.files[0];
            const fileType = file["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                const response = await uploadFile(file);
                if (response.success) {
                    setImages([...images, response.url]);
                } else {
                    dispatch(setError({ error: true }));
                    dispatch(setMessage({ msg: "Something went wrong." }));
                }
            } else {
                dispatch(setError({ error: true }));
                dispatch(setMessage({ msg: "File type not supported." }));
            }
        } catch (e) {
            dispatch(setError({ error: true }));
            dispatch(setMessage({ msg: "Something went wrong." }));
        }
    };

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
                        borderRadius: "10px",
                        backgroundColor: "#F6F8F9",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "10px",
                        p: 2,
                        m: 1,
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
                        Trade in {tradeData["col_p"]?.toUpperCase() || "..."}
                    </DialogTitle>
                    <Box>
                        <IconButton
                            aria-label="delete-trade"
                            onClick={handleDelete}
                            sx={{
                                mr: 2,
                                color: "red",
                                backgroundColor: "#ffedef",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#ffedef",
                                },
                            }}
                            disableRipple
                        >
                            <DeleteOutlineRoundedIcon />
                        </IconButton>
                        <TSBackButton
                            onClick={handleClose}
                            sx={{
                                px: 4,
                                py: 1,
                                mr: 2,
                            }}
                        >
                            Cancel
                        </TSBackButton>
                        <TSMainButton
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                px: 4,
                                py: 1,
                            }}
                        >
                            Apply
                        </TSMainButton>
                    </Box>
                </Box>

                <DialogContent sx={{ p: 2, pt: 1 }}>
                    <HighlightBox sx={{ p: 2 }}>
                        {accountColumns &&
                            accountColumns.hasOwnProperty("col_o") && (
                                <Box>
                                    <InputLabel shrink={false} sx={{ mb: 1 }}>
                                        Entry
                                    </InputLabel>
                                    {updateNumberInput(
                                        "col_o",
                                        tradeData?.col_o,
                                        handleChange
                                    )}
                                </Box>
                            )}

                        {accountColumns &&
                            accountColumns.hasOwnProperty("col_sl") && (
                                <Box>
                                    <InputLabel shrink={false} sx={{ mb: 1 }}>
                                        Stop Loss
                                    </InputLabel>

                                    {updateNumberInput(
                                        "col_sl",
                                        tradeData?.col_sl,
                                        handleChange
                                    )}
                                </Box>
                            )}
                        {accountColumns &&
                            accountColumns.hasOwnProperty("col_tp") && (
                                <Box>
                                    <InputLabel shrink={false} sx={{ mb: 1 }}>
                                        Take Profit
                                    </InputLabel>

                                    {updateNumberInput(
                                        "col_tp",
                                        tradeData?.col_tp,
                                        handleChange
                                    )}
                                </Box>
                            )}
                        {accountColumns &&
                            accountColumns.hasOwnProperty("col_rr") && (
                                <Box>
                                    <InputLabel shrink={false} sx={{ mb: 1 }}>
                                        Risk Reward Ratio
                                    </InputLabel>

                                    {updateNumberInput(
                                        "col_rr",
                                        tradeData?.col_rr,
                                        handleChange
                                    )}
                                </Box>
                            )}
                        {tradeData &&
                            Object.entries(accountColumns || {}).map(
                                ([columnName, columnValues], idx) => {
                                    if (isResultColumn(columnName)) {
                                        return (
                                            <Box key={idx}>
                                                <InputLabel
                                                    shrink={false}
                                                    sx={{ mb: 1 }}
                                                >
                                                    {columnValues.name}
                                                </InputLabel>
                                                {updateNumberInput(
                                                    columnName,
                                                    tradeData?.[columnName],
                                                    handleChange
                                                )}
                                            </Box>
                                        );
                                    }
                                    return null;
                                }
                            )}
                    </HighlightBox>
                    <MetricBox>
                        {Object.entries(accountColumns || {}).map(
                            ([columnName, columnValues], idx) => {
                                if (isMetric(columnName)) {
                                    return generateField(
                                        columnName,
                                        tradeData?.[columnName]
                                    );
                                }
                                return null;
                            }
                        )}
                    </MetricBox>
                    <Box sx={{ margin: "8px", mb: 2 }}>
                        <Typography
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                lineHeight: "16px",
                                letterSpacing: "-0.6px",
                            }}
                        >
                            Notes
                        </Typography>
                        <TipTapEditor editor={editor} sx={{ height: "100%" }} />
                    </Box>
                    <Box sx={{ margin: "8px" }}>
                        <Typography
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                lineHeight: "16px",
                                letterSpacing: "-0.6px",
                            }}
                        >
                            Upload Images
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    component="label"
                                    disableRipple
                                    sx={{
                                        py: 5,
                                        mb: 1,
                                        border: "1px dashed #0000003b",
                                        backgroundColor: "white",
                                        width: "100%",
                                    }}
                                >
                                    <Box sx={{ textAlign: "center" }}>
                                        <MoveToInboxRoundedIcon
                                            sx={{
                                                fontSize: 70,
                                                color: "#0000003b",
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: 14,
                                                color: "#0d0d254d",
                                            }}
                                        >
                                            Click To Upload Image
                                        </Typography>
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                    </Box>
                                </Button>
                                <TSTextField
                                    placeholder="Image URL"
                                    sx={{ mr: 2 }}
                                    value={newImageUrl}
                                    onChange={(e) =>
                                        setNewImageUrl(e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CloudUploadOutlinedIcon
                                                    sx={{
                                                        color: "#1A65F1",
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                sx={{ mr: 0.5 }}
                                            >
                                                <IconButton
                                                    edge="end"
                                                    disableRipple
                                                    sx={{
                                                        color: "white",
                                                        p: 0.5,
                                                        backgroundColor:
                                                            "#1A65F1",
                                                        borderRadius: "5px",
                                                    }}
                                                    onClick={addNewImage}
                                                >
                                                    <AddBoxRounded />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ImagesCarousel
                                    images={images}
                                    setImagePreview={setImagePreview}
                                    setImagePreviewUrl={setImagePreviewUrl}
                                    removeImage={removeImage}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default SingleRecordDialog;
