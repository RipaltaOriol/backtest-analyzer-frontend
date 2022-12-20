import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import HomeFilter from "../../assets/images/home-filter.png";
import HomeObserve from "../../assets/images/home-observe.png";
import HomePage from "../../assets/images/home-page.png";
import HomeVisualise from "../../assets/images/home-visualise.png";
import Footer from "../../common/Footer";
import "./Home.css";
import Timeline from "./Timeline";

const Home = () => {
    const Item = styled(Paper)(({ theme }) => ({
        textAlign: "center",
        height: "100%",
        padding: "20px 10px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
    }));

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Container sx={{ p: 3 }}>
                <Toolbar />
                <Box sx={{ mt: 2, mb: 10 }}>
                    <Typography variant="h2" component="h1" align="center">
                        Backtest Analyser
                    </Typography>
                    <Typography variant="h6" align="center">
                        Explore and Learn from your Backtest Data
                    </Typography>
                    <Paper sx={{ my: 4 }}>
                        <img src={HomePage} alt="App Demo" />
                    </Paper>
                </Box>

                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ mb: 3 }}
                    align="center"
                >
                    Easy and Intuitive Features
                </Typography>
                <Grid container spacing={2} sx={{ mb: 10 }}>
                    <Grid item xs={4}>
                        <Item>
                            <Typography variant="h5">Filter</Typography>
                            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                                Dive deep into your data and isolate different
                                metrics to differentiate what is working from
                                what is not.
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Apply differentent layers and generate multiple
                                scenario to generat leads.
                            </Typography>
                            <Box sx={{ mt: "auto" }}>
                                <img src={HomeFilter} alt="Change" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Typography variant="h5">Observe</Typography>
                            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                                Use our representative tables to observe what is
                                your data and find what you are looking for.
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Write custom notes to record your thought
                                process and keep track of what you are looking
                                for.
                            </Typography>
                            <Box sx={{ mt: "auto" }}>
                                <img src={HomeObserve} alt="Change" />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Typography variant="h5">Visualise</Typography>
                            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                                Be able to visualise your data through our
                                graphs and get a better sense of what your data
                                looks like.
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                If you also have screenshots of your trades we
                                offer image embeding to look at them as you work
                                on your data.
                            </Typography>
                            <Box sx={{ mt: "auto" }}>
                                <img src={HomeVisualise} alt="Change" />
                            </Box>
                        </Item>
                    </Grid>
                </Grid>

                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ mb: 3 }}
                    align="center"
                >
                    Create your own Workflow
                </Typography>
                <Timeline />
            </Container>
            <Footer />
        </Box>
    );
};

export default Home;
