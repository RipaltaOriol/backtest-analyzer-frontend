import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import LoginSketch from "../assets/svg/login-sketch.svg";
import Footer from "../common/Footer";
import Message from "../common/Message";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { setLoginMsg } from "../features/messages/messagesSlice";
import { selectLoginMsg } from "../features/messages/messagesSlice";
import "./Login.css";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const from = location.state?.from?.pathname || "/files";

    const message = useSelector(selectLoginMsg);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const [login] = useLoginMutation();

    // Handles the login logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ email, password }).unwrap();
            dispatch(
                setCredentials({
                    token: userData.access_token,
                    user: userData.user,
                })
            );
            setEmail("");
            setPassword("");
            setIsError(false);
            setMessage("Successfully logged in!");
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.originalStatus) {
                setMessage(err?.data?.msg || "Something went wrong");
                setIsError(true);
            }
        }
    };

    const setMessage = (newMessage) => {
        dispatch(setLoginMsg({ msg: newMessage }));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Toolbar />

            <Box sx={{ m: 5 }}>
                <Box className="container-grid">
                    <Box
                        sx={{
                            backgroundColor: "#F6F8F9",
                            borderRadius: "12px",
                            p: 10,
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h2">Welcome</Typography>
                        <Typography
                            sx={{
                                color: "#84919A",
                                textAlign: "center",
                                mb: 5,
                            }}
                        >
                            Trade Sharpener is the tool you need to so start
                            centralizing your data analysis and keep track of
                            your strategy
                        </Typography>
                        <img src={LoginSketch} alt="login sketch" />
                    </Box>
                    <Box
                        sx={{
                            p: {
                                xs: 0,
                                sm: 5,
                                md: 10,
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{ mb: 2 }}
                                variant="h4"
                                component="h1"
                            >
                                Log In
                            </Typography>
                            {message && (
                                <Message
                                    message={message}
                                    setMessage={setMessage}
                                    isError={isError}
                                    sx={{ mb: 3 }}
                                />
                            )}
                            <form
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    sx={{ mb: 2 }}
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mb: 2 }}
                                    fullWidth
                                >
                                    Sign In
                                </Button>
                                <Link to="" className="forgot-password-link">
                                    Forgot Password?
                                </Link>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Login;
