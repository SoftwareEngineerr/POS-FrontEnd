import React from "react";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";

const transactions = [
    {
        id: "#TRX-1001",
        customer: "John Smith",
        type: "Sale",
        amount: "$250.00",
        status: "Completed",
    },
    {
        id: "#TRX-1002",
        customer: "Emma Johnson",
        type: "Purchase",
        amount: "$580.00",
        status: "Pending",
    },
    {
        id: "#TRX-1003",
        customer: "Michael Brown",
        type: "Refund",
        amount: "$120.00",
        status: "Completed",
    },
    {
        id: "#TRX-1004",
        customer: "Sophia Wilson",
        type: "Sale",
        amount: "$920.00",
        status: "Completed",
    },
    {
        id: "#TRX-1005",
        customer: "James Davis",
        type: "Expense",
        amount: "$350.00",
        status: "Cancelled",
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case "Completed":
            return "success";
        case "Pending":
            return "warning";
        case "Cancelled":
            return "error";
        default:
            return "default";
    }
};

const RecentTransactionsTable = () => {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    Recent Transactions
                </Typography>

                <Divider sx={{ my: 2 }} />

                <TableContainer>

                    <Table size="small">

                        <TableHead>

                            <TableRow>

                                <TableCell>Transaction</TableCell>

                                <TableCell>Type</TableCell>

                                <TableCell align="right">
                                    Amount
                                </TableCell>

                                <TableCell align="center">
                                    Status
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {transactions.map((transaction) => (

                                <TableRow
                                    hover
                                    key={transaction.id}
                                >

                                    <TableCell>

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >

                                            <Avatar>
                                                {transaction.customer.charAt(0)}
                                            </Avatar>

                                            <Box>

                                                <Typography
                                                    fontWeight={600}
                                                >
                                                    {transaction.customer}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {transaction.id}
                                                </Typography>

                                            </Box>

                                        </Stack>

                                    </TableCell>

                                    <TableCell>
                                        {transaction.type}
                                    </TableCell>

                                    <TableCell align="right">
                                        {transaction.amount}
                                    </TableCell>

                                    <TableCell align="center">

                                        <Chip
                                            size="small"
                                            label={transaction.status}
                                            color={getStatusColor(transaction.status)}
                                        />

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

            </CardContent>
        </Card>
    );
};

export default React.memo(RecentTransactionsTable);