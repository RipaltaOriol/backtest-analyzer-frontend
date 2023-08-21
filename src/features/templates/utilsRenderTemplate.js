import SingleRecordDialog from "features/setups/SingleSetup/SingleRecordDialog";
import PPTTemplate from "features/templates/PPTTemplate";

export const renderTemplate = (
    template,
    setupId,
    rowContents,
    open,
    setOpen
) => {
    if (template === "PPT") {
        return (
            <PPTTemplate
                setupId={setupId}
                rowId={rowContents.rowId}
                open={open}
                onClose={() => setOpen(false)}
            />
        );
    } else {
        return (
            <SingleRecordDialog
                open={open}
                onClose={() => setOpen(false)}
                setupId={setupId}
                rowRecord={rowContents}
            />
        );
    }
};
