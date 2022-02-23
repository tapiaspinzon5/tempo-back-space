import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography, Button, Box } from "@mui/material";
import Header from "../../components/homeUser/Header";
import ShowActivity from "../../components/teamLeader/ShowActivity";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";
import Footer from "../../components/Footer";
import SearchAppBar from "../../components/Search";
import { downloadActivities, downloadUsers } from "../../utils/api";
import { validateDataCheck } from "../../helpers/helpers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ModalLoading } from "../../components/ModalLoading";
import { assingActivities } from "../../utils/api";
import { UserChallenge } from "../../components/Agents/Challenges/UserChallenge";
import { ChallengeCard } from "../../components/Agents/Challenges/ChallengeCard";
import TPVSectionChallenge from "../../components/Agents/Challenges/TPVSectionChallenge";
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
}));

const BoxAssingment = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  margin: "2rem 0 ",
  button: {
    padding: ".5rem",
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
    color: "#fff",
    width: "10rem",
    textTransform: "none",
    fontWeight: "600",
    marginRight: "2rem",
  },
}));
const selectButton = {
  boxShadow: "0px 3px 6px #00000029",
  borderRadius: "10px",
  textTransform: "none",
};
export const AgentChallengeAssignment = ({ count }) => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const TLName = userData.Nombre;
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState(false);
  const [stage, setStage] = useState("Getting started");
  const [users, setUsers] = useState([]);
  const [validator, setValidator] = useState(false);
  const [view, setView] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const activities = await downloadActivities(idccms);
      if (
        activities &&
        activities.status === 200 &&
        activities.data.length > 1
      ) {
        setActivity(activities.data);
      } else {
        setError(true);
      }
      const user = await downloadUsers(idccms);
      if (user && user.status === 200 && user.data.length > 1) {
        setUsers(user.data);
      } else {
        setError(true);
      }
    };

    getData();
  }, []);

  //funcion de asingacion de usuarios
  const handleUser = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
    let tempUser = users.map((user) =>
      user.Agent === value
        ? { ...user, isChecked: checked }
        : { ...user, isChecked: false }
    );
    setUsers(tempUser);
  };

  ////////////////////////////// funcion de asingacion de Actividades
  const handleBadge = (e) => {
    setValidator(true);
    const { name, checked } = e.target;

    if (name === "selecct-all") {
      if (activity[stage] !== undefined) {
        let tempUser = activity[stage].map((badge) => {
          return { ...badge, isChecked: checked };
        });

        setActivity(tempUser);
      } else {
        let tempUser = activity.map((badge) => {
          return { ...badge, isChecked: checked };
        });
        setActivity(tempUser);
      }
    } else {
      if (activity[stage] !== undefined) {
        let tempUser = activity[stage].map((badge, index) =>
          badge.Name === name ? { ...badge, isChecked: checked } : badge
        );
        setActivity(tempUser);
      } else {
        let tempUser = activity.map((badge, index) =>
          badge.Name === name ? { ...badge, isChecked: checked } : badge
        );
        setActivity(tempUser);
      }
    }
  };

  ///Función Envio de Acctividades
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(users, activity, TLName);
    /* setLoading(true);
    if (validator) {
      const dataSend = validateDataCheck(users, activity, TLName);
      if (
        dataSend[0].idActivity.length > 0 &&
        dataSend[0].idccmsAssigned.length > 0
      ) {
        const resp = await assingActivities(dataSend[0], idccms);
        if (resp && resp.status === 200) {
          setLoading(false);
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
      } else {
        setLoading(false);
        MySwal.fire({
          title: <p>Check your Assignments</p>,
          icon: "error",
        });
      }
    } else {
      setLoading(false);
      MySwal.fire({
        title: <p>Check your Assignments</p>,
        icon: "error",
      });
      //idActivity: ac, idccmsAssigned: ag
    } */
  };

  return (
    <>
      {loading && <ModalLoading />}
      <MainCA>
        <Header count={count} />
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight={500}>
              Challenge Assignment --time? --Attempts?
            </Typography>
          </Grid>

          <BoxSelectBadge item xs={6}>
            <Button sx={view && selectButton} onClick={() => setView(true)}>
              Challenges
            </Button>
            <Button sx={!view && selectButton} onClick={() => setView(false)}>
              TPVs
            </Button>
          </BoxSelectBadge>
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
                    activity?.map((act, index) => (
                      <ChallengeCard
                        key={index}
                        data={act}
                        handleSubmit={handleSubmit}
                        // handleBadge={handleBadge}
                      />
                    ))
                  ) : (
                    <Typography variant="h5" fontWeight={500}>
                      The Game Starts Soon
                    </Typography>
                  )}
                </Boxview>
              ) : (
                <Boxview>
                  <TPVSectionChallenge />
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
