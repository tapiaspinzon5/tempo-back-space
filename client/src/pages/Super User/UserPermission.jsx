import React, { useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {
  BoxData,
  ButtonAction,
  InputText,
  MainPage,
  ModalBox,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import CardPermissions from "../../components/SuperAdmin/CardPermissions";
import UserTablePermissions from "../../components/SuperAdmin/UserTablePermissions";
import AddUserSuperAdmin from "../../components/Modals/AddUserSuperAdmin";
import SearchCampaign from "../../components/SuperAdmin/SearchCampaign";
import SearchDirCampaign from "../../components/SuperAdmin/SearchDirCampaign";

const userPermissions = [
  { rol: "OPM", tag: "Operation Manager" },
  { rol: "QAL", tag: "QA Lead" },
  { rol: "TL", tag: "Team Leader" },
  { rol: "AG", tag: "Agent" },
  { rol: "RPL", tag: "Reporting Lead" },
  { rol: "SU", tag: "Super Admin" },
  { rol: "DIR", tag: "Cluster Director" },
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

const datosCampaign = [
  { campaign: "Bavaria", idCampaign: 1994 },
  { campaign: "Netflix", idCampaign: 1972 },
  { campaign: "Microsoft", idCampaign: 1974 },
  { campaign: "P&G", idCampaign: 2008 },
  { campaign: "Disney", idCampaign: 1957 },
  { campaign: "Lenovo", idCampaign: 1993 },
  { campaign: "HP", idCampaign: 1994 },
];

const UserPermission = () => {
  const [permissions, setPermissions] = useState(false);
  const [showAccounts, setShowAccounts] = useState(true);
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
  const handleDirCapaign = () => {};

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
            <Box>
              <CardPermissions
                setRole={setRole}
                permissions={userPermissions}
              />
              {role === "Cluster Director" && showAccounts && (
                <Box
                  sx={{
                    width: 250,
                    marginTop: "1rem",
                    marginLeft: "10.5rem",
                    position: "absolute",
                    background: "#fff",
                  }}
                >
                  <SearchDirCampaign
                    dataCampaign={datosCampaign}
                    setShowAccounts={setShowAccounts}
                  />
                </Box>
              )}
            </Box>
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
