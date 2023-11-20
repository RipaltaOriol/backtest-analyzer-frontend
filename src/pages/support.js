import { db } from "api/firebase";
import ChatMessages from "common/SupportEngine/ChatMessages";
import {
    Timestamp,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const SupportChat = () => {
    const [admin, setAdmin] = useState(null);
    const [adminKey, setAdminKey] = useState(null);
    const [adminChats, setAdminChats] = useState([{ id: 123 }]);
    const [target, setTarget] = useState(null);
    const [text, setText] = useState("");

    const handleAccess = async () => {
        const userRef = doc(db, "users", adminKey);
        let userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            return false;
        } else {
            setAdmin(userSnap.data());
        }

        const q = query(
            collection(db, "users"),
            where("uid", "!=", "admin123")
        );
        const querySnapshot = await getDocs(q);

        let newChats = [];
        querySnapshot.forEach((doc) => {
            newChats.push(doc.data());
        });
        setAdminChats(newChats);
    };

    const handleSendMessage = async () => {
        if (!text) return;
        updateDoc(doc(db, "chats", target.uid), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: admin.uid,
                date: Timestamp.now(),
            }),
        });
        setText("");
    };

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    my: 5,
                }}
            >
                <TextField
                    size="small"
                    sx={{ width: "100%", mr: 2 }}
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                />
                <Button variant="contained" onClick={handleAccess}>
                    Access
                </Button>
            </Box>

            <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ mr: 2 }}>
                    {adminChats.map((chat) => (
                        <Typography
                            sx={{
                                cursor: "pointer",
                                p: 1,
                                backgroundColor: "lightblue",
                                mb: 1,
                                borderRadius: "5px",
                            }}
                            onClick={() => setTarget(chat)}
                        >
                            {chat?.email}
                        </Typography>
                    ))}
                </Box>
                {target && (
                    <Box
                        sx={{
                            backgroundColor: "lightblue",
                            border: "1px solid lightgray",
                            borderRadius: "5px",
                        }}
                    >
                        <Box
                            sx={{
                                maxHeight: "600px",
                                height: "600px",
                            }}
                        >
                            <ChatMessages user={target} />
                            <TextField
                                sx={{
                                    width: "100%",
                                    backgroundColor: "lightgray",
                                }}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) =>
                                    e.keyCode === 13
                                        ? handleSendMessage()
                                        : null
                                }
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default SupportChat;
