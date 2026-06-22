import React from "react";
import { TableBody, TableRow, TableCell, Typography } from "@mui/material";

const UniversalTableBody = ({
  data = [],
  columns = [],
  renderCell,
}) => {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map((row, index) => (
          <TableRow
            key={index}
            sx={{
              "&:hover": {
                backgroundColor: "#f9fafb",
              },
              transition: "0.2s",
            }}
          >
            {columns.map((col) => (
              <TableCell key={col.key}>
                {renderCell ? (
                  renderCell(row, col.key)
                ) : (
                  <Typography fontSize="13px">
                    {row[col.key] ?? "-"}
                  </Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Typography
              sx={{
                textAlign: "center",
                color: "#94a3b8",
                py: 2,
              }}
            >
              No data found
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default UniversalTableBody;