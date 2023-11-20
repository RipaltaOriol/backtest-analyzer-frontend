import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { previewAccountTableData } from "assets/utils/previewAccountTableData";
import { CustomMenuItem } from "common/CustomComponents";
import Message from "common/Message";
import { useState } from "react";
import { Link } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";
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

import { usePostDocumentMutation } from "features/documents/documentSlice";

const BoxContainer = styled(Box)({
    backgroundColor: "#F6F8F9",
    border: "1px solid #E5E9EB",
    borderRadius: "6px",
    padding: "16px",
});

const FieldsBox = styled(Box)({
    border: "1px solid #0000003b",
    borderRadius: "4px",
    padding: "4px 8px",
});

const columnOptions = {
    Metric: "col_m_",
    Date: "col_d_",
    "RR Result": "col_r_",
    "Percent Result": "col_p_",
    "Value Result": "col_v_",
};

const checkboxOptions = {
    col_p: "Pair",
    col_o: "Open Price",
    col_c: "Close Price",
    col_rr: "Risk Reward Ratio",
    col_sl: "Stop Loss",
    col_tp: "Take Profit",
    col_t: "Timeframe",
    col_d: "Direction",
};

const columnHelper = createColumnHelper();

const CreateDocument = () => {
    const [account, setAccount] = useState("");
    const [fields, setFields] = useState([]);
    const [msg, setMsg] = useState("");
    const [msgError, setMsgError] = useState(true);
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [columnDTypes, setColumnDTypes] = useState("object");
    const [checkbox, setCheckbox] = useState({
        col_p: false,
        col_o: false,
        col_c: false,
        col_rr: false,
        col_sl: false,
        col_tp: false,
        col_t: false,
        col_d: false,
    });

    const [columns, setColumns] = useState(() => []);
    const [postDocument] = usePostDocumentMutation();

    const handleCheckbox = (value) => {
        const state = !checkbox[value];
        setCheckbox({ ...checkbox, [value]: state });
        if (state) {
            setColumns([
                ...columns,
                columnHelper.accessor(value, {
                    header: checkboxOptions[value],
                }),
            ]);
        } else {
            setColumns(
                columns.filter((columns) => columns.accessorKey !== value)
            );
        }
    };

    const table = useReactTable({
        data: previewAccountTableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleAddField = () => {
        // check if valeus are emtpy
        if (!name || !type) return;

        // check if column name already exists
        if (fields.some((e) => e.name === name)) {
            setMsgError(true);
            setMsg(
                "This column already exists. Change the column name and retry."
            );
            return;
        }
        setFields([
            ...fields,
            { name, type, value: columnOptions[type], dtype: columnDTypes },
        ]);
        setColumns([
            ...columns,
            columnHelper.accessor(columnOptions[type], {
                header: name,
            }),
        ]);
        handleCancelField();
        setMsg("");
    };

    const handleRemoveField = (fieldName) => {
        setFields(fields.filter((field) => field.name !== fieldName));
        setColumns(columns.filter((column) => column.header !== fieldName));
    };

    const handleCancelField = () => {
        setType("");
        setName("");
    };

    const handleCreateAccount = async () => {
        if (!account) {
            setMsgError(true);
            setMsg("Account name is empty. Give your account a name.");
            return;
        }
        if (!columns.length) {
            setMsgError(true);
            setMsg("Account is empty. Add a field to continue.");
            return;
        }
        const response = await postDocument({
            name: account,
            fields,
            checkbox,
        });
        setMsgError(!response.data.success);
        setMsg(response.data.msg);
    };

    return (
        <Box>
            <Typography variant="h5">Create Account</Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            {msg && (
                <Message
                    message={msg}
                    setMessage={setMsg}
                    isError={msgError}
                    sx={{ mb: 2 }}
                />
            )}
            <BoxContainer>
                <Box display="flex" justifyContent="space-between">
                    <TextField
                        label="Account Name"
                        variant="standard"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        sx={{
                            width: "500px",
                            fontSize: "24px",
                            "&.Mui-focused .MuiInput-input": {
                                borderWidth: "1px",
                            },
                            "& .MuiInput-underline:before": {
                                borderColor: "#0e73f6",
                            },
                            "& .MuiInput-underline:hover": {
                                borderColor: "#0e73f6",
                                borderWidth: "1px",
                            },
                            "& .MuiInput-underline:hover:before": {
                                borderColor: "#0e73f6",
                                borderWidth: "1px",
                            },
                            "& .MuiInput-input": {
                                fontSize: "18px",
                            },
                        }}
                    />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={handleCreateAccount}
                        >
                            Create
                        </Button>
                        <Button color="secondary" to="/files" component={Link}>
                            Back
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Fields:
                    </Typography>
                    <Box display="flex">
                        {fields.map((field) => {
                            return (
                                <FieldsBox
                                    key={field.name}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1,
                                        mr: 1.5,
                                    }}
                                >
                                    <Typography
                                        sx={{ mr: 1.5, fontWeight: "500" }}
                                    >
                                        {field.type}
                                    </Typography>
                                    <Typography sx={{ mr: 2 }}>
                                        {field.name}
                                    </Typography>
                                    <IconButton
                                        color="error"
                                        sx={{ p: 0 }}
                                        onClick={() =>
                                            handleRemoveField(field.name)
                                        }
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </FieldsBox>
                            );
                        })}
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Add Fields:
                    </Typography>
                    <Box display="flex" alignItems="end">
                        <Box sx={{ width: "100%", maxWidth: "400px", mr: 1.5 }}>
                            <InputLabel sx={{ mb: 0.5 }}>
                                Column Type
                            </InputLabel>
                            <Select
                                size="small"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                sx={{
                                    width: "100%",
                                    maxWidth: "400px",
                                    py: 0,
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "#0e73f6",
                                            borderWidth: "1px",
                                        },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "#0e73f6",
                                            borderWidth: "1px",
                                        },
                                }}
                                displayEmpty
                            >
                                {Object.keys(columnOptions).map((column) => (
                                    <CustomMenuItem value={column}>
                                        {column}
                                    </CustomMenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box sx={{ width: "100%", maxWidth: "400px", mr: 1.5 }}>
                            <InputLabel sx={{ mb: 0.5 }}>
                                Column Name
                            </InputLabel>

                            <TextField
                                label={null}
                                placeholder="Column Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                size="small"
                                sx={{
                                    width: "100%",
                                    maxWidth: "400px",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {},
                                        "&.Mui-focused fieldset": {
                                            borderWidth: "1px",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#0e73f6",
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "400px",
                                display: type === "Metric" ? "block" : "none",
                            }}
                        >
                            <InputLabel sx={{ mb: 0.5 }}>Data Type</InputLabel>
                            <Select
                                size="small"
                                value={columnDTypes}
                                onChange={(e) =>
                                    setColumnDTypes(e.target.value)
                                }
                                sx={{
                                    width: "100%",
                                    maxWidth: "400px",
                                    py: 0,
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "#0e73f6",
                                            borderWidth: "1px",
                                        },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "#0e73f6",
                                            borderWidth: "1px",
                                        },
                                }}
                                displayEmpty
                            >
                                <CustomMenuItem value="object">
                                    Text
                                </CustomMenuItem>
                                <CustomMenuItem value="float">
                                    Number
                                </CustomMenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ ml: "auto" }}>
                            <Button
                                variant="contained"
                                onClick={handleAddField}
                                sx={{ mr: 1 }}
                            >
                                Add
                            </Button>
                            <Button
                                color="secondary"
                                onClick={handleCancelField}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_p}
                            onChange={() => handleCheckbox("col_p")}
                            control={<Checkbox disableRipple />}
                            label="Pair"
                        />
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_o}
                            onChange={() => handleCheckbox("col_o")}
                            control={<Checkbox disableRipple />}
                            label="Open Price"
                        />
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_c}
                            onChange={() => handleCheckbox("col_c")}
                            control={<Checkbox disableRipple />}
                            label="Close Price"
                        />
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_rr}
                            onChange={() => handleCheckbox("col_rr")}
                            control={<Checkbox disableRipple />}
                            label="Risk Reward Ratio"
                        />
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_sl}
                            onChange={() => handleCheckbox("col_sl")}
                            control={<Checkbox disableRipple />}
                            label="Stop Loss"
                        />
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_tp}
                            onChange={() => handleCheckbox("col_tp")}
                            control={<Checkbox disableRipple />}
                            label="Take Profit"
                        />
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_t}
                            onChange={() => handleCheckbox("col_t")}
                            control={<Checkbox disableRipple />}
                            label="Timeframe"
                        />
                        <FormControlLabel
                            sx={{ mr: 5 }}
                            checked={checkbox.col_d}
                            onChange={() => handleCheckbox("col_d")}
                            control={<Checkbox disableRipple />}
                            label="Direction"
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Preview:
                    </Typography>
                    <div className="table-container">
                        <table>
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="h-4" />
                    {/* <button onClick={() => rerender()} className="border p-2">
                        Rerender
                    </button> */}
                </Box>
            </BoxContainer>
        </Box>
    );
};

export default CreateDocument;
