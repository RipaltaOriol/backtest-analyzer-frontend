import CalendarViewImage from "assets/images/featuresPage/calendar_view.png";
import CustomPDFImage from "assets/images/featuresPage/custom_pdf.png";
import OrganizeDataImage from "assets/images/featuresPage/organize_data.png";
import TrackMetrics from "assets/images/featuresPage/track_metrics.png";
import TradeDetailsImage from "assets/images/featuresPage/trade_details.png";
import VersioningTradesImage from "assets/images/featuresPage/versioning_trades.png";
import VisualizeImprovementsImage from "assets/images/featuresPage/visualize_improvements.png";
import Footer from "common/Footer";

import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import UpdateIcon from "@mui/icons-material/Update";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./Features.css";

const otherFeaturesIconProps = {
    color: "#2b61ff",
    backgroundColor: "#2b61ff1a",
    p: 2,
    borderRadius: "8px",
};

const otherFeaturesData = [
    {
        header: "Filters",
        description:
            "Filter your data in any way you want and according to your preferences.",
        icon: <FilterAltIcon sx={otherFeaturesIconProps} />,
    },
    {
        header: "Compare",
        description:
            "Compare different filters and improvements you would like to make.",
        icon: <CompareArrowsIcon sx={otherFeaturesIconProps} />,
    },
    {
        header: "Update",
        description:
            "Update your trading data with the latest trades you have executed.",
        icon: <UpdateIcon sx={otherFeaturesIconProps} />,
    },
    {
        header: "Rich Text Editor",
        description:
            "Utilize our rich text editor to take detailed and comprehensive notes.",
        icon: <BorderColorRoundedIcon sx={otherFeaturesIconProps} />,
    },
];

const upcomingFeatures = [
    "Capability to Flag trades",
    "Custom Templates",
    "Support Enhancement",
    "Timeframe & TradingView Integration",
];

