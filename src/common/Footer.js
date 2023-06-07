import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        footer: {
            padding: "20px 100px",
            backgroundColor: "#F9FAFF",
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
        },
    })
);

const Footer = () => {
    const classes = useStyles();

    return (
        <Box className={classes.footer}>
            <Typography alignSelf="center">
                @2022 Backtest Analyser. All Rights Reserved.
            </Typography>
            <Box display="flex" alignItems="center">
                <Typography sx={{ mr: 1 }}>Follow Us:</Typography>
                <IconButton
                    disableRipple
                    sx={{
                        "&:hover": {
                            backgroundColor: "inherit",
                        },
                    }}
                >
                    <YouTubeIcon />
                </IconButton>
                <IconButton
                    disableRipple
                    sx={{
                        "&:hover": {
                            backgroundColor: "inherit",
                        },
                    }}
                >
                    <InstagramIcon />
                </IconButton>
                <IconButton
                    disableRipple
                    sx={{
                        "&:hover": {
                            backgroundColor: "inherit",
                        },
                    }}
                >
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
