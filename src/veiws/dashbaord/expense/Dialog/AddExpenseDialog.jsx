import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Divider
} from "@mui/material";

import { Components } from "../../../../components";

const AddExpenseDialog = ({
  open,
  setOpen,
  form,
  setForm,
  onSave
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">

      <DialogTitle>Add Expense</DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          select
          label="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          sx={{ mb: 2 }}
        >
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="number"
          label="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

      </DialogContent>

      <Divider />

      <DialogActions>

        <Button fullWidth onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Components.CustomBtn
          data="Save"
          click={onSave}
          style={{ maxWidth: "50%" }}
        />

      </DialogActions>

    </Dialog>
  );
};

export default AddExpenseDialog;