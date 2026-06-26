import React, { memo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    paddingLeft : '50px',
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },

  "& .MuiOutlinedInput-root": {
    borderRadius: 6,
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.25s ease",

    "& fieldset": {
      borderColor: theme.palette.divider,
      transition: "all 0.25s ease",
    },

    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },

    "&.Mui-focused": {
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}15`,
    },

    "&.Mui-focused fieldset": {
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
    },
  },

  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
    fontSize: "0.95rem",
    fontWeight: 500,
    paddingLeft : '55px',

    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
  },

  "& .Mui-disabled": {
    backgroundColor: theme.palette.action.hover,
  },

  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[300],
  },
}));

export const DesignedInput = memo((props) =>{
  const icon = props.icon
  const theme = useTheme().palette
  const styledIcon = icon
  ? React.cloneElement(icon, {
      style: {
        color : theme.primary.main,
        fontSize: "20px",
        height: "27px",
        ...icon.props.style
      }
    })
  : null;
  // console.log(props)
  return (
    <Box sx={{
      position: "relative",
        display: "flex",
        alignItems: "center"
    }}>
      
      <Box sx={{
        background: theme.secondary.light,
        width: "40px",
        height: "40px",
        marginLeft: "10px",
        borderRadius: "7px",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}>
        {styledIcon}
      </Box>
      <StyledInput {...props} />
    </Box>
  )
})

//  = memo(func);