// import 'bootstrap/dist/css/bootstrap.min.css';
import theme from "./assets/utils/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Help from "./pages/Help";
import Login from "./pages/login";
import Upload from "./pages/upload";

import Analysis from "./pages/Analysis";

import Layout from "./common/Layout";
import HomeBar from "./common/HomeBar";
import RequireAuth from "./common/RequireAuth";
import PersistLogin from "./common/PersistLogin";

import AllSetups from "./features/setups/AllSetups";
import SetupsCompare from "./features/setups/SetupsCompare";
import AllDocuments from "./features/documents/AllDocuments";
import UpdateDocument from "./features/documents/UpdateDocument";

import { ThemeProvider } from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route element={<HomeBar />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/guide" element={<Help />} />
                        <Route path="/" exact element={<Home />} />
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
                                    path="files/update/:documentId"
                                    element={<UpdateDocument />}
                                />
                                <Route path="setups" element={<AllSetups />} />
                                <Route path="help" element={<Help />} />
                                <Route
                                    path=":documentId/compare"
                                    element={<SetupsCompare />}
                                />
                                <Route
                                    path=":documentId"
                                    element={<Analysis />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
