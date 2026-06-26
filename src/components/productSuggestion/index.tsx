import React, { memo, useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Box,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../redux/actions/GetRequest";
import { Token } from "../../constant/token";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },
}));

export const SuggestionInput = memo(({ label, onSelect , onChange }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // DEBOUNCE API
  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await dispatch(
          GetRequest(`${url.ProductSuggestion}?q=${value}`, Token)
        );

        setSuggestions(res?.data || []);
        setOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [value]);

  const myfunc = (e)=>{
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <Box ref={wrapperRef} sx={{ position: "relative", width: "100%" }}>
      {/* INPUT */}
      <StyledInput
        label={label}
        value={value}
        onFocus={() => setFocused(true)}
        onChange={(e) => myfunc(e)}
        autoComplete="off"
        // onChange={(e)=>}
      />

      {/* DROPDOWN */}
      {focused && (open || loading) && (
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            width: "100%",
            zIndex: 999,
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #eaeaea",
          }}
        >
          {/* LOADING */}
          {loading && (
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CircularProgress size={18} />
              <Typography variant="body2" color="text.secondary">
                Searching...
              </Typography>
            </Box>
          )}

          {/* EMPTY STATE */}
          {!loading && suggestions.length === 0 && value.length >= 2 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                No results found
              </Typography>
            </Box>
          )}

          {/* LIST */}
          {!loading &&
            suggestions.map((item, index) => (
              <Box key={item.id}>
                <Box
                  onMouseDown={(e) => {
                    e.preventDefault();

                    setValue(item.name);
                    setOpen(false);
                    setFocused(false);

                    onSelect?.(item);
                  }}
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": {
                      backgroundColor: "#f5f7ff",
                      transform: "scale(1.01)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Typography fontWeight={600} sx={{ fontSize: "0.95rem" }}>
                    {item.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", letterSpacing: "0.3px" }}
                  >
                    Barcode: {item.barcode}
                  </Typography>
                </Box>

                {index !== suggestions.length - 1 && (
                  <Divider sx={{ opacity: 0.4 }} />
                )}
              </Box>
            ))}
        </Paper>
      )}
    </Box>
  );
});