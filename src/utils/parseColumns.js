function parseColumnName(name) {
    if (name === "index") {
        return "Index";
    } else if (
        name.startsWith(".r_") ||
        name.startsWith(".m_") ||
        name.startsWith(".d_")
    ) {
        return name.substring(3);
    } else if (name === ".p") {
        return "Pair";
    } else if (name === ".s") {
        return "Screenshot";
    } else if (name === ".o") {
        return "Open";
    } else if (name === ".c") {
        return "Close";
    } else if (name === ".tp") {
        return "Take Profit";
    } else if (name === ".sl") {
        return "Stop Loss";
    }
    return name;
}

export default parseColumnName;
