const PPT_MAPPINGS = {
    constants: {
        col_p: "asset",
        col_sl: "stop_loss",
        col_tp: "take_profit",
        col_d: "direction",
        col_rr: "risk_reward",
        col_o: "price",
    }, // col_rr and col_o (left out)
    variables: {
        "Entry Date": {
            id: "date_executed",
            type: "dates",
        },
        Size: {
            id: "size",
            type: "other",
        },
        "Profit %": {
            id: "return_percentage",
            type: "result",
        },
        "Profit $": {
            id: "return_value",
            type: "result",
        },
        "Order Type": {
            id: "order_type",
            type: "other",
        },
    },
    stateHelper: {
        date_executed: false,
        size: false,
        return_percentage: false,
        return_value: false,
        order_type: false,
        asset: false,
        stop_loss: false,
        take_profit: false,
        direction: false,
        risk_reward: false,
        price: false,
    },
};

export const getTemplateMappings = (templateName) => {
    if (templateName === "PPT") return PPT_MAPPINGS;
    return false;
};
