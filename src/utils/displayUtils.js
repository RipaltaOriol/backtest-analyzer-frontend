function parseDataValues(column, value) {
    if (!column) return value;
    switch (true) {
        case column.startsWith("col_p_"):
            return Number(value * 100).toFixed(2) + "%";
        default:
            return value;
    }
}

function parseDataValuesDecorator(column, value, decorator) {
    if (decorator === "%") {
        return Number(value * 100).toFixed(2) + decorator;
    } else {
        return value.toFixed(2) + decorator;
    }
}

function getResultDecorator(column) {
    let decorator = "";
    switch (true) {
        case column.startsWith("col_p_"):
            decorator = "%";
            break;
        case column.startsWith("col_v_"):
            decorator = " $";
            break;
        case column.startsWith("col_r_"):
            decorator = "RR";
            break;
        default:
            decorator = "";
    }
    return decorator;
}

function parseStatsValues(column, metric, value) {
    if (!value && value !== 0) return null;
    let decorator = getResultDecorator(column);

    switch (true) {
        case metric === "total":
            return parseDataValuesDecorator(column, value, decorator);
        case metric === "mean":
            return parseDataValuesDecorator(column, value, decorator);
        case metric === "avg_win":
            return parseDataValuesDecorator(column, value, decorator);
        case metric === "avg_loss":
            return parseDataValuesDecorator(column, value, decorator);
        case metric === "max_win":
            return parseDataValuesDecorator(column, value, decorator);
        case metric === "expectancy":
            return parseDataValuesDecorator(column, value, decorator);
        case metric === "drawdown":
            return parseDataValuesDecorator(column, value, decorator);
        case metric === "win_rate":
            return Number(value * 100).toFixed(2) + "%";
        default:
            return value;
    }
}

function displayWinRate(value) {
    return Number(value * 100).toFixed(2) + "%";
}

function displayPercent(value) {
    return value ? Number(value * 100).toFixed(2) + "%" : null;
}

function parseColumn(column) {
    // TODO: simplify this using RegExp
    if (column === "index") {
        return "Index";
    } else if (
        column.startsWith("col_r_") ||
        column.startsWith("col_v_") ||
        column.startsWith("col_p_") ||
        column.startsWith("col_m_") ||
        column.startsWith("col_d_")
    ) {
        return column.substring(6);
    } else if (column === "col_p") {
        return "Pair";
    } else if (column === "col_rr") {
        return "Risk Reward";
    } else if (column === "col_s") {
        return "Screenshot";
    } else if (column === "col_o") {
        return "Open";
    } else if (column === "col_c") {
        return "Close";
    } else if (column === "col_tp") {
        return "Take Profit";
    } else if (column === "col_sl") {
        return "Stop Loss";
    } else if (column === "col_t") {
        return "Timeframe";
    } else if (column === "col_d") {
        return "Direction";
    }
    return column;
}

function parseColumnList(columnList) {
    return columnList.map((column) => parseColumn(column));
}

export {
    parseDataValues,
    displayWinRate,
    displayPercent,
    parseColumnList,
    parseColumn,
    parseStatsValues,
    getResultDecorator,
};

export default parseDataValues;
