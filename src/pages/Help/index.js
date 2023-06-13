import { useLocation } from "react-router-dom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import Footer from "../../common/Footer";
import LogoTitle from "../../common/LogoTitle";
import YoutubeEmbed from "../../common/YoutubeEmbed";
import "./Help.css";
import indexColumnTable from "./indexColumnTable";

const BoxPaper = styled(Box)({
    width: "auto",
    borderRadius: "6px",
    padding: "16px 24px",
    backgroundColor: "#F6F8F9",
    border: "1px solid #E5E9EB",
});

const Help = () => {
    const location = useLocation();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Container sx={{ p: location.pathname !== "/help" ? 3 : 0 }}>
                {location.pathname !== "/help" && <Toolbar />}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h4" component="h1">
                        Documentation
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 5 }}>
                    <LogoTitle
                        first="Trade"
                        second="Sharpener"
                        variant="h3"
                        component="h1"
                        weight="700"
                    />
                    <Typography variant="body2" sx={{ my: 2 }}>
                        Upload the CSV files of your backtests and be able to
                        create and examine statistics from your backtests.
                    </Typography>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h3">
                            Problem
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Most of the time we backtest we create an Excel
                            sheet or Spreadsheet where we record all the trades
                            that we take and record the data points we are
                            interested in or want to improve in our strategy.
                            Through this process, we are able to gather a lot of
                            useful data that would be very useful in improving
                            our trading strategy. However, once the backtest is
                            completed we cannot analyze the data properly. We
                            miss a lot of information due to our inability to
                            fully examine all the intel we have collected.
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            The other side of the coin is the tradeoffs we have
                            to make when creating a journal for ourselves if we
                            use something like Notion or a notebook we get a
                            free canvas for our notes and ideas, but we miss the
                            part where we collect crucial data points from our
                            trades which is equally important.
                        </Typography>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h3">
                            Why Trade Sharpener?
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Most of us do not have advanced knowledge of Excel
                            and are unable to apply all the formulas and
                            calculations that we would like to perform to
                            examine all of our data. Therefore, we end up
                            examining each trade visually and making approximate
                            estimations which end up hugely delaying the
                            development of our trading strategy.
                        </Typography>

                        <Typography variant="body2" sx={{ my: 1 }}>
                            Additionally, keeping track of both individual data
                            points, trade screenshots, and notes is a headache
                            no matter what system you have in place. Through
                            Trade Sharpener we came up with a robust solution to
                            this problem by combining the best of each side.
                        </Typography>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h3">
                            Mission
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Our aim is to create a simple and easy-to-use
                            software to allow traders to analyze all the intel
                            and data they collect through regular trading,
                            backtesting, and front testing. Our objective is to
                            assist them in the analysis of the information they
                            have collected and help them improve their trading
                            strategy as fast as possible.
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <LogoTitle
                        first="Getting"
                        second="Started"
                        variant="h3"
                        component="h1"
                        weight="700"
                    />
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h3" gutterBottom>
                            Prerequisites
                        </Typography>
                        <Typography variant="h5" component="h4">
                            Default [CSV]
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Transform your data into a CSV format. If you are
                            using Excel you can easily transform you data into
                            CSV following these steps:
                        </Typography>
                        <BoxPaper sx={{ my: 1.5 }}>
                            <Box className="export-csv">
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    File
                                    <KeyboardArrowRightIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    Save As
                                    <KeyboardArrowRightIcon />
                                </Box>
                                <Box className="export-final">
                                    CSV UTF-8 (Comma-delimited) (.csv)
                                </Box>
                            </Box>
                        </BoxPaper>
                        <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                        >
                            Only CSV files are accepted *
                        </Typography>
                        <Typography variant="h5" component="h4">
                            MT4 Import
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Trade Sharpener allows you to upload your MT4
                            account history. In order to do this just download
                            your history as a report with the XLS extension.
                            Once this is done open the resulting file in Excel
                            and save it using the XLSX extension. Your MT4
                            account history is now ready to be uploaded to Trade
                            Sharpener. Make sure to check the examples section
                            below for a step-by-step guide on how to complete
                            this process.
                        </Typography>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h3">
                            Appropriate Naming
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Rename the columns in your data file according to
                            the category they belong to. In this step, we assume
                            that your data is organized by rows (each row
                            corresponds to one trade - see the example below).
                            Trade Sharpener uses various standard column types
                            but we also give you the freedom to include any
                            other metrics you might require. Below there is an
                            index table on how to rename your columns and the
                            categories we support.
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            <span className="highlight">
                                &#8211; To ensure proper functionality, all
                                columns, except for 'Notes' and 'Images,' should
                                not contain any empty cells.
                            </span>
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            &#8211; You can include multiple images by adding
                            "^" between urls. For example,
                            www.image1.com^www.image2.com
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            <span className="highlight">
                                &#8211; Do not use special characters to name
                                your columns such as "." or "-". Otherwise,
                                Trade Sharpener might fail to read your columns
                                properly.
                            </span>
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            &#8211; To ensure the correct format,{" "}
                            <span className="highlight">dates</span> should
                            match the following format:{" "}
                            <span className="highlight">
                                '%d/%m/%y %H:%M:%S'
                            </span>
                            , which represents day/month/year
                            hours:minutes:seconds. In Excel, you can achieve
                            this format by clicking on 'Custom Format' and
                            entering 'd/m/yy hh:mm:ss'. Please refer to the
                            examples section below for a guide on how to apply
                            this format.
                        </Typography>
                        <BoxPaper sx={{ my: 2 }}>
                            <Typography
                                align="center"
                                sx={{ textTransform: "uppercase" }}
                                gutterBottom
                            >
                                Use this table to know how to name your own
                                columns
                            </Typography>
                            {indexColumnTable()}
                        </BoxPaper>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h2">
                            Documents
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            When a file is uploaded to Trade Sharpener, it
                            creates a{" "}
                            <span className="highlight">document</span> to store
                            the data from the file. These documents serve as
                            reference points for the uploaded files and cannot
                            be directly edited. However, if you need to make
                            changes to the original data, you can rename,
                            duplicate, delete, and update each trade within the
                            document by navigating to the{" "}
                            <span className="highlight">All Documents</span>{" "}
                            section. To initiate an analysis on a{" "}
                            <span className="highlight">document</span>, simply
                            click on the document name located in the left
                            sidebar of the app.
                        </Typography>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h2">
                            Setups
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Trade Sharpener utilizes{" "}
                            <span className="highlight">setups</span> to
                            facilitate the analysis of trading data while
                            preserving the original data for future reference.
                            This feature allows users to work on different
                            analyses within the same document without the need
                            to delete or lose progress from previous analyses,
                            or upload the same file multiple times. The setups
                            of a document can be accessed through the top right
                            dropdown menu and can be created, renamed, and
                            deleted in the{" "}
                            <span className="highlight">All Setups</span>
                            section, which is also accessible from the left
                            sidebar. Additionally, upon uploading data and
                            creating a document, an initial{" "}
                            <span className="highlight">setup</span> is
                            automatically generated and marked as{" "}
                            <span className="highlight">default</span>. However,
                            users have the flexibility to change the
                            <span className="highlight">default setup</span> in
                            the <span className="highlight">All Setups</span>{" "}
                            section.
                        </Typography>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
                            Examples
                        </Typography>
                        <Box>
                            <Typography variant="h5">Upload File</Typography>
                            <Typography variant="body2">
                                This short video demonstrates how to code the
                                columns in your file to prepare it for upload in
                                Trade Sharpener. It also provides a step-by-step
                                guide on saving an Excel file as CSV.
                            </Typography>
                            <Box sx={{ py: 3 }}>
                                <YoutubeEmbed embedId="8Y1FxOnCw_0" />
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h5">
                                Empty Cell Error & Remove Blank Columns in CSV
                            </Typography>
                            <Typography variant="body2">
                                After uploading your files, you may encounter
                                empty columns, which can cause an error when
                                attempting to upload your data to Trade
                                Sharpener. If you receive this error message but
                                have confirmed that there are no empty cells in
                                your file, we recommend deleting the columns
                                immediately after your data ends, as there may
                                be hidden values present. Please refer to the
                                following video for a step-by-step guide on
                                resolving this issue in Excel.
                            </Typography>
                            <Box sx={{ py: 3 }}>
                                <YoutubeEmbed embedId="kNQNas-ClTM" />
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5">Upload MT4</Typography>
                        <Typography variant="body2">
                            This short video demonstrates shows how to download
                            your MT4 account history and upload it to Trade
                            Sharpener. For this, you will have to ensure that
                            the report is downloaded with an XLS extension and
                            then transform it to XLSX in Excel.
                        </Typography>
                        <Box sx={{ py: 3 }}>
                            <YoutubeEmbed embedId="w18DmgZe1UQ" />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5">
                            Format Date Columns
                        </Typography>
                        <Typography variant="body2">
                            If you are unsure about how to format date columns
                            or experiencing any issues, please refer to the
                            following video. It provides a step-by-step guide on
                            how to apply the correct date format using Excel.
                        </Typography>
                        <Box sx={{ py: 3 }}>
                            <YoutubeEmbed embedId="PERIXkCGJyc" />
                        </Box>
                    </Box>
                    <Typography
                        align="center"
                        sx={{ textTransform: "uppercase" }}
                    >
                        Enjoy - More documentation coming soon
                    </Typography>
                </Box>
            </Container>
            {location.pathname !== "/help" && <Footer />}
        </Box>
    );
};

export default Help;
