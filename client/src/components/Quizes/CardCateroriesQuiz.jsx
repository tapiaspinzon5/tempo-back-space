import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FiEdit3, FiSave } from "react-icons/fi";
import { ButtonAction } from "../../assets/styled/muistyled";

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

//Pasar id, idccms, category
const Categories = [
  { idCat: 1, NameCategory: "Test1" },
  { idCat: 2, NameCategory: "Test2" },
  { idCat: 3, NameCategory: "Test3" },
];

const CardCateroriesQuiz = () => {
  const [edit, setEdit] = useState(null);
  const [categories, setCategories] = useState(Categories);
  const [newCategory, setNewCategory] = useState({});

  const handleEdit = (data) => {
    setEdit(data.idCat);
    setNewCategory(data);
  };

  const addCategory = () => {
    if (categories.length < 10) {
      const cat = { idCat: Date.now(), NameCategory: "New Category" };
      setCategories([...categories, cat]);
      setNewCategory(cat);
      setEdit(cat.idCat);
    } else {
      console.log("ya tienes el maximo de categorias creadas ");
    }
  };

  const handleSave = () => {
    setEdit(null);
    const saveCategories = categories.map((cat) =>
      cat.idCat === newCategory.idCat ? newCategory : cat
    );
    setCategories(saveCategories);
    setNewCategory({});
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
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            mt: 2,
          }}
        >
          {categories.map((value) => (
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
          ))}
        </List>
      </Box>
    </BoxCat>
  );
};

export default CardCateroriesQuiz;
