import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import {
  BoxData,
  ButtonAction,
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

const MySwal = withReactContent(Swal);

const userPermissions = [
  {
    roleSpace: "SPACE Project Commander",
    rol: "OPM",
    tag: "Operation Manager",
  },
  { roleSpace: "Mission Specialist ", rol: "QAL", tag: "QA Lead" },
  { roleSpace: "Pilot", rol: "TL", tag: "Team Leader" },
  { roleSpace: "Cosmonaut", rol: "AG", tag: "Agent" },
  { roleSpace: "Flight Engineer", rol: "RPL", tag: "Reporting Lead" },
  { roleSpace: "Spacecraft Commander", rol: "SU", tag: "Super Admin" },
  { roleSpace: "Cluster Director", rol: "DIR", tag: "Cluster Director" },
];

const UserPermission = () => {
  const ref = useRef();
  // const dispatch = useDispatch();
  const userData = useSelector((store) => store.loginUser.userData);
  const [permissions, setPermissions] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [width, setWidth] = useState(0);
  const [role, setRole] = React.useState("");
  const [roleSpace, setRoleSpace] = React.useState("");
  const [campaign, setCampaign] = useState([]);
  const [dataCampaign, setDataCampaign] = React.useState([]);
  const [teamLeader, setTeamLeader] = useState({
    idLob: "",
    idTeam: "",
  });
  const [dataAgent, setDataAgent] = React.useState([]);
  const [newUser, setNewUser] = useState([]);
  const [searchCampaign, setSearchCampaign] = useState("");
  const [open, setOpen] = React.useState(false);
  const [checkUser, setCheckUser] = React.useState([]);
  const [token, setToken] = React.useState("");
  const [check, setCheck] = useState([]);

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
    //console.log(data.data[0]);
    setCampaign(data.data[0]);
    setNewUser({
      ...newUser,
      idCampaign: [data.data[0].Campaign[0].IdCampaign],
    });
    setSearchCampaign(data.data[0].Campaign[0].IdCampaign);
  };

  const getData2 = async () => {
    const data = await requestWithData("getorganizationalunit", {
      context: 5,
      idcampaign: searchCampaign,
    });

    //console.log(data.data[0].AgentsCampaign);
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
    setShowAccounts(false);
    setNewUser([]);
  };

  const handleState = async () => {
    MySwal.fire({
      title: <p>Do you want to delete this user?</p>,
      icon: "question",
      confirmButtonText: "Accept",
      showDenyButton: true,
      allowOutsideClick: false,
    }).then((resultado) => {
      if (resultado.value) {
        const req = async () => {
          const changeState = await requestWithData("postinactivateuser", {
            idccmsUser: checkUser.Ident,
            fcmToken: token,
            inactivate: 1,
            nameRequester: userData.Nombre,
          });

          if (changeState.status === 200) {
            getData2();
            MySwal.fire({
              title: <p>Request Sent!</p>,
              icon: "success",
            });
          } else {
            MySwal.fire({
              title: <p>Houston, we have a problem! </p>,
              icon: "error",
            });
          }
        };
        req();
      }
    });
    setCheck([]);
  };

  //cambio de Rol de un Agente
  const handleChangeRol = () => {
    let msj;
    if (
      role === "Operation Manager" ||
      role === "QA Lead" ||
      role === "Reporting Lead"
    ) {
      msj = `Do you want to change this user role? By accepting, the current ${role} will be replaced`;
    } else {
      msj = `Do you want to change this user role to ${role}?`;
    }
    MySwal.fire({
      title: <p>{msj}</p>,
      icon: "question",
      confirmButtonText: "Accept",
      showDenyButton: true,
      allowOutsideClick: false,
    }).then((resultado) => {
      if (resultado.value) {
        const req = async () => {
          const changeState = await requestWithData("postchangeuserrole", {
            idccmsUser: +checkUser.Ident,
            role: role,
            context: teamLeader.context,
            idLob: teamLeader.idLob,
            idTeam: teamLeader.idTeam,
            idCampaign: check,
            emails: [
              {
                email: checkUser.email,
                name: checkUser.Agent,
                rol: roleSpace,
                rolManager: "Spacecraft Commander",
              },
            ],
          });

          if (changeState.status === 200) {
            getData2();
            MySwal.fire({
              title: <p>Change successfully!!</p>,
              icon: "success",
            });
          } else {
            MySwal.fire({
              title: <p>Houston, we have a problem! </p>,
              icon: "error",
            });
          }
        };
        req();
      }
    });

    setCheck([]);
    setTeamLeader({});
    setRole("");
    setCheckUser([]);
  };

  console.log(teamLeader);

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

            <ButtonAction onClick={() => handleState()}>
              Delete User
            </ButtonAction>
            <ButtonAction onClick={() => setPermissions(!permissions)}>
              {!permissions ? "Permissions" : "Accounts"}
            </ButtonAction>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {permissions ? (
            <Box>
              <CardPermissions
                setRole={setRole}
                role={role}
                permissions={userPermissions}
                checkUser={checkUser}
                handleChangeRol={handleChangeRol}
                setShowAccounts={setShowAccounts}
                dataAgent={dataAgent}
                searchCampaign={searchCampaign}
                setRoleSpace={setRoleSpace}
                teamLeader={teamLeader}
                setTeamLeader={setTeamLeader}
              />
              {role === "Cluster Director" && showAccounts ? (
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
                    check={check}
                    setCheck={setCheck}
                  />
                </Box>
              ) : (
                <></>
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
                setToken={setToken}
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
            dataAgent={dataAgent}
            handleClose={handleClose}
            setShowAccounts={setShowAccounts}
            setSearchCampaign={setSearchCampaign}
            getData2={getData2}
            teamLeader={teamLeader}
            setTeamLeader={setTeamLeader}
          />
        </ModalBox>
      </Modal>
    </MainPage>
  );
};

export default UserPermission;
