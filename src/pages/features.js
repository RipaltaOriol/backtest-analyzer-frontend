import CustomPDFImage from "assets/images/featuresPage/custom_pdf.png";
import FeaturesCalendar from "assets/images/featuresPage/features-calendar.png";
import FeaturesTemplates from "assets/images/featuresPage/features-templates.png";
import OrganizeDataImage from "assets/images/featuresPage/organize_data.png";
import TrackMetrics from "assets/images/featuresPage/track_metrics.png";
import TradeDetailsImage from "assets/images/featuresPage/trade_details.png";
import VersioningTradesImage from "assets/images/featuresPage/versioning_trades.png";
import VisualizeImprovementsImage from "assets/images/featuresPage/visualize_improvements.png";
import Footer from "common/Footer";

import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DisplaySettingsRoundedIcon from "@mui/icons-material/DisplaySettingsRounded";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import InventoryIcon from "@mui/icons-material/Inventory";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import UpdateIcon from "@mui/icons-material/Update";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./Features.css";

const otherFeaturesData = [
    {
        header: "Unlimited Filters",
        description:
            "Filter your data in any way you want and according to your preferences.",
        icon: <FilterAltIcon fontSize="medium" sx={{ color: "white" }} />,
        backgroundColor: "#FDB52A",
    },
    {
        header: "Compare Versions",
        description:
            "Compare different filters and improvements you would like to make.",
        icon: <CompareArrowsIcon fontSize="medium" sx={{ color: "white" }} />,
        backgroundColor: "#3F78E0",
    },
    {
        header: "Update Trades",
        description:
            "Update your trading data with the latest trades you have executed.",
        icon: <UpdateIcon fontSize="medium" sx={{ color: "white" }} />,
        backgroundColor: "#FA5B68",
    },
    {
        header: "Rich Text Editor",
        description:
            "Utilize our rich text editor to take detailed and comprehensive notes.",
        icon: (
            <BorderColorRoundedIcon fontSize="medium" sx={{ color: "white" }} />
        ),
        backgroundColor: "#54A8C7",
    },
];

