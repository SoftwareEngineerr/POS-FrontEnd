import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Divider,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../redux/actions/PostRequest";
import { getToken } from "../../../constant/token";
import { GetRequest } from "../../../redux/actions/GetRequest";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import EmployeeDetailsAccordion from "./components/EmployeeDetailsAccordion";
import { Components } from "../../../components";

const EmployeeList = () => {
  const Token = getToken();
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const url = useSelector((State) => State.Api);
  const checkstate = useSelector((State) => State.UpdateState);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = [
    { label: "Partner", value: "PARTNER" },
    { label: "Salesman", value: "SALESMAN" },
    { label: "Buyer", value: "BUYER" },
  ];

  const callEmployee = async () => {
    const res = await dispatch(GetRequest(url.GetEmployee, Token));
    setEmployees(res.employees);
  };

  useEffect(() => {
    callEmployee();
  }, [checkstate]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setForm({ name: "", email: "", password: "", role: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(PostRequest(url.RegisterEmployee, Token, form));
    callEmployee();
    handleClose();
  };

  return (
    <Components.CustomPaper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(180deg,#ffffff,#f8fafc)",
      }}
    >

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography fontSize="20px" fontWeight={700}>
            Employees
          </Typography>
          <Typography fontSize="13px" color="text.secondary">
            Manage your team access & roles
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            px: 2,
            py: 1,
            fontWeight: 600,
          }}
        >
          + Add Employee
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* LIST */}
      <Stack spacing={1.5}>
        {employees.length > 0 ? (
          employees.map((emp, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                "&:before": { display: "none" },
              }}
            >

              {/* SUMMARY */}
              <AccordionSummary expandIcon={<ExpandCircleDownOutlined />}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight={600}>
                      {emp.name}
                    </Typography>
                    <Typography fontSize="12px" color="text.secondary">
                      {emp.email}
                    </Typography>
                  </Box>

                  <Chip
                    label={emp.role}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      borderRadius: "8px",
                      backgroundColor:
                        emp.role === "PARTNER"
                          ? "#dcfce7"
                          : emp.role === "SALESMAN"
                          ? "#dbeafe"
                          : "#fef3c7",
                      color: "#111827",
                    }}
                  />
                </Box>
              </AccordionSummary>

              {/* DETAILS */}
              <AccordionDetails sx={{ background: "#fafafa" }}>
                <EmployeeDetailsAccordion emp={emp} />
              </AccordionDetails>

            </Accordion>
          ))
        ) : (
          <Typography sx={{ color: "#94a3b8", textAlign: "center", py: 3 }}>
            No employees yet
          </Typography>
        )}
      </Stack>

      {/* MODAL */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Add New Employee
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

            <Components.Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
            >
              {roles.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </TextField>

          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

    </Components.CustomPaper>
  );
};

export default EmployeeList;