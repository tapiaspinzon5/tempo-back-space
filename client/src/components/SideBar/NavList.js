import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import homeIcon from "../../assets/Icons/home.svg";
import gridIcon from "../../assets/Icons/grid.svg";
import { FiPieChart } from "react-icons/fi";
import { SiHtmlacademy } from "react-icons/si";
import { VscDiffAdded } from "react-icons/vsc";
import { ImEqualizer2 } from "react-icons/im";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";


const LItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start",
  marginBottom: "20px",
  padding: "10px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "0px",
    justifyContent: "center",
  },
}));


const LIcon = styled(ListItemIcon)(({ theme }) => ({
  justifyContent: "center",
  img: {
    height: "25px",
  },
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
  const navigate = useNavigate();

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
            <LItem button onClick={() => navigate("/activitiesview")}>
              <LIcon>
                <img src={gridIcon} alt="Grid" />
              </LIcon>
              {open && match && <Typography>Library</Typography>}
            </LItem>
            <LItem button onClick={() => navigate("/challenge")}>
              <LIcon>
                <MdOutlinePeopleAlt size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>Challenges</Typography>}
            </LItem>
            <LItem button onClick={() => navigate("/leaderboard")}>
              <LIcon>
                <IoTrendingUpSharp size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>LeaderBoard</Typography>}
            </LItem>
            <LItem button onClick={() => navigate("/useranalytics")}>
              <LIcon>
                <FiPieChart size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>Analytics</Typography>}
            </LItem>
          </>
        )}
        {/* NAVBAR PARA ADMINISTRADORES */}
        {
          <>
            {userData === "QA Lead" && (
              <LItem button onClick={() => navigate("/upquiz")}>
                <LIcon>
                  <SiHtmlacademy size={25} color="#fff" />
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
                    <VscDiffAdded size={25} color="#fff" />
                  </LIcon>
                  {open && match && (
                    <Typography>Challenge Assignment</Typography>
                  )}
                </LItem>
                <LItem button onClick={() => navigate("/followingteams")}>
                  <LIcon>
                    <ImEqualizer2 size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Following KPI</Typography>}
                </LItem>
                <LItem button onClick={() => navigate("/leaderboard")}>
                  <LIcon>
                    <IoTrendingUpSharp size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>LeaderBoard</Typography>}
                </LItem>
                <LItem button onClick={() => navigate("/analytics")}>
                  <LIcon>
                    <FiPieChart size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Analytics</Typography>}
                </LItem>
              </>
            )}
          </>
        }
        {/* <LItem button onClick={logOut}>
          <LIcon>
            <FiLogOut size={25} color="#fff" />
          </LIcon>
          {open && match && <Typography>Logout</Typography>}
        </LItem> */}
      </ContentList>
    </>
  );
};
