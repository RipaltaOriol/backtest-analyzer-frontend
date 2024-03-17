export const validateDirection = (value) => {
    if (!value) return true;
    return value.toLowerCase() === "long" || value.toLowerCase() === "short";
};
