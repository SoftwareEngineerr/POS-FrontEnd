import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  useTheme,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { usePagination } from "../../../../components/pagination/pagination";
import { PictureAsPdfOutlined } from "@mui/icons-material";

// import { usePagination } from "./usePagination";

const CustomTable = ({ finalLedger }) => {
  const { page, setPage, totalPages, paginatedData } =
    usePagination(finalLedger, 10);
  const theme = useTheme().palette

  // 💎 COPY STATE
  const [copied, setCopied] = useState(false);

  // 📋 COPY TABLE
  const handleCopy = async () => {
    const text = finalLedger
      .map(
        (item) =>
          `${item.type} | ${item.reference} | ${item.debit || "-"} | ${item.credit || "-"} | ${item.balance} | ${item.date}`
      )
      .join("\n");

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  // 📄 PRINT / PDF (NO LIBRARY)
  const handlePDF = () => {
    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <head>
          <title>Ledger Report</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background: #f3f4f6; }
          </style>
        </head>
        <body>
          <h2>Ledger Report</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Reference</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${finalLedger
                .map(
                  (item) => `
                  <tr>
                    <td>${item.type}</td>
                    <td>${item.reference}</td>
                    <td>${item.debit || "-"}</td>
                    <td>${item.credit || "-"}</td>
                    <td>${item.balance}</td>
                    <td>${item.date.toLocaleString()}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div>

      {/* ACTION BAR */}
      <Box sx={{ display: "flex", gap: 1, mb: 1 , justifyContent: "flex-end"}}>

        {/* COPY */}
        <IconButton
          onClick={handleCopy}
          sx={{
            backgroundColor: copied ? "#dcfce7" : "#f1f5f9",
            transition: "0.2s",
            transform: copied ? "rotateY(0deg)"  : "rotateY(180deg)",
            "&:hover": {
              backgroundColor: copied ? "#bbf7d0" : "#e2e8f0",
            },
          }}
        >
          {copied ? (
            <span style={{ fontSize: "18px",width: "25px", color: "#16a34a" }}>✔</span>
          ) : (
            <ContentCopyIcon />
          )}
        </IconButton>

        {/* PDF */}
        <IconButton onClick={handlePDF} >
          <PictureAsPdfOutlined />
        </IconButton>

      </Box>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Debit</TableCell>
              <TableCell>Credit</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index}>
                {
                  console.log(item)
                }

                <TableCell>
                  <Chip
                    label={item.type}
                    size="small"
                    sx={{
                        fontWeight: 600,
                        backgroundColor:
                          item.type === "BILL"
                            ? "#fee2e2"
                            : item.reference == "Old Dues"
                            ? theme.primary.light
                            : item.type == "Customer Return Bill"
                            ? theme.primary.light
                            : "#dcfce7",
                        color: item.type === "BILL" ? "#dc2626" : "#16a34a",
                    }}
                    />
                </TableCell>

                <TableCell>{item.reference}</TableCell>
                <TableCell>{item.debit || "-"}</TableCell>
                <TableCell>{item.credit || "-"}</TableCell>

                <TableCell>
                  <b>{item.balance}</b>
                </TableCell>

                <TableCell>
                  {item.date.toLocaleString()}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* PAGINATION (MODERN UI) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          gap: 1.5,
        }}
      >

        {/* Prev */}
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
          }}
        >
          ← Prev
        </Button>

        {/* Page */}
        <Box
          sx={{
            px: 2,
            py: 0.8,
            borderRadius: "20px",
            backgroundColor: "#0f172a",
            color: "white",
            fontSize: "13px",
            fontWeight: 600,
            minWidth: "90px",
            textAlign: "center",
          }}
        >
          {page} / {totalPages}
        </Box>

        {/* Next */}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
          }}
        >
          Next →
        </Button>

      </Box>

    </div>
  );
};

export default CustomTable;