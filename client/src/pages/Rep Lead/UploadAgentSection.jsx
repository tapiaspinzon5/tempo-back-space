import React, { useState } from "react";
import { Typography, Grid, Box, styled } from "@mui/material";
import {
  BoxUpFile,
  ButtonAction,
  MainPage,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { FiDownload, FiUserPlus, FiUpload } from "react-icons/fi";
import TableAgentUpload from "../../components/ReportingLead/TableAgentUpload";
import NewAgentForm from "../../components/ReportingLead/NewAgentForm";

const Item = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  p: {
    color: "#3047B0",
  },
}));

const dataAgent = [
  { agent: "Deiby NIño", ccmsid: 4472074, teamLead: "", lob: "" },
  {
    agent: "Matilde Puentes Guriterrez",
    ccmsid: 441145,
    teamLead: "",
    lob: "",
  },
  { agent: "Daniel Moreno ", ccmsid: 423516, teamLead: "", lob: "" },
  { agent: "Diego Tapias", ccmsid: 356980, teamLead: "", lob: "" },
  {
    agent: "Diego Pregonero",
    ccmsid: 654321,
    teamLead: "",
    lob: "",
  },
  { agent: "Gustavo Murcia ", ccmsid: 123456, teamLead: "", lob: "" },
];

const UploadAgentSection = () => {
  const [newAgent, setNewAgent] = useState(false);
  return (
    <MainPage>
      <Header />
      <Typography variant="h5">
        Agent Upload Section (Crew Assignment)
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} display="flex">
          <ButtonAction startIcon={<FiDownload />}>
            Download Template
          </ButtonAction>
          <BoxUpFile>
            <label htmlFor="agents">
              <FiUpload size={20} />
              Upload
            </label>
            <input
              type="file"
              id="agents"
              name="agents"
              //onChange={(e) => uploadFile(e)}
            />
          </BoxUpFile>
          <ButtonAction
            startIcon={<FiUserPlus />}
            onClick={() => setNewAgent(!newAgent)}
          >
            New Agent
          </ButtonAction>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Item>
            <TableAgentUpload dataAgent={dataAgent} />
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {newAgent && (
            <Item>
              <NewAgentForm />
            </Item>
          )}
        </Grid>
      </Grid>

      <Footer />
    </MainPage>
  );
};

export default UploadAgentSection;
