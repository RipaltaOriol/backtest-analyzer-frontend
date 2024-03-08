import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { previewAccountTableData } from "assets/utils/previewAccountTableData";
import { TSMenuItem } from "common/CustomComponents";
import Message from "common/Message";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { AddBoxRounded } from "@mui/icons-material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
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

const validCheckboxes = [
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

const forbiddenColumns = ["#", "note", "imgs"];

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

    const { data: accountColumns } = useGetDocumentColumnsQuery({
        documentId,
    });

    const columnHelper = useMemo(() => createColumnHelper(), []);

    const [updateAccountColumns] = useUpdateAccountColumnsMutation();

    const generateColumnData = useCallback(() => {
        if (accountColumns !== undefined) {
            setColumns(
                accountColumns.reduce((acc, column) => {
                    const adjustedColumn = {
                        ...column,
                        columnType: column.id.substring(0, 6),
                        type: column.type === "number" ? "float64" : "object",
                    };
                    acc[column.id] = adjustedColumn; // Use the id as the key and the entire object as the value

                    return acc;
                }, {})
            );
            setCurrentColumns(
                accountColumns.reduce((acc, column) => {
                    if (!forbiddenColumns.includes(column.id)) {
                        acc.push(column.id);
                    }
                    return acc;
                }, [])
            );
            setTableColumns(
                accountColumns.reduce((acc, column) => {
                    if (!forbiddenColumns.includes(column.id)) {
                        acc.push(
                            columnHelper.accessor(column.id.substring(0, 6), {
                                header: column.name,
                                id: column.id,
                            })
                        );
                    }
                    return acc;
                }, [])
            );
        }
    }, [accountColumns, columnHelper]);

    useEffect(() => {
        generateColumnData();
    }, [generateColumnData]);

    const [columns, setColumns] = useState(() => []);
    const [tableColumns, setTableColumns] = useState(() => []);
    const [deletedColumns, setDeleteColumns] = useState(() => []);
    // TODO this should be optimized and removed
    const [currentColumns, setCurrentColumns] = useState(() => []);
    const [tableData, setTableData] = useState(() => []);
    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(true);

    const handleCheckbox = (id) => {
        if (columns.hasOwnProperty(id)) {
            const { [id]: ommited, ...newColumns } = columns;
            // set the new object as the new state
            setColumns(newColumns);
            setTableColumns(tableColumns.filter((column) => column.id !== id));
            // add the prop to the deleted list
            if (currentColumns.includes(id)) {
                setDeleteColumns([...deletedColumns, id]);
            }
        } else {
            setColumns({
                ...columns,
                [id]: {
                    columnType: id,
                    action: !currentColumns.includes(id) ? "add" : null,
                    type: "object", // placeholder to avoid backend errors
                },
            });
            // remove from the delete list if it's there
            setDeleteColumns(deletedColumns.filter((column) => column !== id));

            setTableColumns([
                ...tableColumns,
                columnHelper.accessor(id, {
                    header: checkboxMapping[id],
                    id: id,
                }),
            ]);
        }
    };

    useEffect(() => {
        setTableData(previewAccountTableData);
    }, []);

    const handleChangeType = (event, id) => {
        const columnSate = columns[id];
        setColumns({
            ...columns,
            [id]: {
                ...columnSate,
                columnType: event.target.value,
                action: columnSate["action"] ? columnSate["action"] : "edit",
            },
        });
        setTableColumns(
            tableColumns.map((column) => {
                if (column.id === id) {
                    return { ...column, accessorKey: event.target.value };
                }
                return column;
            })
        );
    };

    const handleChangeDataType = (event, id) => {
        // set new object action to edit if its not add
        const columnSate = columns[id];
        setColumns({
            ...columns,
            [id]: {
                ...columnSate,
                type: event.target.value,
                action: columnSate["action"] ? columnSate["action"] : "edit",
            },
        });
    };

    const handleChangeName = (event, id) => {
        const columnSate = columns[id];
        setColumns({
            ...columns,
            [id]: {
                ...columnSate,
                name: event.target.value,
                action: columnSate["action"] ? columnSate["action"] : "edit",
            },
        });
        setTableColumns(
            tableColumns.map((column) => {
                if (column.id === id) {
                    return { ...column, header: event.target.value };
                }
                return column;
            })
        );
    };

    const handleDeleteColumn = (id) => {
        const { [id]: ommited, ...newColumns } = columns;
        // Set the new object as the new state
        setColumns(newColumns);
        setTableColumns(tableColumns.filter((column) => column.id !== id));
        if (currentColumns.includes(id)) {
            setDeleteColumns([...deletedColumns, id]);
        }
    };

    const addNewColumn = () => {
        const id = uuidv4();
        setColumns({
            ...columns,
            [id]: {
                name: "",
                columnType: "col_d_",
                action: "add",
                type: "object",
            },
        });

        setTableColumns([
            ...tableColumns,
            columnHelper.accessor("col_d_", {
                header: "",
                id: id,
            }),
        ]);
    };

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleModifyAccount = async () => {
        // TODO: missing control checks
        let modifiedColumns = Object.entries(columns).reduce(
            (acc, [id, column]) => {
                if (column.hasOwnProperty("action")) {
                    if (column.action === "add") {
                        acc[String(column.columnType + (column.name || ""))] = {
                            action: "add",
                            type: column.type ? column.type : null,
                        };
                    }
                    if (column.action === "edit") {
                        acc[id] = {
                            action: "edit",
                            type: column.type ? column.type : null,
                            new_column: column.columnType + column.name,
                        };
                    }
                }
                return acc;
            },
            {}
        );

        // column_name: {....} =>
        // action!
        // type (has to be a python dype)
        // new type (is the type. for metric)

        // new name
        modifiedColumns["to_delete"] = deletedColumns;
        console.log(modifiedColumns);
        const response = await updateAccountColumns({
            id: documentId,
            columns: modifiedColumns,
        });
        setIsMessageError(!response.data.success);
        setMessage(response.data.msg);
        setDeleteColumns([]);
        generateColumnData();
    };

    const generateAccountColumns = () => {
        return Object.entries(columns).map(([id, column]) => {
            if (!validCheckboxes.includes(id)) {
                return (
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
                            <Select
                                id="columnType"
                                IconComponent={KeyboardArrowDownRoundedIcon}
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                    "&.MuiOutlinedInput-root:hover fieldset": {
                                        borderColor: "grey",
                                    },

                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "#0e73f6",
                                            borderWidth: "1px",
                                        },
                                }}
                                value={column.columnType}
                                size="small"
                                onChange={(e) => handleChangeType(e, id)}
                            >
                                {Object.entries(columnOptions).map(
                                    ([name, key]) => (
                                        <TSMenuItem key={key} value={key}>
                                            {name}
                                        </TSMenuItem>
                                    )
                                )}
                            </Select>
                        </Box>

                        <Box sx={{ width: "100%", mr: 2 }}>
                            <InputLabel
                                shrink={false}
                                htmlFor={"columnName"}
                                sx={{ mb: 1 }}
                            >
                                Column Name
                            </InputLabel>
                            <TextField
                                id="columnName"
                                variant="outlined"
                                size="small"
                                value={column.name}
                                onChange={(e) => handleChangeName(e, id)}
                                sx={{
                                    border: "null",
                                    width: "100%",
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

                        <Box sx={{ width: "100%", mr: 2 }}>
                            {column.columnType === "col_m_" && (
                                <>
                                    <InputLabel
                                        shrink={false}
                                        htmlFor={"columnType"}
                                        sx={{ mb: 1 }}
                                    >
                                        Data Type
                                    </InputLabel>
                                    <Select
                                        id="columnType"
                                        IconComponent={
                                            KeyboardArrowDownRoundedIcon
                                        }
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "white",
                                            borderRadius: "5px",
                                            "&.MuiOutlinedInput-root:hover fieldset":
                                                {
                                                    borderColor: "grey",
                                                },

                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor: "#0e73f6",
                                                    borderWidth: "1px",
                                                },
                                        }}
                                        value={column.type}
                                        size="small"
                                        onChange={(e) =>
                                            handleChangeDataType(e, id)
                                        }
                                    >
                                        <TSMenuItem value="object">
                                            Text
                                        </TSMenuItem>
                                        <TSMenuItem value="float64">
                                            Number
                                        </TSMenuItem>
                                    </Select>
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
                );
            }
            return null;
        });
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography
                    sx={{
                        fontSize: 22,
                        fontWeight: 600,
                        lineHeight: "29px",
                        letterSpacing: "-0.03em",
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
                        onClick={handleModifyAccount}
                        sx={{
                            ml: 1,
                            backgroundColor: "#0E73F6",
                            px: 2,
                            py: 1,
                            borderRadius: "10px",
                        }}
                        // onClick={handleCreateAccount}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ mt: 2, mb: 3 }} />
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
                    <TextField
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
                        {generateAccountColumns()}
                        <Button
                            variant="contained"
                            disableRipple
                            disableElevation
                            disableFocusRipple
                            onClick={addNewColumn}
                            startIcon={<AddBoxRounded />}
                            sx={{
                                width: "100%",
                                py: 1,
                                backgroundColor: "#e0e8f8",
                                color: "#1A65F1",
                                fontSize: "15px",
                                fontWeight: 600,
                                "&:hover": {
                                    color: "#1A65F1",
                                    backgroundColor: "#e0e8f8",
                                },
                            }}
                        >
                            Add New
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_p")}
                        onChange={() => handleCheckbox("col_p")}
                        control={<Checkbox disableRipple />}
                        label="Pair"
                    />
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_o")}
                        onChange={() => handleCheckbox("col_o")}
                        control={<Checkbox disableRipple />}
                        label="Open Price"
                    />
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_c")}
                        onChange={() => handleCheckbox("col_c")}
                        control={<Checkbox disableRipple />}
                        label="Close Price"
                    />
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_rr")}
                        onChange={() => handleCheckbox("col_rr")}
                        control={<Checkbox disableRipple />}
                        label="Risk Reward Ratio"
                    />
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_sl")}
                        onChange={() => handleCheckbox("col_sl")}
                        control={<Checkbox disableRipple />}
                        label="Stop Loss"
                    />
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_tp")}
                        onChange={() => handleCheckbox("col_tp")}
                        control={<Checkbox disableRipple />}
                        label="Take Profit"
                    />
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_t")}
                        onChange={() => handleCheckbox("col_t")}
                        control={<Checkbox disableRipple />}
                        label="Timeframe"
                    />
                    <FormControlLabel
                        sx={{ mr: 5 }}
                        checked={columns.hasOwnProperty("col_d")}
                        onChange={() => handleCheckbox("col_d")}
                        control={<Checkbox disableRipple />}
                        label="Direction"
                    />
                </Box>
                <Box sx={{ mt: 3 }}>
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
