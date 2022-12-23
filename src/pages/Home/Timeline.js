import Box from "@mui/material/Box";

import TimelineItem from "./TimelineItem";

const timelineData = [
    {
        number: 1,
        title: "Create Multiple Instances",
        text: "Generate different versions of your backtest data and study them individually",
    },
    {
        number: 2,
        title: "Study your Data",
        text: "Utilise all of our tools to study your backtest in the way that best fits your needs",
    },
    {
        number: 3,
        title: "Improve and Repeat",
        text: "Come up with leads for your next backtest and improve your strategy",
    },
];

const Timeline = () =>
    timelineData.length > 0 && (
        <Box className="timeline-container">
            {timelineData.map((data, idx) => (
                <TimelineItem data={data} key={idx} />
            ))}
        </Box>
    );

export default Timeline;
