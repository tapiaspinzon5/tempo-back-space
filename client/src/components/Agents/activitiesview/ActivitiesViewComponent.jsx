import React, { useState, useEffect } from "react";
import { Typography, Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardFloatDescription from "./CardFloatDescription";
import CardFloatChallengesDescription from "./CardFloatChallengesDescription";

const BoxCard = styled(Box)(() => ({
  maxWidth: "19.625rem",
  borderRadius: "10px",
  //overflowX: "clip",
  "&:hover": {
    boxShadow: " 3px 3px 5px #A2A2A2",
    opacity: 1,
  },
}));
const CardViewer = styled(Box)(({ theme }) => ({
  //height: "14rem",
  height: "9rem",
  maxWidth: "19.625rem",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px 10px 0 0 ",
  //background: "#F9F9F9 0% 0% no-repeat padding-box",

  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "left",
  boxSizing: "border-box",

  p: {
    width: "70%",
    margin: "1rem",
    color: "white",
    fontWeight: 500,
  },
}));

const DownSection = styled(Box)(({ theme }) => ({
  boxShadow: "1px 1px 5px #A2A2A2",
  maxWidth: "20rem",
  height: "4rem",
  borderRadius: "0 0  10px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  button: {
    color: "#000",
    background: "#fff",
    textTransform: "none",
    fontWeight: "bold",
    width: "111px",
    padding: 0,
    borderRadius: "10px",
    "&:hover": {
      background: "#e6e6e6e0",
    },
  },
}));

const ActivitiesViewComponent = ({ activity, images, type, mousePos }) => {
  const navigate = useNavigate();
  const [showFloat, setShowFloat] = useState(false);
  const [img1, setIme1] = useState(null);
  const { NameActivity, IdActivity, Status, Category } = activity;
  let context;
  if (type === "Activities") {
    context = Category === "Activity" ? 1 : Category === "Challenge" ? 2 : 3;
  } else {
    context = 2;
  }

  const handleMouseEnter = () => {
    setShowFloat(true);
  };
  const handleMouseLeave = () => {
    setShowFloat(false);
  };

  useEffect(() => {
    const index = Math.floor(Math.random() * images.length);
    setIme1(images[index]);
    // eslint-disable-next-line
  }, []);

  return (
    <BoxCard
      sx={
        Status
          ? {
              backgroundImage: `linear-gradient(45deg, rgba(255, 0, 0, 0.2), rgba(0, 0, 150, 0.2)), url(${
                activity.fullScreen || img1
              })`,
            }
          : {
              background: `linear-gradient(45deg, rgba(00, 00, 00, 0.8), rgba(0, 00, 00, 0.8)), url(${
                activity.fullScreen || img1
              })`,
            }
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showFloat &&
        (type === "Challenges" ? (
          <CardFloatChallengesDescription
            activity={activity}
            img1={img1}
            mousePos={mousePos}
          />
        ) : (
          <CardFloatDescription
            activity={activity}
            img1={img1}
            mousePos={mousePos}
          />
        ))}
      <CardViewer>
        <Typography variant="body1" textAlign="left">
          {NameActivity}
        </Typography>
      </CardViewer>
      <DownSection
        sx={
          Status
            ? { background: "rgba(56, 255, 100, 0.616)" }
            : {
                background: "rgba(50, 20, 255, 0.616)",
              }
        }
      >
        <Button
          onClick={() => navigate(`/activitiesview/${IdActivity}/${context}`)}
        >
          See more
        </Button>
      </DownSection>
    </BoxCard>
  );
};

export default ActivitiesViewComponent;
