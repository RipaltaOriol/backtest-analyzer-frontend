import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import parseColumnName from "utils/parseColumns";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import tableIcons from "../../assets/utils/IconProvider";
import LineChart from "../../common/LineChart";
import PieChart from "../../common/PieChart";
import SimpleTable from "../../common/SimpleTable";
import Notes from "../../pages/Analysis/Notes";
import BarGraph from "../graphs/BarGraph";
import ScatterGraph from "../graphs/ScatterGraph";
import { useGetChartsQuery } from "../statistics/statisticsApiSlice";
import SingleRecordDialog from "./SingleSetup/SingleRecordDialog";
import FilterList from "./filters/FilterList";

let dataLineChart = {};

let dataPieChart = {};

const options = { year: "numeric", month: "numeric", day: "numeric" };

let SetupView = ({ setup }) => {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const { data, isSuccess } = useGetChartsQuery({ setupId: setup?.id });

    if (isSuccess) {
        if (data) {
            dataLineChart = data.line;
            dataPieChart = data.pie;
        }
    }

    let dataColumns = [];
    let dataContents = [];

    useEffect(() => {
        setSelectedRow({});
    }, [setup?.id]);

    // move this other side
    if (setup && setup.state && Object.keys(setup.state).length !== 0) {
        let setupFields = setup.state.fields;

        const dateColumnsList = Object.keys(setupFields).filter((x) =>
            x.startsWith(".d_")
        );
        console.log(dateColumnsList);

        for (const column in setupFields) {
            // because RKT uses immer under the hood it doesn't allow to pass the column directly
            let isHidden = column === "imgs" || column === "note";
            dataColumns.push({
                title: parseColumnName(column),
                field: column,
                dateSetting: { locale: "en-GB" },
                hidden: isHidden,
            });
        }

        let setupData = setup.state.data;
        for (const rowIndex in setupData) {
            // TODO: index should not be added manually
            let { ...row } = setupData[rowIndex];
            row.index = rowIndex;
            for (let dateColumn of dateColumnsList) {
                row[dateColumn] = new Date(row[dateColumn]).toLocaleDateString(
                    "en-EN",
                    options
                );
            }
            dataContents.push(row);
        }
    }

    return (
        <Box>
            {/* <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ButtonGroup variant="contained">
          <Button onClick={() => setIsTableOpen(!isTableOpen)}>Toggle Tables</Button>
          <Button onClick={() => setIsNotesOpen(!isNotesOpen)}>Toggle Notes</Button>
          <Button onClick={() => setIsImageOpen(!isImageOpen)}>Toggle Images</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained">
          <Button onClick={handleClickOpen}>Filter</Button>
          <Tooltip
            title="If your table has a lot of columns the PDF might fail to capture them properly"
            placement="bottom-end"
            arrow
          >
            <Button
              endIcon={<InfoIcon />}
              onClick={() => downloadPDFFile({setupId: setup?.id, name: setup?.name})}
            >
              Export</Button>
          </Tooltip>
        </ButtonGroup>
      </Box> */}
            <FilterList setupId={setup?.id} filters={setup?.filters} />
            {/* <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={5}>
          <Notes setupId={setup?.id} notes={setup?.notes} isOpened={isNotesOpen} />
        </Grid>
        <Grid item xs={7}>
          { isImageOpen && (
            <img
              className={classes.contianedImage}
              src={selectedRow['.s'] || MissingScreenshot}
              alt="Trade screenshot"
            />
          )}
        </Grid>
      </Grid> */}
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <LineChart dataLineChart={dataLineChart} />
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            border: "1px solid #E5E9EB",
                            borderRadius: "6px",
                            p: 2,
                        }}
                    >
                        <PieChart dataPieChart={dataPieChart} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    {setup?.id && <BarGraph setupId={setup?.id} />}
                </Grid>
                <Grid item xs={6}>
                    {setup?.id && <ScatterGraph setupId={setup?.id} />}
                </Grid>
                <Grid item xs={6}>
                    <SimpleTable id={setup?.id} />
                </Grid>
                <Grid item xs={6}>
                    <Notes setupId={setup?.id} notes={setup?.notes} />
                </Grid>
                <Grid item xs={12} sx={{ width: "1200px" }}>
                    <MaterialTable
                        title={<Typography>Data</Typography>}
                        columns={dataColumns}
                        data={dataContents}
                        onRowClick={(evt, newSelectedRow) => {
                            if (newSelectedRow.index === selectedRow.index) {
                                setOpen(true);
                            }
                            setSelectedRow(newSelectedRow);
                        }}
                        options={{
                            padding: "dense",
                            pageSize: 10,
                            rowStyle: (rowData) => ({
                                fontSize: 14,
                                backgroundColor:
                                    selectedRow?.index === rowData?.index
                                        ? "#D7EDFF"
                                        : "#fff",
                            }),
                            headerStyle: {
                                whiteSpace: "nowrap",
                            },
                        }}
                        icons={tableIcons}
                    />
                </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
          <Grid item xs={6}>
              <LineChart dataLineChart={dataLineChart} />
          </Grid>
          <Grid item xs={6}>
              <SimpleTable id={setup?.id} />
          </Grid>
      </Grid> */}
            {/* <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={2}>
              <PieChart dataPieChart={dataPieChart} />
          </Grid>
          <Grid item xs={6}>
              {setup?.id && <ScatterGraph setupId={setup?.id} />}
          </Grid>
          <Grid item xs={6}>
              {setup?.id && <BarGraph setupId={setup?.id} />}
          </Grid>
        </Grid> */}

            {/* { isTableOpen && (
        <MaterialTable
          title='Data'
          columns={dataColumns}
          data={dataContents}
          editable={{
            onRowAdd: newData => {
              console.log(newData)
            }
              // new Promise((resolve, reject) => {
              //   setTimeout(() => {
              //     setData([...data, newData]);
              //     resolve();
              //   }, 1000)
              // })
          }}
          onRowClick={(evt, selectedRow) => {
            setSelectedRow(selectedRow)
          }}
          options={{
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow?.index === rowData?.index ? "#0d6efd" : "#fff",
              color:
                selectedRow?.index === rowData?.index ? "#fff" : "#000",
            }),
            
          }}
          icons={tableIcons}
        />
      )} */}
            {/* popup to display a trade */}
            <SingleRecordDialog
                open={open}
                onClose={() => setOpen(false)}
                setupId={setup?.id}
                rowRecord={selectedRow}
            />
        </Box>
    );
};

export default SetupView;
