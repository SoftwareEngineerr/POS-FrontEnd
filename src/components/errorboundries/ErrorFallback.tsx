import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const ErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        px: 2
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          maxWidth: 420,
          width: "100%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white"
        }}
      >

        {/* ICON */}
        <ErrorOutlineIcon
          sx={{
            fontSize: 80,
            color: "#ef4444",
            mb: 1,
            animation: "pulse 1.5s infinite"
          }}
        />

        {/* TITLE */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ mb: 1 }}
        >
          Oops!
        </Typography>

        <Typography
          sx={{
            mb: 3,
            color: "rgba(255,255,255,0.7)"
          }}
        >
          Something went wrong or page not found.
        </Typography>

        {/* BUTTON */}
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            py: 1,
            borderRadius: 3,
            background: "linear-gradient(90deg, #ef4444, #f97316)",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(90deg, #dc2626, #ea580c)"
            }
          }}
        >
          Go Home
        </Button>

        {/* SMALL TEXT */}
        <Typography
          sx={{
            mt: 3,
            fontSize: 12,
            color: "rgba(255,255,255,0.4)"
          }}
        >
          Error code: 404 / SYSTEM_FAILURE
        </Typography>

      </Paper>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>

    </Box>
  );
};

export default ErrorFallback;