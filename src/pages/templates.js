import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Template = () => {
    const location = useLocation();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Container
                sx={{
                    p: location.pathname !== "/help" ? 3 : 0,
                }}
            >
                {location.pathname !== "/help" && <Toolbar />}
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h2" component="h1">
                        Templates
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ my: 2 }}>
                        Welcome to Trade Sharpener's templates! Discover how
                        this powerful tool can help you extend and customize
                        your trades. Templates offer flexibility, allowing you
                        to switch between them at any time, and they exist
                        independently to ensure that your trade data remains
                        separate unless specified otherwise.
                    </Typography>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Template Configuration
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        When you select a template, you have the option to
                        configure it to your preferences. You can choose to
                        connect existing trade properties to the template,
                        enabling automatic updates and ensuring that your
                        template reflects the latest trade information.
                    </Typography>
                    <Typography variant="body2">
                        If no configuration is applied then any update within
                        the template will not be applied to your trades and vice
                        versa.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h4" component="h3" gutterBottom>
                        How It Works
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h4">
                            Adding Templates
                        </Typography>
                        <Typography variant="body2">
                            Start by selecting a template from our library
                            inside your settings. Now the template has been
                            added to your account and is available for you to
                            use in any account you want.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h4">
                            Switching Templates
                        </Typography>
                        <Typography variant="body2">
                            Switch between templates effortlessly, depending on
                            your trading needs. In your accounts overview, click
                            in the account you want to apply the template and
                            enter the template selection. Here you will be able
                            to apply any template available to you.
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h4">
                            Data Control
                        </Typography>
                        <Typography variant="body2">
                            We are still working on data control, but we aim for
                            users to be able to save the progress made in any
                            template even after another template is put to use
                            instead of the current one.
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h4">
                            Configuring Templates
                        </Typography>
                        <Typography variant="body2">
                            Due to the independence between templates and the
                            trades themselves we found it can be useful to
                            automatically update the template once a trade has
                            been created/updated. For example, if you already
                            have a column for open price and your template uses
                            a similar field, you can configure the template to
                            use that column instead so your data will always be
                            up to date.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Template;
