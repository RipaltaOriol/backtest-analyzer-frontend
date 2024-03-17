import SingleRecordDialog from "features/setups/SingleSetup/SingleRecordDialog";
import PPTTemplate from "features/templates/PPTTemplate";

export const renderTemplate = (
    template,
    documentId,
    rowContents,
    open,
    close
) => {
    if (template === "PPT") {
        return (
            <PPTTemplate
                documentId={documentId}
                rowId={rowContents.rowId}
                open={open}
                onClose={() => close()}
            />
        );
    } else {
        return (
            <SingleRecordDialog
                open={open}
                onClose={() => close()}
                documentId={documentId}
                rowRecord={rowContents}
            />
        );
    }
};
