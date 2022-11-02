import React, { useState, useEffect } from "react";
import { Grid, Modal, Typography } from "@mui/material";
import { MainPage, ModalBox } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import TableDesactivation from "../components/Tables/TableDesactivation";
import { getLobs, requestWithData } from "../utils/api";
import LoadingComponent from "../components/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ModalLoading } from "../components/ModalLoading";
import DeactivateTL from "../components/Modals/DeactivateTL";

const MySwal = withReactContent(Swal);
const dateConfig = (date) => {
  let fecha;
  let hora;
  let fechaBase = new Date(date).toLocaleString([], {
    timeZone: "Etc/UTC",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let now = new Date().toLocaleString([], {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let fa = new Date(
    `${now.split("/")[1]}/${now.split("/")[0]}/${now.split("/")[2]}`
  );
  let fb = new Date(
    `${fechaBase.split("/")[1]}/${fechaBase.split("/")[0]}/${
      fechaBase.split("/")[2]
    }`
  );
  if (
    now.replace(",", "").split(" ")[0] ===
    fechaBase.replace(",", "").split(" ")[0]
  ) {
    hora = Math.trunc((fa - fb) / 60000);
    if (hora < 31) {
      fecha = `${hora} minutes ago`;
    } else {
      fecha = `Today at ${fechaBase.replace(",", "").split(" ")[1]}`;
    }
  } else {
    fecha = fechaBase.replace(",", "").split(" ")[0];
  }

  return fecha;
};
const DesactivationSection = ({ setCount2 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.loginUser.userData);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabled] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [dataLob, setDataLob] = useState({});
  const [tlToDel, setTlToDel] = useState({});

  const getData = async () => {
    setLoading(true);
    const allLobs = await getLobs(1, 1032);
    const usersList = await requestWithData("getinactiveusersapplications");
    if (usersList && usersList.status === 200 && usersList.data.length > 0) {
      if (usersList.data[0].Agent !== "0" && usersList.data[0].ident !== "0") {
        const filterList = usersList.data.map((item1) =>
          allLobs.data.some((item2) => item1.ident === item2.identTL)
            ? item1
            : { ...item1, trashIcon: "true" }
        );
        //falta tratar la fecha antes de settear la variable
        const uwd = filterList.map((user) => {
          const fecha = dateConfig(user.dateRequest);
          user.dateRequest = fecha;
          return user;
        });
        setLoading(false);
        setUsers(uwd);
        setCount2(usersList.data.length);
      } else {
        setCount2(0);
        setLoading(false);
        setNoData(true);
      }
    } else if (usersList && usersList.data === "UnauthorizedError") {
      dispatch(logoutAction());
      navigate("/");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(
    () => {
      getData();
    },
    // eslint-disable-next-line
    []
  );
  const handleClose = (event, reason) => {
    //disabled no se pueda cerra facilmente el modal
    if (disabled) {
      if (reason && reason !== "backdropClick") {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };
  const handleAction = async (params, context, fullParams) => {
    if (params[2] !== "Team Leader") {
      setFullLoading(true);
      let rol;
      if (userData.Role === "Team Leader") {
        params[2] = "Cosmonaut";
      } else {
        params[2] === "Agent"
          ? (rol = "Cosmonaut")
          : params[2] === "Team Leader"
          ? (rol = "Pilot")
          : params[2] === "QA Lead"
          ? (rol = "Mission Specialist")
          : params[2] === "Reporting Lead"
          ? (rol = "Flight Engineer")
          : (rol = params[2]);
      }
      const sendResponse = await requestWithData("postinactivateuser", {
        idccmsUser: params[0],
        name: userData.Nombre,
        role:
          userData.Role === "Team Leader" ? "Pilot" : "Operations Commander",
        nameUser: params[1],
        roleUser: rol,
        emailRequester: params[3],
        inactivate: context === "approved" ? 1 : 0,
        idccmsReq: 4468566,
      });
      if (sendResponse && sendResponse.status === 200) {
        if (context === "approved") {
          setFullLoading(false);
          MySwal.fire({
            title: (
              <p>{context === 2 ? "Saved!" : "User Disabled successfully!"}</p>
            ),
            icon: "success",
            confirmButtonText: "Accept",
            allowOutsideClick: false,
          }).then((resultado) => {
            if (resultado.value) {
              getData();
            }
          });
        } else {
          setFullLoading(false);
          MySwal.fire({
            title: (
              <p>
                {context === 2 ? "Saved!" : "Request successfully rejected!"}
              </p>
            ),
            icon: "success",
            confirmButtonText: "Accept",
            allowOutsideClick: false,
          }).then((resultado) => {
            if (resultado.value) {
              getData();
            }
          });
        }
      } else {
        setFullLoading(false);
        MySwal.fire({
          title: <p>Send Error!</p>,
          icon: "error",
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        }).then((resultado) => {
          if (resultado.value) {
            getData();
          }
        });
      }
    } else {
      if (context === "cancelled") {
        setFullLoading(true);
        let rol =
          params[2] === "Agent"
            ? "Cosmonaut"
            : params[2] === "Team Leader"
            ? "Pilot"
            : params[2] === "QA Lead"
            ? "Mission Specialist"
            : params[2] === "Reporting Lead"
            ? "Flight Engineer"
            : params[2];

        const sendResponse = await requestWithData("postinactivateuser", {
          idccmsUser: params[0],
          name: userData.Nombre,
          role: "Operations Commander",
          nameUser: params[1],
          roleUser: rol,
          emailRequester: params[3],
          inactivate: 0,
          idccmsReq: 4468566,
        });
        if (sendResponse && sendResponse.status === 200) {
          if (context === "approved") {
            setFullLoading(false);
            MySwal.fire({
              title: (
                <p>
                  {context === 2 ? "Saved!" : "User Disabled successfully!"}
                </p>
              ),
              icon: "success",
              confirmButtonText: "Accept",
              allowOutsideClick: false,
            }).then((resultado) => {
              if (resultado.value) {
                getData();
              }
            });
          } else {
            setFullLoading(false);
            MySwal.fire({
              title: (
                <p>
                  {context === 2 ? "Saved!" : "Request successfully rejected!"}
                </p>
              ),
              icon: "success",
              confirmButtonText: "Accept",
              allowOutsideClick: false,
            }).then((resultado) => {
              if (resultado.value) {
                getData();
              }
            });
          }
        } else {
          setFullLoading(false);
          MySwal.fire({
            title: <p>Send Error!</p>,
            icon: "error",
            confirmButtonText: "Accept",
            allowOutsideClick: false,
          }).then((resultado) => {
            if (resultado.value) {
              getData();
            }
          });
        }
      } else {
        setTlToDel(fullParams);
        setModalLoading(true);
        setOpen(true);
        setDataLob({ idLob: fullParams.idLob });
      }
    }
  };
  return (
    <>
      {fullLoading && <ModalLoading />}
      <MainPage>
        <Grid>
          <Header />
          <Typography variant="h5" fontWeight="500">
            Deactivation Request
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12} lg={9}>
            {error ? (
              <Typography variant="body1">Server Problems</Typography>
            ) : noData ? (
              <Typography variant="h5" textAlign="center">
                No Requests Pending
              </Typography>
            ) : loading ? (
              <LoadingComponent />
            ) : (
              <TableDesactivation
                dataAgent={users}
                handleAction={handleAction}
              />
            )}
          </Grid>
        </Grid>
        <Footer />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableEscapeKeyDown
        >
          <ModalBox
            sx={{
              //minWidth: { xs: "390px", md: "400px", lg: "400px" },
              minWidth: { xs: "390px", md: "650px", lg: "650px" },
            }}
          >
            <DeactivateTL
              setOpen={setOpen}
              dataLOB={dataLob}
              modalLoading={modalLoading}
              setModalLoading={setModalLoading}
              userData={userData}
              getData={getData}
              tlToDel={tlToDel}
            />
          </ModalBox>
        </Modal>
      </MainPage>
    </>
  );
};

export default DesactivationSection;
