import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  Fade,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { Token } from "../../../../constant/token";
import { UpdateOwnState } from "../../../../redux/actions/state/state";

const ReturnProductPopup = ({
  open,
  onClose,
  onSuccess,
  maxQuantity = 1,
  productName = "",
  selectedItem,
  resetselecteditems,
  billid,
  returnproducts,
  billdetails
//   GetRequest,
//   PostRequest
}) => {
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const url = useSelector((State)=>State.Api)

  
  const [mode, setMode] = useState("cash"); // cash | split | khata
  const [cashAmount, setCashAmount] = useState("");
  const [khataAmount, setKhataAmount] = useState(returnproducts);
  const finalAmount = quantity * selectedItem?.sale_price;

  useEffect(()=>{
    setKhataAmount(returnproducts - cashAmount)
  },[returnproducts])

  useEffect(()=>{
    console.log(returnproducts)
    setCashAmount(returnproducts)
  },[billdetails?.customer_id])


  useEffect(() => {
    if (open) {
      setQuantity("");
      setDescription("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setError("");

    try {
      setLoading(true);

      const payload = {
        // sale_id: billdetails?.sale_id,
        customer_id: billdetails?.customer_id,
        reason: description,
        payment: {
         amount: cashAmount
        
        },
        items: selectedItem,
        billid: billid,
      idempotency_key: crypto.randomUUID(), // 🔥 IMPORTANTz
        

      }

        console.log(selectedItem)
      // return false

      // 👉 POST RETURN API
      await dispatch(PostRequest(url.ReturnProductsToCustomer , Token, payload));

      // 👉 REFRESH DATA (GET API)
    //   await dispatch(GetRequest(`/purchase-bill/${selectedItem?.bill_id}`));

      dispatch(UpdateOwnState())
      onSuccess?.();
      onClose();

      document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
      resetselecteditems()
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Fade}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        Return Product
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box sx={{ mt: 2 }}>

          {productName && (
            <Typography
              sx={{
                mb: 2,
                fontWeight: 600,
                fontSize: "15px",
                color: "#333"
              }}
            >
              {productName}
            </Typography>
          )}

          <TextField
            fullWidth
            size="small"
            multiline
            rows={3}
            label="Reason (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && (
            <Typography
              sx={{
                mt: 2,
                color: "error.main",
                fontSize: "13px"
              }}
            >
              {error}
            </Typography>
          )}

        </Box>
      </DialogContent>

      <Divider />


      <Box sx={{padding: "20px"}}>
        {/* SWITCH */}
        <ToggleButtonGroup
          value={mode}
          exclusive
          size="small"
          onChange={(e, val) => {
            val && setMode(val)
            setCashAmount(returnproducts)
          }}
          fullWidth
          sx={{ mb: 1 }}
        >
          <ToggleButton value="cash" sx={{ py: 0.5 }}>
            Cash
          </ToggleButton>
          {
            billdetails?.customer_id != -1 ?
            <ToggleButton value="khata" sx={{ py: 0.5 }}>
              Khata
            </ToggleButton>
            :
            null
          }
        </ToggleButtonGroup>

        {/* KHATA COMPACT SPLIT */}
        {mode === "khata" && billdetails?.customer_id != -1 && (
          <Box display="flex" gap={1} alignItems="center">

            <TextField
              size="small"
              fullWidth
              label="Cash"
              type="number"
              value={cashAmount}


              inputProps={{
                min: 0,
                max: returnproducts,
              }}
              
              onChange={(e) => {
                const val = Number(e.target.value || 0);
                if (val > returnproducts) return;

                setCashAmount(val);
                setKhataAmount(returnproducts - val);
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

      </Box>


      <DialogActions sx={{ p: 2 }}>

        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            minWidth: 110,
            borderRadius: "8px",
            textTransform: "none"
          }}
        >
          {loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            "Return"
          )}
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default ReturnProductPopup;