import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Close from "./PPTTemplate/Close";
import Execution from "./PPTTemplate/Execution";
import Fundamental from "./PPTTemplate/Fundamental";
import Risk from "./PPTTemplate/Risk";
import SetupAndValues from "./PPTTemplate/SetupAndValues";
import Technical from "./PPTTemplate/Technical";
import "./Templates.css";
import { useGetRowQuery, usePutRowMutation } from "./templatesSlice";

const PPTTemplate = ({ documentId, rowId, open, onClose }) => {
    const { data: row } = useGetRowQuery(
        { documentId, rowId },
        { skip: !(documentId && rowId) }
    );

    const [putSetupRow] = usePutRowMutation();
    const [template, setTemplate] = useState(row);

    useEffect(() => {
        if (row?.date_executed) {
            let dateFormated = dayjs(row.date_executed).toISOString();

            setTemplate({
                ...row,
                date_executed: dateFormated,
            });
        } else {
            setTemplate(row);
        }
    }, [row]);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async () => {
        await putSetupRow({
            documentId,
            rowId: row.row_id,
            template,
        });
        onClose();
    };

    const onChangeFieldArray = useCallback(
        (index, name, propName, value) => {
            const newField = template[name].map(
                (
                    item,
                    idx // Array.protptype.map creates new array
                ) =>
                    idx === index // TODO: change finding the position
                        ? { ...item, [propName]: value }
                        : item
            );
            setTemplate((prevState) => ({
                ...prevState, // shallow copy all previous state
                [name]: newField, // update specific key/value
            }));
        },
        [template]
    );

    const onChangeField = useCallback((name, value) => {
        setTemplate((prevState) => ({
            ...prevState, // shallow copy all previous state
            [name]: value, // update specific key/value
        }));
    }, []);

    const onChangeDateField = useCallback((name, value) => {
        try {
            const newValue = value ? value.toISOString() : null;
            setTemplate((prevState) => ({
                ...prevState, // shallow copy all previous state
                [name]: newValue, // update specific key/value
            }));
        } catch (err) {
            if (err instanceof RangeError) {
                console.log(err);
            }
        }
    }, []);

    return (
        <Box>
            {template && (
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
                            Trade in {template?.asset || "..."}
                        </DialogTitle>
                        <Box>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mr: 1.5 }}
                            >
                                Apply
                            </Button>
                            <Button color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                    <DialogContent sx={{ p: 4, pt: 1.5 }}>
                        {/* Fundamental */}
                        <Fundamental
                            template={template}
                            onChangeField={onChangeField}
                        />
                        {/* Setup & Values */}
                        <SetupAndValues
                            template={template}
                            onChangeField={onChangeField}
                            onChangeFieldArray={onChangeFieldArray}
                        />
                        {/* Technical Analysis */}
                        <Technical
                            template={template}
                            onChangeField={onChangeField}
                        />
                        {/* Risk */}
                        <Risk
                            template={template}
                            onChangeField={onChangeField}
                            onChangeFieldArray={onChangeFieldArray}
                        />
                        {/* Execution & Management */}
                        <Execution
                            template={template}
                            onChangeField={onChangeField}
                            onChangeDateField={onChangeDateField}
                        />
                        {/* Close */}
                        <Close
                            template={template}
                            onChangeField={onChangeField}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    );
};

export default PPTTemplate;
