import React from "react";
import { Box, Typography, Divider, Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProgresBar from "../progressCharts/ProgresBar";

const CardProgressSection = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: "1rem",
  backgroundColor: "#f9f9f9",
  margin: "1rem 0",
  borderRadius: "5px",
  overflowY: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "blue green",
  button: {
    textTransform: "none",
    color: "#000",
  },
}));

const ProgressHome = () => {
  return (
    <CardProgressSection>
      <Box display="flex" alignItems="center" py={2}>
        <Typography variant="h6" fontWeight="bold">
          50 Epicoins
        </Typography>
        <Typography variant="caption" color="initial" ml={5}>
          50 Epicoins
        </Typography>
      </Box>
      <Divider variant="fullWidth" light />

      {/* Card Progress section */}
      <Box
        display="flex"
        py={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box width="60%">
          <Typography variant="body1" fontWeight="bold">
            50 Epicoins
          </Typography>
          <Typography variant="caption">50 Epicoins</Typography>
          <ProgresBar value={52} />
        </Box>
        <Box>
          <Button size="small" endIcon={<MdOutlineArrowForwardIos />}>
            See more
          </Button>
        </Box>
      </Box>
      <Divider variant="fullWidth" light />
      {/* END Card Progress*/}
    </CardProgressSection>
  );
};

export default ProgressHome;
