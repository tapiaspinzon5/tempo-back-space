import React from "react";
import { Avatar, Box, Typography, styled } from "@mui/material";
import star from "../../assets/Icons/start-icon.svg";
import epicoin from "../../assets/Icons/epicoin-ico.svg";
import level from "../../assets/Icons/level-icon.svg";
import ProgresBar from "../progressCharts/ProgresBar";
import { useSelector } from "react-redux";

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
const ProfileSection = ({ profile }) => {
  const badgeData = useSelector((store) => store.homeData.badgeData);

  return (
    <BoxProfileUser>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={profile?.Avatar}
          sx={{ width: 160, height: 160 }}
        />
        <Typography variant="h6" fontWeight={700}>
          {profile?.Agent}
        </Typography>
        <Typography variant="body1">{profile?.Role}</Typography>
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
              <Typography variant="body1">
                {" "}
                {profile?.LevelAgent.slice(6)}
              </Typography>
              <img src={level} alt="" />
            </BoxReward>
            <Typography variant="caption">Level</Typography>
          </Box>
          <Box>
            <BoxReward>
              <Typography variant="body1">{profile?.Exp}</Typography>
              <img src={star} alt="" />
            </BoxReward>
            <Typography variant="caption">XP Points</Typography>
          </Box>
          {profile?.Role === "Agent" && (
            <Box>
              <BoxReward>
                <Typography variant="body1">
                  {profile?.ResObtenidoCoin}
                </Typography>
                <img src={epicoin} alt="" />
              </BoxReward>
              <Typography variant="caption">Epicoins</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "20rem", marginTop: "1rem" }}>
          <ProgresBar value={(profile?.Exp * 100) / profile?.High} />
          <Typography variant="caption">
            {" "}
            {profile?.High - profile?.Exp} points to next level{" "}
          </Typography>
        </Box>
      </Box>
      <Box>
        <img src={badgeData?.ImageBadge} alt="" height={160} />
        <Typography variant="body1"> Latest Achievement</Typography>
      </Box>
    </BoxProfileUser>
  );
};

export default ProfileSection;
