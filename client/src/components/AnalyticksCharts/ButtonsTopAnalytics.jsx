import React, { useState } from "react";
import { Box } from "@mui/system";
import { FiDownload } from "react-icons/fi";
import { MdOutlineBarChart } from "react-icons/md";
import { ButtonAction } from "../../assets/styled/muistyled";
import { Modal, styled } from "@mui/material";
import { DownLoadReportSA } from "../Modals/DownLoadReportSA";
import { DownLoadReportQA } from "../Modals/DownLoadReportQA";
import { DownLoadReportOM } from "../Modals/DownLoadReportOM";
import { DownLoadReportRL } from "../Modals/DownLoadReportRL";
import { DownLoadReportTL } from "../Modals/DownLoadReportTL";

const ModalBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 400,
  borderRadius: "20px",
  boxShadow: "2px 2px 5px #2f2f2f",
  padding: "1rem",
  backgroundColor: "RGBA(255,255,255,0.9)",
}));

const ButtonsTopAnalytics = ({ setShowCharts, Role }) => {
  const [modal, setModal] = useState(false);

  const handleCharts = () => {
    setShowCharts(false);
  };

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
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
          {Role === "QA Lead" && <DownLoadReportQA setModal={setModal} />}
          {Role === "Reporting Lead" && (
            <DownLoadReportRL setModal={setModal} />
          )}
          {Role === "Team Leader" && <DownLoadReportTL setModal={setModal} />}
          {Role === "Operation Manager" && (
            <DownLoadReportOM setModal={setModal} />
          )}
          {Role === "Super Admin" || Role === "Cluster Director" ? (
            <DownLoadReportSA setModal={setModal} />
          ) : (
            ""
          )}
        </ModalBox>
      </Modal>

      <ButtonAction
        onClick={handleCharts}
        sx={{
          height: "2.2rem",
        }}
      >
        <MdOutlineBarChart size={22} />
      </ButtonAction>

      <ButtonAction
        onClick={() => setModal(true)}
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
