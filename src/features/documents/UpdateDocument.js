import ImagesCarousel from "common/ImageCarousel";
import ImagePreviewDialog from "common/ImagePreviewDialog";
import Message from "common/Message";
import TipTapEditor, { useTextEditor } from "common/TipTapEditor";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import parseColumnName from "utils/parseColumns";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";

import DocumentTable from "features/documents/DocumentTable";
import { selectDocumentById } from "features/documents/documentSlice";
import {
    useGetDocumentColumnsQuery,
    useGetDocumentQuery,
    useUpdateDocumentMutation,
} from "features/documents/documentSlice";

import "./Documents.css";

const options = { year: "numeric", month: "numeric", day: "numeric" };

const UpdateBox = styled(Box)({
    width: "auto",
    borderRadius: "6px",
    padding: "16px 24px",
    backgroundColor: "#F6F8F9",
    border: "1px solid #E5E9EB",
});

const AddImageBox = styled(Box)({
    backgroundColor: "#fff",
    border: "1px solid #E5E9EB",
    borderRadius: "6px",
    margin: "20px 0",
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

const UpdateDocument = () => {
    const { documentId } = useParams();
    const [imagePreview, setImagePreview] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [rowValues, setRowValues] = useState({});
    const [selectedRow, setSelectedRow] = useState({});
    const [msg, setMsg] = useState("");
    const [msgStatus, setMsgStatus] = useState(true); // true reflects success, false reflects failure

    let columns = [];
    let contents = [];

    const editor = useTextEditor();

    const [updateDocument] = useUpdateDocumentMutation();

    const document = useSelector((state) =>
        selectDocumentById(state, documentId)
    );

    const { data } = useGetDocumentColumnsQuery({ documentId });

    const { data: documentObj } = useGetDocumentQuery({ documentId });

    if (
        documentObj &&
        documentObj.state &&
        Object.keys(documentObj.state).length !== 0
    ) {
        let setupFields = documentObj.state.fields;

        const dateColumnsList = Object.keys(setupFields).filter((x) =>
            x.startsWith(".d_")
        );

        for (const column in setupFields) {
            // because RKT uses immer under the hood it doesn't allow to pass the column directly
            let isHidden = column === "imgs" || column === "note";
            columns.push({
                title: parseColumnName(column),
                field: column,
                hidden: isHidden,
            });
        }

        let setupData = documentObj.state.data;
        for (const rowIndex in setupData) {
            // TODO: index should not be added manually
            let { ...row } = setupData[rowIndex];
            row.index = rowIndex;
            for (let dateColumn of dateColumnsList) {
                row[dateColumn] = new Date(row[dateColumn]).toLocaleDateString(
                    "en-EN",
                    options
                );
            }
            contents.push(row);
        }
    }

    const handleChange = (key) => (event) => {
        let newValue = event.target.value;
        if (event.target.type === "number") {
            newValue = Number(newValue);
        }

        setRowValues({ ...rowValues, [key]: newValue });
    };

    const handleDateTimeChange = (key, newValue) => {
        try {
            setRowValues({ ...rowValues, [key]: newValue.toISOString() });
        } catch (err) {
            if (err instanceof RangeError) {
                console.log(err);
            }
        }
    };

    const cancelUpdate = () => {
        editor?.commands.setContent("");
        setSelectedRow({});
        setRowValues({});
    };

    const updateEditor = (note) => {
        editor?.commands.setContent(note);
    };

    const handleDocumentUpdate = async (method) => {
        let res = await updateDocument({
            id: documentId,
            method,
            data: { ...rowValues, note: editor?.getHTML() },
        });
        setMsg(res.data.msg);
        setMsgStatus(res.data.success);
    };

    const addNewImage = () => {
        if (rowValues.imgs === undefined) {
            setRowValues({ ...rowValues, imgs: [newImageUrl] });
        } else {
            setRowValues({
                ...rowValues,
                imgs: [...rowValues.imgs, newImageUrl],
            });
        }
        setNewImageUrl("");
    };

    const removeImage = (idx) => {
        var newImages = [...rowValues.imgs];
        newImages.splice(idx, 1);
        setRowValues({
            ...rowValues,
            imgs: newImages,
        });
    };

    function updateDocumentTextField(column, idx) {
        if (column.name !== "note" && column.name !== "imgs") {
            if (column.id.startsWith("col_d")) {
                return (
                    <Grid item>
                        <DateTimeField
                            key={idx}
                            variant="outlined"
                            size="small"
                            value={
                                rowValues[column.id] == null
                                    ? null
                                    : dayjs(rowValues[column.id]) || null
                            }
                            onChange={(newValue) =>
                                handleDateTimeChange(column.id, newValue)
                            }
                            label={column.name}
                            step={0.5}
                        />
                    </Grid>
                );
            } else {
                return (
                    <Grid item>
                        <TextField
                            key={idx}
                            label={column.name}
                            type={column.type}
                            variant="outlined"
                            value={
                                rowValues?.[column.id] === 0
                                    ? 0
                                    : rowValues[column.id] || ""
                            }
                            onChange={handleChange(column.id)}
                            size="small"
                            step={0.5}
                        />
                    </Grid>
                );
            }
        } else {
            return null;
        }
    }

    return (
        <Box sx={{ display: "block", width: "calc(100% - 200px)" }}>
            {/* Image Preview Component */}
            <ImagePreviewDialog
                url={imagePreviewUrl}
                open={imagePreview}
                close={() => setImagePreview(false)}
            />
            <Box>
                <Typography variant="h5">
                    {document ? document.name : "Loading"}
                </Typography>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            {msg && (
                <Message
                    message={msg}
                    setMessage={setMsg}
                    isError={!msgStatus}
                    sx={{ my: 1 }}
                />
            )}

            {/* Buttons to add go here */}
            <UpdateBox
                sx={{
                    mb: 3,
                }}
            >
                <Box>
                    <Typography
                        sx={{ mb: 2, color: "#4094F7", fontWeight: 600 }}
                    >
                        {Object.keys(selectedRow).length === 0
                            ? "New Item"
                            : "Update Item"}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                component="form"
                                noValidate
                                autoComplete="off"
                            >
                                {/* have one for ID which cannot be changed */}
                                {data
                                    ? data.map((column, idx) => {
                                          return updateDocumentTextField(
                                              column,
                                              idx
                                          );
                                      })
                                    : null}
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <TipTapEditor editor={editor} />
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
                            <ImagesCarousel
                                images={rowValues?.imgs || []}
                                setImagePreview={setImagePreview}
                                setImagePreviewUrl={setImagePreviewUrl}
                                removeImage={removeImage}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleDocumentUpdate(
                                    Object.keys(selectedRow).length === 0
                                        ? "add"
                                        : "update"
                                );
                            }}
                        >
                            {Object.keys(selectedRow).length === 0
                                ? "Add"
                                : "Update"}
                        </Button>

                        <Button
                            color="secondary"
                            sx={{ ml: 1 }}
                            onClick={() => cancelUpdate()}
                        >
                            Cancel
                        </Button>
                        {Object.keys(selectedRow).length !== 0 && (
                            <Button
                                color="secondary"
                                sx={{
                                    ml: 1,
                                    color: "#F76659",
                                    "&:hover": { color: "#F76659" },
                                }}
                                onClick={() => handleDocumentUpdate("delete")}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </Box>
            </UpdateBox>
            <Box>
                <DocumentTable
                    setup={documentObj}
                    setSelectedRow={setSelectedRow}
                    setRowValues={setRowValues}
                    updateEditor={updateEditor}
                />
            </Box>
        </Box>
    );
};

export default UpdateDocument;
