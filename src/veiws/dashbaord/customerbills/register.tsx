// SupplierRegister.jsx
import React from "react";
import { Box, Grid } from "@mui/material";
import SupplierList from "./components/SupplierList";
import SupplierForm from "./components/SupplierForm";
// import SupplierList from "./SupplierList";
// import SupplierForm from "./SupplierForm";

const CustomerRegister = () => {
  return (
    <Grid container spacing={2} mt={2}
      sx={{
        height: "100%",
        background: "#f8fafc", // 🔥 light modern bg
      }}
    >
      {/* 75% */}
      <Grid size={{md: 12 , sm: 12}} >
        <SupplierList />
      </Grid>
    </Grid>
  );
};

export default CustomerRegister;