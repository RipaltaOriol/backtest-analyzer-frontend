import MaterialTable from "material-table";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { selectDocumentById } from "features/documents/documentSlice";
import {
    useGetDocumentColumnsQuery,
    useGetDocumentQuery,
    useUpdateDocumentMutation,
} from "features/documents/documentSlice";

import tableIcons from "../../assets/utils/IconProvider";

const options = { year: "numeric", month: "numeric", day: "numeric" };

const UpdateDocument = () => {
    const { documentId } = useParams();
    const [rowValues, setRowValues] = useState({});
    const [selectedRow, setSelectedRow] = useState({});

    let columns = [];
    let contents = [];

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
        documentObj.state.schema.fields.forEach((header) => {
            // because RKT uses immer under the hood it doesn't allow to pass the column directly
            columns.push({
                title: header.title,
                field: header.field,
                hidden: header.title === "index",
            });
        });

        documentObj.state.data.forEach((row, idx) => {
            // TODO: index should not be added manually
            let { index, ...deepRow } = row;
            deepRow.index = idx;
            // maybe this could be done in the backend
            deepRow[".d"] = new Date(deepRow[".d"]).toLocaleDateString(
                "en-EN",
                options
            );
            contents.push(deepRow);
        });
    }

    const handleChange = (key) => (event) => {
        const x = "Hello";
        let newValue = event.target.value;
        if (event.target.type === "number") {
            newValue = Number(newValue);
        }

        setRowValues({ ...rowValues, [key]: newValue });
    };

    const cancelUpdate = () => {
        setSelectedRow({});
        setRowValues({});
    };

    const handleDocumentUpdate = async (method) => {
        updateDocument({ id: documentId, method, data: rowValues });
    };

    return (
        <Box sx={{ display: "block", width: "calc(100% - 200px)" }}>
            <Box>
                <Typography variant="h5">
                    {document ? document.name : "Loading"}
                </Typography>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            {/* Buttons to add go here */}
            <Box sx={{ display: "flex", width: "100%", mb: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {Object.keys(selectedRow).length === 0
                            ? "New Item"
                            : "Update Item"}
                    </Typography>
                    <Box>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            {/* Have one for ID which cannot be changed */}
                            {data
                                ? data.map((column, idx) => (
                                      <Grid item>
                                          <TextField
                                              key={idx}
                                              label={column.name}
                                              type={column.type}
                                              variant="outlined"
                                              value={
                                                  rowValues?.[column.id] === 0
                                                      ? 0
                                                      : rowValues[column.id] ||
                                                        ""
                                              }
                                              onChange={handleChange(column.id)}
                                              size="small"
                                              step={0.5}
                                          />
                                      </Grid>
                                  ))
                                : null}
                        </Grid>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}
                >
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
                    {Object.keys(selectedRow).length !== 0 && (
                        <Button
                            variant="contained"
                            sx={{ mt: 1 }}
                            onClick={() => handleDocumentUpdate("delete")}
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        sx={{ mt: 1 }}
                        onClick={() => cancelUpdate()}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
            <Box>
                {documentObj ? (
                    <MaterialTable
                        title={<Typography>Data</Typography>}
                        columns={columns}
                        data={contents}
                        onRowClick={(evt, selectedRow) => {
                            setSelectedRow(selectedRow);
                            setRowValues(selectedRow);
                        }}
                        options={{
                            padding: "dense",
                            pageSize: 10,
                            rowStyle: (rowData) => ({
                                fontSize: 14,
                                backgroundColor:
                                    selectedRow?.index === rowData?.index
                                        ? "#D7EDFF"
                                        : "#fff",
                            }),
                            headerStyle: {
                                whiteSpace: "nowrap",
                            },
                        }}
                        icons={tableIcons}
                    />
                ) : (
                    console.error("nothing")
                )}
            </Box>
            {/* Table goes here */}
        </Box>
    );
};

export default UpdateDocument;
