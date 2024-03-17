import { TSDatePicker, TSTextField } from "common/CustomComponents";
import dayjs from "dayjs";

const checkDirectionValue = (direction) =>
    direction.toLowerCase() !== "long" && direction.toLowerCase() !== "short";

function checkValidations(columnId, value) {
    if (columnId === "col_d" && value) {
        return checkDirectionValue(value);
    }
    return false;
}

export const updateTextInput = (id, value, onChange) => {
    return (
        <TSTextField
            type="text"
            error={checkValidations(id, value)}
            value={value || ""}
            onChange={onChange(id)}
        />
    );
};

export const updateNumberInput = (id, value, onChange) => {
    return (
        <TSTextField
            type="number"
            value={value ?? ""}
            onChange={onChange(id, "number")}
            step={0.5}
        />
    );
};

export const updateDateInput = (id, value, onChange) => {
    return (
        <TSDatePicker
            format="L HH:mm"
            value={value ? dayjs(value) : null}
            onChange={(newValue) => onChange(id, newValue)}
            step={0.5}
        />
    );
};
