import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box
} from "@mui/material";

const ExpenseTable = ({ expenses }) => {
  return (
    <Box>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((e, i) => (
            <TableRow key={i} hover>

              <TableCell>
                <Box sx={{ fontWeight: 600 }}>
                  {e.category}
                </Box>
              </TableCell>

              <TableCell sx={{ color: "#ef4444", fontWeight: 700 }}>
                {e.amount}
              </TableCell>

              <TableCell>{e.description}</TableCell>

              <TableCell>
                {new Date(e.Date).toLocaleDateString()}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>

      {expenses.length === 0 && (
        <Box sx={{ p: 3, textAlign: "center", color: "#94a3b8" }}>
          No expenses found
        </Box>
      )}

    </Box>
  );
};

export default ExpenseTable;