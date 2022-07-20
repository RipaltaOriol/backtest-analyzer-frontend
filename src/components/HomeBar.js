import { Outlet, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(( theme ) =>
    createStyles({
        logo: {
            color: '#fff',
            textDecoration: 'none',
            "&:hover": {
                color: 'inherit',
            }
        }
    })
)

const navItems = [
    { name: 'Guide', url: '/guide'},
    { name: 'Login', url: '/login' },
];

const HomeBar = () => {

    const classes = useStyles();

    return (
        <Box>
            <AppBar>
                <Toolbar>
                <Typography
                    className={classes.logo}
                    variant="h6"
                    component={Link}
                    to='/'
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Backtest Analyser
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#fff' }} component={Link} to={item.url}>
                        {item.name}
                    </Button>
                    ))}
                </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    )
}

export default HomeBar;