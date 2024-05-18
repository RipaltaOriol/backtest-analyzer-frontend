import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { previewAccountTableData } from "assets/utils/previewAccountTableData";
import {
    TSAddButton,
    TSMenuItem,
    TSSelect,
    TSTextField,
} from "common/CustomComponents";
import Message from "common/Message";
import { ValidationError } from "errors";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import "features/documents/TSTableStyle.css";
import {
    useGetDocumentColumnsQuery,
    useUpdateAccountColumnsMutation,
} from "features/documents/documentSlice";
import { selectDocumentById } from "features/documents/documentSlice";

const columnOptions = {
    Metric: "col_m_",
    Date: "col_d_",
    "RR Result": "col_r_",
    "Percent Result": "col_p_",
    "Value Result": "col_v_",
};

const invalidFields = [
    "col_p",
    "col_o",
    "col_c",
    "col_rr",
    "col_sl",
    "col_tp",
    "col_t",
    "col_d",
    "imgs",
    "note",
    "#",
];

const checkboxMapping = {
    col_p: "Pair",
    col_o: "Open",
    col_c: "Close",
    col_rr: "Risk Reward",
    col_sl: "Stop Loss",
    col_tp: "Take Profit",
    col_t: "Timeframe",
    col_d: "Direction",
};

// Simplified state reducer for columns
const columnsReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_COLUMN":
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    ...action.newAttributes,
                    action:
                        state[action.id]?.action ||
                        action.newAttributes?.action ||
                        "edit",
                },
            };
        case "REMOVE_COLUMN":
            const { [action.id]: _, ...remainingColumns } = state;
            return remainingColumns;
        case "SET_COLUMNS":
            return action.columns;
        default:
            return state;
    }
};

const BoxContainer = styled(Box)({
    backgroundColor: "#F6F8F9",
    border: "1px solid #E5E9EB",
    borderRadius: "6px",
    padding: "16px",
});

