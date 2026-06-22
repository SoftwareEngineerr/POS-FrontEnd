// Loader.jsx
import React, { memo } from "react";
import { Box, CircularProgress, Typography, Fade } from "@mui/material";

const Loader = ({
  size = 40,
  text = "Loading...",
  fullHeight = true,
}) => {
  return (
    <Fade in>
      <Box
        sx={{
          width: "100%",
          height: fullHeight ? "60vh" : "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <CircularProgress size={size} thickness={4} />

        {text && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {text}
          </Typography>
        )}
      </Box>
    </Fade>
  );
};

export default memo(Loader);