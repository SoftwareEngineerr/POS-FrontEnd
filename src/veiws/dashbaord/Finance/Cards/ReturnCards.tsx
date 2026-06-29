import React from "react";

import { Grid } from "@mui/material";

import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import AssignmentReturnRoundedIcon from "@mui/icons-material/AssignmentReturnRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";

import FinanceCard from "./FinanceCard";

const returnData = [
    {
        id: 1,
        title: "Sales Returns",
        value: "$1,240",
        percentage: 2.4,
        trend: "down",
        color: "warning",
        subtitle: "Returned by customers",
        icon: <KeyboardReturnRoundedIcon />,
    },
    {
        id: 2,
        title: "Purchase Returns",
        value: "$860",
        percentage: 1.8,
        trend: "up",
        color: "info",
        subtitle: "Returned to suppliers",
        icon: <AssignmentReturnRoundedIcon />,
    },
    {
        id: 3,
        title: "Refund Amount",
        value: "$420",
        percentage: 0.9,
        trend: "down",
        color: "error",
        subtitle: "Processed refunds",
        icon: <CurrencyExchangeRoundedIcon />,
    },
];

const ReturnCards = () => {
    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            {returnData.map((item) => (
                <Grid
                    key={item.id}
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <FinanceCard {...item} />
                </Grid>
            ))}
        </Grid>
    );
};

export default React.memo(ReturnCards);