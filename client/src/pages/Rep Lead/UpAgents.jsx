import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
//import Header from "../components/homeUser/Header";
import Footer from "../../components/Footer";
import { FiDownload } from "react-icons/fi";
import { downloadDataAdmin } from "../../utils/api";
import { UploadAgents } from "../../components/Agents/UploadAgents";
import { ModalLoading } from "../../components/ModalLoading";
import UpQuizModal from "../../components/Modals/UpQuizModal";

const MainUpCampaign = styled(Grid)(({ theme }) => ({
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

export const UpAgents = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.Idccms;

  const [myAgents, setMyAgents] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      const agents = await downloadDataAdmin(idccms, 3);
      setMyAgents(agents.data);
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
        <MainUpCampaign>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
              <UpQuizModal
                handleClose={handleClose}
                template={"Rep Lead Template"}
              />
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
              <UploadAgents idccms={idccms} setLoading={setLoading} />
              <Button
                startIcon={<FiDownload />}
                onClick={handleOpen}
                sx={{ height: "3rem", textTransform: "none" }}
              >
                Download Rep. Lead Template
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>Teams</TableCell>
                      <TableCell align="right" sx={{ color: "#fff" }}>
                        Agents
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myAgents.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "#fff" }}
                        >
                          {row.Nombre}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "#fff" }}>
                          {row.Total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainUpCampaign>
        <Footer />
      </Grid>
    </>
  );
};
