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

const employees = [
    {
        id: 1,
        name: "John Smith",
        role: "Manager",
        salary: "$4,500",
        status: "Paid",
    },
    {
        id: 2,
        name: "Emma Johnson",
        role: "Cashier",
        salary: "$2,000",
        status: "Pending",
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "Sales",
        salary: "$2,300",
        status: "Paid",
    },
    {
        id: 4,
        name: "Sophia Wilson",
        role: "Accountant",
        salary: "$3,200",
        status: "Paid",
    },
    {
        id: 5,
        name: "James Davis",
        role: "Store Keeper",
        salary: "$1,900",
        status: "Pending",
    },
];

const EmployeeSalaryTable = () => {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                height: "100%",
            }}
        >
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    Employee Salaries
                </Typography>

                <Divider sx={{ my: 2 }} />

                <TableContainer>

                    <Table size="small">

                        <TableHead>

                            <TableRow>

                                <TableCell>Employee</TableCell>

                                <TableCell>Role</TableCell>

                                <TableCell align="right">
                                    Salary
                                </TableCell>

                                <TableCell align="center">
                                    Status
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {employees.map((employee) => (

                                <TableRow
                                    hover
                                    key={employee.id}
                                >

                                    <TableCell>

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >

                                            <Avatar>
                                                {employee.name.charAt(0)}
                                            </Avatar>

                                            <Box>

                                                <Typography
                                                    fontWeight={600}
                                                >
                                                    {employee.name}
                                                </Typography>

                                            </Box>

                                        </Stack>

                                    </TableCell>

                                    <TableCell>
                                        {employee.role}
                                    </TableCell>

                                    <TableCell align="right">
                                        {employee.salary}
                                    </TableCell>

                                    <TableCell align="center">

                                        <Chip
                                            size="small"
                                            label={employee.status}
                                            color={
                                                employee.status === "Paid"
                                                    ? "success"
                                                    : "warning"
                                            }
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

export default React.memo(EmployeeSalaryTable);