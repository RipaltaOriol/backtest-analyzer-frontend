import {
    TSBackButton,
    TSMainButton,
    TSMenuItem,
    TSSelect,
} from "common/CustomComponents";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parseColumnName from "utils/parseColumns";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import DatasetLinkedRoundedIcon from "@mui/icons-material/DatasetLinkedRounded";
import DeselectRoundedIcon from "@mui/icons-material/DeselectRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Step from "@mui/material/Step";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { useGetUserSettingsQuery } from "features/auth/authApiSlice";
import { useAssignDocumentTemplateMutation } from "features/documents/documentSlice";
import { useGetTemplateMappingQuery } from "features/templates/templateApiSlice";
import { getTemplateMappings } from "features/templates/templateMappings";

const TSConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#0e73f6",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#0e73f6",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#eaeaf0",
        borderTopWidth: 2,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#0e73f6",
    }),
    ...(ownerState.completed && {
        color: "#0e73f6",
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <ChangeCircleRoundedIcon />,
        2: <DeselectRoundedIcon />,
        3: <DatasetLinkedRoundedIcon />,
    };
    return (
        <QontoStepIconRoot
            ownerState={{ active, completed }}
            className={className}
        >
            {icons[String(props.icon)]}
        </QontoStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const steps = [
    "Change Account Template",
    "Handle Previous Template",
    "Manage New Template",
];

const TemplateSelection = ({ open, handleCloseDialog, document }) => {
    const { data: userSettings } = useGetUserSettingsQuery(); // TODO: rename this to user settings
    const [activeStep, setActiveStep] = useState(0);
    const [documentTemplate, setDocumentTemplate] = useState();
    const [mappings, setMappings] = useState({});
    const [templateFields, setTemplateFields] = useState(
        getTemplateMappings(document?.template?.name)
    );

    const [assignDocumentTemplate] = useAssignDocumentTemplateMutation();

    useEffect(() => {
        if (document?.template?.id) {
            setDocumentTemplate(document?.template?.id);
        }
        if (userSettings) {
            const templateMapping = getTemplateMappings(
                userSettings?.templates[document?.template?.id]?.name
            );
            setTemplateFields(templateMapping);
            if (templateMapping) setMappings(templateMapping?.stateHelper);
        }
    }, [document, userSettings]);

    const { data: templateMappings } = useGetTemplateMappingQuery(
        { documentId: document?.id },
        { skip: !document?.id }
    );

    const handleClose = () => {
        handleCloseDialog();
        setDocumentTemplate(null);
        setActiveStep(0);
        setMappings({});
    };

    const handleChangeTempalte = (e) => {
        setDocumentTemplate(e.target.value);

        const templateMapping = getTemplateMappings(
            userSettings?.templates[e.target.value]?.name
        );
        setTemplateFields(templateMapping);
        if (templateMapping) setMappings(templateMapping?.stateHelper);
    };

    const handleApplyTemplate = () => {
        assignDocumentTemplate({
            documentId: document?.id,
            templateId: documentTemplate,
            mappings,
        });
        handleClose();
    };

    const handleNext = () => {
        if (activeStep !== steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            handleApplyTemplate();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (event, field) => {
        setMappings({ ...mappings, [field]: event.target.value });
    };

    const handleChangeCheckbox = (event, field, id) => {
        if (event.target.checked) {
            setMappings({ ...mappings, [id]: field });
        } else {
            setMappings({ ...mappings, [id]: false });
        }
    };

    const changeAccountTemplate = () => (
        <div>
            <Box display="flex" alignItems="center" sx={{ mb: 2, mx: 0.5 }}>
                <Typography sx={{ width: "700px" }}>
                    Indicate which template you want this account to use:
                </Typography>

                <TSSelect
                    value={documentTemplate}
                    onChange={(e) => handleChangeTempalte(e)}
                >
                    {Object.values(userSettings?.templates || []).map(
                        ({ name, id }) => (
                            <TSMenuItem key={id} value={id}>
                                {name}
                            </TSMenuItem>
                        )
                    )}
                </TSSelect>
            </Box>

            <Alert
                severity="warning"
                sx={{ color: "black", fontWeight: 500, borderRadius: "10px" }}
            >
                Changing template might result is the loss of work done in the
                current template.
            </Alert>
        </div>
    );

    const managePreviousTempalte = () => (
        <Alert
            severity="error"
            sx={{ color: "black", fontWeight: 500, borderRadius: "10px" }}
        >
            Please move to the next section. This interface is under
            construction :&#40;
        </Alert>
    );

    const manageNewTemplate = () => {
        return (
            <Box>
                <DialogContentText
                    gutterBottom
                    sx={{ fontSize: "14px", fontWeight: 500, mb: 2 }}
                >
                    This template introduces new fields that may or may not
                    already exist within your account journal. By default, Trade
                    Sharpener will generate independent fields to manage your
                    trades within the template. However, if you already have
                    these fields in your account, you won't be able to
                    synchronize them by toggling or mapping the template fields
                    with your account fields. For more detailed information on
                    template and synchronization functionality, please visit
                    this{" "}
                    <Link to="/templates" className="link-styled">
                        page
                    </Link>
                    .
                </DialogContentText>
                {!templateFields && (
                    <Alert severity="success">
                        No management required for this template. Your are all
                        set :&#41;
                    </Alert>
                )}
                {templateFields && (
                    <Box>
                        <Typography
                            gutterBottom
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                lineHeight: "20px",
                                letterSpacing: "-0.06px",
                            }}
                        >
                            Select or map the fields/properties you want to
                            synchronize
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                            }}
                        >
                            {Object.entries(templateFields.constants).map(
                                ([field, id], idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        control={<Checkbox />}
                                        label={parseColumnName(field)}
                                        checked={mappings[id]}
                                        disabled={!templateMappings[field]}
                                        onChange={(e) =>
                                            handleChangeCheckbox(e, field, id)
                                        }
                                    />
                                )
                            )}
                        </Box>
                        {templateFields &&
                            Object.entries(templateFields.variables).map(
                                ([field, group], idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            backgroundColor: "#0d0d250d",
                                            p: 1,
                                            borderRadius: "10px",
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(3, 1fr)",
                                            mb: 1,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                lineHeight: "18px",
                                                letterSpacing: "-0.6px",
                                            }}
                                        >
                                            {field}
                                        </Typography>
                                        <ArrowCircleRightRoundedIcon
                                            sx={{
                                                mx: 1,
                                                color: "#0d0d2533",
                                                justifySelf: "center",
                                            }}
                                        />
                                        <TSSelect
                                            value={mappings[group.id]}
                                            onChange={(e) =>
                                                handleChange(e, group.id)
                                            }
                                            sx={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            <TSMenuItem
                                                value={false}
                                                sx={{
                                                    fontSize: "14px",
                                                }}
                                            >
                                                None
                                            </TSMenuItem>
                                            {templateMappings[group.type].map(
                                                (option) => (
                                                    <TSMenuItem
                                                        value={option}
                                                        sx={{
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        {parseColumnName(
                                                            option
                                                        )}
                                                    </TSMenuItem>
                                                )
                                            )}
                                        </TSSelect>
                                    </Box>
                                )
                            )}
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
            sx={{
                ".MuiDialog-paper": { backgroundColor: "#F6F8F9" },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "10px",
                    p: 2,
                    m: 1,
                    mb: 3,
                }}
            >
                <Typography
                    component="div"
                    sx={{
                        fontWeight: 600,
                        lineHeight: "24px",
                        display: "flex",
                        p: 0,
                    }}
                >
                    Select Account Template
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<TSConnector />}
                    sx={{ mb: 5 }}
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                StepIconComponent={ColorlibStepIcon}
                                sx={{
                                    "& .MuiStepLabel-label": {
                                        mt: 1,
                                        fontSize: 14,
                                        lineHeight: "20px",
                                    },
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box>
                    {activeStep === 0 && changeAccountTemplate()}
                    {activeStep === 1 && managePreviousTempalte()}
                    {activeStep === 2 && manageNewTemplate()}
                </Box>
            </DialogContent>
            <DialogActions sx={{ mb: 1, px: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                    }}
                >
                    <Box>
                        <TSBackButton
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ px: 3 }}
                            startIcon={<ArrowCircleLeftOutlinedIcon />}
                        >
                            Previous
                        </TSBackButton>
                    </Box>

                    <Box sx={{ flex: "1 1 auto" }} />
                    <TSMainButton
                        variant="contained"
                        disabled={activeStep === 0 && !documentTemplate}
                        onClick={handleNext}
                        endIcon={<ArrowCircleRightOutlinedIcon />}
                        sx={{ px: 3 }}
                    >
                        {activeStep !== 2 ? "Next" : "Apply"}
                    </TSMainButton>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default TemplateSelection;
