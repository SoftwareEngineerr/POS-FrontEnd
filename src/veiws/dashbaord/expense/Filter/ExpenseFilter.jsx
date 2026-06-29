import React from "react";
import { Paper, Box, FormControlLabel, Switch } from "@mui/material";
import { Components } from "../../../../components";

const ExpenseFilter = ({
  useDateFilter,
  setUseDateFilter,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onApply
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>

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
        <Box sx={{ display: "flex", gap: 2, mt: 2, alignItems: "center" }}>
          
          <Components.CustomDateRange
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />

          <Components.CustomBtn
            data="Apply"
            click={onApply}
            style={{ maxWidth: "200px" }}
          />

        </Box>
      )}

    </Paper>
  );
};

export default ExpenseFilter;