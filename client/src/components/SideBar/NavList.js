import React from "react";
import { List, ListItem, ListItemIcon, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BiotechIcon from "@mui/icons-material/Biotech";
import BlenderIcon from "@mui/icons-material/Blender";
import AdbIcon from "@mui/icons-material/Adb";

const LItem = styled(ListItem)`
  justify-content: center;
  align-content: center;
  margin-bottom: 40px;
  padding: 8px;
`;

const LIcon = styled(ListItemIcon)`
  justify-content: center;
  align-content: center;
`;

const ContentList = styled(List)`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const NavList = () => {
  return (
    <>
      <ContentList>
        <LItem button>
          <LIcon>
            <AddAPhotoIcon />
          </LIcon>
        </LItem>
        <LItem button>
          <LIcon>
            <AgricultureIcon />
          </LIcon>
        </LItem>
        <LItem button>
          <LIcon>
            <BiotechIcon />
          </LIcon>
        </LItem>
        <LItem button>
          <LIcon>
            <BlenderIcon />
          </LIcon>
        </LItem>
        <IconButton>
          <AdbIcon />
        </IconButton>
      </ContentList>
    </>
  );
};
