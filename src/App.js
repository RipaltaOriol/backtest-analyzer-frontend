// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/material";

import theme from "./assets/utils/theme";
import HomeBar from "./common/HomeBar";
import Layout from "./common/Layout";
import PersistLogin from "./common/PersistLogin";
import RequireAuth from "./common/RequireAuth";
import AllDocuments from "./features/documents/AllDocuments";
import UpdateDocument from "./features/documents/UpdateDocument";
import AllSetups from "./features/setups/AllSetups";
import SetupsCompare from "./features/setups/SetupsCompare";
import Analysis from "./pages/Analysis";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Login from "./pages/login";
import Upload from "./pages/upload";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route element={<HomeBar />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/guide" element={<Help />} />
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
