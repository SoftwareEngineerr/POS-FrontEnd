import React, { useState } from "react";
import { Grid, Paper, Box, IconButton, Select, MenuItem, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Input } from "../../../../components/input/input";
import { CustomBtn } from "../../../../components/button/button";
import { Fileimage } from "../../../../components/image/image";

type ProductType = {
  product_id?: number;
  name: string;
  price: number;
  stock: number;
  description: number;
  category: string;
  image?: string;
};

type ItemProps = {
  item: ProductType;
  index: number;
  control: any;
  register: any;
  setValue: any;
  watch: any;
  url: any;
  updateProduct: (index: number, productId?: number) => void;
  handleDelete: (index: number, productId?: number) => void;
};

const productInputs = [
  { name: "name", label: "Product Name", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "stock", label: "Quantity", type: "number" },
  { name: "description", label: "Purchase Price", type: "number" },
  { name: "category", label: "Category", type: "select" }
];

const categories = ["Electronics", "Clothing", "Toys", "Books", "Groceries"];

const Item: React.FC<ItemProps> = ({
  item,
  index,
  control,
  register,
  setValue,
  watch,
  url,
  updateProduct,
  handleDelete
}) => {
  const theme: any = useTheme().palette;

  const [checker , setChecker ] = useState(false)

  return (
    <Grid
  item
  lg={3}
  sx={{
    width: {
      xs: "99%",
      sm: "33%",
      md: "33%",
      lg: "33%"
    }
  }}
>
      <Paper elevation={2} sx={{ padding: "22px", borderRadius: "14px", marginBottom: "18px", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "-8px",
            left: "-8px",
            background: theme.primary.main,
            color: "#fff",
            fontSize: "12px",
            padding: "4px 12px",
            borderRadius: "6px",
            fontWeight: 600
          }}
        >
          Product {index + 1}
        </Box>

        <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
          {(!checker ? item.image_url ? item.image_url : false : false) ? (
             <>
                <Box
                    component="img"
                    src={url.ImageServer +"/"+ item.image_url}
                    sx={{
                        maxWidth: "100px",
                        margin: "auto",
                        display: "block",
                        marginBottom: "20px"
                    }}
                />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{position: "absolute"}}>
                <IconButton
                    onClick={() => setChecker(!checker)}
                    sx={{ background: "#ffe9e9", color: "#d32f2f"  }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
                </motion.div>
            </>
          ) : (
            <Fileimage name={`products.${index}.image_url`} GetSelectedValue={(val) => setValue(`products.${index}.image_url`, val[0])} />
          )}
        </Box>

        <Grid container spacing={2} alignItems="center" sx={{ flexDirection: "column" }}>
          {productInputs.map((field) => (
            <Grid item xs={12} key={field.name} sx={{ width: "100%" }}>
              {field.type === "select" ? (
                <Controller
                  name={`products.${index}.${field.name}`}
                  control={control}
                  render={({ field: selectField }) => (
                    <Select fullWidth {...selectField} displayEmpty>
                      <MenuItem value="" disabled>
                        {field.label}
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              ) : (
                <Input
                  label={field.label}
                  type={field.type}
                  {...register(`products.${index}.${field.name}`)}
                  onChange={(e) => setValue(`products.${index}.${field.name}`, e.target.value)}
                  sx={{ width: "100%" }}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", gap: "15px", marginTop: "15px", width: "100%" }}>
          <CustomBtn variant="contained" type="button" data="Update Product" click={() => updateProduct(index, item.product_id)} />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton onClick={() => handleDelete(index, item.product_id)} sx={{ background: "#ffe9e9", color: "#d32f2f" }}>
              <DeleteOutlineIcon />
            </IconButton>
          </motion.div>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Item;