// SupplierRegister.jsx
import React from "react";
import { Box, Grid } from "@mui/material";
import SupplierList from "./components/SupplierList";
import SupplierForm from "./components/SupplierForm";
import { Components } from "../../../components";
// import SupplierList from "./SupplierList";
// import SupplierForm from "./SupplierForm";

const CustomerRegister = () => {
  return (
    <Components.CustomPaper >
          <SupplierList />
    </Components.CustomPaper>
  );
};

export default CustomerRegister;