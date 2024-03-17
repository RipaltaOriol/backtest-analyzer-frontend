import { TSBackButton, TSMainButton } from "common/CustomComponents";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
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
                            Trade in {template?.asset || "..."}
                        </DialogTitle>
                        <Box>
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
                                onClick={handleSubmit}
                                sx={{
                                    px: 4,
                                    py: 1,
                                }}
                            >
                                Apply
                            </TSMainButton>
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
