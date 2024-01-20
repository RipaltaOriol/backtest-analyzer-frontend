import dayjs from "dayjs";

import TextField from "@mui/material/TextField";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";

const checkDirectionValue = (direction) =>
    direction.toLowerCase() !== "long" && direction.toLowerCase() !== "short";

function checkValidations(columnId, value) {
    if (columnId === "col_d" && value) {
        return checkDirectionValue(value);
    }
    return false;
}

export const updateTextInput = (column, value, onChange) => {
    return (
        <TextField
            label={column.name}
            type="text"
            error={checkValidations(column.id, value)}
            variant="outlined"
            value={value || ""}
            onChange={onChange(column.id)}
            size="small"
            step={0.5}
        />
    );
};

export const updateNumberInput = (column, value, onChange) => {
    return (
        <TextField
            label={column.name}
            type="number"
            variant="outlined"
            value={value ?? ""}
            onChange={onChange(column.id, "number")}
            size="small"
            step={0.5}
        />
    );
};

export const updateDateInput = (column, value, onChange) => {
    return (
        <DateTimeField
            variant="outlined"
            size="small"
            value={value ? dayjs(value) : null}
            onChange={(newValue) => onChange(column.id, newValue)}
            label={column.name}
            step={0.5}
        />
    );
};
