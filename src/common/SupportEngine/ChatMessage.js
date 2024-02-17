import LogoIcon from "assets/svg/trade_sharpener_white.svg";
import React, { useEffect, useRef } from "react";

import Avatar from "@mui/material/Avatar";

const ChatMessage = ({ message, user }) => {
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const isOwner = message.senderId === user.uid;

    return (
        <div ref={ref} className={`message ${isOwner && "owner"}`}>
            <div className="messageInfo">
                <Avatar
                    sx={{
                        bgcolor: isOwner ? "#f8961e" : "#0e73f6",
                        width: 30,
                        height: 30,
                        p: 0.5,
                        borderRadius: "25%",
                    }}
                    variant="square"
                    src={!isOwner && LogoIcon}
                >
                    {isOwner && "ME"}
                </Avatar>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                <span>{message?.date.toDate().toDateString()}</span>
            </div>
        </div>
    );
};

export default ChatMessage;
