import React from "react";
import {
  BoxUpFile,
  ButtonAction,
  MainPage,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { Grid, Typography, styled, Box } from "@mui/material";
import { FiDownload, FiUpload } from "react-icons/fi";
import TableKPIUpload from "../../components/ReportingLead/TableKPIUpload";

const Item = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  p: {
    color: "#3047B0",
  },
}));

const BoxButton = styled(Box)(() => ({
  display: "flex",
  margin: "1rem 0",
}));

const dataKPI = [
  { acron: "AHT", description: "Average Handle Time", idKPI: 12 },
  { acron: "SSKI", description: "Soft Skills", idKPI: 23 },
  { acron: "QA", description: "Quality Assurance", idKPI: 34 },
  { acron: "EXE", description: "Execution", idKPI: 56 },
  { acron: "ABS", description: "Absemteeism", idKPI: 67 },
];

const KpiUpload = () => {
  const uploadFile = (e) => {
    const fileKPI = e.target.files[0];
    console.log(fileKPI);
  };

  return (
    <MainPage minHeight="100vh">
      <Header />
      <Typography variant="h5">Kpi's Upload Section</Typography>
      <BoxButton>
        <ButtonAction startIcon={<FiDownload />}>
          Download Template
        </ButtonAction>
        <BoxUpFile>
          <label htmlFor="kpi">
            <FiUpload size={20} />
            Upload
          </label>
          <input
            type="file"
            id="kpi"
            name="kpi"
            onChange={(e) => uploadFile(e)}
          />
        </BoxUpFile>
      </BoxButton>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Item>
            <TableKPIUpload dataKPI={dataKPI} />
          </Item>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default KpiUpload;
