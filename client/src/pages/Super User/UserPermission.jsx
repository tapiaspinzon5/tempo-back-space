import React, { useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import {
  BoxData,
  ButtonAction,
  MainPage,
  ModalBox,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import CardPermissions from "../../components/SuperAdmin/CardPermissions";
import UserTablePermissions from "../../components/SuperAdmin/UserTablePermissions";
import AddUserSuperAdmin from "../../components/Modals/AddUserSuperAdmin";
import SearchCampaign from "../../components/SuperAdmin/SearchCampaign";

const userPermissions = [
  { rol: "OPM", tag: "Operation Manager" },
  { rol: "QAL", tag: "QA Lead" },
  { rol: "TL", tag: "Team Leader" },
  { rol: "AG", tag: "Agent" },
  { rol: "RPL", tag: "Reporting Lead" },
  { rol: "SU", tag: "Super Admin" },
];

const data = [
  {
    idccms: 123456,
    name: "Deiby Niño Garces",
    team: "GP Devs",
    lob: "FrontEnd",
    campaign: "SpaceGP",
    rol: "Frontend",
  },
  {
    idccms: 365478,
    name: "Daniel Moreno",
    team: "GP Devs",
    lob: "Full Stack",
    campaign: "SpaceGP",
    rol: "Full Stack",
  },
  {
    idccms: 563214,
    name: "Diego Tapias",
    team: "GP Devs",
    lob: "Backend",
    campaign: "SpaceGP",
    rol: "BackEnd",
  },
  {
    idccms: 893215,
    name: "Matilde Puentes",
    team: "GP Devs",
    lob: "DDBB",
    campaign: "SpaceGP",
    rol: "DDBB",
  },
];

const UserPermission = () => {
  const [permissions, setPermissions] = useState(false);
  const [role, setRole] = React.useState("");
  const [dataCampaign, setDataCampaign] = React.useState([]);
  const [dataAgent, setDataAgent] = React.useState(data);
  const [newUser, setNewUser] = useState([]);
  const [searchCampaign, setSearchCampaign] = useState("");
  const [open, setOpen] = React.useState(false);
  const [checkUser, setCheckUser] = React.useState();

  const handleOpen = (camp) => {
    if (camp) {
      setDataCampaign(camp);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDataCampaign([]);
  };

  const handleDeleteUser = () => {};

  return (
    <MainPage>
      <Box>
        <Header />
        <Typography variant="h5">Set New User Permissions</Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="flex-end" height="5rem">
            <ButtonAction onClick={() => handleOpen()}>New User</ButtonAction>

            <ButtonAction onClick={() => handleDeleteUser()}>
              Delete User
            </ButtonAction>
            <ButtonAction onClick={() => setPermissions(!permissions)}>
              Permissions
            </ButtonAction>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {permissions ? (
            <CardPermissions setRole={setRole} permissions={userPermissions} />
          ) : (
            <SearchCampaign
              searchCampaign={searchCampaign}
              setSearchCampaign={setSearchCampaign}
            />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BoxData mt={2}>
          <UserTablePermissions
            dataAgent={dataAgent}
            setCheckUser={setCheckUser}
          />
        </BoxData>
      </Grid>
      <Footer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox sx={{ width: { xs: "350px", md: "350px", lg: "350px" } }}>
          <AddUserSuperAdmin
            newUser={newUser}
            setNewUser={setNewUser}
            permissions={userPermissions}
          />
        </ModalBox>
      </Modal>
    </MainPage>
  );
};

export default UserPermission;
