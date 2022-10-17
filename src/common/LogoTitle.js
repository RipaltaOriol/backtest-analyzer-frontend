import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  logoBacktest: {
      color: "#0E73F6",
      fontSize: '18px'
  }
})

const LogoTitle = ({ first, second, variant, component, weight, color = null }) => {

    const classes = useStyles();

    return (
        <Box sx={{ display: 'inline-flex'}}>
            <Typography
                variant={variant}
                component={component}
                className={classes.logoBacktest}
                sx={{ fontWeight: weight }}
            >
                {first}
            </Typography>
            &nbsp;
            <Typography
                variant={variant}
                component={component}
                sx={{ color: color ? color : null }}
            >
                {second}
            </Typography>
        </Box>
    )
}

export default LogoTitle;