import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, Typography, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import homeIcon from "../../assets/Icons/home.svg";
import gridIcon from "../../assets/Icons/grid.svg";
import desactIco from "../../assets/Icons/desactivation-ico.svg";
import { FiKey, FiPieChart, FiUploadCloud, FiUsers } from "react-icons/fi";
import { SiHtmlacademy } from "react-icons/si";
import { VscDiffAdded } from "react-icons/vsc";
import { ImEqualizer2, ImProfile } from "react-icons/im";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsWindowSidebar } from "react-icons/bs";
import { HiCollection } from "react-icons/hi";
import { BiUserX } from "react-icons/bi";
import { requestWithData } from "../../utils/api";

const LItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start",
  marginBottom: "10px",
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

export const NavList = ({ open, match, userData, chargeKpi, count2 }) => {
  const linkActive = true;
  const navigate = useNavigate();

  return (
    <>
      <ContentList>
        <LItem button onClick={() => navigate("/")}>
          <LIcon>
            <img src={homeIcon} alt="Home" />
          </LIcon>
          {open && match && <Typography>Dashboard</Typography>}
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

                <LItem button onClick={() => navigate("/analytics")}>
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
                <LItem button onClick={() => navigate("/uploadAgent")}>
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
                <LItem button onClick={() => navigate("/analytics")}>
                  <LIcon>
                    <FiPieChart size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Analytics</Typography>}
                </LItem>

                {chargeKpi === "YES" && (
                  <LItem button onClick={() => navigate("/upkpi")}>
                    <LIcon>
                      <FiUploadCloud size={25} color="#fff" />
                    </LIcon>
                    {open && match && <Typography>KPI Upload</Typography>}
                  </LItem>
                )}
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
                  //disabled={linkActive}
                >
                  <LIcon>
                    <AiOutlineFileAdd size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Account Creation</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/setuserpermissions")}
                  //disabled={linkActive}
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
                <LItem button onClick={() => navigate("/analytics")}>
                  <LIcon>
                    <FiPieChart size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Analytics</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/organizationchart")}
                  //disabled={linkActive}
                >
                  <LIcon>
                    <HiCollection
                      size={25}
                      color="#fff"
                      style={{
                        transform: `rotate(270deg)`,
                      }}
                    />
                  </LIcon>
                  {open && match && <Typography>Organization Units</Typography>}
                </LItem>
              </>
            )}
          </>
        }

        {
          <>
            {userData === "Cluster Director" && (
              <>
                <LItem
                  button
                  onClick={() => navigate("/analytics")}
                  //disabled={linkActive}
                >
                  <LIcon>
                    <FiPieChart size={25} color="#fff" />
                  </LIcon>
                  {open && match && <Typography>Analytics</Typography>}
                </LItem>
                <LItem
                  button
                  onClick={() => navigate("/organizationchart")}
                  //disabled={linkActive}
                >
                  <LIcon>
                    <HiCollection
                      size={25}
                      color="#fff"
                      style={{
                        transform: `rotate(270deg)`,
                      }}
                    />
                  </LIcon>
                  {open && match && <Typography>Organization Units</Typography>}
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
                <LItem button onClick={() => navigate("/teaminformation")}>
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
                <LItem
                  //disabled={linkActive}
                  button
                  onClick={() => navigate("/deactivation")}
                >
                  <LIcon>
                    <Badge
                      color="error"
                      badgeContent={count2}
                      max={9}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <img src={desactIco} alt="Grid" />
                    </Badge>
                  </LIcon>
                  {open && match && <Typography>Deactivation</Typography>}
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

            <LItem button onClick={() => navigate("/analytics")}>
              <LIcon>
                <FiPieChart size={25} color="#fff" />
              </LIcon>
              {open && match && <Typography>Analytics</Typography>}
            </LItem>
            <LItem
              //disabled={linkActive}
              button
              onClick={() => navigate("/deactivation")}
            >
              <LIcon>
                <Badge
                  badgeContent={count2}
                  max={9}
                  color="error"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <img src={desactIco} alt="Grid" />
                </Badge>
              </LIcon>
              {open && match && <Typography>Deactivation</Typography>}
            </LItem>
          </>
        )}
      </ContentList>
    </>
  );
};
