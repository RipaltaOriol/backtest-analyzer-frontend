import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const faq = {
    "What can I do with Trade Sharpener?":
        "Trade Sharpener allows you to upload your trading data and analyze it in-depth through easy-to-use and intuitive tools. You can create different versions of possible improvements you can make, compare them, and see how that affects different metrics within your trading strategy. You can also keep track of your trades and take detailed notes on each of them to spot every detail that could potentially lead to a higher return rate in your trading.",
    "Is Trade Sharpener free?":
        "Yes, Trade Sharpener is currently free for everyone. And you don’t have to worry about it ever. Even if in the future we raise prices, by signing up now you will always enjoy your account free of charge. This is our way of compensating early users.",
    "Why should I use Trade Sharpener?":
        "Through years of experience, we noticed that even though keeping a trading journal is relatively easy, going through the actual data and finding areas of improvement is not. There is not a single alternative out there that can simultaneously let you keep detailed notes of trades and also gives you the flexibility to analyze your trades quantitatively. If you are looking to take your trading to the next level then you must try Trade Sharpener.",
};

const CustomAccordion = styled(Accordion)({
    // border: "1px solid rgba(37, 44, 50, 0.1)",
    boxShadow: "none",
    "&.MuiPaper-root": {
        backgroundColor: "#F7F8F9",
        borderRadius: "6px",
    },
});

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box>
            {Object.entries(faq).map(([question, answer], indx) => (
                <CustomAccordion
                    expanded={expanded === indx}
                    onChange={handleExpand(indx)}
                    sx={{
                        mb: 2,
                        p: 2,
                        "&:before": { display: "none" },
                    }}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                sx={{
                                    color: "#2B61FE",
                                }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className="h5-placeholder">
                            {question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{answer}</Typography>
                    </AccordionDetails>
                </CustomAccordion>
            ))}
        </Box>
    );
};

export default FAQ;
