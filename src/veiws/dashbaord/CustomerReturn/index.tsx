import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Stack,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../redux/actions/GetRequest";
import { Token } from "../../../constant/token";
import BillAccordion from "./components/BillAccordion";
import { Components } from "../../../components";

const CustomerReturn = () => {
  const dispatch = useDispatch();
  const url = useSelector((state : any) => state.Api);

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // server pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // fetch bills (SERVER SIDE PAGINATION)
  const fetchBills = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const query = `?page=${pageNumber}&limit=${limit}&search=${search}&fromDate=${fromDate}&toDate=${toDate}`;

      const res = await dispatch(
        GetRequest(`${url.CustomerBill}${query}`, Token , "true")
      );

      const data = res?.data || [];
      const pagination = res?.pagination || {};

      setBills(data);
      setTotalPages(pagination.totalPages || 1);
      setPage(pagination.page || pageNumber);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills(1);
  }, []);

  const handleFilter = () => {
    setPage(1);
    fetchBills(1);
  };

  const handleReset = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setPage(1);
    fetchBills(1);
  };

  const handlePageChange = (newPage : any) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchBills(newPage);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "18px",
        background: "linear-gradient(135deg, #f9fafb, #ffffff)",
        minHeight: "85vh",
      }}
    >
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Supplier Returns
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage purchase bills and returns
          </Typography>
        </Box>

        <Button
          startIcon={<RefreshIcon />}
          onClick={handleReset}
          variant="outlined"
        >
          Reset
        </Button>
      </Stack>
    <Paper
    elevation={0}
    sx={{
        p: 2.5,
        mb: 3,
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        background: "linear-gradient(180deg, #ffffff, #f9fafb)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    }}
    >
    <Grid container spacing={2} alignItems="center">

        {/* SEARCH */}
        <Grid size={{xs:12 , md:5}}>
        <Components.Input
            fullWidth
            size="small"
            placeholder="Search supplier, bill, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "#6b7280" }} />
                </InputAdornment>
            ),
            }}
            sx={{
            "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                transition: "0.2s",
                "&:hover": {
                boxShadow: "0 0 0 3px rgba(99,102,241,0.08)",
                },
                "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
                },
            },
            }}
        />
        </Grid>

        {/* FROM DATE */}
        <Grid size={{xs:6 , md:2.5}}>
        <TextField
            fullWidth
            size="small"
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            sx={{
            "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
            },
            }}
        />
        </Grid>

        {/* TO DATE */}
        <Grid size={{xs:6 , md:2.5}}>
        <TextField
            fullWidth
            size="small"
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            sx={{
            "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
            },
            }}
        />
        </Grid>

        {/* APPLY BUTTON */}
        <Grid size={{xs:12 , md:2}}>
            <Components.CustomBtn 
                data="Apply Filters"
                click={handleFilter}

            />
        </Grid>

    </Grid>
    </Paper>

      {/* LIST */}
      {loading ? (
        <Box textAlign="center" mt={6}>
          <Components.Loader />
        </Box>
      ) : bills.length === 0 ? (
        <Typography textAlign="center" mt={6}>
          No Bills Found
        </Typography>
      ) : (
        bills.map((bill : any) => (
          <BillAccordion key={bill.id} bill={bill} />
        ))
      )}

      {/* PAGINATION */}
      <Divider sx={{ my: 3 }} />


      
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
            // onClick={() => setPage(page - 1)}
            onClick={() => handlePageChange(page - 1)}
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
            // onClick={() => setPage(page + 1)}
            onClick={() => handlePageChange(page + 1)}    
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
    </Paper>
  );
};

export default CustomerReturn;