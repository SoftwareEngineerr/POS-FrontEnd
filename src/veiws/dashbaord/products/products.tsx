import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  Grid,
  MenuItem,
  Select,
  useTheme,
  FormControlLabel,
  Switch
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../redux/actions/PostRequest";
import { getToken } from "../../../constant/token";
import { Components } from "../../../components";
import Category from "./components/category";
import Brand from "./components/brand";
import { BarcodeReader, FileCopyOutlined, FolderCopyOutlined, MoneyOffCsredOutlined, NotificationAddOutlined, ProductionQuantityLimitsOutlined, SquareFootOutlined, WalletOutlined } from "@mui/icons-material";
import { IconBoxAlignTopRightFilled } from "@tabler/icons-react";


// Product inputs configuration
const productInputs = [
  { name: "productName", label: "Product Name", type: "text" , icon: <IconBoxAlignTopRightFilled /> },
  { name: "barcode", label: "Barcode", type: "text", icon: <BarcodeReader />},
  { name: "productalert", label: "Product Alert", type: "text", icon: <NotificationAddOutlined /> },
  { name: "price", label: "Price", type: "number", icon: <MoneyOffCsredOutlined /> },
  { name: "quantity", label: "Quantity", type: "number", icon: <ProductionQuantityLimitsOutlined /> },
  { name: "purchasePrice", label: "Purchase Price", type: "number", icon: <WalletOutlined /> },
  { name: "category", label: "Category", type: "select", icon: <BarcodeReader /> }, // new field
  { name: "brand", label: "brand", type: "select", icon: <BarcodeReader /> } // new field
];

