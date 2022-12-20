import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const MenuButton = styled(Button)({
    color: "#252C32",
    backgroundColor: "#fff",
    border: "1px solid #DDE2E4",
    padding: "4px 12px",
    textTransform: "none",
    borderRadius: "6px",
});

const SetupMenuItem = styled(MenuItem)({
    borderRadius: "6px",
    "&:hover": {
        color: "#0E73F6",
        backgroundColor: "#D7EDFF",
    },
});

let SetupDropdown = ({ defaultSetup, setups, changeSetup }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [selectedSetup, setSelectedSetup] = useState(
        defaultSetup?.name || ""
    );

    useEffect(() => {
        if (defaultSetup) {
            setSelectedSetup(defaultSetup?.name);
            changeSetup(defaultSetup);
        }
        // if issues appear I might have to comment out changeSetup
    }, [defaultSetup, changeSetup]);

    const handleChangeSetup = (id) => {
        const changedSetup = setups.find((setup) => setup.id === id);
        setSelectedSetup(changedSetup?.name);
        changeSetup(changedSetup);
    };

    return (
        <>
            <MenuButton color="secondary" sx={{ ml: 1 }} onClick={handleClick}>
                <Typography sx={{ color: "#9AA6AC", fontSize: "14px" }}>
                    Setup
                </Typography>
                &nbsp;
                <Typography
                    sx={{
                        color: "#4094F7",
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    {selectedSetup || "Loading"}
                </Typography>
            </MenuButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false}
            >
                {setups.map((setup) => (
                    <SetupMenuItem
                        onClick={() => {
                            handleClose();
                            handleChangeSetup(setup.id);
                        }}
                    >
                        {setup.name}
                    </SetupMenuItem>
                ))}
            </Menu>
        </>
    );
};

export default SetupDropdown;
