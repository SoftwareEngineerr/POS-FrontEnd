import React, { memo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

interface FullDateProps {
  value?: string;
  onChange?: (date: string) => void;
  name?: string;
  label?: string;
  min?: string;
  max?: string;
}

export const FullDate = memo(
  ({ value, onChange, name, label, min, max }: FullDateProps) => {
    const [date, setDate] = useState<Dayjs | null>(
      value ? dayjs(value) : null
    );

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          minDate={min ? dayjs(min) : undefined}
          maxDate={max ? dayjs(max) : undefined}
          onChange={(newValue) => {
            setDate(newValue);

            if (!newValue) return;

            onChange?.(newValue.format("YYYY-MM-DD"));
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              label: label || "Select Date",
            },
          }}
        />
      </LocalizationProvider>
    );
  }
);