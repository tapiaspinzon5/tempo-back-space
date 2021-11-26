import React from "react";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BiotechIcon from "@mui/icons-material/Biotech";
import BlenderIcon from "@mui/icons-material/Blender";
import AdbIcon from "@mui/icons-material/Adb";

const LItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start",
  minWidth: "40px",
  marginBottom: "40px",
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
  justifyContent: "space-between",
  alignContent: "center",
  color: "#FFF",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
  },
}));

/* `
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`; */

export const NavList = ({ open, match }) => {
  return (
    <>
      <ContentList>
        <LItem button>
          <LIcon>
            <AddAPhotoIcon />
          </LIcon>
          {open && match && (
            <Typography
              sx={{
                color: "#000",
              }}
            >
              Dasboard
            </Typography>
          )}
        </LItem>
        <LItem button>
          <LIcon>
            <AgricultureIcon />
          </LIcon>
          {open && match && (
            <Typography sx={{ color: "#000" }}>Students</Typography>
          )}
        </LItem>
        <LItem button>
          <LIcon>
            <BiotechIcon />
          </LIcon>
          {open && match && (
            <Typography sx={{ color: "#000" }}>Training</Typography>
          )}
        </LItem>
        <LItem button>
          <LIcon>
            <BlenderIcon />
          </LIcon>
          {open && match && (
            <Typography sx={{ color: "#000" }}>Library</Typography>
          )}
        </LItem>
        <LItem button>
          <LIcon>
            <AdbIcon />
          </LIcon>
          {open && match && (
            <Typography sx={{ color: "#000" }}>Attendance</Typography>
          )}
        </LItem>
        <LItem button>
          <LIcon>
            <AdbIcon />
          </LIcon>
          {open && match && (
            <Typography sx={{ color: "#000" }}>Account</Typography>
          )}
        </LItem>
        <LItem button>
          <LIcon>
            <AdbIcon />
          </LIcon>
          {open && match && (
            <Typography sx={{ color: "#000" }}>Settings</Typography>
          )}
        </LItem>
      </ContentList>
    </>
  );
};
