import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import homeIcon from "../../assets/Icons/home.svg";
import gridIcon from "../../assets/Icons/grid.svg";
import { FiLogOut } from "react-icons/fi";
import { SiHtmlacademy } from "react-icons/si";
import { VscDiffAdded } from "react-icons/vsc";
import { ImEqualizer2 } from "react-icons/im";

//import awardIcon from "../../assets/Icons/award.svg";
//import bookIcon from "../../assets/Icons/book-open.svg";
//import pieIcon from "../../assets/Icons/pie-chart.svg";
//import settingsIcon from "../../assets/Icons/settings.svg";

const LItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start",

  marginBottom: "20px",
  padding: "10px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "0px",
    justifyContent: "center",
  },
}));

/* `
  justify-content: space-between;
  align-content: center;
  margin-bottom: 40px;
  padding: 10px;
`; */

const LIcon = styled(ListItemIcon)(({ theme }) => ({
  justifyContent: "center",
}));

const ContentList = styled(List)(({ theme }) => ({
  flexGrow: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "center",
  color: "#FFF",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "1fr 1fr",
    gap: "10px",
    margin: "auto",
  },
}));

export const NavList = ({ open, match, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logoutAction());
    navigate("/");
  };
  return (
    <>
      <ContentList>
        <LItem button onClick={() => navigate("/")}>
          <LIcon>
            <img src={homeIcon} alt="Home" />
          </LIcon>
          {open && match && <Typography>Dasboard</Typography>}
        </LItem>
        {userData === "Agent" && (
          <>
            {userData === "Agent" && (
              <LItem button onClick={() => navigate("/activitiesview")}>
                <LIcon>
                  <img src={gridIcon} alt="Grid" />
                </LIcon>
                {open && match && <Typography>Library</Typography>}
              </LItem>
            )}
          </>
        )}
        {/* NAVBAR PARA ADMINISTRADORES */}
        {
          <>
            {userData === "QA Lead" && (
              <LItem button onClick={() => navigate("/upquiz")}>
                <LIcon>
                  <SiHtmlacademy size={30} color="#fff" />
                </LIcon>
                {open && match && <Typography>Library</Typography>}
              </LItem>
            )}
          </>
        }
        {
          <>
            {userData === "Team Leader" && (
              <>
                <LItem button onClick={() => navigate("/challengeasignment")}>
                  <LIcon>
                    <VscDiffAdded size={30} color="#fff" />
                  </LIcon>
                  {open && match && (
                    <Typography>Challenge Assignment</Typography>
                  )}
                </LItem>
                <LItem button onClick={() => navigate("/followingteams")}>
                  <LIcon>
                    <ImEqualizer2 size={30} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Following KPI</Typography>}
                </LItem>
              </>
            )}
          </>
        }
        <LItem button onClick={logOut}>
          <LIcon>
            <FiLogOut size={30} color="#fff" />
          </LIcon>
          {open && match && <Typography>Logout</Typography>}
        </LItem>
      </ContentList>
    </>
  );
};
