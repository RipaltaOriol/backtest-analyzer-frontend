import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TimelineItem = ({ data }) => (
    <Box className="timeline-item">
        <Box className="timeline-item-content">
            <Typography className="tag">{data.number}</Typography>

            <Box>
                <Typography variant="h6">{data.title}</Typography>
                <Typography variant="subtitle" component="p">
                    {data.text}
                </Typography>
            </Box>
            <span className="circle" />
        </Box>
    </Box>
);

export default TimelineItem;
