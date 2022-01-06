import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Lab from './pages/Lab'
import Management from './pages/Management'
import Login from './pages/Login'
import Help from './pages/Help'
import Layout from './components/Layout'
import Rajdhani from './fonts/Rajdhani/Rajdhani-Regular.ttf'

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  },
  palette: {
  }
})

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
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
