import React, { memo, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../redux/actions/GetRequest";
import { Token } from "../../constant/token";

// 👇 Styled Select (same idea as your TextField)
const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",

  "& .MuiSelect-select": {
    padding: "14px 16px",
    fontSize: "0.95rem",
    fontWeight: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
    transition: "all 0.25s ease",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light,
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },

  "&.Mui-focused": {
    boxShadow: `0 0 0 4px ${theme.palette.primary.main}15`,
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Categorytypetwo = ({ getvalue, label = "Select Category" }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);

  const [categories, setCategories] = useState([]);
  const [selectcat, setSelectcat] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dispatch(GetRequest(url.GetCategory, Token));
        setCategories(res?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, [dispatch, url.GetCategory]);

  const updateState = (value) => {
    setSelectcat(value);
    getvalue(value);
  };

  return (
    <StyledSelect
      value={selectcat}
      onChange={(e) => updateState(e.target.value)}
      displayEmpty
      fullWidth
    >
      <MenuItem value="">{label}</MenuItem>

      {categories.map((cat) => (
        <MenuItem key={cat.id} value={String(cat.id)}>
          {cat.name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default memo(Categorytypetwo);