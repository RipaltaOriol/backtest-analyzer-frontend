import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme'
import Analysis from './pages/Analysis'
import Overview from './pages/Overview'
import Login from './pages/Login'
import Help from './pages/Help'
import Layout from './components/Layout'
import Upload from './pages/Upload'
import Home from './pages/Home'
import Test from './pages/Test'
import { AuthProvider } from './context/AuthProvider';
import { DocumentsProvider } from './context/DocumentsProvider';
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin';
import LoadDocument from './components/LoadDocument';
import SetupsList from './features/setups/SetupsList'


function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DocumentsProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" exact element={<Home />} />

              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                  {/* <Route element={<LoadDocument />}> */}
                    <Route element={<Layout />}>
                      <Route path="upload" element={<Upload />} />
                      <Route path="overview" element={<Overview />} />
                      <Route path="help" element={<Help />} />
                      <Route path=":documentId/setups" element={<SetupsList />} />
                      <Route path=":documentId" element={<Analysis />} />
                    </Route>
                  {/* </Route> */}
                </Route>
              </Route>

            </Routes>
          </Router>
        </DocumentsProvider>
      </AuthProvider>
    </ThemeProvider>

  );
}

export default App;
