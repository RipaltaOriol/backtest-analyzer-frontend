import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSetup, selectSetupId } from "./setupSlice";

import { getSelectors } from "./setupsApiSlice";
import { useGetSetupQuery, useGetSetupsQuery } from "./setupsApiSlice";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


let SetupDropdown = () => {

  let setupsMenu;
  let defaultSetup;

  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const { documentId } = useParams();

  const { isFetching } = useGetSetupsQuery({ documentId });

  const { selectAll: selectAllSetups } = getSelectors({ documentId });

  let setupId = useSelector(selectSetupId);
  const allSetups = useSelector(selectAllSetups);

  // Loads all setups and selects default
  if (!isFetching) {
    defaultSetup = allSetups.find((setup) => setup.default);
    setupsMenu = allSetups.map((setup) => {
      return <MenuItem value={setup.id}>{setup.name}</MenuItem>;
    });
  }

  // Select the new SetupId
  if (setupId) {
    // Find the default document
    var foundDocumentId = allSetups.find((setup) => setup.id === setupId);
    // If setup is found 
    if (!foundDocumentId) {
      setupId = undefined;
    }
  }

  if (setupId === undefined) {
    setupId = defaultSetup?.id;
  }

  // On first render use the default as the base setup
  const { data, isSuccess: isRendered, isLoading, refetch } = useGetSetupQuery({
    documentId,
    setupId: setupId || undefined,
  });

  if (isRendered && !isLoading) {
    if (setupId === undefined || setupId === data._id.$oid) {
      const { state, name, default: defVal, filters, _id, options } = data;
      console.log(filters)
      dispatch(
        setSetup({ id: _id.$oid, name, default: defVal, state, filters, options })
      );
    } else if (setupId !== undefined) {
      // setValue((value) => value + 1);
    }
  }

  // Handles a change of setup in the dropdown
  const changeSetup = (event) => {
    dispatch(setSetup({ id: event.target.value }));
    setId(event.target.value);
    refetch()
  }

  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
      {setupId === defaultSetup?.id ? (
        <InputLabel>{`${defaultSetup?.name || "DEFAULT"}`}</InputLabel>
      ) : (
        <InputLabel>Setup</InputLabel>
      )}
      {setupId === defaultSetup?.id ? (
        <Select
          value={setupId}
          onChange={(e) => changeSetup(e)}
          label="Setup"
          renderValue={(value) => (value ? `${defaultSetup?.name || "DEFAULT"}` : <em>DEFAULT</em>)}
        >
          {setupsMenu}
        </Select>
      ) : (
        <Select value={setupId} onChange={(e) => changeSetup(e)} label="Setup">
          {setupsMenu}
        </Select>
      )}
    </FormControl>
  );
};

export default SetupDropdown;
