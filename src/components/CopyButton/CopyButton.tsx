import React, { memo, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  return (
    <Tooltip title={copied ? "Copied!" : "Copy"}>
      <IconButton
        onClick={handleCopy}
        sx={{
          background: copied ? "#dcfce7" : "#f1f5f9",
          transition: "0.2s",
          transform: copied ? "scale(1.05)" : "scale(1)",
          "&:hover": {
            background: copied ? "#bbf7d0" : "#e2e8f0",
          },
        }}
      >
        {copied ? (
          <CheckIcon sx={{ color: "#16a34a" }} />
        ) : (
          <ContentCopyIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default memo(CopyButton);