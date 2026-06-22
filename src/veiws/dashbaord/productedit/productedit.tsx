import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../redux/actions/PostRequest";
import { GetRequest } from "../../../redux/actions/GetRequest";
import { Token } from "../../../constant/token";
import Item from "./components/item";

type ProductType = {
  product_id?: number;
  name: string;
  price: number;
  stock: number;
  description: number;
  category: string;
  image_url?: string;
};

type FormValues = {
  products: ProductType[];
};

export default function ProductManagement() {
  const dispatch = useDispatch();
  const url = useSelector((state: any) => state.Api);

  const { control, register, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: { products: [] }
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "products"
  });

  const loadProducts = async () => {
    const result: any = await dispatch(GetRequest(url.GetProducts, Token));
    if (result?.data) {
      reset({ products: result.data });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const updateProduct = async (index: number, productId?: number) => {
    if (!productId) return;

    const product = watch(`products.${index}`);

    await dispatch(
      PostRequest(url.EditProducts + "/" + productId, Token, product)
    );

    alert("Product updated successfully!");
  };

  const handleDelete = async (index: number, productId?: number) => {
    if (!productId) return;

    await dispatch(
      PostRequest(url.DeleteProducts + "/" + productId, Token, {})
    );

    remove(index);
  };

  return (
    <Box
      sx={{
        
            md:{
                padding: "50px",

            },
        background: "#f6f8fc",
        minHeight: "100vh"
      }}
    >
      <Paper
        elevation={0}
        sx={{
            md:{
                padding: "35px",

            },
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "30px",
            fontWeight: 700
          }}
        >
          Product Management
        </Typography>

        <Grid container spacing={4}>
          {fields.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              control={control}
              register={register}
              setValue={setValue}
              watch={watch}
              url={url}
              updateProduct={updateProduct}
              handleDelete={handleDelete}
            />
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}