const Features = () => {
    return (
        <Box>
            <Container sx={{ p: 5 }}>
                <Toolbar />
                <Typography
                    component="h1"
                    className="h2-subtitle"
                    sx={{ mt: 2, mb: 4 }}
                >
                    <span className="blue-highlights">Explore</span> All{" "}
                    Features We Offer
                </Typography>
                <Box className="feature-feature">
                    <Box className="feature-description">
                        <Typography variant="h2">
                            Keep your Data Organized
                        </Typography>
                        <Typography>
                            All your data is stored in one place, allowing you
                            to manage it in any way you prefer. You can
                            compartmentalize your trades into documents,
                            granting you the freedom you need while ensuring
                            their safety for future reference.
                        </Typography>
                    </Box>
                    <Box>
                        <img src={OrganizeDataImage} alt="Organize Your Data" />
                    </Box>
                    {/* <Divider /> */}
                </Box>

                <Box className="feature-feature">
                    <Box className="feature-description">
                        <Typography variant="h2">
                            Visualize Improvements
                        </Typography>
                        <Typography>
                            Utilize our interactive charts to measure any
                            desired property from your data. Gain a
                            comprehensive understanding of the patterns and
                            structures of your strategy, enabling you to make
                            improvements. Trade Sharpener provides a range of
                            graphs capable of displaying all the metrics
                            included in your data.
                        </Typography>
                    </Box>
                    <Box>
                        <img
                            src={VisualizeImprovementsImage}
                            alt="Visualize Improvements"
                        />
                    </Box>
                </Box>
                <Box className="feature-feature">
                    <Box className="feature-description">
                        <Typography variant="h2">
                            Versioning of your Trades
                        </Typography>
                        <Typography>
                            Suppose you incorporate Fibonacci levels into your
                            trading strategy and wish to assess how your
                            performance fluctuates based on the levels you use.
                            Don't worry, there's no need to upload your data
                            multiple times — we have you covered. With the help
                            of our Setups feature, you can swiftly switch
                            between different combinations of filters while
                            retaining your original data as the foundation for
                            your analysis.
                        </Typography>
                    </Box>
                    <Box>
                        <img
                            src={VersioningTradesImage}
                            alt="Versioning Trades"
                        />
                    </Box>
                </Box>
                <Box className="feature-feature">
                    <Box className="feature-description">
                        <Typography variant="h2">Track What Matters</Typography>
                        <Typography>
                            Have you ever pondered the extent of your data's
                            depth? Trade Sharpener strives to delve into the
                            deepest layers by effortlessly presenting any
                            statistics you may require to truly comprehend the
                            underlying dynamics. With our platform, you can
                            easily track metrics such as drawdown, average loss,
                            and many others.
                        </Typography>
                    </Box>
                    <Box>
                        <img src={TrackMetrics} alt="Track Metrics" />
                    </Box>
                </Box>
                <Box className="feature-feature">
                    <Box className="feature-description">
                        <Typography variant="h2">Calendar View</Typography>
                        <Typography>
                            Are you curious to witness the evolution of your
                            trades over time? With the calendar view, you can
                            take a step back and gain a different perspective on
                            your trading progress. It allows you to observe how
                            your trading journey unfolds from a unique angle.
                        </Typography>
                    </Box>
                    <Box>
                        <img src={CalendarViewImage} alt="Calendar View" />
                    </Box>
                </Box>
                <Box className="feature-feature">
                    <Box className="feature-description">
                        <Typography variant="h2">Custom PDF Reports</Typography>
                        <Typography>
                            Whether you prefer to document everything on paper
                            or need to generate reports for potential investors,
                            our export feature has got you covered. With just
                            one click, you can create PDF reports of your
                            trading activities, making it convenient to maintain
                            records or prepare presentations.
                        </Typography>
                    </Box>
                    <Box>
                        <img src={CustomPDFImage} alt="Custom PDF Reports" />
                    </Box>
                </Box>
                <Box className="feature-feature">
                    <Box className="feature-description">
                        <Typography variant="h2">
                            Dive Deep into Details
                        </Typography>
                        <Typography>
                            Are you seeking more than just tables of numbers and
                            aesthetically pleasing charts for your discretionary
                            trading ideas? Trade Sharpener also offers a
                            detailed view of each trade you make, allowing you
                            to take elaborate notes and upload images to support
                            your analysis. This feature enables you to enhance
                            your trading insights with comprehensive annotations
                            and relevant visual content.
                        </Typography>
                    </Box>
                    <Box>
                        <img src={TradeDetailsImage} alt="Trades Detail" />
                    </Box>
                </Box>
                <Typography variant="h2" gutterBottom sx={{ mt: 3 }}>
                    More Features
                </Typography>
                <Box className="features-other">
                    {otherFeaturesData.map((feature) => (
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ mr: 1.5 }}>
                                {feature.icon}
                                {/* <FilterAltIcon
                                sx={{
                                    color: "#2b61ff",
                                    backgroundColor: "#2b61ff1a",
                                    p: 2,
                                    borderRadius: "8px",
                                }}
                            /> */}
                            </Box>
                            <Box>
                                <Typography
                                    className="h4-subtitle"
                                    sx={{ color: "black" }}
                                >
                                    {feature.header}
                                </Typography>
                                <Typography>{feature.description}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Divider sx={{ mt: 3 }} />
                <Typography variant="h2" gutterBottom sx={{ mt: 3 }}>
                    What’s Next in Development?
                </Typography>
                <Box>
                    {upcomingFeatures.map((feature) => (
                        <Box sx={{ py: 1 }} className="upcoming-feature">
                            <Typography>{feature}</Typography>
                        </Box>
                    ))}
                </Box>
                {/* Freedom on you data: UPload your data however you want --- 1*/}
                {/* No need to duplicate your data to test new tweaks ---  1*/}
                {/* Organise your data however you want */}
                {/* Update your data as you go */}
                {/* Visualise your data */}
                {/* Personalised PDF reports */}
                {/* Keep track of important metrics */}
                {/* Calendar View */}
                {/* Detailed View */}
                {/* Filters */}
                {/* What is next? */}
                {/* 1. Flag Trades, Custom Templates, Support, etc. */}
            </Container>
            <Footer />
        </Box>
    );
};

export default Features;
