import React, { useState, useEffect } from "react";
import { Typography, Grid, styled, Modal, Box } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import CardQuizDesc from "../components/Quizes/CardQuizDesc";
import UploadQuiz from "../components/Quizes/UploadQuiz";
import Footer from "../components/Footer";
import { loadQuizes } from "../utils/api";
import UpQuizModal from "../components/Modals/UpQuizModal";
import { ModalLoading } from "../components/ModalLoading";
import { ButtonAction, MainPage } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import CardCateroriesQuiz from "../components/Quizes/CardCateroriesQuiz";

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

const UpQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [showCat, setShowCat] = React.useState(false);
  const [misQuizes, setMisQuizes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const quizes = await loadQuizes();
      setMisQuizes(quizes.data);
    };

    getData();
    // eslint-disable-next-line
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setTemplate("Quiz Template");
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {loading && <ModalLoading />}
      <Grid width="100%">
        <MainPage>
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
          <Box>
            <Header />

            <Box
              width="100%"
              background="red"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" fontWeight="bold" mt={4}>
                Missions Management Section
              </Typography>
              <Box display="flex">
                <Box>
                  <ButtonAction onClick={() => setShowCat(!showCat)}>
                    Set Categories
                  </ButtonAction>
                  {showCat && <CardCateroriesQuiz />}
                </Box>
                <ButtonAction startIcon={<FiDownload />} onClick={handleOpen}>
                  Download Quiz Template
                </ButtonAction>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ minHeight: "60vh" }}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <UploadQuiz setLoading={setLoading} />
            </Grid>
            {misQuizes?.map((quiz, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <CardQuizDesc quiz={quiz} />
              </Grid>
            ))}
          </Grid>
        </MainPage>
        <Footer />
      </Grid>
    </>
  );
};

export default UpQuiz;
