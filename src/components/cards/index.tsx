import React from "react";
import PropTypes from "prop-types";

import {
    Card,
    CardContent,
    Box,
    Typography,
    Stack,
    useTheme,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const CustomCard = ({
    title,
    value,
    icon,
    color = "primary",
    change = "",
    positive = true,
    iconcolor
}) => {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                transition: "0.2s",
                boxShadow: "0px 0px 9px 0px rgb(0 0 0 / 6%), 0 0px 4px -5px rgba(0, 0, 0, 0.25)",
                // "&:hover": {
                //     transform: "translateY(-3px)",
                //     boxShadow: theme.shadows[3],
                // },
            }}
        >
            <CardContent sx={{ padding: "16.6px 13px !important"  }}>
                
                {/* HEADER ROW */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `
                                ${theme.palette[color].light}
                            `,
                            color: theme.palette[color].main,
                            flexShrink: 0,
                            margin: "14px 4px !important",
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 500,
                                color: theme.palette.text.secondary,
                            }}
                        >
                            {title}
                        </Typography>
                        
                        {/* VALUE */}
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                mt: 1,
                                mb: 0.5,
                                lineHeight: 1.2,
                                color: theme.palette.text.primary,
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>

                </Stack>



            </CardContent>
        </Card>
    );
};

CustomCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
    ]),
    change: PropTypes.string,
    positive: PropTypes.bool,
};

export default React.memo(CustomCard);