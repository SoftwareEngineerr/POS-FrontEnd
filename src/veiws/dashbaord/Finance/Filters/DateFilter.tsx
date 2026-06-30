import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Stack, TextField } from "@mui/material";

const FILTER_OPTIONS = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "This Year",
    "Custom",
];

const DateFilter = ({
    filter = "Today",
    fromDate = "",
    toDate = "",
    onFilterChange,
    onFromDateChange,
    onToDateChange,
    onApply,
}) => {

    // When user selects a preset
    const handleFilterClick = (item) => {
        onFilterChange?.(item);

        // Optional UX improvement:
        // If not custom, you can auto-clear dates or set them externally
    };

    // When user changes dates → force Custom
    const handleFromDateChange = (value) => {
        onFromDateChange?.(value);
        if (filter !== "Custom") {
            onFilterChange?.("Custom");
        }
    };

    const handleToDateChange = (value) => {
        onToDateChange?.(value);
        if (filter !== "Custom") {
            onFilterChange?.("Custom");
        }
    };

    return (
        <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", lg: "center" }}
            spacing={2}
            mb={3}
        >
            {/* Segmented Pills */}
            <Box
                sx={{
                    display: "flex",
                    gap: 0.5,
                    p: 0.5,
                    borderRadius: "999px",
                    backgroundColor: "#F3F4F6",
                    width: "fit-content",
                    flexWrap: "wrap",
                }}
            >
                {FILTER_OPTIONS.map((item) => {
                    const active = filter === item;

                    return (
                        <Button
                            key={item}
                            onClick={() => handleFilterClick(item)}
                            disableElevation
                            sx={{
                                textTransform: "none",
                                borderRadius: "999px",
                                px: 2,
                                py: 0.8,
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                fontSize: 13,

                                backgroundColor: active ? "#fff" : "transparent",
                                color: active ? "#111827" : "#6B7280",

                                boxShadow: active
                                    ? "0 1px 4px rgba(0,0,0,0.08)"
                                    : "none",

                                "&:hover": {
                                    backgroundColor: active
                                        ? "#fff"
                                        : "rgba(255,255,255,0.6)",
                                },
                            }}
                        >
                            {item}
                        </Button>
                    );
                })}
            </Box>

            {/* Date Controls */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
            >
                <TextField
                    type="date"
                    size="small"
                    label="From"
                    value={fromDate}
                    onChange={(e) =>
                        handleFromDateChange(e.target.value)
                    }
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    type="date"
                    size="small"
                    label="To"
                    value={toDate}
                    onChange={(e) =>
                        handleToDateChange(e.target.value)
                    }
                    InputLabelProps={{ shrink: true }}
                />

                <Button
                    variant="contained"
                    onClick={onApply}
                    sx={{
                        textTransform: "none",
                        px: 3,
                        height: 40,
                        borderRadius: 2,
                    }}
                >
                    Apply Filter
                </Button>
            </Stack>
        </Stack>
    );
};

DateFilter.propTypes = {
    filter: PropTypes.string,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
    onFilterChange: PropTypes.func,
    onFromDateChange: PropTypes.func,
    onToDateChange: PropTypes.func,
    onApply: PropTypes.func,
};

export default React.memo(DateFilter);