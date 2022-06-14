import { useState, useEffect } from 'react';
import { setSetup } from './setupSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { skipToken } from "@reduxjs/toolkit/query"
import React from 'react';

import {
    useGetSetupQuery,
    useGetSetupsQuery
} from './setupsApiSlice'


import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { getSelectors } from './setupsApiSlice';
import { useSelector } from 'react-redux'
import {
    selectSetupName,
    selectSetupId,
} from "./setupSlice"

let SetupDropdown = () => {

    const dispatch = useDispatch()
    const { documentId } = useParams()

    let setupsMenu;
    let defaultSetup;

    const { isFetching } = useGetSetupsQuery({ documentId })

    // let setupsMenu;
    // const { selectAll: selectAllSetups } = getSelectors({documentId})
    // const allSetups = useSelector(selectAllSetups)

    const { selectAll: selectAllSetups } = getSelectors({documentId})
    const allSetups = useSelector(selectAllSetups)

    // SetupSlice
    const setupId = useSelector(selectSetupId)


    // Loads all of the Setups
    if (!isFetching) {
        console.log('Done Fetching')
        defaultSetup = allSetups.find((setup) => setup.default)
        setupsMenu = allSetups.map(setup => {
            return (<MenuItem value={setup.id}>{setup.name}</MenuItem>)
        })
        // dispatch(setSetup({ id: defaultSetup.id }))
    }

    // On first render it used the defualtSetup as a base Setup
    const {data, isSuccess: isRendered} = useGetSetupQuery({ documentId, setupId })
    if (isRendered) {
        dispatch(setSetup(data))
    }


    // This code will fail but it shows the what I am trying to achieve when selecting a
    // Setup from the dropdown
    const handleChange = async (event) => {
        // const {data, isSuccess: isRendered} = useGetSetupQuery({ documentId, id: event.target.value })
        const sampleData = {
            id: event.target.value
        }
        dispatch(setSetup(sampleData))

    };

    return (
        <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Setup</InputLabel>
            <Select
                value={setupId}
                onChange={handleChange}
                label="Setup"
            >
                {setupsMenu}
            </Select>
        </FormControl>
    )
}

SetupDropdown = React.memo(SetupDropdown)
export default SetupDropdown;