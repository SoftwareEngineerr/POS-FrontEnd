import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { getToken } from "../../../../constant/token";
import CustomTable from "./table";
import { Components } from "../../../../components";
import PaySupplier from "./PaySupplier";

const ListAccordionDetails = ({ supplier }) => {
  const dispatch = useDispatch();
  const Token = getToken();
  const State = useSelector((state) => state);
  // const state = useSelector((state) => state.UpdateState);

  const [raw, setRaw] = useState([]);

  // 📥 FETCH
  useEffect(() => {
    if (!supplier) return;

    const fetchData = async () => {
      const res = await dispatch(
        GetRequest(`${State.Api.SupplierBill}/${supplier}`, Token)
      );

      setRaw(res?.ledger || []);
    };

    fetchData();
  }, [supplier , State.UpdateState]);

  // 🔄 STEP 1: NORMALIZE
  const normalized = useMemo(() => {
    return (raw || [])
      .map((item) => {
        if (item.type === "BILL") {
          return {
            type: "BILL",
            reference: item.bill_no,
            debit: Number(item.total_amount || 0),
            credit: 0,
            date: new Date(item.created_at),
          };
        }

        if (item.type === "PAYMENT") {
          return {
            type: "PAYMENT",
            reference: "Cash Payment",
            debit: 0,
            credit: Number(item.pay_out || 0),
            date: new Date(item.Date),
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [raw]);

  // 🧠 STEP 2: SORT OLD → NEW (FOR CALC ONLY)
  const sorted = useMemo(() => {
  return [...normalized].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();

    // 1️⃣ primary: date
    if (timeA !== timeB) return timeA - timeB;

    // 2️⃣ secondary: PAYMENT first
    if (a.type !== b.type) {
      if (a.type === "PAYMENT") return -1;
      if (b.type === "PAYMENT") return 1;
    }

    // 3️⃣ fallback: stable order (optional safety)
    return 0;
  });
}, [normalized]);

  // 💰 STEP 3: RUNNING BALANCE (CORRECT)
  const withBalance = useMemo(() => {
    let balance = 0;

    return sorted.map((item) => {
      balance = balance + item.debit - item.credit;

      return {
        ...item,
        balance,
      };
    });
  }, [sorted]);

  const finalLedger = useMemo(() => {
  return [...withBalance].reverse();
}, [withBalance]);

  // 💰 TOTALS (from correct data)
  const totalDebit = withBalance.reduce((s, i) => s + i.debit, 0);
  const totalCredit = withBalance.reduce((s, i) => s + i.credit, 0);
  const currentBalance =
    withBalance.length > 0
      ? withBalance[withBalance.length - 1].balance
      : 0;

  return (
    <Box>

      {/* SUMMARY */}
      <Box sx={{ mb: 2 }}>
        <Typography>Total Purchase: {totalDebit}</Typography>
        <Typography>Total Paid: {totalCredit}</Typography>

        <Typography
          sx={{
            fontWeight: 700,
            color: currentBalance > 0 ? "red" : "green",
          }}
        >

          Balance: {currentBalance}
        </Typography>
        <PaySupplier supplier={supplier}  />
      </Box>
        <CustomTable finalLedger={finalLedger} />

    </Box>
  );
};

export default ListAccordionDetails;