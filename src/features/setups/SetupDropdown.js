import { useState, useEffect } from "react";
import { setSetup } from "./setupSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import React from "react";

import { useGetSetupQuery, useGetSetupsQuery } from "./setupsApiSlice";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { getSelectors } from "./setupsApiSlice";
import { useSelector } from "react-redux";
import { selectSetupName, selectSetupId } from "./setupSlice";

let SetupDropdown = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const { documentId } = useParams();

  let setupsMenu;
  let defaultSetup;

  const { isFetching } = useGetSetupsQuery({ documentId });

  const { selectAll: selectAllSetups } = getSelectors({ documentId });
  const allSetups = useSelector(selectAllSetups);

  // SetupSlice
  let setupId = useSelector(selectSetupId);

  // Loads all of the Setups
  if (!isFetching) {
    console.log("Done Fetching", "allSetups :", allSetups);
    defaultSetup = allSetups.find((setup) => setup.default);
    setupsMenu = allSetups.map((setup) => {
      return <MenuItem value={setup.id}>{setup.name}</MenuItem>;
    });
    // dispatch(setSetup({ id: defaultSetup.id }))
  }

  console.log("setup id is :", setupId);
  if (setupId) {
    var foundDocumentId = allSetups.find((setup) => setup.id === setupId);
    console.log(foundDocumentId);

    if (foundDocumentId) {
      console.log(foundDocumentId);
    } else {
      setupId = undefined;
    }
  }
  if (setupId === undefined) {
    console.log(
      "defaultSetup?.id :,defaultSetup?.id",
      defaultSetup,
      defaultSetup?.id
    );
    setupId = defaultSetup?.id;
  }

  console.log("setup id is :", setupId);
  // On first render it used the defualtSetup as a base Setup
  const { data, isSuccess: isRendered } = useGetSetupQuery({
    documentId,
    setupId: setupId || undefined,
  });
  if (isRendered) {
    console.log("is Rendereed Data:", data);
    // data.id = setupId;
    console.log(
      "condition",
      setupId === undefined || setupId === data._id.$oid
    );
    console.log("setup id  undefined ", setupId === undefined);
    console.log("setup id  data ", setupId === data._id.$oid);
    console.log(setupId, data._id.$oid);
    // console.log("se")
    if (setupId === undefined || setupId === data._id.$oid) {
      const response = data;
      const { state, name, default: defVal, filters, _id } = data;
      console.log("data id : ", response._id.$oid);
      // response.id = response._id.$oid;
      dispatch(
        setSetup({ id: _id.$oid, name, default: defVal, state, filters })
      );
    } else if (setupId !== undefined) {
      // setValue((value) => value + 1);
    }
  }

  // This code will fail but it shows the what I am trying to achieve when selecting a
  // Setup from the dropdown
  const TestChange = (event) => {
    // const {data, isSuccess: isRendered} = useGetSetupQuery({ documentId, id: event.target.value })
    const sampleData = {
      id: event.target.value,
    };
    dispatch(setSetup(sampleData));
    setId(event.target.value)
  }

  return (
    // {deffaultSetup?}
    <FormControl sx={{ minWidth: 200 }} size="small">
      {setupId === defaultSetup?.id ? (
        <InputLabel>{`${defaultSetup?.name || "DEFAULT"}`}</InputLabel>
      ) : (
        <InputLabel>Setup</InputLabel>
      )}

      {setupId === defaultSetup?.id ? (
        <Select
          value={setupId}
          onChange={(e) => TestChange(e)}
          label="Setup"
          renderValue={(value) => (value ? `${defaultSetup?.name || "DEFAULT"}` : <em>DEFAULT</em>)}
        >
          {setupsMenu}
        </Select>
      ) : (
        <Select value={setupId} onChange={(e) => TestChange(e)} label="Setup">
          {setupsMenu}
        </Select>
      )}
    </FormControl>
  );
};

// SetupDropdown = React.memo(SetupDropdown);
export default SetupDropdown;
