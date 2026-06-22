import React, { memo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Components } from "../index";

const CustomDateRange = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        width: "100%"
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
        //   border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 2,
        //   background: "#f8fafc",
          width: "100%"
        }}
      >

        {/* FROM DATE */}
        <Components.Input
          type="date"
          size="small"
          label="From"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          sx={{
            minWidth: 160,
            background: "white",
            borderRadius: 2
          }}
        />

        <Typography sx={{ fontWeight: 700, color: "#64748b" }}>
          ➜
        </Typography>

        {/* TO DATE */}
        <Components.Input
          type="date"
          size="small"
          label="To"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          sx={{
            minWidth: 160,
            background: "white",
            borderRadius: 2
          }}
        />

      </Paper>
    </Box>
  );
};

export default memo(CustomDateRange);