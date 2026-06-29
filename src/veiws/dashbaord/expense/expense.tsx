import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../redux/actions/GetRequest";
import { PostRequest } from "../../../redux/actions/PostRequest";
import { Token } from "../../../constant/token";

import ExpenseHeader from "./Header/ExpenseHeader";
import ExpenseFilter from "./Filter/ExpenseFilter";
import ExpenseTable from "./Table/ExpenseTable";
import AddExpenseDialog from "./Dialog/AddExpenseDialog";
import { CategoryOutlined, MoneyOutlined, ReceiptOutlined, TrendingUpOutlined, WalletOutlined } from "@mui/icons-material";
import { Components } from "../../../components";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const geturl = useSelector((state) => state.Api);

  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);

  const [useDateFilter, setUseDateFilter] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [form, setForm] = useState({
    amount: "",
    category: "Rent",
    description: ""
  });

  const fetchExpenses = async () => {
    const url = useDateFilter
      ? `${geturl.GetExpense}?from=${fromDate}&to=${toDate}`
      : `${geturl.GetExpense}`;

    const res = await dispatch(GetRequest(url, Token));
    setExpenses(res.data || []);
  };

  useEffect(() => {
    fetchExpenses();
  }, [useDateFilter]);

  const handleSubmit = async () => {
    await dispatch(PostRequest(geturl.AddExpense, Token, form));

    setForm({ amount: "", category: "Rent", description: "" });
    setOpen(false);
    fetchExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);


  const dailyAvg = total / 7 || 0;

  const topCategory =
    expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

  const top = Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0];


  const data = [
        { label: "Total Expense", value: total, color: "primary" , icon: <MoneyOutlined /> },
        { label: "Daily Average", value: (dailyAvg.toFixed(2)), color: "warning"  ,icon: <TrendingUpOutlined />},
        { label: "Total Transactions", value: (expenses.length), color: "info"  ,icon: <ReceiptOutlined />},
        { label: "Top Category", value: (top?.[0] || "-"), color: "success"  ,icon: <CategoryOutlined />},
  ]

  return (
    <Components.CustomPaper sx={{ p: 3 }}>

      <ExpenseHeader onAdd={() => setOpen(true)} />

      <ExpenseFilter
        useDateFilter={useDateFilter}
        setUseDateFilter={setUseDateFilter}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onApply={fetchExpenses}
      />


      <Grid container spacing={2} mb={3}>
        {
          data.map((card, i) => (
            <Grid
                size={{
                    md: 3,
                    xs: 12,
                }}
            key={i}>
              <Components.CustomCard 
                title={card.label}
                value={card.value}
                icon={card.icon}
                color={card.color}
              />
            </Grid>
          ))}
        </Grid>
      {/* <SummaryCards
        total={total}
        expenses={expenses}
      /> */}

      <ExpenseTable expenses={expenses} />

      <AddExpenseDialog
        open={open}
        setOpen={setOpen}
        form={form}
        setForm={setForm}
        onSave={handleSubmit}
      />

    </Components.CustomPaper>
  );
};

export default ExpensePage;