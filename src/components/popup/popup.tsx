import React, { memo, useEffect, useState } from "react";
import { Snackbar, Alert, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Popup = () => {
  const [open, setOpen] = useState(false);
  const modal = useSelector((state) => state.Modal);

  useEffect(() => {
    if (modal?.data) setOpen(true);
  }, [modal]);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const isSuccess = modal?.severity === "Success";

  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleClose}
        severity={isSuccess ? "success" : "error"}
        variant="standard" // ✅ clean look
        sx={{
          minWidth: 260,
          borderRadius: "10px",
          padding: "6px 12px",

          // ✅ light modern colors
          backgroundColor: isSuccess ? "#edf7ed" : "#fdecea",
          color: isSuccess ? "#1e4620" : "#611a15",

          // ✅ subtle border
          border: "1px solid",
          borderColor: isSuccess ? "#c8e6c9" : "#f5c6cb",

          // ✅ clean shadow
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          {modal?.data?.message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}
export default memo(Popup)