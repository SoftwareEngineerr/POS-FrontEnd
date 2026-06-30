import React, { useState } from "react";
import {
  AccordionDetails,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  Chip,
  Stack,
  Divider,
  Slide,
  Paper,
  MenuItem,
  Grid,
} from "@mui/material";

import { Components } from "../../../../components";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { getToken } from "../../../../constant/token";
import { useDispatch, useSelector } from "react-redux";
import { UpdateOwnState } from "../../../../redux/actions/state/state";

// 🔥 Smooth animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeDetailsAccordion = ({ emp }) => {
  const Token = getToken();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const url = useSelector((state)=>state.Api)

  const [form, setForm] = useState({
    employee_id: emp?.user_id,
    name: emp?.name || "",
    email: emp?.email || "",
    role: emp?.role || "",
    is_active: emp?.active ?? true,
  });

  if (!emp) return null;

  const handleOpen = () => {
    setForm({
      employee_id: emp?.user_id,
      name: emp.name,
      email: emp.email,
      role: emp.role,
      is_active: emp.active ?? true,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (e) => {
    setForm({ ...form, is_active: e.target.checked });
  };

  const handleUpdate = () => {
    console.log("UPDATED:", form);
    dispatch(PostRequest(url.UpdateEmployee , Token , form))
    dispatch(UpdateOwnState())
    setOpen(false);
  };

  
  const roles = [
    { label: "Partner", value: "PARTNER" },
    { label: "Salesman", value: "SALESMAN" },
    { label: "Buyer", value: "BUYER" },
  ];

  return (
    <AccordionDetails>

      {/* 💎 CARD STYLE INFO */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(135deg, #f8fafc, #ffffff)",
          border: "1px solid #e5e7eb",
        }}
      >

        <Stack spacing={1.2}>

          <Typography fontWeight={700} fontSize="15px">
            {emp.name}
          </Typography>

          <Typography fontSize="13px" color="text.secondary">
            {emp.email}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">

            <Chip
              label={emp.role}
              size="small"
              sx={{
                fontWeight: 600,
                background: "#e0f2fe",
                color: "#0369a1",
              }}
            />
{/* {emp.active} */}
            <Chip
              label={emp.active == 1 ? "ACTIVE" : "DEACTIVE"}
              size="small"
              sx={{
                fontWeight: 600,
                background: emp.active ? "#dcfce7" : "#fee2e2",
                color: emp.active ? "#166534" : "#991b1b",
              }}
            />

          </Stack>

          <Divider sx={{ my: 1 }} />

          {/* ACTION BUTTON */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Components.CustomBtn
              data="Edit Employee"
              style={{
                maxWidth: "180px",
                borderRadius: "10px",
              }}
              click={handleOpen}
            />
          </Box>

        </Stack>
      </Paper>

      {/* 🚀 MODERN POPUP */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
          },
        }}
      >

        <DialogTitle
          sx={{
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Update Employee
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>

          <Stack spacing={2}>

            <Components.Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />

            <Components.Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />

            {/* <Components.TextField
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
            /> */}

            
            <TextField
              select
              label="Role"
              name="role"
              fullWidth
              value={form.role}
              onChange={handleChange}
            >
              {roles.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </TextField>

            {/* 🔥 MODERN SWITCH BOX */}
            <Paper
              sx={{
                p: 1.5,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: form.is_active ? "#f0fdf4" : "#fef2f2",
              }}
              elevation={0}
            >
              <Typography fontWeight={600}>
                {form.is_active ? "Active Employee" : "Inactive Employee"}
              </Typography>

              <Switch
                checked={form.is_active}
                onChange={handleToggle}
                color="success"
              />
            </Paper>

          </Stack>

        </DialogContent>
{/* 🚀 ACTION FOOTER */}
<Box
  sx={{
    display: "flex",
    gap: 2,
    p: 2,
    borderTop: "1px solid #e5e7eb",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  }}
>
  {/* Cancel */}
  <Box sx={{ flex: 1 }}>
    <Button
      onClick={handleClose}
      variant="outlined"
      fullWidth
      sx={{
        textTransform: "none",
        borderRadius: "10px",
        fontWeight: 600,
        height: "42px",
      }}
    >
      Cancel
    </Button>
  </Box>

  {/* Save */}
  <Box sx={{ flex: 1 }}>
    <Components.CustomBtn
      click={handleUpdate}
      data="Save Changes"
      style={{
        height: "42px",
        borderRadius: "10px",
        fontWeight: 600,
      }}
    />
  </Box>
</Box>

      </Dialog>

    </AccordionDetails>
  );
};

export default EmployeeDetailsAccordion;