import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
  Paper,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { Token } from "../../../../constant/token";
import { useDispatch, useSelector } from "react-redux";
import { Components } from "../../../../components";
import CustomerModal from "./customerdetails";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { UpdateOwnState } from "../../../../redux/actions/state/state";

const BillSection = ({ cart, setCart }: any) => {
    const dispatch = useDispatch()
    const url = useSelector((state : any)=>state.Api)
    const [checkdiscount , setCheckdiscount ] = useState()
    const [customer , setCustomer ] = useState()

  const [mode, setMode] = useState("cash"); // cash | split | khata
  const [cashAmount, setCashAmount] = useState("");
  const [khataAmount, setKhataAmount] = useState("");
    

  // ======================
  // UPDATE QUANTITY
  // ======================

useEffect(() => {
  const totalDiscount = cart ? cart.reduce(
    (sum: number, item: any) => {
      return sum + (item.discount || 0);
    },
    0
  )
  :
  0
  ;

  setCheckdiscount(totalDiscount);

  setKhataAmount(finalAmount - cashAmount);
  
        
}, [cart]);

const cashchecker = (type , item  )=> {
  const getdata = cashAmount - item.price;
    if(type == "dec") 
      if(getdata > 0){
        setCashAmount(getdata)
      }
      else{
        setCashAmount(0)
      }
}

  const updateQty = (id: number, type: "inc" | "dec" , item: any) => {
    setCart(
      cart
        .map((item: any) => {
          if (item.id === id) {
            cashchecker(type , item)
            const qty =
              type === "inc" ? item.qty + 1 : item.qty - 1;
              if(qty > item.stock && type === "inc"){
            return { ...item, qty: item.stock };
            }
            return { ...item, qty: qty > 0 ? qty : 0 };
          }
          return item;
        })
        .filter((item: any) => item.qty > 0)
    );


    if(type == "dec"){}
  };

  const updateInputQty = (id: number, getvalue : number , item: any) => {
    console.log(item.stock)
    setCart(
      cart
        .map((item: any) => {
          if (item.id === id) {
            // console.log(item.qty , getvalue)
            if(item.qty > getvalue){
              cashchecker("dec" , item)
            }
            const qty = parseInt(getvalue);
            if(qty > item.stock){
            return { ...item, qty: item.stock };
            }
            return { ...item, qty: qty > 0 ? qty : 0 };
          }
          return item;
        })
        .filter((item: any) => item.qty > 0)
    );


  };

  // ======================
  // UPDATE DISCOUNT
  // ======================
  const updateDiscount = (id: number, value: number) => {
    setCart(
      cart.map((item: any) =>
        item.id === id ? { ...item, discount: value } : item
      )
    );
  };

  // ======================
  // TOTAL CALCULATION
  // ======================
  const total =  cart ? cart.reduce(
    (sum: number, item: any) =>
      sum +
      item.price * item.qty -
      (item.discount || 0),
    0
  ) : 0;

  
  const finalAmount = total ;
  const handleCompleteSale = async () => {
  let paid_amount = 0;

  if (mode === "cash") {
    paid_amount = finalAmount;
  }

  if (mode === "khata") {
    paid_amount = cashAmount;
  }


  const payload = {
    cart: cart.map((item: any) => ({
      product_id: item.id,
      price: item.price,
      qty: item.qty,
      discount: item.discount || 0,
    })),
    paid_amount,
    khata_amount: finalAmount - paid_amount,
    payment_type: mode,
    customer
  };

  await dispatch(PostRequest(url.SellProduct, Token, payload));
  await dispatch(UpdateOwnState());

  setKhataAmount(0);
  setCashAmount(0)
  setCart([]);
};


  

  // 🔥 AUTO CALCULATE SPLIT
  const handleCashChange = (val) => {
    setCashAmount(val);
    setKhataAmount(finalAmount - Number(val || 0));
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      bgcolor="#f8f9fb"
      borderLeft="1px solid #eee"
    >
      {/* HEADER */}
      <Box p={2} bgcolor="white">

        <CustomerModal Customer={(e)=>setCustomer(e)} />

        <Typography variant="h6" fontWeight="bold">
          🧾 Bill Summary
        </Typography>
        <Typography variant="body2" color="gray">
          {cart?.length} items in cart
        </Typography>
      </Box>

      {/* ITEMS */}
      <Box flex={1} overflow="auto" p={2}>
        {cart?.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography color="gray">
              No items added yet
            </Typography>
          </Box>
        ) : (
          cart?.map((item: any) => (
            <Paper
              key={item.id}
              sx={{
                p: 1.5,
                mb: 2,
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* NAME + PRICE */}
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Typography fontWeight="bold">
                  {item.name}
                </Typography>

                <Typography fontWeight="bold" color="primary">
                  {item.price * item.qty -
                    (item.discount || 0)}{" "}
                  PKR
                </Typography>
              </Stack>

              {/* QTY CONTROL */}
              <Box
                display="flex"
                alignItems="center"
                mt={1}
              >
                <IconButton
                  size="small"
                  onClick={() => updateQty(item.id, "dec" , item)}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                {/* <Typography mx={1}>{item.qty}</Typography> */}
                <Components.Input
                  onChange={(e)=>updateInputQty(item.id , e.target.value , item)}
                  value={item.qty}
                  size="small"
                  sx={{
                    maxWidth: "60px",
                    textAlign: "center",
                    display: "flex",
                    alignItems:"center"
                  }}
                  type="number"
                />

                <IconButton
                  size="small"
                  onClick={() => updateQty(item.id, "inc")}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* PRICE INFO */}
              <Typography variant="body2" color="gray">
                {item.price} × {item.qty}
              </Typography>

              {/* DISCOUNT INPUT */}
              <TextField
                size="small"
                label="Discount"
                type="number"
                value={item.discount || ""}
                onChange={(e) =>
                  updateDiscount(
                    item.id,
                    Number(e.target.value)
                  )
                }
                sx={{ mt: 1 }}
                fullWidth
              />
            </Paper>
          ))
        )}
      </Box>

      {/* TOTAL SECTION (STICKY BOTTOM) */}
      <Box p={2} bgcolor="white" borderTop="1px solid #eee">
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
          mt: 1
        }}
      >

        {/* TOP ROW */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography fontSize={13} color="text.secondary">
            Pay
          </Typography>

          <Typography fontSize={18} fontWeight={700}>
            {finalAmount} PKR
          </Typography>
        </Box>

          {
          checkdiscount ? 
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography fontSize={13} color="text.secondary">
                Discount
              </Typography>

              <Typography fontSize={18} fontWeight={700}>
                {checkdiscount} PKR
              </Typography>
            </Box>
          :
          null
          }

        {/* SWITCH */}
        <ToggleButtonGroup
          value={mode}
          exclusive
          size="small"
          onChange={(e, val) => val && setMode(val)}
          fullWidth
          sx={{ mb: 1 }}
        >
          <ToggleButton value="cash" sx={{ py: 0.5 }}>
            Cash
          </ToggleButton>
          {
            customer != -1 ?
            <ToggleButton value="khata" sx={{ py: 0.5 }}>
              Khata
            </ToggleButton>
            :
            null
          }
        </ToggleButtonGroup>

        {/* KHATA COMPACT SPLIT */}
        {mode === "khata" && customer != -1 && (
          <Box display="flex" gap={1} alignItems="center">

            <TextField
              size="small"
              fullWidth
              label="Cash"
              type="number"
              value={cashAmount}


              inputProps={{
                min: 0,
                max: finalAmount,
              }}
              
              onChange={(e) => {
                const val = Number(e.target.value || 0);
                if (val > finalAmount) return;

                setCashAmount(val);
                setKhataAmount(finalAmount - val);
              }}
            />

            <Typography fontSize={12}>/</Typography>

            <TextField
              size="small"
              fullWidth
              label="Khata"
              value={khataAmount}
              disabled
            />

          </Box>
        )}

      </Paper>

          
            <Components.CustomBtn
            data="Complete Sale"
            style={{
              marginTop: "10px"
            }}
            click={handleCompleteSale}
            />

      </Box>
    </Box>
  );
};

export default BillSection;