import React from "react";
import { Box, Typography } from "@mui/material";
import { Components } from "../../../../components";
// import { CustomBtn } from "../../../../components";

const ExpenseHeader = ({ onAdd }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="h5" fontWeight={700}>
        Expense Management
      </Typography>

      <Components.CustomBtn
        data="Add Expense"
        click={onAdd}
        style={{ maxWidth: "200px" }}
      />
    </Box>
  );
};

export default ExpenseHeader;