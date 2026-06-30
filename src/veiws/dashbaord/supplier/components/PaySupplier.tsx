import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Components } from "../../../../components";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { getToken } from "../../../../constant/token";
import { useDispatch, useSelector } from "react-redux";
import { UpdateOwnState } from "../../../../redux/actions/state/state";

const PaySupplier = ({supplier}) => {
  const Token = getToken();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const url = useSelector((state)=>state.Api)
  const [loading , setLoading ] = useState(false)

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // 🔓 Open modal
  const handleOpen = () => setOpen(true);

  // ❌ Close modal
  const handleClose = () => {
    setOpen(false);
    setAmount("");
    setDescription("");
  };

  console.log(supplier)
  // 💰 Submit
  const handleSubmit = async() => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }
    setLoading(true)
    const payload = {
      amount : amount,
      description: description,
      supplier_id: supplier
    }
    const res = await dispatch(PostRequest(url.SupplierPayment , Token , payload, "true"))
    dispatch(UpdateOwnState())
    setLoading(false)
    if(res?.status == 200){
      handleClose();
    }


  };

  return (
    <>
      {/* BUTTON */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "flex-start",
          },
        }}
      >
        <Components.CustomBtn
          data={loading ? "Processing..." : "Pay Supplier"}
          click={handleOpen}
          disabled={loading}
          style={{
            width:  "200px",
            height: "40px",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        />
      </Box>

      {/* MODAL */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Pay Supplier</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>

          {/* Amount */}
          <Components.Input
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Description */}
          <Components.Input
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </DialogContent>

        {/* <DialogActions sx={{ p: 2 }}> */}
            <Grid container spacing={2} marginLeft={2} marginRight={2} marginBottom={2}>
                <Grid size={{md:6 , xs:6}}>
                  <Button onClick={handleClose}
                    sx={{
                        width: "100%"
                    }}
                  >Cancel</Button>
                </Grid>
                <Grid  size={{md:6 , xs:6}}>
                    <Components.CustomBtn 
                        click={handleSubmit}
                        disabled={loading}
                        data="Pay"
                    />
                </Grid>
            </Grid>
        {/* </DialogActions> */}
      </Dialog>
    </>
  );
};

PaySupplier.propTypes = {
  onSubmit: PropTypes.func, // 💎 important
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default PaySupplier;