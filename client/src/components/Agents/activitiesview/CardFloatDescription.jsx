import React from "react";
import { Typography, Box, styled } from "@mui/material";
import activitiesIMG from "../../../assets/temp-image/Badges/Activity.png";
import epicoins from "../../../assets/Icons/epicoin-ico.svg";
import xpIco from "../../../assets/Icons/start-icon.svg";

const BoxFloat = styled(Box)(() => ({
  position: "fixed",
  zIndex: 1000,
  height: "1rem",
  width: "1rem",
}));
const BoxConatiner = styled(Box)(() => ({
  minHeight: "180px",
  width: "480px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
  top: "-5rem",

  background: "#f8f8f8",
  border: "1px solid #e8e8e8",
  borderRadius: "10px",
  padding: "15px",
}));
const BoxLeft = styled(Box)(() => ({
  minHeight: "180px",
  width: "50%",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "flex-end",
  color: "white",
  paddingLeft: "10px",
  borderRadius: "10px",
}));
const BoxRight = styled(Box)(() => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  color: "#3047B0",
  fontSize: "12px",
}));
const BoxImage = styled(Box)(() => ({
  img: {
    margin: "0 15px",
    height: "70px",
    width: "70px",
    marginBottom: ".5rem",
  },
}));
const BoxRewards = styled(Box)(() => ({
  display: "flex",
  img: {
    height: "25px",
    width: "25px",
  },
}));

const CardFloatDescription = ({ activity, img1, mousePos }) => {
  return (
    <BoxFloat>
      <BoxConatiner
        sx={
          mousePos > 75
            ? { right: "20rem" }
            : {
                left: "5rem",
              }
        }
      >
        <BoxLeft
          sx={{
            backgroundImage: `linear-gradient(45deg, rgba(255, 0, 0, 0.2), rgba(0, 0, 150, 0.2)), url(${img1})`,
          }}
        >
          <Typography variant="subtitle2">{activity.NameActivity}</Typography>{" "}
        </BoxLeft>
        <BoxRight>
          <BoxImage>
            <img src={activitiesIMG} alt="" />
          </BoxImage>
          <Typography variant="body2" align="left" marginBottom=".5rem">
            {activity.Description}
          </Typography>
          <BoxRewards>
            <Box marginRight="1rem">
              <Box display="flex" alignItems="center">
                <Typography variant="body1" fontWeight={700} marginRight="5px">
                  {activity.Experiences}
                </Typography>
                <img src={xpIco} alt="" />
              </Box>
              <Typography variant="caption" fontWeight={700} textAlign="center">
                XP
              </Typography>
            </Box>
            <Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" fontWeight={700} marginRight="5px">
                  {activity.Epicoins}
                </Typography>
                <img src={epicoins} alt="" />
              </Box>
              <Typography variant="caption" fontWeight={700} textAlign="center">
                Epicoins
              </Typography>
            </Box>
          </BoxRewards>
        </BoxRight>
      </BoxConatiner>
    </BoxFloat>
  );
};

export default CardFloatDescription;
