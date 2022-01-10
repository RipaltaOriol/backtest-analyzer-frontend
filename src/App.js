import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import theme from './theme'
import Lab from './pages/Lab'
import Management from './pages/Manage'
import Login from './pages/Login'
import Help from './pages/Help'
import Layout from './components/Layout'
import Test from './pages/Test'



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/help" component={Help} />
            <Route path="/lab" component={Lab} />
            <Route path="/login" component={Login} />
            <Route path="/manage" component={Management} />
            <Route path="/test" component={Test} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
