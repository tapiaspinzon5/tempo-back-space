import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import { Grid, styled, Typography, Box, Button } from "@mui/material";
import Header from "../../components/homeUser/Header";
import Footer from "../../components/Footer";
import {
  downloadActivities,
  downloadUsers,
  assingChallenges,
  createNewChallenge,
} from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import { ModalLoading } from "../../components/ModalLoading";
// import { UserChallenge } from "../../components/Agents/Challenges/UserChallenge";
// import { ChallengeCard } from "../../components/Agents/Challenges/ChallengeCard";

import { validateDataCheck } from "../../helpers/helpers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ButtonAction, MainPage } from "../../assets/styled/muistyled";
import FormCreateNewChallenge from "../../components/Modals/FormCreateNewChallenge";
import TLChallengeCard from "../../components/Agents/Challenges/TLChallengeCard";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";

const MySwal = withReactContent(Swal);

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
  height: "55vh",
}));

const Boxview = styled(Grid)(() => ({
  overflowY: "scroll",
  height: "40vh",
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
const BoxviewCh = styled(Grid)(() => ({
  overflowY: "scroll",
  height: "45vh",
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

export const TLChallengeAssignment = ({ count }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.loginUser.userData);
  const userName = userData.Nombre;
  const [activity, setActivity] = useState([]);
  const [actualActivity, setActualActivity] = useState([]);
  const [users, setUsers] = useState([]);
  const [kpisInfo, setKpisInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [fullLoading, setFullLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpenModal(true);

  useEffect(() => {
    setLoading(true);
    setLoadingC(true);
    const getData = async () => {
      const activities = await downloadActivities(null, 1);
      if (
        activities &&
        activities.status === 200 &&
        activities.data.length > 1
      ) {
        activities.data[0].Challenges[0].isChecked = true;
        setActivity(activities.data[0].Challenges);
        setActualActivity(activities.data[0].Challenges[0]);
        setKpisInfo(activities.data[1].Kpis);
        setLoadingC(false);
        const user = await downloadUsers(
          2,
          activities.data[0].Challenges[0].Id
        );
        if (user && user.status === 200 && user.data.length > 1) {
          const fUsers = await user.data[0].Agents.filter(
            (us) => us.Status === 1
          );
          setUsers(fUsers);
          setLoading(false);
        } else if (user.data === "UnauthorizedError") {
          dispatch(logoutAction());
          navigate("/");
        } else {
          setError(true);
        }
      } else if (activities.data === "UnauthorizedError") {
        dispatch(logoutAction());
        navigate("/");
      } else {
        setError(true);
      }
    };

    getData();
    // eslint-disable-next-line
  }, []);

  //funcion de asingacion de usuarios
  const handleUser = (e) => {
    const { name, checked } = e.target;
    if (name === "selecct-all") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });

      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.Agent === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  ///funcion para traer agentes que se puede asignar retos
  const handleChallenge = async (e) => {
    setLoading(true);
    const { value, checked } = e.target;
    let tempChallenge = activity.map((challenge) =>
      challenge.Description === value.split("*")[0]
        ? { ...challenge, isChecked: checked }
        : { ...challenge, isChecked: false }
    );
    setActivity(tempChallenge);
    const user = await downloadUsers(2, value.split("-")[1]);
    if (user && user.status === 200 && user.data.length > 1) {
      const challenge = [];
      tempChallenge.forEach((el) => {
        if (el.isChecked) {
          challenge.push(el);
        }
      });
      const fUsers = await user.data[0].Agents.filter((us) => us.Status === 1);

      setUsers(fUsers);
      setLoading(false);
      setActualActivity(challenge[0]);
    } else if (user.data === "UnauthorizedError") {
      dispatch(logoutAction());
      navigate("/");
    } else {
      setError(true);
    }
  };

  ///Función Envio de Challenges
  const handleSubmit = async () => {
    setFullLoading(true);
    const dataToSendChallenge = await validateDataCheck(
      users,
      actualActivity,
      userName
    );
    const sendChallenge = await assingChallenges(dataToSendChallenge[0]);
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
      setFullLoading(false);
      MySwal.fire({
        title: <p>Send Error</p>,
        icon: "error",
      });
    }
  };
  //funcion de envio de creacion de challenges
  const handleSubmitNC = async (data, interval) => {
    setOpenModal(false);
    setFullLoading(true);
    const sendNewCH = await createNewChallenge(data, interval);
    if (sendNewCH && sendNewCH.status === 200) {
      setFullLoading(false);
      MySwal.fire({
        title: <p>Create Challenge Successful</p>,
        icon: "success",
        confirmButtonText: "Accept",
        allowOutsideClick: false,
      }).then((resultado) => {
        if (resultado.value) {
          window.location.reload();
        }
      });
    } else {
      setFullLoading(false);
      MySwal.fire({
        title: <p>Send Error</p>,
        icon: "error",
      });
    }
  };

  return (
    <>
      {fullLoading && <ModalLoading />}
      <FormCreateNewChallenge
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitNC={handleSubmitNC}
        kpisInfo={kpisInfo}
      />

      <MainPage>
        <Header count={count} />
        <Grid container>
          <Grid item xs={6}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight={500}>
                Challenge Assignment
              </Typography>

              <ButtonAction onClick={handleOpen}>
                Create New Challenge
              </ButtonAction>
            </Box>
          </Grid>

          <BoxSelectBadge item xs={4}></BoxSelectBadge>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} padding={1}>
            <BoxActivity>
              <Box marginBottom={2}></Box>
              {!loadingC ? (
                <BoxviewCh>
                  {!error ? (
                    activity.length > 0 ? (
                      activity?.map((act, index) => (
                        <TLChallengeCard
                          key={index}
                          challenge={act}
                          handleChallenge={handleChallenge}
                        />
                      ))
                    ) : (
                      <Typography variant="h5" fontWeight={300}>
                        All your teammates have been assigned this challenge
                      </Typography>
                    )
                  ) : (
                    <Typography variant="h5" fontWeight={500}>
                      The Game Starts Soon
                    </Typography>
                  )}
                </BoxviewCh>
              ) : (
                <LoadingComponent />
              )}
            </BoxActivity>
          </Grid>
          <Grid item xs={12} md={5} padding={1}>
            <BoxActivity>
              <Box marginBottom={2}>
                <Button
                  sx={selectButton}
                  onClick={() =>
                    users.filter((user) => user?.isChecked !== true).length < 1
                      ? handleUser({
                          target: { name: "selecct-all", checked: false },
                        })
                      : handleUser({
                          target: { name: "selecct-all", checked: true },
                        })
                  }
                >
                  <input
                    type="checkbox"
                    name="selecct-all"
                    onChange={handleUser}
                    checked={
                      users.filter((user) => user?.isChecked !== true).length <
                      1
                    }
                  />
                  Select all
                </Button>
              </Box>
              {!loading ? (
                <Boxview>
                  {!error ? (
                    users.length > 0 ? (
                      users.map((user, index) => (
                        <ShowUserActivity
                          key={index}
                          user={user}
                          handleUser={handleUser}
                        />
                      ))
                    ) : (
                      <Typography variant="h5" fontWeight={500}>
                        All your teammates have been assigned this challenge
                      </Typography>
                    )
                  ) : (
                    <Typography variant="h5" fontWeight={500}>
                      The Game Starts Soon
                    </Typography>
                  )}
                </Boxview>
              ) : (
                <LoadingComponent />
              )}
            </BoxActivity>
          </Grid>
        </Grid>
        <BoxAssingment>
          <Button onClick={handleSubmit}>Assignement</Button>
        </BoxAssingment>
        <Footer />
      </MainPage>
    </>
  );
};
