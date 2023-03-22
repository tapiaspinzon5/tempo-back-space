import React, { useState, useEffect } from "react";
import { Typography, Grid, styled, Modal, Box } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { AiOutlineFileAdd, AiOutlineUnorderedList } from "react-icons/ai";
import CardQuizDesc from "../components/Quizes/CardQuizDesc";
import UploadQuiz from "../components/Quizes/UploadQuiz";
import Footer from "../components/Footer";
import { getMissionsCategories, loadQuizes } from "../utils/api";
import UpQuizModal from "../components/Modals/UpQuizModal";
import { ModalLoading } from "../components/ModalLoading";
import { ButtonAction, MainPage } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import CardCateroriesQuiz from "../components/Quizes/CardCateroriesQuiz";
import { getTopics } from "../helpers/helpers";

const ModalBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  boxShadow: "2px 2px 5px #2f2f2f",
  padding: "1rem",
  backgroundColor: "RGBA(255,255,255,0.9)",
}));

const UpQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("");
  const [openInstructions, setOpenInstructions] = useState(false);
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [misQuizes, setMisQuizes] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    const quizes = await loadQuizes();
    const getCategories = await getMissionsCategories();
    const topics = getTopics(getCategories.data);
    setTopics(topics);
    setMisQuizes(quizes.data);
  };

  const handleOpenInstructions = () => {
    setOpenInstructions(true);
    setTemplate("Quiz Template");
  };
  const handleCloseInstructions = () => {
    setOpenInstructions(false);
  };

  const handleCategory = () => {
    if (showCat) {
      setShowCat(!showCat);
      getData();
    } else {
      setShowCat(!showCat);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleList = () => {
    setShowList(!showList);
  };

  return (
    <>
      {loading && <ModalLoading />}
      <Grid width="100%">
        <MainPage>
          {/* Modal de Creacion de Quices*/}
          <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-create-Mission"
            aria-describedby="modal-create-mission"
          >
            <UploadQuiz
              onClose={onClose}
              setLoading={setLoading}
              topics={topics}
              getData={getData}
            />
          </Modal>
          {/* Modal de descarga de template */}
          <Modal
            open={openInstructions}
            onClose={handleCloseInstructions}
            aria-labelledby="modal-download-template"
            aria-describedby="modal-download-template"
          >
            <ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
              <UpQuizModal
                handleClose={handleCloseInstructions}
                template={template}
              />
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
                  <ButtonAction onClick={() => setOpen(true)}>
                    <AiOutlineFileAdd size={20} />
                  </ButtonAction>
                  <ButtonAction onClick={handleList}>
                    <AiOutlineUnorderedList size={20} />
                  </ButtonAction>
                  <ButtonAction onClick={handleCategory}>
                    Set Categories
                  </ButtonAction>
                  {showCat && (
                    <CardCateroriesQuiz
                      setShowCat={setShowCat}
                      getData={getData}
                    />
                  )}
                </Box>
                <ButtonAction
                  startIcon={<FiDownload />}
                  onClick={handleOpenInstructions}
                >
                  Download Mission Template
                </ButtonAction>
              </Box>
            </Box>
          </Box>

          {/* <Grid item xs={12} sm={6} md={4} lg={3} xl={2}> */}
          {/* </Grid> */}
          <Box
            minHeight="60vh"
            sx={
              showList
                ? {}
                : {
                    display: "flex",
                  }
            }
          >
            {misQuizes?.map((quiz, index) => (
              <CardQuizDesc
                quiz={quiz}
                getData={getData}
                showList={showList}
                key={index}
              />
            ))}
          </Box>
        </MainPage>
        <Footer />
      </Grid>
    </>
  );
};

export default UpQuiz;
