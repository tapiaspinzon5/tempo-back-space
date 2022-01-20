import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, styled, Button, Modal, Box } from "@mui/material";
import { FiDownload } from "react-icons/fi";
//import Header from "../components/homeUser/Header";
import CardQuizDesc from "../components/Quizes/CardQuizDesc";
import UploadQuiz from "../components/Quizes/UploadQuiz";
import Footer from "../components/Footer";
import { loadQuizes } from "../utils/api";
import UpQuizModal from "../components/Modals/UpQuizModal";
import { ModalLoading } from "../components/ModalLoading";

const MainUpQuiz = styled(Grid)(({ theme }) => ({
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

const UpQuiz = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.idccms;

  const [misQuizes, setMisQuizes] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      const quizes = await loadQuizes(idccms);
      setMisQuizes(quizes.data);
    };

    getData();
    // eslint-disable-next-line
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {loading && <ModalLoading />}
      <Grid width="100%">
        <MainUpQuiz>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
              <UpQuizModal handleClose={handleClose} />
            </ModalBox>
          </Modal>
          <Grid container>
            <Grid item sx={12} md={6}>
              <Typography variant="h5" fontWeight="bold" mt={4}>
                Quizzes questions upload
              </Typography>
              <Typography variant="body1" mt={2}>
                In this space, the quizzes carried out by the agents to give
                continuity to their training process are uploaded.
              </Typography>
            </Grid>
            <Grid item sx={12} md={6} display="flex" justifyContent="flex-end">
              <Button
                startIcon={<FiDownload />}
                onClick={handleOpen}
                sx={{ height: "3rem" }}
              >
                Download Template Quiz
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <UploadQuiz idccms={idccms} setLoading={setLoading} />
            </Grid>
            {misQuizes?.map((quiz) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={quiz.IdExamen}
              >
                <CardQuizDesc quiz={quiz} />
              </Grid>
            ))}
          </Grid>
        </MainUpQuiz>
        <Footer />
      </Grid>
    </>
  );
};

export default UpQuiz;
