import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        footer: {
            padding: "30px",
            borderTop: "1px solid rgba(0, 0, 0, 0.2)",
            color: "rgba(0, 0, 0, 0.8)",
        },
    })
);

const Footer = () => {
    const classes = useStyles();

    return (
        <Box className={classes.footer} sx={{ mt: "auto" }}>
            <Typography align="center">
                @2022 Backtest Analyser. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
