export function getResultAdornment(resultCol) {
    if (!resultCol) return "";
    switch (true) {
        case resultCol.startsWith("col_r_"):
            return " RR";
        case resultCol.startsWith("col_p_"):
            return "%";
        default:
            return " USD";
    }
}
