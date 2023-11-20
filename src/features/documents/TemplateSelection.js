import { CustomMenuItem, CustomSelect } from "common/CustomComponents";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parseColumnName from "utils/parseColumns";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { useGetUserSettingsQuery } from "features/auth/authApiSlice";
import { useAssignDocumentTemplateMutation } from "features/documents/documentSlice";
import { useGetTemplateMappingQuery } from "features/templates/templateApiSlice";
import { getTemplateMappings } from "features/templates/templateMappings";

const steps = [
    "Change Account Template",
    "Handle Previous Template",
    "Manage New Template",
];
const DropdownButton = styled(Button)({
    justifyContent: "left",
    width: "100%",
    fontSize: "16px",
    background: "#D7EDFF",
    "&:hover": {
        backgroundColor: "#D7EDFF",
    },
});

const DropdownMenuItem = styled(MenuItem)({
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
});

const DocumentPlaceholder = styled("span")({
    color: "#494b4d",
});

const TemplateSelection = ({ open, handleCloseDialog, document }) => {
    const { data } = useGetUserSettingsQuery();
    const [activeStep, setActiveStep] = useState(0);
    const [documentTemplate, setDocumentTemplate] = useState({});
    const [anchorDropdown, setAnchorDropdown] = useState(null);
    const [mappings, setMappings] = useState({});
    const [templateFields, setTemplateFields] = useState(
        getTemplateMappings(document?.template?.name)
    );

    const [assignDocumentTemplate] = useAssignDocumentTemplateMutation();

    useEffect(() => {
        if (templateFields) setMappings(templateFields?.stateHelper);
        if (Object.keys(documentTemplate).length === 0) {
            setTemplateFields(getTemplateMappings(document?.template?.name));
        }
    }, [templateFields, document?.template?.name, documentTemplate]);

    const { data: templateMappings } = useGetTemplateMappingQuery(
        { documentId: document?.id },
        { skip: !document?.id }
    );

    const menuOpen = Boolean(anchorDropdown);
    const handleClick = (event) => {
        setAnchorDropdown(event.currentTarget);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleClose = () => {
        setAnchorDropdown(null);
        handleCloseDialog();
        setDocumentTemplate({});
        setActiveStep(0);
        setMappings({});
    };

    const handleCloseDropdown = () => {
        setAnchorDropdown(null);
    };

    const handleChangeTempalte = ({ id, name }) => {
        setAnchorDropdown(null);
        setDocumentTemplate({ id, name });
        setTemplateFields(getTemplateMappings(name));
    };

    const handleApplyTemplate = () => {
        assignDocumentTemplate({
            documentId: document?.id,
            templateId: documentTemplate?.id,
            mappings,
        });
        setDocumentTemplate({});
        setAnchorDropdown(null);
        handleCloseDialog();
    };

    const handleNext = () => {
        if (activeStep !== steps.length - 1) setActiveStep(activeStep + 1);
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
            <DialogContentText gutterBottom sx={{ fontSize: "14px" }}>
                Indicate which tempalte you want this account to use:
            </DialogContentText>
            <DropdownButton sx={{ p: 1 }} variant="text" onClick={handleClick}>
                <DocumentPlaceholder>Template:&nbsp;</DocumentPlaceholder>
                {documentTemplate.name || document?.template?.name || "Default"}
            </DropdownButton>
            <Menu
                anchorEl={anchorDropdown}
                open={menuOpen}
                onClose={handleCloseDropdown}
                autoFocus={false}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {data
                    ? data.templates.map(({ name, id }) => (
                          <DropdownMenuItem
                              onClick={() => handleChangeTempalte({ id, name })}
                          >
                              {name}
                          </DropdownMenuItem>
                      ))
                    : null}
            </Menu>
            <Alert severity="warning" sx={{ mt: 2 }}>
                Changing template might result is the loss of work done in the
                current template.
            </Alert>
        </div>
    );

    const managePreviousTempalte = () => (
        <Alert variant="outlined" severity="error">
            Please move to the next section. This interface is under
            construction :&#40;
        </Alert>
    );

    const manageNewTemplate = () => {
        return (
            <Box>
                <DialogContentText gutterBottom sx={{ fontSize: "14px" }}>
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
                <Divider sx={{ my: 2 }} />
                {!templateFields && (
                    <Alert severity="success">
                        No management required for this template. Your are all
                        set :&#41;
                    </Alert>
                )}
                {templateFields && (
                    <Box>
                        <Typography gutterBottom>
                            Select or map the fields/properties you want to
                            synchronize
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {Object.entries(templateFields.constants).map(
                                ([field, id]) => (
                                    <FormControlLabel
                                        control={<Switch />}
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
                                ([field, group]) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            my: 2,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                border: "1px solid #0e73f6",
                                                borderRadius: "5px",
                                                p: 0.9,
                                                fontSize: "14px",
                                            }}
                                        >
                                            {field}
                                        </Typography>
                                        <ArrowForwardIosRoundedIcon
                                            sx={{ mx: 1, color: "#0e73f6" }}
                                        />
                                        <CustomSelect
                                            value={mappings[group.id]}
                                            onChange={(e) =>
                                                handleChange(e, group.id)
                                            }
                                            size="small"
                                            sx={{ fontSize: "14px" }}
                                        >
                                            <CustomMenuItem value={false}>
                                                None
                                            </CustomMenuItem>
                                            {templateMappings[group.type].map(
                                                (option) => (
                                                    <CustomMenuItem
                                                        value={option}
                                                    >
                                                        {parseColumnName(
                                                            option
                                                        )}
                                                    </CustomMenuItem>
                                                )
                                            )}
                                        </CustomSelect>
                                    </Box>
                                )
                            )}
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{ color: "inherit" }}>
                <Typography variant="h5">Select Account Template</Typography>
            </DialogTitle>
            <DialogContent>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton
                                color="inherit"
                                onClick={handleStep(index)}
                            >
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ mt: 3 }}>
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
                        <Button onClick={handleClose} variant="text">
                            CANCEL
                        </Button>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    </Box>

                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                        NEXT
                    </Button>
                    <Button
                        onClick={handleApplyTemplate}
                        variant="outlined"
                        disabled={Object.keys(documentTemplate).length === 0}
                    >
                        Apply
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default TemplateSelection;
