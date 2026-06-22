import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider
} from "@mui/material";
import { PostRequest } from "../../../redux/actions/PostRequest";
import { GetRequest } from "../../../redux/actions/GetRequest";
import { useDispatch, useSelector } from "react-redux";
import { Components } from "../../../components";
import { Token } from "../../../constant/token";

const ExpensePage = () => {

  const [expenses, setExpenses] = useState([]);

  const [open, setOpen] = useState(false);

  // 🔥 FILTER STATE
  const [useDateFilter, setUseDateFilter] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dispatch = useDispatch();
  const geturl = useSelector((state)=>state.Api)

  // ➕ FORM STATE
  const [form, setForm] = useState({
    amount: "",
    category: "Rent",
    description: ""
  });

  // 📡 LOAD EXPENSES
  const fetchExpenses = async () => {
    const url = useDateFilter
      ? `${geturl.GetExpense}?from=${fromDate}&to=${toDate}`
      : `${geturl.GetExpense}`;

    const res = await dispatch(GetRequest(url , Token));
    setExpenses(res.data || []);
  };

  useEffect(() => {
    fetchExpenses();
  }, [useDateFilter]);

  // ➕ ADD EXPENSE
  const handleSubmit = async () => {
    if (!form.amount) return;

    await dispatch(PostRequest(`${geturl.AddExpense}` , Token , form));

    setForm({
      amount: "",
      category: "Rent",
      description: ""
    });

    setOpen(false);
    fetchExpenses();
  };

  // 💰 TOTAL
  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <Box sx={{ p: 3 }}>

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Expense Management
        </Typography>

        {/* <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(true)}
        >
          Add Expense
        </Button> */}
        <Components.CustomBtn
          click={() => setOpen(true)}
          data="Add Expense"
          style={{
            maxWidth: "200px"
          }}
        />
      </Box>

      {/* FILTER BAR */}
      <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>

        <FormControlLabel
          control={
            <Switch
              checked={useDateFilter}
              onChange={(e) => setUseDateFilter(e.target.checked)}
            />
          }
          label="Filter by Date"
        />

        {useDateFilter && (
          <Box sx={{ display: "flex",
          alignItems: "center",
          gap: 2, mt: 2 }}>

            <Components.CustomDateRange
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
            />

            <Components.CustomBtn
              data="Apply"
              style={{
                maxWidth: "200px",
                height: "fit-content"
              }}
              click={fetchExpenses}
            />

          </Box>
        )}

      </Paper>


    {/* TOTAL CARD */}
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Box>
        <Typography sx={{ opacity: 0.7 }}>Total Expense</Typography>
        <Typography fontSize={26} fontWeight={700}>
          {total}
        </Typography>
      </Box>

      <Typography sx={{ opacity: 0.5 }}>
        Last 7 days
      </Typography>
    </Paper>

    {/* TABLE CARD */}
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>

      <Table>

        <TableHead>
          <TableRow sx={{ background: "#f1f5f9" }}>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((e, i) => (
            <TableRow
              key={i}
              hover
              sx={{
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#f9fafb"
                }
              }}
            >

              {/* CATEGORY */}
              <TableCell>
                <Box
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 12,
                    fontWeight: 600,
                    background:
                      e.category === "Rent"
                        ? "#dbeafe"
                        : e.category === "Bills"
                        ? "#fee2e2"
                        : "#e5e7eb",
                    color:
                      e.category === "Rent"
                        ? "#1d4ed8"
                        : e.category === "Bills"
                        ? "#dc2626"
                        : "#374151"
                  }}
                >
                  {e.category}
                </Box>
              </TableCell>

              {/* AMOUNT */}
              <TableCell
                sx={{
                  color: "#ef4444",
                  fontWeight: 700
                }}
              >
                {e.amount}
              </TableCell>

              {/* DESCRIPTION */}
              <TableCell sx={{ color: "#475569" }}>
                {e.description}
              </TableCell>

              {/* DATE */}
              <TableCell sx={{ color: "#64748b" }}>
                {new Date(e.Date).toLocaleDateString()}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>

      {/* EMPTY STATE */}
      {expenses.length === 0 && (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            color: "#94a3b8"
          }}
        >
          No expenses found
        </Box>
      )}

    </Paper>
      {/* ADD EXPENSE MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">

        <DialogTitle>Add Expense</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            select
            label="Category"
            sx={{ mb: 2 }}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Bills">Bills</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Amount"
            type="number"
            sx={{ mb: 2 }}
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

        </DialogContent>

        <Divider />

        <DialogActions>
          <Button onClick={() => setOpen(false)}
                sx={{
                    width:"100%"
                }}
            >Cancel</Button>

          <Components.CustomBtn
            click={handleSubmit}
            data="Save"
            style={{
                maxWidth: "50%"
            }}
          />
        </DialogActions>

      </Dialog>

    </Box>
  );
};

export default ExpensePage;