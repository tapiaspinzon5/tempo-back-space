import React from "react";
import { Avatar, Box, Typography, styled } from "@mui/material";
import avatar from "../../assets/temp-image/avatar.png";
import star from "../../assets/Icons/start-icon.svg";
import epicoin from "../../assets/Icons/epicoin-ico.svg";
import level from "../../assets/Icons/level-icon.svg";
import ProgresBar from "../progressCharts/ProgresBar";
import badgeImg from "../../assets/temp-image/Badges/Missions.png";

const BoxProfileUser = styled(Box)(() => ({
  color: "#3047b0",
  display: "flex",
  minHeight: "70vh",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "center",
  padding: "1rem",
}));

const BoxReward = styled(Box)(() => ({
  display: "flex",
  width: "7rem",
  alignItems: "center",
  img: {
    marginLeft: "1rem",
  },
}));
const ProfileSection = () => {
  return (
    <BoxProfileUser>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={avatar}
          sx={{ width: 160, height: 160 }}
        />
        <Typography variant="h6" fontWeight={700}>
          Matilde Puentes Gutierrez
        </Typography>
        <Typography variant="body1">Analista Desarrollador Senior</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="2rem 0"
      >
        <Box display="flex">
          <Box>
            <BoxReward>
              <Typography variant="body1"> 3</Typography>
              <img src={level} alt="" />
            </BoxReward>
            <Typography variant="caption">Level</Typography>
          </Box>
          <Box>
            <BoxReward>
              <Typography variant="body1">110</Typography>
              <img src={star} alt="" />
            </BoxReward>
            <Typography variant="caption">XP Points</Typography>
          </Box>
          <Box>
            <BoxReward>
              <Typography variant="body1">53</Typography>
              <img src={epicoin} alt="" />
            </BoxReward>
            <Typography variant="caption">Epicoins</Typography>
          </Box>
        </Box>
        <Box sx={{ width: "20rem", marginTop: "1rem" }}>
          <ProgresBar value={70} />
          <Typography variant="caption"> 54 points to level 4 </Typography>
        </Box>
      </Box>
      <Box>
        <img src={badgeImg} alt="" height={160} />
        <Typography variant="body1"> Latest Achievement</Typography>
      </Box>
    </BoxProfileUser>
  );
};

export default ProfileSection;
