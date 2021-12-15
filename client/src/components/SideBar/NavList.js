import React from "react";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import homeIcon from "../../assets/Icons/home.svg";
import awardIcon from "../../assets/Icons/award.svg";
import bookIcon from "../../assets/Icons/book-open.svg";
import gridIcon from "../../assets/Icons/grid.svg";
import pieIcon from "../../assets/Icons/pie-chart.svg";
import settingsIcon from "../../assets/Icons/settings.svg";

const LItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start",
  //minWidth: "40px",
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

export const NavList = ({ open, match }) => {
  return (
    <>
      <ContentList>
        <LItem button>
          <LIcon>
            <img src={homeIcon} alt="Home" />
          </LIcon>
          {open && match && <Typography>Dasboard</Typography>}
        </LItem>

        <LItem button>
          <LIcon>
            <img src={awardIcon} alt="Award" />
          </LIcon>
          {open && match && <Typography>Students</Typography>}
        </LItem>
        <LItem button>
          <LIcon>
            <img src={bookIcon} alt="Book" />
          </LIcon>
          {open && match && <Typography>Training</Typography>}
        </LItem>
        <LItem button>
          <LIcon>
            <img src={gridIcon} alt="Grid" />
          </LIcon>
          {open && match && <Typography>Library</Typography>}
        </LItem>
        <LItem button>
          <LIcon>
            <img src={pieIcon} alt="PieChart" />
          </LIcon>
          {open && match && <Typography>Attendance</Typography>}
        </LItem>
        <LItem button>
          <LIcon>
            <img src={settingsIcon} alt="Settings" />
          </LIcon>
          {open && match && <Typography>Account</Typography>}
        </LItem>
      </ContentList>
    </>
  );
};
