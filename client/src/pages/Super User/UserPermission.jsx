import React, { useState, useEffect, useRef } from "react";
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

import AddUserSuperAdmin from "../../components/Modals/AddUserSuperAdmin";
import SearchCampaign from "../../components/SuperAdmin/SearchCampaign";
import SearchDirCampaign from "../../components/SuperAdmin/SearchDirCampaign";
import { requestWithData } from "../../utils/api";
import DataGridUserPermissions from "../../components/SuperAdmin/DataGridUserPermissions";

const userPermissions = [
  { rol: "OPM", tag: "Operation Manager" },
  { rol: "QAL", tag: "QA Lead" },
  { rol: "TL", tag: "Team Leader" },
  { rol: "AG", tag: "Agent" },
  { rol: "RPL", tag: "Reporting Lead" },
  { rol: "SU", tag: "Super Admin" },
  { rol: "DIR", tag: "Cluster Director" },
];

const UserPermission = () => {
  const ref = useRef();
  const [permissions, setPermissions] = useState(false);
  const [showAccounts, setShowAccounts] = useState(true);
  const [width, setWidth] = useState(0);
  const [role, setRole] = React.useState("");
  const [campaign, setCampaign] = useState([]);
  const [dataCampaign, setDataCampaign] = React.useState([]);
  const [dataAgent, setDataAgent] = React.useState([]);
  const [newUser, setNewUser] = useState([]);
  const [searchCampaign, setSearchCampaign] = useState("");
  const [open, setOpen] = React.useState(false);
  const [checkUser, setCheckUser] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData2();
  }, [searchCampaign]);
  let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;
  useEffect(() => {
    setWidth(ancho);
  }, [ancho]);

  const getData = async () => {
    const data = await requestWithData("getorganizationalunit", {
      context: 1,
    });
    console.log(data.data[0]);
    setCampaign(data.data[0]);
    setSearchCampaign(data.data[0].Campaign[0].IdCampaign);
  };

  const getData2 = async () => {
    const data = await requestWithData("getorganizationalunit", {
      context: 5,
      idcampaign: searchCampaign,
    });

    console.log(data.data[0].AgentsCampaign);
    setDataAgent(data.data[0].AgentsCampaign);
  };

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
                checkUser={checkUser}
              />
              {role === "Cluster Director" && showAccounts && (
                <Box
                  sx={{
                    width: "250px",
                    marginTop: "1rem",
                    marginLeft: "10.5rem",
                    position: "absolute",
                    background: "#fff",
                    zIndex: 1100,
                  }}
                >
                  <SearchDirCampaign
                    dataCampaign={campaign.Campaign}
                    setShowAccounts={setShowAccounts}
                  />
                </Box>
              )}
            </Box>
          ) : (
            <SearchCampaign
              campaign={campaign}
              searchCampaign={searchCampaign}
              setSearchCampaign={setSearchCampaign}
            />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BoxData mt={2}>
          {dataAgent.length > 0 ? (
            <>
              <DataGridUserPermissions
                dataAgent={dataAgent}
                width={width}
                setCheckUser={setCheckUser}
              />
            </>
          ) : (
            "No Data"
          )}
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
            campaign={campaign.Campaign}
          />
        </ModalBox>
      </Modal>
    </MainPage>
  );
};

export default UserPermission;
