import { db } from "api/firebase";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ChatInput = ({ user, chat }) => {
    const [text, setText] = useState("");

    const handleSend = async () => {
        console.log(chat, user);
        if (!text) return;
        updateDoc(doc(db, "chats", user.uid), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
            }),
        });
        setText("");
    };
    return (
        <Box className="support-input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => (e.keyCode === 13 ? handleSend() : null)}
                value={text}
            />
            <Button
                variant="contained"
                sx={{ ml: 1, minWidth: "50px" }}
                onClick={handleSend}
            >
                <ArrowUpwardRoundedIcon />
            </Button>
        </Box>
    );
};

export default ChatInput;
