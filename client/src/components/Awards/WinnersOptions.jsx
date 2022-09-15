import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import general from "../../assets/images/awards/general.png";
import sub from "../../assets/images/awards/sub.png";
import mini from "../../assets/images/awards/mini.png";
import { requestWithData } from "../../utils/api";

const ButtonCard = styled(Button)(() => ({
  width: "65%",
  img: {
    width: "100%",
    "&:hover": {
      boxShadow: "5px 5px 10px #3047B0",
      borderRadius: "10px",
      transform: "scale(1.01)",
    },
  },
}));

const WinnersOptions = ({
  setSection,
  handleClose,
  Role,
  setAccount,
  account,
  dataGJ,
  dataSJ,
  dataMG,
}) => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    dataAccounts();
  }, []);

  const dataAccounts = async () => {
    const allCampaigns = await requestWithData("getorganizationalunit", {
      context: 1,
      idcampaign: 0,
      idLob: 0,
      idTeam: 0,
    });

    setAccounts(allCampaigns.data[0].Campaign);
  };
  return (
    <Grid
      sx={{
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box textAlign="right" padding="2rem">
        <IconButton
          aria-label=""
          onClick={handleClose}
          sx={{
            color: "#fff",
            background: "#f2f2f2a1",
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "2px",
          }}
        >
          X
        </IconButton>
      </Box>
      <Box>
        <Typography
          variant="h3"
          fontWeight={700}
          color="#fff"
          textAlign="center"
        >
          Winners of the month
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={4} textAlign="right">
          <ButtonCard
            onClick={() => setSection("general")}
            disabled={dataGJ.length > 0 ? false : true}
          >
            {" "}
            <img src={general} all="" />{" "}
          </ButtonCard>
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <ButtonCard
            onClick={() => setSection("sub")}
            disabled={dataSJ.length > 0 ? false : true}
          >
            <img src={sub} all="" />{" "}
          </ButtonCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ButtonCard
            onClick={() => setSection("mini")}
            disabled={dataMG[0].Missions[0].Agent !== "0" ? false : true}
          >
            {" "}
            <img src={mini} all="" />{" "}
          </ButtonCard>
        </Grid>
      </Grid>
      {Role === "Super Admin" || Role === "Cluster Director" ? (
        <Grid display="flex" justifyContent="center">
          <Box sx={{ width: 320, padding: "2rem" }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ color: "#e8e8e8" }}
              >
                Select Account
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={account || ""}
                label="Select Account"
                onChange={(e) => setAccount(e.target.value)}
                sx={{
                  background:
                    "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
                  color: "#e8e8e8",
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                {accounts?.map((acc) => (
                  <MenuItem value={acc.IdCampaign}>{acc.nameCampaign}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      ) : (
        <Box marginY={2} />
      )}
    </Grid>
  );
};

export default WinnersOptions;
