import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, styled, Button } from "@mui/material";
//import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import { loadQuizesUser, loadUserActivities } from "../utils/api";
import ActivitiesViewComponent from "../components/Agents/activitiesview/ActivitiesViewComponent";
import CardActivityManage from "../components/Quizes/CardActivityManage";
import img1 from "../assets/temp-image/Enmascarargrupo2039.png";
import img2 from "../assets/temp-image/Enmascarargrupo2040.png";
import img3 from "../assets/temp-image/Enmascarargrupo2044.png";
import img4 from "../assets/temp-image/Enmascarargrupo2046.png";
import LoadingComponent from "../components/LoadingComponent";

const MainViewver = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "90vh",
  width: "100%",
  padding: "0 2rem 2rem",
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

const selectButton = {
  boxShadow: "0px 3px 6px #00000029",
  borderRadius: "10px",
  textTransform: "none",
};

const images = [img1, img2, img3, img4];

const ActivitiesView = () => {
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.Idccms;

  const [quizUser, setQuizUser] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState("");
  const [mousePos, setMousePos] = useState(0);
  const [activities, setActivities] = useState({
    type: "",
    context: 0,
  });

  useEffect(() => {
    if (!activities.menu) {
      if (localStorage.getItem("menuActivity")) {
        setActivities(JSON.parse(localStorage.getItem("menuActivity")));
      }
    } else {
      setActivities({
        type: "Quizes",
        context: 0,
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUserActivities([]);
    setLoading(true);
    const context = activities.context;
    const getData = async () => {
      setNoData("");
      if (activities.context === 0) {
        const quizes = await loadQuizesUser(idccms);
        if (quizes && quizes.status === 200) {
          setQuizUser(quizes.data);
          if (quizes.data.length < 1) {
            setNoData("No assigned " + activities.type);
          }
        } else {
          setNoData("The Game Starts Soon");
        }
        //console.log("QZ:", quizes);
      } else {
        const getActivities = await loadUserActivities(idccms, context);
        if (getActivities && getActivities.status === 200) {
          setUserActivities(getActivities.data);
          if (getActivities.data.length < 1) {
            setNoData("No assigned " + activities.type);
          }
        } else {
          setNoData("The Game Starts Soon");
        }
        //console.log("AC:", getActivities);
      }
      setLoading(false);
    };
    const handleLS = () => {
      localStorage.setItem("menuActivity", JSON.stringify(activities));
    };

    function generateRandom(max) {
      return Math.floor(Math.random() * max);
    }

    getData();
    handleLS();
    // eslint-disable-next-line
  }, [activities]);

  useEffect(() => {
    const mousePosition = (e) => {
      //console.log("posicion del mouse", e.clientX);
      setMousePos((e.clientX / window.screen.width) * 100);
    };
    window.addEventListener("mousemove", mousePosition);
    return () => {
      window.removeEventListener("mousemove", mousePosition);
    };

    //mousePosition();
  }, []);

  console.log(userActivities);

  return (
    <Grid width="100%">
      <MainViewver>
        {/* <Header /> */}

        <BoxSelectBadge item xs={12}>
          <Button
            sx={activities.type === "Missions" && selectButton}
            onClick={() =>
              setActivities({ type: "Missions", context: 3, menu: true })
            }
          >
            Missions
          </Button>
          <Button
            sx={activities.type === "Challenges" && selectButton}
            onClick={() =>
              setActivities({ type: "Challenges", context: 2, menu: true })
            }
          >
            {" "}
            Challenges{" "}
          </Button>
          <Button
            sx={activities.type === "Quizes" && selectButton}
            onClick={() =>
              setActivities({ type: "Quizes", context: 0, menu: true })
            }
          >
            {" "}
            Quizes
          </Button>
          <Button
            sx={activities.type === "Activities" && selectButton}
            onClick={() =>
              setActivities({ type: "Activities", context: 1, menu: true })
            }
          >
            {" "}
            Activities
          </Button>
        </BoxSelectBadge>

        {loading ? (
          <LoadingComponent theme={activities.type} />
        ) : (
          <>
            {noData && (
              <Typography variant="h6" sx={{ color: "#3047B0" }}>
                {" "}
                {noData}
              </Typography>
            )}
            <Grid container spacing={3}>
              {activities.type !== "Quizes" &&
                userActivities?.map((activity, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    <ActivitiesViewComponent
                      activity={activity}
                      context={activities.context}
                      //img1={images[generateRandom(images.length)]}
                      images={images}
                      mousePos={mousePos}
                    />
                  </Grid>
                ))}

              {activities.type === "Quizes" &&
                quizUser.map((quiz) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                    key={quiz.IdExamen}
                  >
                    <CardActivityManage quiz={quiz} progress={20} />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </MainViewver>
      <Footer />
    </Grid>
  );
};

export default ActivitiesView;
