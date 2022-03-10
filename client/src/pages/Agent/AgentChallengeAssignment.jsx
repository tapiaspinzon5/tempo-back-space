import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography, Button, Box } from "@mui/material";
import Header from "../../components/homeUser/Header";
import Footer from "../../components/Footer";
import {
  downloadActivities,
  downloadUsers,
  assingChallenges,
  assingTpvs,
} from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import { ModalLoading } from "../../components/ModalLoading";
import { UserChallenge } from "../../components/Agents/Challenges/UserChallenge";
import { ChallengeCard } from "../../components/Agents/Challenges/ChallengeCard";
import TPVSectionChallenge from "../../components/Agents/Challenges/TPVSectionChallenge";
import tpv1 from "../../assets/images/tpv/tpv1.png";
import {
  validateDataCheck,
  validateDataCheckTpvs,
} from "../../helpers/helpers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//import { onMessageListener } from "../../utils/firebase";

const MySwal = withReactContent(Swal);

const MainCA = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  color: "#3047b0",

  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const BoxSelectBadge = styled(Grid)(() => ({
  button: {
    textTransform: "none",
    background: "#fff",
    margin: "5px",
    width: "9rem",
    fontWeight: "600",
    border: "1px solid #00000009",
  },

  margin: "2rem 0",
}));

const BoxActivity = styled(Grid)(() => ({
  background: "#f2f2f2",
  padding: "1rem",
  borderRadius: "20px",
}));

const Boxview = styled(Grid)(() => ({
  overflowY: "scroll",
  height: "50vh",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

const selectButton = {
  boxShadow: "0px 3px 6px #00000029",
  borderRadius: "10px",
  textTransform: "none",
};
export const AgentChallengeAssignment = ({ count }) => {
  const [loading, setLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(false);
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const userName = userData.Nombre;
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState(true);
  const [tpvs, setTpvs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const user = await downloadUsers(idccms);
      if (user && user.status === 200 && user.data.length > 1) {
        setLoading(true);
        let ccmsAgent = user.data[0].Agents[0].ident;
        user.data[0].Agents[0].isChecked = true;
        setUsers(user.data[0].Agents);
        setTpvs(user.data[1].Tpvs);
        const activities = await downloadActivities(ccmsAgent, idccms);
        if (
          activities &&
          activities.status === 200 &&
          activities.data.length > 1
        ) {
          setActivity(activities.data);
          setLoading(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    };

    getData();
    // eslint-disable-next-line
  }, []);

  //funcion de asingacion de usuarios
  const handleUser = async (e) => {
    setLoading(true);
    const { value, checked } = e.target;
    let tempUser = users.map((user) =>
      user.Agent === value.split("-")[0]
        ? { ...user, isChecked: checked }
        : { ...user, isChecked: false }
    );
    setUsers(tempUser);
    const activities = await downloadActivities(value.split("-")[1], idccms);
    if (activities && activities.status === 200 && activities.data.length > 1) {
      setActivity(activities.data);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  ///Función Envio de Challenges
  const handleSubmit = async (data) => {
    setFullLoading(true);
    const dataToSendChallenge = await validateDataCheck(users, data, userName);
    const sendChallenge = await assingChallenges(dataToSendChallenge, idccms);
    if (sendChallenge && sendChallenge.status === 200) {
      setFullLoading(false);
      MySwal.fire({
        title: <p>Successful Assignments</p>,
        icon: "success",
        confirmButtonText: "Accept",
        allowOutsideClick: false,
      }).then((resultado) => {
        if (resultado.value) {
          window.location.reload();
        }
      });
    } else {
      setLoading(false);
      MySwal.fire({
        title: <p>Send Error</p>,
        icon: "error",
      });
    }
  };
  ///Función Envio de Tpvs
  const handleSubmitTpvs = async (tpv) => {
    setFullLoading(true);
    const dataToSendTpv = await validateDataCheckTpvs(users, tpv, userName);
    console.log(dataToSendTpv);
    /* const sendTpv = await assingTpvs(dataToSendTpv, idccms);
    if (sendTpv && sendTpv.status === 200) {
      setFullLoading(false);
      MySwal.fire({
        title: <p>Successful Assignments</p>,
        icon: "success",
        confirmButtonText: "Accept",
        allowOutsideClick: false,
      }).then((resultado) => {
        if (resultado.value) {
          window.location.reload();
        }
      });
    } else {
      setLoading(false);
      MySwal.fire({
        title: <p>Send Error</p>,
        icon: "error",
      });
    } */
  };

  return (
    <>
      {fullLoading && <ModalLoading />}
      <MainCA>
        <Header count={count} />
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight={500}>
              Challenge Assignment
            </Typography>
          </Grid>

          <BoxSelectBadge item xs={4}>
            <Button sx={view && selectButton} onClick={() => setView(true)}>
              Challenges
            </Button>
            <Button sx={!view && selectButton} onClick={() => setView(false)}>
              TPVs
            </Button>
          </BoxSelectBadge>
          {!view && (
            <BoxSelectBadge
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                <img src={tpv1} alt="img ref" height={12} width={12} />
                Available {"  "}
                <img
                  src={tpv1}
                  alt="img ref"
                  height={12}
                  width={12}
                  style={{ filter: "grayscale(100%)" }}
                />
                Non Available
              </Typography>
            </BoxSelectBadge>
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} padding={1}>
            <BoxActivity>
              <Box marginBottom={2}></Box>
              <Boxview>
                {!error ? (
                  users.map((user, index) => (
                    <UserChallenge
                      key={index}
                      user={user}
                      handleUser={handleUser}
                    />
                  ))
                ) : (
                  <Typography variant="h5" fontWeight={500}>
                    The Game Starts Soon
                  </Typography>
                )}
              </Boxview>
            </BoxActivity>
          </Grid>
          <Grid item xs={12} md={6} padding={1}>
            <BoxActivity>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={2}
              ></Box>
              {view ? (
                <Boxview>
                  {!error ? (
                    loading ? (
                      <LoadingComponent />
                    ) : (
                      activity?.map((act, index) => (
                        <ChallengeCard
                          key={index}
                          data={act}
                          handleSubmit={handleSubmit}
                        />
                      ))
                    )
                  ) : (
                    <Typography variant="h5" fontWeight={500}>
                      The Game Starts Soon
                    </Typography>
                  )}
                </Boxview>
              ) : (
                <Boxview>
                  <TPVSectionChallenge
                    tpvs={tpvs}
                    handleSubmitTpvs={handleSubmitTpvs}
                  />
                </Boxview>
              )}
            </BoxActivity>
          </Grid>
        </Grid>
        <Footer />
      </MainCA>
    </>
  );
};
