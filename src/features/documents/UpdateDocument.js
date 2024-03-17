import { TSMainButton } from "common/CustomComponents";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import parseColumnName from "utils/parseColumns";

import IsoIcon from "@mui/icons-material/Iso";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DocumentTable from "features/documents/DocumentTable";
import { selectDocumentById } from "features/documents/documentSlice";
import { useGetDocumentQuery } from "features/documents/documentSlice";
import { setError, setMessage } from "features/messages/messagesSlice";
import SingleRecordDialog from "features/setups/SingleSetup/SingleRecordDialog";
import { useAddTradeMutation } from "features/trades/tradeAPISlice";

import "./Documents.css";

const options = { year: "numeric", month: "numeric", day: "numeric" };

const UpdateDocument = () => {
    const { documentId } = useParams();
    const [selectedRow, setSelectedRow] = useState({});
    const [open, setOpen] = useState(false);

    let columns = [];
    let contents = [];

    const document = useSelector((state) =>
        selectDocumentById(state, documentId)
    );

    const { data: documentObj } = useGetDocumentQuery({ documentId });

    const [addTrade] = useAddTradeMutation();
    const dispatch = useDispatch();

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

    const handleClose = () => {
        setOpen(false);
        setSelectedRow({});
    };

    const handleAddTrade = async () => {
        try {
            const newTrade = await addTrade({ documentId }).unwrap();
            if (newTrade.success) {
                setSelectedRow(newTrade.trade);
                setOpen(true);
            }
            dispatch(setMessage({ msg: newTrade.msg }));
            dispatch(setError({ error: !newTrade.success }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Box
                sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 25,
                        LineHeight: 30,
                        letterSpacing: "-0.6px",
                    }}
                >
                    {document ? document.name : "Loading"}
                </Typography>
                <TSMainButton
                    variant="contained"
                    onClick={handleAddTrade}
                    sx={{ ml: 1 }}
                    startIcon={<IsoIcon />}
                >
                    Add Trade
                </TSMainButton>
            </Box>

            <Box>
                <DocumentTable
                    setup={documentObj}
                    setOpen={setOpen}
                    setSelectedRow={setSelectedRow}
                />
            </Box>
            <SingleRecordDialog
                open={open}
                onClose={handleClose}
                documentId={documentId}
                rowRecord={selectedRow}
            />
        </Box>
    );
};

export default UpdateDocument;
