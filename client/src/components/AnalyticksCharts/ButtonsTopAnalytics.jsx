import React from "react";
import { Box } from "@mui/system";
import { FiDownload } from "react-icons/fi";
import { MdOutlineBarChart } from "react-icons/md";
import { ButtonAction } from "../../assets/styled/muistyled";

const ButtonsTopAnalytics = ({ showCharts, handleCharts }) => {
  return (
    <Box
      display="flex"
      sx={{
        marginLeft: "auto",
        justifyContent: "space-evenly",

        alignItems: "center",
        height: "5rem",
      }}
    >
      <ButtonAction
        onClick={handleCharts}
        sx={{
          height: "2.2rem",
        }}
      >
        <MdOutlineBarChart size={22} />
      </ButtonAction>

      <ButtonAction
        //onClick={() => setModal(true)}
        sx={{
          height: "2.2rem",
        }}
      >
        <FiDownload size={22} />
      </ButtonAction>
    </Box>
  );
};

export default ButtonsTopAnalytics;
