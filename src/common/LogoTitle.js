import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    logo: {
        fontSize: "18px",
    },
});

const LogoTitle = ({
    first,
    second,
    variant,
    component,
    weight,
    firstColor = "#0E73F6",
    color = null,
}) => {
    const classes = useStyles();

    return (
        <Box sx={{ display: "inline-flex" }}>
            <Typography
                variant={variant}
                component={component}
                className={classes.logo}
                sx={{ fontWeight: weight, color: firstColor }}
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
    );
};

export default LogoTitle;