const ModifyAccount = () => {
    const { documentId } = useParams();
    const document = useSelector((state) =>
        selectDocumentById(state, documentId)
    );
    const { data: accountColumns } = useGetDocumentColumnsQuery(
        {
            documentId,
        },
        { skip: !documentId }
    );

    const columnHelper = useMemo(() => createColumnHelper(), []);

    // const [columns, setColumns] = useState(() => []);
    const [columns, dispatchColumns] = useReducer(columnsReducer, {});
    const [tableColumns, setTableColumns] = useState(() => []);
    const [deletedColumns, setDeleteColumns] = useState(() => []);
    const [tableData, setTableData] = useState(() => []);
    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(true);

    const [updateAccountColumns] = useUpdateAccountColumnsMutation();

    // Generates column structure needed to create page components
    const generateColumnData = useCallback(() => {
        if (accountColumns) {
            const componentColumns = Object.entries(accountColumns).reduce(
                (acc, [name, props]) => {
                    acc[name] = { ...props };
                    return acc;
                },
                {}
            );
            dispatchColumns({ type: "SET_COLUMNS", columns: componentColumns });

            const newTableColumns = Object.entries(accountColumns)
                .filter(([name]) => !["#", "note", "imgs"].includes(name))
                .map(([name, props]) =>
                    columnHelper.accessor(props.column, {
                        header: props.name,
                        id: name,
                    })
                );

            setTableColumns(newTableColumns);
        }
    }, [accountColumns, columnHelper]);

    useEffect(() => {
        generateColumnData();
    }, [generateColumnData]);

    useEffect(() => {
        setTableData(previewAccountTableData);
    }, []);

    // Update or remove columns and their mapping
    // TODO: update action should also trigger an update of the sample table data
    const updateColumn = useCallback((id, newAttributes) => {
        dispatchColumns({ type: "UPDATE_COLUMN", id, newAttributes });
    }, []);

    // Generalized function to update the external table column mapping
    const updateTableColumnMapping = useCallback((id, newKey, newValue) => {
        setTableColumns((prev) =>
            prev.map((column) =>
                column.id === id ? { ...column, [newKey]: newValue } : column
            )
        );
    }, []);

    const handleCheckbox = useCallback(
        (id) => {
            if (columns.hasOwnProperty(id)) {
                dispatchColumns({ type: "REMOVE_COLUMN", id });
                setTableColumns((prev) =>
                    prev.filter((column) => column.id !== id)
                );
                if (accountColumns?.hasOwnProperty(id))
                    setDeleteColumns((prev) => [...prev, id]);
            } else {
                const newColumn = {
                    name: "",
                    column: id,
                    action: accountColumns?.hasOwnProperty(id) ? null : "add",
                };

                updateColumn(id, newColumn); // TODO: not sure if this will work
                setDeleteColumns((prev) =>
                    prev.filter((column) => column !== id)
                );
                setTableColumns((prev) => [
                    ...prev,
                    columnHelper.accessor(id, {
                        header: checkboxMapping[id],
                        id,
                    }),
                ]);
            }
        },
        [columns, accountColumns, columnHelper, updateColumn]
    );

    // Handle change to change column type
    const handleChangeType = useCallback(
        (event, id) => {
            const newValue = event.target.value;
            updateColumn(id, { column: newValue });
            updateTableColumnMapping(id, "accessorKey", newValue);
        },
        [updateColumn, updateTableColumnMapping]
    );

    // Handle change column data type
    const handleChangeDataType = useCallback(
        (event, id) => {
            const newValue = event.target.value;
            updateColumn(id, { type: newValue });
        },
        [updateColumn]
    );

    // Handle change column name
    const handleChangeName = useCallback(
        (event, id) => {
            const newNameValue = event.target.value;
            updateColumn(id, { name: newNameValue });
            updateTableColumnMapping(id, "header", newNameValue);
        },
        [updateColumn, updateTableColumnMapping]
    );

    // Handle delete column
    const handleDeleteColumn = useCallback(
        (id) => {
            dispatchColumns({ type: "REMOVE_COLUMN", id });
            setTableColumns((prev) =>
                prev.filter((column) => column.id !== id)
            );
            if (accountColumns?.hasOwnProperty(id))
                setDeleteColumns((prev) => [...prev, id]);
        },
        [accountColumns]
    );

    // Handle add a new column
    const addNewColumn = useCallback(() => {
        const id = uuidv4();
        const newColumn = {
            name: "",
            column: "col_d_",
            action: "add",
            type: "object",
        };
        updateColumn(id, newColumn);
        setTableColumns((prev) => [
            ...prev,
            columnHelper.accessor("col_d_", { header: "", id }),
        ]);
    }, [columnHelper, updateColumn]);

    const submitModifiedColumns = async () => {
        try {
            const addedColumns = [];
            const editedColumns = [];

            Object.entries(columns).forEach(([id, column]) => {
                if (
                    !column.name &&
                    !checkboxMapping.hasOwnProperty(column.column)
                )
                    throw new ValidationError("Column name cannot be empty.");

                if (column.hasOwnProperty("action")) {
                    if (column.action === "add")
                        addedColumns.push({
                            name: column.name,
                            type: column.type || null,
                            column: column.column,
                        });
                    if (column.action === "edit")
                        // TODO: check if edit is needed
                        editedColumns.push({
                            prev_name: id,
                            new_name: column.column + column.name,
                            type: column.type || null,
                            column: column.column,
                        });
                }
            });

            const actions = {
                add: addedColumns,
                edit: editedColumns,
                delete: deletedColumns,
            };
            const response = await updateAccountColumns({
                id: documentId,
                columns: actions,
            });
            setIsMessageError(!response.data.success);
            setMessage(response.data.msg);
            setDeleteColumns([]);
            generateColumnData();
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again.";
            if (error instanceof ValidationError) errorMessage = error.message;
            setIsMessageError(true);
            setMessage(errorMessage);
        }
    };

    const renderCheckboxes = useMemo(() => {
        return Object.entries(checkboxMapping).map(([id, label]) => (
            <FormControlLabel
                key={id}
                checked={columns.hasOwnProperty(id)}
                onChange={() => handleCheckbox(id)}
                control={<Checkbox disableRipple />}
                label={label}
                sx={{ mr: 5 }}
            />
        ));
    }, [columns, handleCheckbox]);

    const renderFields = useMemo(() => {
        // Generate elements for account columns
        return Object.entries(columns)
            .filter(([id]) => !invalidFields.includes(id))
            .map(([id, column]) => (
                <Box
                    key={id}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                        p: 1,
                        borderRadius: "10px",
                        backgroundColor: "rgba(13, 13, 37, 0.02)",
                    }}
                >
                    <Box sx={{ width: "100%", mr: 2 }}>
                        <InputLabel
                            id="columnType"
                            shrink={false}
                            sx={{ mb: 1 }}
                        >
                            Column Type
                        </InputLabel>
                        <TSSelect
                            id="columnType"
                            value={column.column}
                            onChange={(e) => handleChangeType(e, id)}
                        >
                            {Object.entries(columnOptions).map(
                                ([name, key]) => (
                                    <TSMenuItem key={key} value={key}>
                                        {name}
                                    </TSMenuItem>
                                )
                            )}
                        </TSSelect>
                    </Box>

                    <Box sx={{ width: "100%", mr: 2 }}>
                        <InputLabel
                            shrink={false}
                            htmlFor={"columnName"}
                            sx={{ mb: 1 }}
                        >
                            Column Name
                        </InputLabel>
                        <TSTextField
                            id="columnName"
                            value={column.name}
                            onChange={(e) => handleChangeName(e, id)}
                        />
                    </Box>

                    <Box sx={{ width: "100%", mr: 2 }}>
                        {column.column.startsWith("col_m_") && (
                            <>
                                <InputLabel
                                    shrink={false}
                                    htmlFor={"columnType"}
                                    sx={{ mb: 1 }}
                                >
                                    Data Type
                                </InputLabel>
                                <TSSelect
                                    id="columnType"
                                    value={column.type}
                                    onChange={(e) =>
                                        handleChangeDataType(e, id)
                                    }
                                >
                                    <TSMenuItem value="object">Text</TSMenuItem>
                                    <TSMenuItem value="float64">
                                        Number
                                    </TSMenuItem>
                                </TSSelect>
                            </>
                        )}
                    </Box>

                    <IconButton
                        onClick={() => handleDeleteColumn(id)}
                        sx={{
                            backgroundColor: "white",
                            color: "#FF4D5E",
                            border: "1px solid rgba(13, 13, 37, 0.08)",
                        }}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                </Box>
            ));
    }, [
        columns,
        handleChangeDataType,
        handleChangeName,
        handleChangeType,
        handleDeleteColumn,
    ]);

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 25,
                        LineHeight: 30,
                        letterSpacing: "-0.6px",
                    }}
                >
                    Modify Account
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
                        color="secondary"
                        to="/files"
                        component={Link}
                        sx={{
                            backgroundColor: "#dbdbde",
                            px: 2,
                            py: 1,
                            borderRadius: "10px",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={submitModifiedColumns}
                        sx={{
                            ml: 1,
                            backgroundColor: "#0E73F6",
                            px: 2,
                            py: 1,
                            borderRadius: "10px",
                        }}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
            {message && (
                <Message
                    message={message}
                    setMessage={setMessage}
                    isError={isMessageError}
                    sx={{ mb: 2 }}
                />
            )}
            <BoxContainer>
                <Box sx={{ mb: 2 }}>
                    <InputLabel
                        shrink={false}
                        htmlFor={"accountName"}
                        sx={{ mb: 1 }}
                    >
                        Account Name
                    </InputLabel>
                    <TSTextField
                        id="accountName"
                        variant="outlined"
                        value={document?.name || ""}
                        disabled
                        sx={{
                            width: "100%",
                            border: "null",
                            backgroundColor: "white",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    // targets the <fieldset> element
                                    borderRadius: "5px",
                                },
                                // targets the root of the outlined input
                                "&:hover fieldset": {
                                    borderColor: "gray", // border color on hover
                                },
                                "&.Mui-focused fieldset": {
                                    // targets the <fieldset> when the input is focused
                                    borderColor: "#0e73f6", // border color on focus
                                    borderWidth: "1px", // border width on focus
                                },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            fontSize: "20px",
                        }}
                        gutterBottom
                    >
                        Fields
                    </Typography>
                    <Box>
                        {renderFields}
                        <TSAddButton variant="contained" onClick={addNewColumn}>
                            Add New
                        </TSAddButton>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {renderCheckboxes}
                </Box>
                <Box sx={{ mt: 3 }}>
                    {/* TODO: OPTIMIZE THIS */}
                    {tableColumns.length > 0 && (
                        <div className="ts-table-container">
                            <table>
                                <thead>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <tr key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => (
                                                        <th key={header.id}>
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header
                                                                          .column
                                                                          .columnDef
                                                                          .header,
                                                                      header.getContext()
                                                                  )}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                </thead>
                                <tbody>
                                    {table
                                        .getRowModel()
                                        .rows.map((row, idx) => (
                                            <tr key={idx}>
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <td key={cell.id}>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Box>
            </BoxContainer>
        </Box>
    );
};

export default ModifyAccount;