export default function ProductRegistration() {
  const Token = getToken();
  const dispatch = useDispatch()
  const url = useSelector((state : any)=> state.Api)
  const [supplier , setSupplier ] = useState()
  const [paymentType, setPaymentType] = useState("CASH");
  const [cash , setCash ] = useState(0)
  const [total, setTotal] = useState(0);
  
  
  
  const { control, register, handleSubmit, setValue, watch , reset } = useForm({
    defaultValues: { products: [{
      category: "",
      brand: "",
    }] }
  });
  
  
  const { fields, append, remove  } = useFieldArray({
    control,
    name: "products"
  });


  const cashchecker = () => {
     return paymentType == "CASH" ? total : cash
  }
  
  
  const onSubmit = async (data) => {
    
    const formatted = {
      paymentType: paymentType,
      cash: cashchecker(),
      Supplier:supplier,
      products: data.products.map((p) => ({
        name: p.productName,
        barcode: p.barcode || "",
        price: Number(p.price),
        quantity: Number(p.quantity),
      cost_price: Number(p.purchasePrice),
      category: Number(p.category),
      brand: Number(p.brand),
      productalert: Number(p.productalert),
      image: p.image
    }))
  };
  
  console.log("FINAL SEND:", formatted);
  
  const res = await dispatch(PostRequest(url.RegisterProduct, Token, formatted,"true"));
  console.log(res)
  if(res.status == 200){
    reset({
      // ...getValues(),
      fields: [
        
        { name: "productName", label: "Product Name", type: "text" , icon: <IconBoxAlignTopRightFilled /> },
        { name: "barcode", label: "Barcode", type: "text", icon: <BarcodeReader />},
        { name: "productalert", label: "Product Alert", type: "text", icon: <NotificationAddOutlined /> },
        { name: "price", label: "Price", type: "number", icon: <MoneyOffCsredOutlined /> },
        { name: "quantity", label: "Quantity", type: "number", icon: <ProductionQuantityLimitsOutlined /> },
        { name: "purchasePrice", label: "Purchase Price", type: "number", icon: <WalletOutlined /> },
        { name: "category", label: "Category", type: "select", icon: <BarcodeReader /> }, // new field
        { name: "brand", label: "brand", type: "select", icon: <BarcodeReader /> } // new field
      ]
    });
  }
};


const products = watch("products");
const getdata = products?.map((item)=>item)

useEffect(() => {
  console.log(products)
  if (!products) return;

  const getdata = products.reduce((sum, item) => {
    return sum + (Number(item.price || 0) * Number(item.quantity || 0));
  }, 0);

  setTotal(getdata);
}, [getdata]);

  const Theme: any = useTheme().palette;

  return (
    <Box sx={{ md: {padding: "40px"} , sm: {padding: "40px"} }}>
      <Components.CustomPaper
      >
        <Typography
          variant="h5"
          sx={{  fontWeight: 700, letterSpacing: "0.5px" }}
        >
          Product Registration
        </Typography>
        <Typography
        sx={{
          marginBottom: "35px",
        }}
        >
          Add new product to your inventory
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{md:3 , sm:6 , xs: 12}}>
            <Category />
          </Grid>
          <Grid size={{md:6 , sm:6 , xs: 12}}>
            {/* <Category /> */}
            <Components.Supplier getvalue={(e: any)=>setSupplier(e)} />
          </Grid>
          <Grid size={{md:3 , sm:6 , xs: 12}}>
            <Brand />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" mb={2} overflow="hidden">
            <Grid size={{md:4 , sm:12 , xs:12}}>

            </Grid>

        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence>
            {fields.map((item, index) => {
              const image = watch(`products.${index}.image`);

              return (
                <motion.div
                  key={item.id}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      position: "relative",
                      padding: "22px",
                      borderRadius: "14px",
                      marginBottom: "18px",
                      transition: "0.25s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                      }
                    }}
                  >
                    {/* Ribbon */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-8px",
                        left: "-8px",
                        background: Theme.primary.main,
                        color: "#fff",
                        fontSize: "12px",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontWeight: 600
                      }}
                    >
                      Product {index + 1}
                    </Box>

                    <Grid container spacing={2} alignItems="center">
                      {productInputs.map((field) => (
                        <Grid item size={{md:2 , sm:4 , xs:12}} md={3} key={field.name}>
                          {field.name === "category" && (
                            <>
                            <Components.Category
                              control={control}
                              name={`products.${index}.category`}
                            />
                            </>
                          )}
                          {field.name === "brand" ? (
                            <>
                            <Components.Brand
                              control={control}
                              name={`products.${index}.brand`}
                            />
                            </>
                          )
                          : null
                        }
                          {(field.type !== "select" &&  field.name !== "productName") && (
                            <Components.DesignedInput
                              label={field.label}
                              icon={field.icon}
                              type={field.type}
                              {...register(`products.${index}.${field.name}`)}
                            />
                          )}
                          
                          {field.name === "productName" && (
                            <Components.SuggestionInput
                              icon={field.icon}
                              label={field.label}
                              onChange={(val)=>{
                                setValue(`products.${index}.productName`, val);
                              }}
                              onSelect={(item) => {
                                setValue(`products.${index}.productName`, item.name);
                                setValue(`products.${index}.barcode`, item.barcode);
                                setValue(`products.${index}.productalert`, item.product_alert);
                                setValue(`products.${index}.price`, item.price);
                                setValue(`products.${index}.quantity`, item.quantity);
                                setValue(`products.${index}.purchasePrice`, item.cost_price);
                                setValue(`products.${index}.category`, item.category.id);
                                setValue(`products.${index}.brand`, item.brand.id);
                                setValue(`products.${index}.image`, item.image_url);
                              }}
                            />
                          )}
                        </Grid>
                      ))}

                      <Grid size={{md:2 , sm:4 , xs:12}}>
                        <Controller
                          control={control}
                          name={`products.${index}.image`}
                          render={({ field }) => (
                            <Components.Image
                              name={field.name}
                              GetSelectedValue={(val : any) => {
                                field.onChange(val[0]);
                              }}
                              defaultImage={`products.${index}.image`}
                            />
                          )}
                        />
                        
                      </Grid>

                      {/* Delete Button */}
                      <Grid  size={{md:2 , sm:4 , xs:12}}>
                        <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                          <IconButton
                            onClick={() => remove(index)}
                            sx={{
                              background: "#ffe9e9",
                              color: "#d32f2f",
                              "&:hover": { background: "#ffd5d5" }
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </Paper>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* import Switch from "@mui/material/Switch"; */}


          {/* Buttons */}
          {/* <Box sx={{ display: "flex", gap: "15px", marginTop: "15px" }}> */}
            <Grid container spacing={1}>
              <Grid size={{
                md: 2,
                lg: 2,
                sm: 6,
                xs: 6
              }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => append({})}
                    sx={{ borderRadius: "10px", padding: "16px 24px", width:"100%" }}
                  >
                    Add Product
                  </Button>
                </motion.div>
              </Grid>
              <Grid size={{
                md: 2,
                lg: 2,
                sm: 6,
                xs: 6
              }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Components.CustomBtn variant="contained" type="submit" icon={<FolderCopyOutlined style={{marginRight: "5px", fontSize: "18px"}} />} data="Save Products" />
                </motion.div>
              </Grid>
              <Grid size={{
                md: 5,
                lg: 5,
                sm: 12,
                xs: 12
              }}>
                  
                    <Grid
                    container
                    spacing={1}
                    display="flex"
                    alignItems="center"
                    >
                      <Grid size={{md:8, xs:10}} display="flex">
                        <FormControlLabel
                        control={
                          <Switch
                          checked={paymentType === "OWE"}
                          onChange={(e) =>
                            setPaymentType(e.target.checked ? "OWE" : "CASH")
                          }
                          />
                        }
                        label={paymentType === "OWE" ? "Owe" : "Cash"}
                        />
                        {
                          paymentType == "OWE" ?
                          <Components.Input
                          sx={{
                            width:"100%", 
                              // marginRight: "20px"
                            }}
                            // smallWidth
                            type="number"
                            onChange={(e) => {
                                let value = Number(e.target.value);

                                if (value < 0) value = 0;
                                if (value > total) value = total;

                                e.target.value = value;
                                setCash(e.target.value)

                              }}
                            defaultValue="0"
                            inputProps={{
                              min: 0,
                              max: total
                            }}
                          />
                           :
                          null
                        }
                      </Grid>
                      
                        {
                          paymentType == "OWE" ?
                            <Grid size={{md:4, xs:2}}>
                              {total - cash}
                            </Grid>
                            :
                            null
                        }
                    </Grid>
                   
              </Grid>
            </Grid>



          {/* </Box> */}
        </form>
      </Components.CustomPaper>
    </Box>
  );
}