import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import {
  Grid,
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";

const Roznamcha = () => {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const api = useSelector((state) => state.Api);

  useEffect(() => {
    fetchPayments(selectedDate);
  }, [selectedDate]);

  const fetchPayments = async (date) => {
    const token = JSON.parse(sessionStorage.getItem("User_Data"))?.token;

    const res = await axios.post(
      api.DailyTransactions,
      { selectedDate: date },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setPayments(res.data.today_payments || []);
    setSummary(res.data.till_yesterday || {});
    setUsers(res.data.users || []);
  };

  const totalIn = payments.reduce((a, b) => a + (b.paytype != "INVEST" ? b.amount_in || 0 : 0), 0);
  const balancetotalIn = payments.reduce((a, b) => a + ( b.amount_in || 0 ), 0);
  const totalOut = payments.reduce((a, b) => a + (b.amount_out || 0), 0);
  const finalBalance = balancetotalIn - totalOut + (summary.balance || 0);
return (
  <Box
    sx={{
      minHeight: "100vh",
      p: 3,
    //   background: "linear-gradient(180deg, #f6f8fc 0%, #eef2f7 100%)",
    }}
  >
    <Grid container spacing={3}>
      
      {/* LEFT - DATE */}
      <Grid 
        size={{
            md: 3,
            xs: 12
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 20,
            borderRadius: 4,
            p: 2,
            bgcolor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          }}
        >
          <Typography
            sx={{ mb: 2, fontWeight: 600, color: "#444" }}
          >
            Select Date
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={selectedDate}
              onChange={(d) => setSelectedDate(d)}
              sx={{
                "& .MuiPickersDay-root": {
                  borderRadius: 2,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid 
        size={{
            md: 9,
            xs: 12,
        }}
      >
        
        {/* SUMMARY CARDS */}
        <Grid container spacing={2} mb={3}>
          {[
            { label: "Income", value: totalIn, color: "#00C853" },
            { label: "Expense", value: totalOut, color: "#D50000" },
            { label: "Balance", value: finalBalance, color: "#2962FF" },
          ].map((card, i) => (
            <Grid
                size={{
                    md: 4,
                    xs: 12,
                }}
            key={i}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.02)",
                  },
                }}
              >
                <Typography sx={{ opacity: 0.85, fontSize: 13 }}>
                  {card.label}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 800,
                    mt: 1,
                  }}
                >
                  {card.value.toFixed(2)}
                </Typography>

                {/* soft glow effect */}
                <Box
                  sx={{
                    position: "absolute",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    top: -30,
                    right: -30,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* USERS SECTION */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 2 }}>
            Participants
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {users.map((u) => (
              <Chip
                key={u.user_id}
                label={`${u.name} • +${u.amount_in} / -${u.amount_out}`}
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: "10px",
                  fontWeight: 500,
                  bgcolor: "#fff",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* TABLE */}
        <Box
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "white",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f9fafc" }}>
                {["Out", "Desc", "User", "In", "Desc", "User"].map(
                  (h, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        fontWeight: 700,
                        color: "#555",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {h}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.map((p, i) => (
                <TableRow
                  key={i}
                  sx={{
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: "#f5f7ff",
                    },
                  }}
                >
                  <TableCell>{p.amount_out || ""}</TableCell>
                  <TableCell>{p.amount_out ? p.description : ""}</TableCell>
                  <TableCell>{p.amount_out ? p.username : ""}</TableCell>

                  <TableCell>{p.amount_in || ""}</TableCell>
                  <TableCell>{p.amount_in ? p.description : ""}</TableCell>
                  <TableCell>{p.amount_in ? p.username : ""}</TableCell>
                </TableRow>
              ))}

              {/* TOTAL ROW */}
              <TableRow sx={{ bgcolor: "#fafafa" }}>
                <TableCell sx={{ fontWeight: 800 }}>
                  {totalOut.toFixed(2)}
                </TableCell>
                <TableCell>Expense Total</TableCell>
                <TableCell />

                <TableCell sx={{ fontWeight: 800 }}>
                  {totalIn.toFixed(2)}
                </TableCell>
                <TableCell>Income Total</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </Box>

      </Grid>
    </Grid>
  </Box>
);
};

export default Roznamcha;