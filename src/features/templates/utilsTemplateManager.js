export function renderTemplate(templateName) {
    switch (templateName) {
        case "PPT":
            return {
                name: "PPT",
                bio: "This template is based on the PPT program. It places great focus on macro analysis and data collection.",
            };
        default:
            return {
                name: "Undefined",
                bio: "Undefined",
            };
    }
}
