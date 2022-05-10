import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FiEdit3, FiSave } from "react-icons/fi";
import { ButtonAction } from "../../assets/styled/muistyled";
import { addMissionCategories, getMissionsCategories } from "../../utils/api";
import { SwapSpinner } from "react-spinners-kit";

const BoxCat = styled(Box)(() => ({
  width: "13rem",
  border: "1px solid #fff",
  borderRadius: "10px",
  boxShadow: "3px 3px 3px #e8e8e8",
  minHeight: "18rem",
  position: "absolute",
  zIndex: 1000,
  padding: "1rem",
  backgroundColor: "#fff",
  li: {
    background: "#E8E8E8",
    borderRadius: "15px",
    marginBottom: ".5rem",

    padding: "1px 10px",
    input: {
      border: "none",
      borderRadius: "9px",
    },
  },
}));

const CardCateroriesQuiz = () => {
  const [edit, setEdit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({});
  const [loading, setLoading] = useState(false);

  const handleEdit = (data) => {
    setError(null);
    setEdit(data.idCat);
    setNewCategory(data);
  };

  const addCategory = () => {
    setError(null);
    if (categories.length < 10) {
      const cat = {
        idCat: Date.now(),
        NameCategory: "New Category",
        add: true,
      };
      setCategories([...categories, cat]);
      setNewCategory(cat);
      setEdit(cat.idCat);
    } else {
      setError("maximum 10 categories");
    }
  };

  const handleSave = async () => {
    setError(() => null);
    setEdit(null);

    if (
      newCategory?.NameCategory === null ||
      !newCategory?.NameCategory ||
      newCategory?.NameCategory === "New Category"
    ) {
      setError("You need a name for the category");
      setEdit(newCategory.idCat);
      return;
    }
    categories.map((cat) => {
      const newName = newCategory.NameCategory.toLowerCase();
      const exist = cat.NameCategory.toLowerCase();
      const word = exist.includes(newName);
      if (word) {
        setError("There is a category with that name");
        return;
      }
    });

    if (error !== null) {
      setEdit(newCategory.idCat);
      return;
    }

    if (newCategory.add) {
      await addMissionCategories({
        nameCategory: newCategory.NameCategory,
        context: 1,
        idCategory: 654,
      });
      getCategories();
    } else {
      await addMissionCategories({
        nameCategory: newCategory.NameCategory,
        context: 2,
        idCategory: newCategory.idCat,
      });

      getCategories();
    }

    setNewCategory({});
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    const getData = await getMissionsCategories();
    if (getData.status === 200) {
      setCategories(getData.data);
      setLoading(false);
    }
  };

  return (
    <BoxCat>
      <Box display="flex">
        <ButtonAction
          sx={{ width: "100%" }}
          onClick={addCategory}
          disabled={categories.length === 10 ? true : false}
        >
          {" "}
          <AiOutlineFileAdd size={25} /> Add Categories
        </ButtonAction>
      </Box>
      <Box>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={100}
          >
            <SwapSpinner />
          </Box>
        ) : (
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              mt: 2,
            }}
          >
            {categories.length > 0 ? (
              categories?.map((value) => (
                <ListItem
                  key={value.id}
                  disableGutters
                  secondaryAction={
                    value.idCat === edit ? (
                      <IconButton onClick={handleSave}>
                        <FiSave size={18} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEdit(value)}>
                        <FiEdit3 size={18} />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText
                    primary={
                      <input
                        type="text"
                        id={value.idCat}
                        disabled={value.idCat !== edit}
                        placeholder="New"
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            NameCategory: e.target.value,
                          })
                        }
                        value={
                          value.idCat === edit
                            ? newCategory.NameCategory
                            : value.NameCategory
                        }
                      />
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="#0087FF">
                {" "}
                No Categoies
              </Typography>
            )}
          </List>
        )}
      </Box>
      {error && (
        <Typography variant="body2" color="red" textAlign="end">
          {error}
        </Typography>
      )}
    </BoxCat>
  );
};

export default CardCateroriesQuiz;
