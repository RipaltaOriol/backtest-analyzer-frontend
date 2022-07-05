import 'bootstrap/dist/css/bootstrap.min.css';

import theme from './assets/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Help from './pages/Help';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Overview from './pages/Overview';
import Statistics from './pages/Statistics';

import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

import { AuthProvider } from './context/AuthProvider';
import { DocumentsProvider } from './context/DocumentsProvider';

import SetupsList from './features/setups/SetupsList'

import { ThemeProvider } from '@mui/material';


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
                  <Route element={<Layout />}>
                    <Route path="upload" element={<Upload />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="help" element={<Help />} />
                    <Route path=":documentId/setups" element={<SetupsList />} />
                    <Route path=":documentId/statistics" element={<Statistics />} />
                    <Route path=":documentId" element={<Analysis />} />
                  </Route>
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
