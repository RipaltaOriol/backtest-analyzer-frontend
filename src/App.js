import 'bootstrap/dist/css/bootstrap.min.css';

import theme from './assets/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Help from './pages/Help';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Overview from './pages/Overview';

import Layout from './components/Layout';
import HomeBar from './components/HomeBar';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

import SetupsList from './features/setups/SetupsList'

import { ThemeProvider } from '@mui/material';


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
                <Route path="overview" element={<Overview />} />
                <Route path="help" element={<Help />} />
                <Route path=":documentId/setups" element={<SetupsList />} />
                <Route path=":documentId" element={<Analysis />} />
              </Route>
            </Route>
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;
