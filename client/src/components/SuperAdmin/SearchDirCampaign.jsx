import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { ButtonActionBlue, InputText } from "../../assets/styled/muistyled";

const BoxMain = styled(Box)(() => ({
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: "1px 1px 5px #e9e9e9",
}));
const BoxSearch = styled(Box)(() => ({
  marginBottom: "1rem",
  input: {
    padding: "5px 1rem",
    borderRadius: "10px",
    border: "1px solid #0087FF",
    ":focus": {
      color: "#3047B0",
    },
  },
}));
const BoxAccounts = styled(Box)(() => ({
  height: "200px",
  width: "220px",
  marginBottom: "1rem",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },

  label: {
    color: "#3047B0",
  },
}));

const SearchDirCampaign = ({ dataCampaign, setShowAccounts }) => {
  const [search, setSearch] = useState("");
  const [dataAccount, setDataAccount] = useState(dataCampaign);

  const handleFilter = (e) => {
    setSearch(e.target.value);
    let accountIn = e.target.value;
    const dataFilter = dataCampaign.filter((account) =>
      account.nameCampaign.toLowerCase().includes(accountIn.toLowerCase())
    );
    setDataAccount(dataFilter);
  };

  const handleSetAccount = () => {
    setShowAccounts(false);
  };

  console.log(dataAccount);
  return (
    <BoxMain>
      <BoxSearch>
        <InputText
          fullWidth
          placeholder="Search Account"
          value={search}
          onChange={(e) => handleFilter(e)}
        />
      </BoxSearch>
      <BoxAccounts>
        {dataAccount.map((camp) => (
          <Box height="25px" display="flex" alignItems="center" marginTop={2}>
            {" "}
            <input
              type="checkbox"
              id="role"
              name="role"
              // value={role.tag}
              // onChange={(e) => setRole(e.target.value)}
              style={{
                height: "20px",

                marginRight: ".5rem",
              }}
            />
            <label htmlFor="role">{camp.nameCampaign}</label>
          </Box>
        ))}
      </BoxAccounts>
      <Box textAlign="end">
        <ButtonActionBlue sx={{ padding: "2px" }} onClick={handleSetAccount}>
          Ok
        </ButtonActionBlue>
      </Box>
    </BoxMain>
  );
};

export default SearchDirCampaign;
