import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 0.8,
  },

  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200],
  },
}));

export const Input = memo(StyledInput);