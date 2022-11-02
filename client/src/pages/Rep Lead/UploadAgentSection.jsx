import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, styled, Modal } from "@mui/material";
import {
  BoxUpFile,
  ButtonAction,
  MainPage,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { FiDownload, FiUserPlus, FiUpload } from "react-icons/fi";
import TableAgentUpload from "../../components/ReportingLead/TableAgentUpload";
import NewAgentForm from "../../components/ReportingLead/NewAgentForm";
import UpQuizModal from "../../components/Modals/UpQuizModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import { SwapSpinner } from "react-spinners-kit";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import {
  teamValidation,
  validateFieldsProvideUsersRL,
  validateHeadersProvideUsersRL,
} from "../../helpers/helpers";
import {
  createTeamReportingLead,
  getAgentsCampaign,
  getTeamsInformation,
  requestWithData,
} from "../../utils/api";
import UsersErrorRL from "../../components/Modals/UsersErrorRL";
import { ModalLoading } from "../../components/ModalLoading";

const MySwal = withReactContent(Swal);

const Item = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  p: {
    color: "#3047B0",
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

const UploadAgentSection = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const [loading, setLoading] = useState(false);
  const [newAgent, setNewAgent] = useState(false);
  const [template, setTemplate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dataAgent, setDataAgent] = useState([]);
  const [dataTeam, setDataTeam] = useState([]);
  const [dataTeams, setDataTeams] = useState(true);
  const [usersError, setUsersError] = useState([]);
  // const [existTeams, setExistTeams] = useState(true);
  //const [existTeamsMSJ, setExistTeamsMSJ] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setTemplate("Rep Lead Template");
  };
  const handleClose = () => {
    setOpen(false);
    setUsersError([]);
  };

  const loadFile = (e) => {
    setLoading(!loading);
    let file = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Parse data
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array" });
        // Get first worksheet
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        // Convert array of arrays
        const data = XLSX.utils
          .sheet_to_json(ws, { header: 1 })
          .map((colum) => {
            return [colum[0]?.toString(), colum[1]?.toString()];
          });

        if (data.length > 1) {
          // Update state
          let differentsHeaders = validateHeadersProvideUsersRL(data[0]);
          data.shift();
          let incorrectValues = validateFieldsProvideUsersRL(data);

          let exist = teamValidation(data, dataTeam);

          if (differentsHeaders) {
            setLoading(false);
            reject("Headers don´t match");
            return;
          }

          if (incorrectValues) {
            setLoading(false);
            reject("Wrong Fields");
            return;
          }
          if (exist) {
            setLoading(false);
            reject(
              `The team ${exist} does not exist or is misspelled, check and try again.`
            );
            return;
          }

          resolve(data);
        } else {
          setLoading(false);
          reject("File empty.");
        }
      };
      reader.readAsArrayBuffer(file);
      // setLoading(false);
    });
  };

  const uploadFile = async (e) => {
    setLoading(true);

    const fileCSV = e.target.files[0];
    let data = [];
    if (
      fileCSV === undefined ||
      (fileCSV.type !== "text/csv" &&
        fileCSV.type !== "application/vnd.ms-excel")
    ) {
      MySwal.fire({
        title: <p>Only files in .csv format</p>,
        icon: "error",
      });
    } else {
      try {
        data = await loadFile(e);
        e.target.value = null;
      } catch (error) {
        MySwal.fire({
          title: <p> {error} </p>,
          icon: "error",
        });
        e.target.value = null;
        return;
      }

      const resp = await createTeamReportingLead(data);

      if (resp.status === 400) {
        setUsersError(resp.data);
        setLoading(false);
        handleOpen();
      }
      if (resp.status === 200) {
        setLoading(false);
        MySwal.fire({
          title: <p>File upload</p>,
          icon: "success",
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        }).then((resultado) => {
          if (resultado.value) {
            // window.location.reload();
            getData();
            getTeams();
          }
        });
      }
    }
    // setLoading(false);
  };

  const handleState = async (idccms, token) => {
    MySwal.fire({
      title: <p>Do you want to delete this user?</p>,
      icon: "question",
      confirmButtonText: "Accept",
      showDenyButton: true,
      allowOutsideClick: false,
    }).then((resultado) => {
      if (resultado.value) {
        const req = async () => {
          const changeState = await requestWithData("postinactivateuser", {
            idccmsUser: idccms,
            fcmToken: token,
            inactivate: 1,
            nameRequester: userData.Nombre,
          });

          if (changeState.status === 200) {
            notify();
            getData();
          }
        };
        req();
      }
    });
  };

  const notify = () => {
    toast.success("Request sent!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const getData = async () => {
    const getAgents = await getAgentsCampaign();
    setDataAgent(getAgents.data);
  };
  const getTeams = async () => {
    const data = await getTeamsInformation();
    setDataTeam(data.data[0].Teams);
    const teams = await requestWithData("getmissionsassignmentinfo", {
      context: 2,
      caso: 2,
    });
    setDataTeams(teams.data[0].Teams);
  };
  useEffect(() => {
    getData();
    getTeams();
  }, []);

  return (
    <MainPage>
      <Header />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
          {usersError.length > 0 ? (
            <UsersErrorRL usersError={usersError} />
          ) : (
            <UpQuizModal
              handleClose={handleClose}
              template={template}
              teams={dataTeams}
            />
          )}
        </ModalBox>
      </Modal>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 100000,
            height: "100vh",
            width: "100vw",
            left: "0%",
            top: 0,
          }}
        >
          <ModalLoading />
        </Box>
      )}
      <Typography variant="h5">
        Agent Upload Section (Crew Assignment)
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} display="flex">
          <ButtonAction startIcon={<FiDownload />} onClick={handleOpen}>
            Download Template
          </ButtonAction>
          <BoxUpFile>
            <label htmlFor="agents">
              <FiUpload size={20} />
              Upload
            </label>
            <input
              type="file"
              id="agents"
              name="agents"
              onChange={(e) => uploadFile(e)}
            />
          </BoxUpFile>
          <ButtonAction
            startIcon={<FiUserPlus />}
            onClick={() => setNewAgent(!newAgent)}
          >
            New Agent
          </ButtonAction>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Item>
            <TableAgentUpload dataAgent={dataAgent} handleState={handleState} />
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {newAgent && (
            <Item>
              <NewAgentForm dataTeam={dataTeam} getData={getData} />
            </Item>
          )}
        </Grid>
      </Grid>

      <Footer />
    </MainPage>
  );
};

export default UploadAgentSection;
