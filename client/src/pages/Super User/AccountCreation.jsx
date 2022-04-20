import React from "react";
import {
  Grid,
  Box,
  Typography,
  styled,
  Avatar,
  Modal,
  Button,
} from "@mui/material";
import {
  BoxData,
  ButtonAction,
  CardUser,
  MainPage,
  ModalBox,
  ScrollContainer,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { FiEdit3 } from "react-icons/fi";
import { BsClock, BsPercent } from "react-icons/bs";
import CreateEditCampaign from "../../components/Modals/CreateEditCampaign";

const BoxCampaing = styled(Button)(() => ({
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "10px",
  marginTop: ".5rem",
  marginBottom: "5px",
  width: "98%",
  border: "1px solid #f9f9f9",
  padding: "1rem",
  textTransform: "none",
  "&:hover": {
    boxShadow: "3px 3px 5px #00000029",
  },
}));

const kpis = [
  { kpi: "KPI 1 ", Actual: 25, Target: 30, unitKpi: "Percentage" },
  { kpi: "kpi 2 ", Actual: 25, Target: 30, unitKpi: "hour" },
  { kpi: "kpi  3", Actual: 25, Target: 30, unitKpi: "Percentage" },
  { kpi: "kpi  4", Actual: 25, Target: 30, unitKpi: "seconds" },
  { kpi: "kpi  5", Actual: 25, Target: 30, unitKpi: "Avg" },
];
const campaing = [
  { name: "campaing 1 ", id: 1 },
  { name: "campaing 2 ", id: 2 },
  { name: "campaing  3", id: 3 },
  { name: "campaing  4", id: 4 },
  { name: "campaing  5", id: 5 },
];

const AccountCreation = () => {
  const [open, setOpen] = React.useState(false);
  const [dataCampaign, setDataCampaign] = React.useState([]);

  const handleOpen = (camp) => {
    if (camp) {
      setDataCampaign(camp);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDataCampaign([]);
  };
  return (
    <MainPage>
      <Box>
        <Header />
        <Typography variant="h5">Account Creation Section</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <BoxData>
            <ButtonAction onClick={() => handleOpen()}>
              Create campaign
            </ButtonAction>
            <ScrollContainer maxHeight="60vh">
              {campaing.map((camp, index) => (
                <BoxCampaing height="3rem" key={index}>
                  <Typography variant="body1">{camp.name}</Typography>
                  <ButtonAction onClick={() => handleOpen(camp)}>
                    <FiEdit3 />
                  </ButtonAction>
                </BoxCampaing>
              ))}
            </ScrollContainer>
          </BoxData>
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxData>
            <ScrollContainer height="60vh">
              <Box>
                <Typography variant="h6">Operation Manager</Typography>
                <CardUser width="92%" marginY={2}>
                  <Avatar
                    alt="user"
                    src="./user.png"
                    sx={{ width: 70, height: 70, marginRight: "1rem" }}
                  />
                  <Box textAlign="left">
                    <Typography variant="body1">Matilde Puentes</Typography>
                    <Typography variant="body2">
                      Analista desarrollador Senior
                    </Typography>
                  </Box>
                </CardUser>
              </Box>

              <Box>
                <Typography variant="h6">KPI's</Typography>

                {kpis.map((kpi, index) => (
                  <BoxCampaing key={index}>
                    <Typography variant="body1">{kpi.kpi}</Typography>
                    <Box>
                      <Box width="8rem" display="flex">
                        {kpi.unitKpi === "Percentage" ||
                        kpi.unitKpi === "Avg" ? (
                          <BsPercent />
                        ) : (
                          <BsClock />
                        )}
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          fontSize="12px"
                          marginLeft={2}
                        >
                          {`${kpi.Actual.toFixed(2)} / ${kpi.Target}`}
                        </Typography>
                      </Box>
                    </Box>
                  </BoxCampaing>
                ))}
              </Box>
            </ScrollContainer>
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
        <ModalBox sx={{ width: { xs: "390px", md: "500px", lg: "700px" } }}>
          <CreateEditCampaign
            dataCampaign={dataCampaign}
            handleClose={handleClose}
          />
        </ModalBox>
      </Modal>
    </MainPage>
  );
};

export default AccountCreation;
