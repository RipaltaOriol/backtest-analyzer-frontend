import SingleRecordDialog from "features/setups/SingleSetup/SingleRecordDialog";
import PPTTemplate from "features/templates/PPTTemplate";

export const renderTemplate = (
    template,
    documentId,
    rowContents,
    open,
    setOpen
) => {
    if (template === "PPT") {
        return (
            <PPTTemplate
                documentId={documentId}
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
                documentId={documentId}
                rowRecord={rowContents}
            />
        );
    }
};