const Features = () => {
    return (
        <Box>
            <Container sx={{ p: 5 }}>
                <Toolbar />
                <Toolbar />
                <Box>
                    <Typography
                        component="h1"
                        className="h2-subtitle"
                        align="center"
                        sx={{ mt: 2 }}
                    >
                        All <span className="blue-highlights">Features</span>{" "}
                        The Featuers You Expect
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mb: 4 }}>
                        Trade Sharpener offers all the features you need,
                        providing a comprehensive and versatile platform to
                        streamline your trading operations.
                    </Typography>
                    <Box className="mosaic">
                        <img
                            className="mosaic-item"
                            src={FeaturesCalendar}
                            alt="Calendar View"
                        />

                        <img
                            className="mosaic-item"
                            src={FeaturesTemplates}
                            alt="Templates feature"
                        />
                    </Box>
                </Box>
            </Container>
            <Box sx={{ backgroundColor: "#2b61ff" }}>
                <Container sx={{ mb: 5 }}>
                    <Box className="features-phrases">
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "white",
                                    borderLeft: "2px solid #FA5B68",
                                    pl: 1,
                                }}
                            >
                                Visualize & break down your trades
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "white",
                                    borderLeft: "2px solid #FDB52A",
                                    pl: 1,
                                }}
                            >
                                Build funnels & find key patterns
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "white",
                                    borderLeft: "2px solid #FA5B68",
                                    pl: 1,
                                }}
                            >
                                See the impact of tracking data & journaling
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container>
                <Box className="features-item">
                    <Box
                        sx={{
                            // backgroundColor: "#2b61ff1a",
                            p: 3,
                            borderRadius: "6px",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#E0ECFF",
                                p: 0.5,
                                mb: 2,
                            }}
                        >
                            <InventoryIcon
                                fontSize="medium"
                                sx={{ color: "#0062FF" }}
                            />
                        </Avatar>
                        <Typography variant="h2" sx={{ mb: 4 }}>
                            Keep Your Data Organized
                        </Typography>
                        <ul className="feature-ul">
                            <li>
                                All your data is stored in one place, allowing
                                you to manage it in any way you prefer.
                            </li>
                            <li>
                                Compartmentalize your trades into documents,
                                granting you the freedom you need while ensuring
                                their safety for future reference.
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <img src={OrganizeDataImage} alt="Organize Your Data" />
                    </Box>
                </Box>
                <Box className="features-item">
                    <Box
                        sx={{
                            // backgroundColor: "#2b61ff1a",
                            p: 3,
                            borderRadius: "6px",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#FEEBED",
                                p: 0.5,
                                mb: 2,
                            }}
                        >
                            <QueryStatsIcon
                                fontSize="medium"
                                sx={{ color: "#FA5B68" }}
                            />
                        </Avatar>
                        <Typography variant="h2" sx={{ mb: 4 }}>
                            Visualize Improvements
                        </Typography>
                        <ul className="feature-ul">
                            <li>
                                Use our interactive charts to measure any
                                desired property from your data.
                            </li>
                            <li>
                                Gain a comprehensive understanding of the
                                patterns and structures of your strategy,
                                enabling you to make improvements.
                            </li>
                            <li>
                                Trade Sharpener provides a range of graphs
                                capable of displaying all the metrics included
                                in your data.
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <img
                            src={VisualizeImprovementsImage}
                            alt="Visualize Improvements"
                        />
                    </Box>
                </Box>
                <Box className="features-item">
                    <Box
                        sx={{
                            // backgroundColor: "#2b61ff1a",
                            p: 3,
                            borderRadius: "6px",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#EEECFE",
                                p: 0.5,
                                mb: 2,
                            }}
                        >
                            <BackupTableRoundedIcon
                                fontSize="medium"
                                sx={{ color: "#6366F1" }}
                            />
                        </Avatar>
                        <Typography variant="h2" sx={{ mb: 4 }}>
                            Versioning Of Your Accounts
                        </Typography>
                        <ul className="feature-ul">
                            <li>
                                Suppose you incorporate Fibonacci levels into
                                your trading strategy and wish to assess how
                                your performance fluctuates based on the levels
                                you use.
                            </li>
                            <li>
                                Don't worry, there's no need to upload your data
                                multiple times — we have you covered.
                            </li>
                            <li>
                                With the help of our Setups feature, you can
                                swiftly switch between different combinations of
                                filters while retaining your original data as
                                the foundation for your analysis.
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <img
                            src={VersioningTradesImage}
                            alt="Versioning Trades"
                        />
                    </Box>
                </Box>

                <Box className="features-item">
                    <Box
                        sx={{
                            // backgroundColor: "#2b61ff1a",
                            p: 3,
                            borderRadius: "6px",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#EAF5F8",
                                p: 0.5,
                                mb: 2,
                            }}
                        >
                            <GpsFixedRoundedIcon
                                fontSize="medium"
                                sx={{ color: "#54A8C7" }}
                            />
                        </Avatar>
                        <Typography variant="h2" sx={{ mb: 4 }}>
                            Track What Matters
                        </Typography>
                        <ul className="feature-ul">
                            <li>
                                Have you ever pondered the extent of your data's
                                depth?
                            </li>
                            <li>
                                Trade Sharpener strives to delve into the
                                deepest layers by effortlessly presenting any
                                statistics you may require to truly comprehend
                                the underlying dynamics.
                            </li>
                            <li>
                                With our platform, you can easily track metrics
                                such as drawdown, average loss, and many others.
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <img src={TrackMetrics} alt="Track Metrics" />
                    </Box>
                </Box>

                <Box className="features-item">
                    <Box
                        sx={{
                            // backgroundColor: "#2b61ff1a",
                            p: 3,
                            borderRadius: "6px",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#FFF6E5",
                                p: 0.5,
                                mb: 2,
                            }}
                        >
                            <CalendarMonthRoundedIcon
                                fontSize="medium"
                                sx={{ color: "#FDB52A" }}
                            />
                        </Avatar>
                        <Typography variant="h2" sx={{ mb: 4 }}>
                            Calendar View
                        </Typography>
                        <ul className="feature-ul">
                            <li>
                                Are you curious to witness the evolution of your
                                trades over time? With the calendar view, you
                                can take a step back and gain a different
                                perspective on your trading progress.
                            </li>
                            <li>
                                It allows you to observe how your trading
                                journey unfolds from a unique angle.
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <img
                            src={VersioningTradesImage}
                            alt="Versioning Trades"
                        />
                    </Box>
                </Box>

                <Box className="features-item">
                    <Box
                        sx={{
                            // backgroundColor: "#2b61ff1a",
                            p: 3,
                            borderRadius: "6px",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#FEEBED",
                                p: 0.5,
                                mb: 2,
                            }}
                        >
                            <SummarizeRoundedIcon
                                fontSize="medium"
                                sx={{ color: "#FA5B68" }}
                            />
                        </Avatar>
                        <Typography variant="h2" sx={{ mb: 4 }}>
                            Custom PDF Reports
                        </Typography>
                        <ul className="feature-ul">
                            <li>
                                Whether you prefer to document everything on
                                paper or need to generate reports for potential
                                investors, our export feature has got you
                                covered.
                            </li>
                            <li>
                                With just one click, you can create PDF reports
                                of your trading activities, making it convenient
                                to maintain records or prepare presentations.
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <img src={CustomPDFImage} alt="Custom PDF Reports" />
                    </Box>
                </Box>

                <Box className="features-item">
                    <Box
                        sx={{
                            // backgroundColor: "#2b61ff1a",
                            p: 3,
                            borderRadius: "6px",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: "#E4F8EC",
                                p: 0.5,
                                mb: 2,
                            }}
                        >
                            <DisplaySettingsRoundedIcon
                                fontSize="medium"
                                sx={{ color: "#22C55E" }}
                            />
                        </Avatar>
                        <Typography variant="h2" sx={{ mb: 4 }}>
                            Dive Deep Into Details
                        </Typography>
                        <ul className="feature-ul">
                            <li>
                                Are you seeking more than just tables of numbers
                                and aesthetically pleasing charts for your
                                discretionary trading ideas?
                            </li>
                            <li>
                                Trade Sharpener also offers a detailed view of
                                each trade you make, allowing you to take
                                elaborate notes and upload images to support
                                your analysis.
                            </li>
                            <li>
                                This feature enables you to enhance your trading
                                insights with comprehensive annotations and
                                relevant visual content.
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <img src={TradeDetailsImage} alt="Trades Detail" />
                    </Box>
                </Box>

                <Box>
                    <Box sx={{ textAlign: "center" }}>
                        <span className="span-buble">More Features</span>

                        <Typography variant="h2" sx={{ mt: 2, mb: 4 }}>
                            All the tools you need to grow your profits
                        </Typography>
                    </Box>
                    <Box className="features-other">
                        {otherFeaturesData.map((feature) => (
                            <Box
                                sx={{
                                    backgroundColor: "#2b61ff1a",
                                    p: 3,
                                    borderRadius: "6px",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        backgroundColor:
                                            feature.backgroundColor,
                                        p: 1,
                                        mb: 2,
                                    }}
                                >
                                    {feature.icon}
                                </Avatar>
                                <Typography variant="h4" gutterBottom>
                                    {feature.header}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {feature.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
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

            <Divider sx={{ m: 3, borderColor: "transparent" }} />

            <Footer />
        </Box>
    );
};

export default Features;
