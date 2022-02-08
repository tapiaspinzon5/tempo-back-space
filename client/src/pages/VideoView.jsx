import React from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Button, styled, Box } from "@mui/material";
import { VideoIntro } from "../components/VideoIntro";
import { useNavigate } from "react-router-dom";

const MainHomevideo = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "95vh",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
}));

export const VideoView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleView = async () => {
    let data = JSON.parse(localStorage.getItem("userTP"));
    const videoOk = () => {
      data.NumberLogins = 2;
      localStorage.setItem("userTP", JSON.stringify(data));
    };
    await videoOk();
    await navigate(`/homeusers`);
    await window.location.reload();
  };
  return (
    <MainHomevideo>
      <VideoIntro />
      <Box
        sx={{
          margin: "0 15px 0 15px",
          display: "flex",
          justifyContent: "center",
          padding: "0 2rem 2rem 0",
        }}
      >
        <Button
          onClick={handleView}
          sx={{
            background: theme.palette.background.primary,
            color: "#FFFFFF",
            margin: "10px",
            width: "160px",
          }}
        >
          Continue
        </Button>
      </Box>
    </MainHomevideo>
  );
};
