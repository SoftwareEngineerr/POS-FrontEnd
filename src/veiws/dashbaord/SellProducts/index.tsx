import React, { lazy, useState } from "react";
import { Box } from "@mui/material";
// import ProductList from "./components/ProductList";
const ProductList = lazy(() => import("./components/ProductList"));
import BillSection from "./components/BillSection";

const SellProducts: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  return (
    <Box display="flex" height="100vh">
      
      {/* LEFT */}
      <Box width="73%">
        <ProductList cart={cart} setCart={setCart} />
      </Box>

      {/* RIGHT */}
      <Box width="27%">
        <BillSection cart={cart} setCart={setCart} />
      </Box>

    </Box>
  );
};

export default SellProducts;