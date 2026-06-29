import React from "react";

import { Grid } from "@mui/material";

import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import FinanceCard from "./FinanceCard";

const investmentData = [
    {
        id: 1,
        title: "Bank Balance",
        value: "$38,750",
        percentage: 8.3,
        trend: "up",
        color: "success",
        subtitle: "Current account balance",
        icon: <AccountBalanceRoundedIcon />,
    },
    {
        id: 2,
        title: "Business Investment",
        value: "$120,000",
        percentage: 15.2,
        trend: "up",
        color: "primary",
        subtitle: "Total invested capital",
        icon: <SavingsRoundedIcon />,
    },
    {
        id: 3,
        title: "Expected Profit",
        value: "$18,600",
        percentage: 10.1,
        trend: "up",
        color: "secondary",
        subtitle: "Estimated this month",
        icon: <PaidRoundedIcon />,
    },
];

const InvestmentCards = () => {
    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            {investmentData.map((item) => (
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

export default React.memo(InvestmentCards);