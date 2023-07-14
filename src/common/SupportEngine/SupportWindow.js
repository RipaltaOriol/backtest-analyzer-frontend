import { useState } from "react";

import Box from "@mui/material/Box";

import ChatEngine from "./ChatEngine";
import EmailForm from "./EmailForm";
import "./Support.css";

const SupportWindow = ({ open }) => {
    const [user, setUser] = useState(null);
    const [chat, setChat] = useState(null);

    return (
        <Box
            className="support-window transition-2"
            sx={{ display: open ? "block" : "none" }}
        >
            <EmailForm
                setUser={(user) => setUser(user)}
                setChat={(chat) => setChat(chat)}
                visible={user === null || chat == null}
            />
            <ChatEngine
                visible={user != null && chat != null}
                chat={chat}
                user={user}
            />
        </Box>
    );
};

export default SupportWindow;
