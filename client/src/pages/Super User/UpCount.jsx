import React, { useState, useEffect } from "react";
import { Typography, Grid, styled, Modal, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
//import Header from "../components/homeUser/Header";
import Footer from "../../components/Footer";
import { FiDownload } from "react-icons/fi";
import { downloadCounts } from "../../utils/api";
import { CardCountDesc } from "../../components/Counts/CardCountDesc";
import { UploadCount } from "../../components/Counts/UploadCount";
import { ModalLoading } from "../../components/ModalLoading";
import UpQuizModal from "../../components/Modals/UpQuizModal";

const MainUpCount = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "90vh",
  width: "100%",
  padding: "0 2rem 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));
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

export const UpCount = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((store) => store.loginUser.userData);
  const [template, setTemplate] = useState("");
  const idccms = userData.Idccms;

  const [myCounts, setMyCounts] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      const counts = await downloadCounts(idccms);
      setMyCounts(counts.data);
    };

    getData();
    // eslint-disable-next-line
  }, []);
  const handleOpen = () => {
    setOpen(true);
    setTemplate("Super User Template");
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {loading && <ModalLoading />}
      <Grid width="100%">
        <MainUpCount>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
              <UpQuizModal handleClose={handleClose} template={template} />
            </ModalBox>
          </Modal>
          <Typography variant="h5" fontWeight="bold" mt={4}>
            Acquire new skills to strengthen your progress
          </Typography>
          <Typography variant="body1" mt={2}>
            Acquire new skills to strengthen your progress
          </Typography>
          <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <UploadCount idccms={idccms} setLoading={setLoading} />
              <Button
                startIcon={<FiDownload />}
                onClick={handleOpen}
                sx={{ height: "3rem", textTransform: "none" }}
              >
                Download Super User Template
              </Button>
            </Grid>
            {myCounts?.map((count) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={count.Id}>
                <CardCountDesc count={count} />
              </Grid>
            ))}
          </Grid>
        </MainUpCount>
        <Footer />
      </Grid>
    </>
  );
};
