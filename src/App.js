// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import theme from "./assets/utils/theme";
import HomeBar from "./common/HomeBar";
import Layout from "./common/Layout";
import PersistLogin from "./common/PersistLogin";
import RequireAuth from "./common/RequireAuth";
import AllDocuments from "./features/documents/AllDocuments";
import CreateDocument from "./features/documents/CreateDocument";
import UpdateDocument from "./features/documents/UpdateDocument";
import AllSetups from "./features/setups/AllSetups";
import SetupCalendar from "./features/setups/SetupCalendar";
import SetupsCompare from "./features/setups/SetupsCompare";
import Analysis from "./pages/Analysis";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Features from "./pages/features";
import Login from "./pages/login";
import Settings from "./pages/settings";
import SupportChat from "./pages/support";
import Templates from "./pages/templates";
import Upload from "./pages/upload";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Router>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/support-chat" element={<SupportChat />} />
                        <Route element={<HomeBar />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/guide" element={<Help />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/templates" element={<Templates />} />
                        </Route>

                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route element={<Layout />}>
                                    <Route path="upload" element={<Upload />} />
                                    <Route
                                        path="files"
                                        element={<AllDocuments />}
                                    />
                                    <Route
                                        path="files/create"
                                        element={<CreateDocument />}
                                    />
                                    <Route
                                        path="files/update/:documentId"
                                        element={<UpdateDocument />}
                                    />
                                    <Route
                                        path="setups"
                                        element={<AllSetups />}
                                    />
                                    <Route path="help" element={<Help />} />
                                    <Route
                                        path=":documentId/compare"
                                        element={<SetupsCompare />}
                                    />
                                    <Route
                                        path=":documentId/calendar"
                                        element={<SetupCalendar />}
                                    />
                                    <Route
                                        path=":documentId"
                                        element={<Analysis />}
                                    />
                                    <Route
                                        path="settings"
                                        element={<Settings />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
