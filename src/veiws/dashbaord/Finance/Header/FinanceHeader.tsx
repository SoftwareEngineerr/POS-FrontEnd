import React from "react";
import PropTypes from "prop-types";

import {
    Avatar,
    Box,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

const FinanceHeader = ({
    title = "Finance Dashboard",
    subtitle = "Overview of your business financial performance",
    businessName = "Women's Fashion",
    businessDescription = "Elegance in every detail",
    logo,
}) => {
    const theme = useTheme();

    return (
        <Stack
            direction={{
                xs: "column",
                md: "row",
            }}
            justifyContent="space-between"
            alignItems={{
                xs: "flex-start",
                md: "center",
            }}
            spacing={3}
            mb={3}
        >
            {/* Left Side */}
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    color="text.primary"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {subtitle}
                </Typography>
            </Box>

        </Stack>
    );
};

FinanceHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    businessName: PropTypes.string,
    businessDescription: PropTypes.string,
    logo: PropTypes.string,
};

export default React.memo(FinanceHeader);