import React from "react";
import PropTypes from "prop-types";

import {
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

const ChartCard = ({ title, children, action }) => {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
            }}
        >
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        {title}
                    </Typography>

                    {action}
                </Stack>

                <Divider sx={{ mb: 2 }} />

                {children}
            </CardContent>
        </Card>
    );
};

ChartCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    action: PropTypes.node,
};

export default React.memo(ChartCard);