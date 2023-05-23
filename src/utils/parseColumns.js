export function parseColumnName(name) {
    if (name === "index") {
        return "Index";
    } else if (
        name.startsWith("col_r_") ||
        name.startsWith("col_v_") ||
        name.startsWith("col_p_") ||
        name.startsWith("col_m_") ||
        name.startsWith("col_d_")
    ) {
        return name.substring(6);
    } else if (name === "col_p") {
        return "Pair";
    } else if (name === "col_rr") {
        return "Risk Reward";
    } else if (name === "col_s") {
        return "Screenshot";
    } else if (name === "col_o") {
        return "Open";
    } else if (name === "col_c") {
        return "Close";
    } else if (name === "col_tp") {
        return "Take Profit";
    } else if (name === "col_sl") {
        return "Stop Loss";
    }
    return name;
}

export default parseColumnName;
