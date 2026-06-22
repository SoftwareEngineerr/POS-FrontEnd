import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Grid,
  TablePagination,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { CustomBtn } from "../../../components/button/button";
import { PostRequest } from "../../../redux/actions/PostRequest";
import { FullDate } from "../../../components/date/FullDate";

// ✅ types
interface Expense {
  Amount: number;
  Comment: string;
  Date: string;
}

const DivestmentPage: React.FC = () => {
  const api = useSelector((state: any) => state.Api);
  const dispatch = useDispatch<any>();

  const userToken =
    JSON.parse(sessionStorage.getItem("User_Data") || "{}")?.token;

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  // ✅ FIXED (string instead of Date)
  const [startDate, setStartDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const [endDate, setEndDate] = useState<string>(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setPage(0);

    try {
      const payload = {
        FromDate: startDate,
        ToDate: endDate,
      };

      const res = await dispatch(
        PostRequest(api.Getdivest, userToken, payload)
      );

      if (res && res.status === 200) {
        setExpenses(res.result.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async () => {
    if (!amount || !description) return;

    try {
      const payload = {
        Comment: description,
        Amount: parseFloat(amount),
      };

      const res = await dispatch(
        PostRequest(api.Adddivest, userToken, payload)
      );

      if (res.status === 200 || res.status === 201) {
        setDescription("");
        setAmount("");
        fetchExpenses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalAmount = expenses.reduce(
    (sum, e) => sum + Number(e.Amount || 0),
    0
  );

  return (
    <Box p={2}>
      <h3 style={{ textAlign: "center" }}>Capital Remove</h3>

      {/* FORM */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{
            md: 6,
            xs:12
        }}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid size={{
            md: 3,
            xs:12
        }}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>

        <Grid size={{
            md: 2,
            xs:12
        }}>
          <CustomBtn data="Add Expense" click={addExpense} />
        </Grid>
      </Grid>

      {/* DATE FILTER */}
      <Grid container spacing={2} mb={2}>
        <Grid item>
          <FullDate
            name="FromDate"
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Grid>

        <Grid item>
          <FullDate
            name="ToDate"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Grid>

        <Grid item>
          <Button variant="outlined" onClick={fetchExpenses}>
            Filter
          </Button>
        </Grid>
      </Grid>

      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.length > 0 ? (
            expenses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((e, i) => (
                <TableRow key={i}>
                  <TableCell>{e.Amount}</TableCell>
                  <TableCell>{e.Comment}</TableCell>
                  <TableCell>
                    {dayjs(e.Date).format("YYYY-MM-DD")}
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No records
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              {totalAmount}
            </TableCell>
            <TableCell colSpan={2}>Total</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />
    </Box>
  );
};

export default DivestmentPage;