import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";

import { selectAllDocuments } from "./documentSlice";
import { useGetDocumentsQuery } from "./documentSlice";

const DrawerItemButton = styled(ListItemButton)({
    margin: "5px 18px",
    borderRadius: "6px",
    padding: "4px 12px 4px 8px",
});

const DocumentBar = () => {
    const location = useLocation();

    const { isLoading, isSuccess, isError, error } = useGetDocumentsQuery();

    const orderedDocuments = useSelector(selectAllDocuments);

    let content;

    if (isLoading) {
        content = <></>;
    } else if (isSuccess) {
        content = orderedDocuments.map((doc, idx) => (
            <Tooltip title={doc.name} placement="right-end">
                <DrawerItemButton
                    key={doc.id}
                    component={Link}
                    to={"/" + doc.id}
                    sx={{ py: 0.5 }}
                    selected={location.pathname.includes(doc.id)}
                    disableRipple
                >
                    <ListItemText
                        primary={doc.name}
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    />
                </DrawerItemButton>
            </Tooltip>
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return <section>{content}</section>;
};

export default DocumentBar;
