import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import homeIcon from "../../assets/Icons/home.svg";
import gridIcon from "../../assets/Icons/grid.svg";
import { FiKey, FiPieChart, FiUploadCloud, FiUsers } from "react-icons/fi";
import { SiHtmlacademy } from "react-icons/si";
import { VscDiffAdded } from "react-icons/vsc";
import { ImEqualizer2, ImProfile } from "react-icons/im";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsWindowSidebar } from "react-icons/bs";

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
  const linkActive = true;
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
              <>
                <LItem button onClick={() => navigate("/upquiz")}>
                  <LIcon>
                    <AiOutlineFileAdd size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Library</Typography>}
                </LItem>

                <LItem button onClick={() => navigate("/missionassignment")}>
                  <LIcon>
                    <SiHtmlacademy size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Mission Assignment</Typography>}
                </LItem>

                <LItem
                  button
                  onClick={() => navigate("/leaderboard")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <IoTrendingUpSharp size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>LeaderBoard</Typography>}
                </LItem>

                <LItem
                  button
                  onClick={() => navigate("/analytics")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <FiPieChart size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Analytics</Typography>}
                </LItem>

                <LItem button onClick={() => navigate("/quiziformation")}>
                  <LIcon>
                    <BsWindowSidebar size={22} color="#fff" />
                  </LIcon>
                  {open && match && (
                    <Typography>Mission Information</Typography>
                  )}
                </LItem>
              </>
            )}
          </>
        }
        {
          <>
            {userData === "Reporting Lead" && (
              <>
                <LItem
                  button
                  onClick={() => navigate("/uploadAgent")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <AiOutlineFileAdd size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Agent Upload</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/leaderboard")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <IoTrendingUpSharp size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>LeaderBoard</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/analytics")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <FiPieChart size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Analytics</Typography>}
                </LItem>

                <LItem button onClick={() => navigate("/upkpi")}>
                  <LIcon>
                    <FiUploadCloud size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>KPI Upload</Typography>}
                </LItem>
              </>
            )}
          </>
        }

        {
          <>
            {userData === "Super Admin" && (
              <>
                <LItem
                  button
                  onClick={() => navigate("/accountcreation")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <AiOutlineFileAdd size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Account Creation</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/setuserpermissions")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <FiKey size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>User Permissions</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/leaderboard")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <IoTrendingUpSharp size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>LeaderBoard</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/analytics")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <FiPieChart size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Analytics</Typography>}
                </LItem>
              </>
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
                <LItem
                  button
                  onClick={() => navigate("/teaminformation")}
                  disabled={linkActive}
                >
                  <LIcon>
                    <FiUsers size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Team Information</Typography>}
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
        {userData === "Operation Manager" && (
          <>
            <LItem button onClick={() => navigate("/lobmanagement")}>
              <LIcon>
                <AiOutlineFileAdd size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>Library</Typography>}
            </LItem>

            <LItem button onClick={() => navigate("/rolemanagement")}>
              <LIcon>
                <ImProfile size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>Mission Assignment</Typography>}
            </LItem>

            <LItem
              button
              onClick={() => navigate("/leaderboard")}
              disabled={linkActive}
            >
              <LIcon>
                <IoTrendingUpSharp size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>LeaderBoard</Typography>}
            </LItem>

            <LItem
              button
              onClick={() => navigate("/analytics")}
              disabled={linkActive}
            >
              <LIcon>
                <FiPieChart size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>Analytics</Typography>}
            </LItem>
          </>
        )}
      </ContentList>
    </>
  );
};
