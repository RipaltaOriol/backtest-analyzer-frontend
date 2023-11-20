import { useEffect, useRef, useState } from "react";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Box from "@mui/material/Box";

import "./Support.css";
import SupportWindow from "./SupportWindow";

const SupportEngine = () => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);

    return (
        <Box ref={ref}>
            <SupportWindow open={open} />
            <div style={{ position: "fixed", bottom: "24px", right: "24px" }}>
                <SupportAgentIcon
                    className={`support-icon transition-1 ${
                        open && "support-icon-open"
                    }`}
                    sx={{ p: 1 }}
                    onClick={() => setOpen(!open)}
                    fontSize="large"
                />
            </div>
        </Box>
    );
};

export default SupportEngine;
