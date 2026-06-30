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
  Fade
} from "@mui/material";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { getToken } from "../../../../constant/token";
import { UpdateOwnState } from "../../../../redux/actions/state/state";

const ReturnProductPopup = ({
  open,
  onClose,
  onSuccess,
  maxQuantity = 1,
  productName = "",
  selectedItem,
//   GetRequest,
//   PostRequest
}) => {
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const url = useSelector((State)=>State.Api)
  const Token = getToken();

  useEffect(() => {
    if (open) {
      setQuantity("");
      setDescription("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setError("");

    if (!quantity || Number(quantity) <= 0) {
      setError("Enter valid quantity");
      return;
    }

    if (Number(quantity) > Number(maxQuantity)) {
      setError("Cannot exceed remaining quantity");
      return;
    }

    try {
      setLoading(true);

      // 👉 POST RETURN API
      await dispatch(PostRequest(url.SupplierReturnProduct , Token, {
        purchase_bill_id: selectedItem?.bill_id,
        purchase_item_id: selectedItem?.id,
        product_id: selectedItem?.product_id,
        product_name: productName,
        quantity: Number(quantity),
        price: selectedItem?.cost_price,
        reason: description
      }));

      // 👉 REFRESH DATA (GET API)
    //   await dispatch(GetRequest(`/purchase-bill/${selectedItem?.bill_id}`));

      dispatch(UpdateOwnState())
      onSuccess?.();
      onClose();

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
            type="number"
            label={`Return Quantity (Max: ${maxQuantity})`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mb: 2 }}
          />

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