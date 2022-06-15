import React, { useState, useEffect } from "react";
import {
  MainPage,
  BoxUpFile,
  ButtonAction,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { Grid, Typography, styled, Box, Modal } from "@mui/material";
import { FiDownload, FiUpload } from "react-icons/fi";
import TableKPIUpload from "../../components/ReportingLead/TableKPIUpload";
import { ModalLoading } from "../../components/ModalLoading";
import XLSX from "xlsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  validateFieldsUploadKPIs,
  validateHeadersUploadKPIs,
} from "../../helpers/helpers";
import { getKPIsCampaign, uploadKPIs } from "../../utils/api";
import UpQuizModal from "../../components/Modals/UpQuizModal";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const MySwal = withReactContent(Swal);

const Item = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  p: {
    color: "#3047B0",
  },
}));

const BoxButton = styled(Box)(() => ({
  display: "flex",
  margin: "1rem 0",
}));

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

const KpiUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [dataKpi, setDataKpi] = useState([]);
  const [template, setTemplate] = useState("");
  const [open, setOpen] = React.useState(false);

  const getdata = async () => {
    setTableLoading(true);
    const kpis = await getKPIsCampaign();
    if (kpis && kpis.status === 200 && kpis.data.length > 1) {
      setTableLoading(false);
      setDataKpi(kpis.data);
    } else if (kpis.data === "UnauthorizedError") {
      dispatch(logoutAction());
      navigate("/");
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setTemplate("Load Kpi Template");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const loadFile = (e) => {
    setLoading(true);
    const fileCSV = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        //Parse data
        const ab = e.target.result;
        const wb = XLSX.readFile(ab, {
          type: "array",
          cellDates: true,
          cellText: false,
          cellNF: false,
        });
        //Get first worksheet
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        //Convert array of arrays
        const data = XLSX.utils
          .sheet_to_json(ws, {
            header: 1,
            defval: "",
            blankrows: true,
            raw: true,
          })
          .map((colum) => {
            return [
              colum[0]?.toString(),
              colum[1]?.toString(),
              isNaN(parseInt(colum[2])) ? colum[2] : parseFloat(colum[2]),
              isNaN(parseInt(colum[3])) ? colum[3] : parseFloat(colum[3]),
              colum[4] === "Date"
                ? colum[4]
                : `${colum[4] ? colum[4].getFullYear() : null}-${
                    colum[4] ? colum[4].getMonth() + 1 : null
                  }-${colum[4] ? colum[4].getDate() : null}`,
              isNaN(parseInt(colum[5])) ? colum[5] : parseFloat(colum[5]),
            ];
          });

        if (data.length > 1) {
          let differentsHeaders = validateHeadersUploadKPIs(data[0]);

          if (differentsHeaders) {
            reject(" Wrong Headers!");
            return;
          }

          data.shift();
          let incorrectValues = validateFieldsUploadKPIs(data);

          if (incorrectValues) {
            reject(" Wrong values!");
            return;
          }
          resolve(data);
        } else {
          reject("No data!");
        }
        //Update state
      };
      reader.readAsArrayBuffer(fileCSV);
    });
  };

  const uploadFile = async (e) => {
    const fileCSV = e.target.files[0];
    let data;
    if (
      fileCSV === undefined ||
      (fileCSV.type !== "text/csv" &&
        fileCSV.type !== "application/vnd.ms-excel")
    ) {
      setLoading(false);
      MySwal.fire({
        title: <p>Only files in .csv format</p>,
        icon: "error",
      });
    } else {
      try {
        data = await loadFile(e);
        e.target.value = null;
      } catch (error) {
        setLoading(false);
        MySwal.fire({
          title: <p> {error} </p>,
          icon: "error",
        });
        e.target.value = null;
        return;
      }

      //setData(data);
      const resp = await uploadKPIs(data);

      if (resp.status === 200) {
        setLoading(false);
        MySwal.fire({
          title: <p>File upload</p>,
          icon: "success",
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        }).then((resultado) => {
          if (resultado.value) {
            window.location.reload();
            getdata();
          }
        });
      }
    }
  };

  return (
    <MainPage minHeight="100vh">
      {loading && <ModalLoading />}
      <Header />
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
      <Typography variant="h5">Kpi's Upload Section</Typography>
      <BoxButton>
        <ButtonAction startIcon={<FiDownload />} onClick={handleOpen}>
          Download Template
        </ButtonAction>
        <BoxUpFile>
          <label htmlFor="kpi">
            <FiUpload size={20} />
            Upload
          </label>
          <input
            type="file"
            id="kpi"
            name="kpi"
            onChange={(e) => uploadFile(e)}
          />
        </BoxUpFile>
      </BoxButton>
      <Grid container>
        <Grid item xs={12} md={8}>
          {!error ? (
            <Item>
              <TableKPIUpload dataKPI={dataKpi} tableLoading={tableLoading} />
            </Item>
          ) : (
            <Typography variant="h5" fontWeight={500}>
              The Game Starts Soon
            </Typography>
          )}
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default KpiUpload;
