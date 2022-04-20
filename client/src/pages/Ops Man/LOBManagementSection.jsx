import React, { useState } from "react";
import { Box, Grid, Typography, styled, Avatar, Modal } from "@mui/material";
import {
  BoxContain,
  ButtonAction,
  CardUser,
  MainPage,
  BoxData,
} from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";
import Footer from "../../components/Footer";
import { FiEdit3 } from "react-icons/fi";
import CreateEditLOB from "../../components/Modals/CreateEditLOB";

const CardLOB = styled(Box)(() => ({
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "10px",
  marginTop: ".5rem",
  width: "92%",
  border: "1px solid #f9f9f9",
  padding: "1rem",
  "&:hover": {
    boxShadow: "3px 3px 5px #00000029",
  },
}));

const ModalBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  borderRadius: "20px",
  boxShadow: "2px 2px 5px #2f2f2f",
  padding: "1rem",
  backgroundColor: "RGBA(255,255,255,0.9)",
}));

const lob = [
  { name: "LOB 1", id: 1 },
  { name: "LOB 2", id: 2 },
  { name: "LOB 3", id: 3 },
  { name: "LOB 4", id: 4 },
  { name: "LOB 5", id: 5 },
  { name: "LOB 6", id: 6 },
  { name: "LOB 7", id: 7 },
  { name: "LOB 8", id: 8 },
  { name: "LOB 9", id: 9 },
  { name: "LOB 10", id: 10 },
  { name: "LOB 11", id: 11 },
  { name: "LOB 12", id: 12 },
];

const LOBManagementSection = () => {
  const [open, setOpen] = React.useState(false);
  const [dataLOB, setDataLOB] = useState([]);
  const handleOpen = (item) => {
    setOpen(true);
    if (item) {
      setDataLOB({
        ...dataLOB,
        idLob: item.id,
        nameLob: item.name,
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
    setDataLOB([]);
  };
  return (
    <MainPage>
      <Box>
        <Header />
        <Typography variant="h5">LOB Management Section</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <BoxData>
            <Box marginY={1}>
              <ButtonAction onClick={() => handleOpen()}>
                Create New LOB
              </ButtonAction>
            </Box>
            <BoxContain>
              {lob.map((item) => (
                <CardLOB index={item.id}>
                  <Typography variant="body1"> {item.name}</Typography>
                  <ButtonAction onClick={() => handleOpen(item)}>
                    <FiEdit3 />
                  </ButtonAction>
                </CardLOB>
              ))}
            </BoxContain>
          </BoxData>
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxData>
            <Box marginY={1}>
              <Typography variant="h6" textAlign="center">
                Team Lead's
              </Typography>
            </Box>
            <BoxContain>
              {lob.map((item) => (
                <CardUser
                  sx={{ width: "92%", marginY: ".5rem" }}
                  index={item.id}
                >
                  <Avatar
                    alt="user"
                    src="./user.png"
                    sx={{ width: 50, height: 50, marginRight: "2rem" }}
                  />
                  <Box textAlign="left">
                    <Typography variant="body1">Matilde Puentes</Typography>
                    <Typography variant="body2">
                      Analista desarrollador Senior
                    </Typography>
                  </Box>
                </CardUser>
              ))}
            </BoxContain>
          </BoxData>
        </Grid>
      </Grid>
      <Footer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox sx={{ width: { xs: "390px", md: "500px", lg: "500px" } }}>
          <CreateEditLOB setDataLOB={setDataLOB} dataLOB={dataLOB} />
        </ModalBox>
      </Modal>
    </MainPage>
  );
};

export default LOBManagementSection;
