import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const faq = {
    "Sample FAQ 1":
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    "Sample FAQ 2":
        "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    "Sample FAQ 3":
        "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
};

const CustomAccordion = styled(Accordion)({
    border: "1px solid rgba(37, 44, 50, 0.1)",
    boxShadow: "none",
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
                    sx={{ mb: 2, p: 2, "&:before": { display: "none" } }}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                sx={{
                                    color:
                                        expanded === indx
                                            ? "#2B61FE"
                                            : "inherit ",
                                }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography
                            className="h5-placeholder"
                            sx={{
                                color:
                                    expanded === indx ? "#2B61FE" : "inherit",
                            }}
                        >
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
