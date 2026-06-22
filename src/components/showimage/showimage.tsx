import React, { memo, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";

const ShowImage = ({ src, sx, priority = false }) => {
  const api = useSelector((state) => state.Api);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageUrl =
    src && src.trim() !== ""
      ? `${api.ImageServer}${src}`
      : null;

  if (!imageUrl) {
    return (
      <Box
        sx={{
          ...sx,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f4f6",
          borderRadius: "10px",
          fontSize: "12px",
          color: "#9ca3af",
        }}
      >
        No Image
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...sx,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        background: "#f3f4f6",
      }}
    >
      {/* Skeleton */}
      {loading && !error && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
        />
      )}

      {/* Image */}
      <Box
        component="img"
        alt="Image"
        src={imageUrl}
        loading={priority ? "eager" : "lazy"}   // ✅ LCP fix
        fetchpriority={priority ? "high" : "auto"} // ✅ LCP fix
        decoding="async"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0,
          opacity: loading ? 0 : 1, // ✅ avoid display:none
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Error fallback */}
      {error && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          No Image
        </Box>
      )}
    </Box>
  );
};

export default memo(ShowImage);