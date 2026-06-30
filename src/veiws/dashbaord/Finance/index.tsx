import React from "react";
import { Grid } from "@mui/material";
import { Components } from "../../../components";

import FinanceHeader from "./Header/FinanceHeader";
import DateFilter from "./Filters/DateFilter";

import SummaryCards from "./Cards/SummaryCards";
import ReturnCards from "./Cards/ReturnCards";
import InvestmentCards from "./Cards/InvestmentCards";

import CashFlowChart from "./Charts/CashFlowChart";
import TopProductsChart from "./Charts/TopProductsChart";
import ExpenseChart from "./Charts/ExpenseChart";

import EmployeeSalaryTable from "./Tables/EmployeeSalaryTable";
import RecentTransactionsTable from "./Tables/RecentTransactionsTable";

const Finance = () => {
    const [filter, setFilter] = React.useState("Today");
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
    
        return `${year}-${month}-${day}`;
    };
    const getNextDate = (date) => {
        const next = new Date(date);
        next.setDate(next.getDate() + 1);
        return next;
    };
    const [fromDate, setFromDate] = React.useState(formatDate(new Date()));
    const [toDate, setToDate] = React.useState(formatDate(getNextDate(new Date())));

    const handleFilterChange = (value) => {
        setFilter(value);

        const today = new Date();
        // alert(today)

        switch (value) {
            case "Today":
                setFromDate(formatDate(today));
                setToDate(formatDate(getNextDate(today)));
                break;

            case "This Week": {
                const start = new Date(today);
                const end = new Date(today);

                // Monday as first day of week
                const day = today.getDay(); // 0 = Sunday, 1 = Monday...
                const diff = day === 0 ? -6 : 1 - day;

                start.setDate(today.getDate() + diff);
                end.setDate(start.getDate() + 6);

                setFromDate(formatDate(start));
                setToDate(formatDate(end));
                break;
            }

            case "This Month": {
                const start = new Date(today.getFullYear(), today.getMonth(), 1);
                const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

                setFromDate(formatDate(start));
                setToDate(formatDate(end));
                break;
            }

            case "Last Month": {
                const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const end = new Date(today.getFullYear(), today.getMonth(), 0);

                setFromDate(formatDate(start));
                setToDate(formatDate(end));
                break;
            }

            case "This Year": {
                const start = new Date(today.getFullYear(), 0, 1);
                const end = new Date(today.getFullYear(), 11, 31);

                setFromDate(formatDate(start));
                setToDate(formatDate(end));
                break;
            }

            case "Custom":
                break;

            default:
                break;
        }
};




    const handleFromDateChange = (value) => {
        setFromDate(value);
        setFilter("Custom"); // important
    };

    const handleToDateChange = (value) => {
        setToDate(value);
        setFilter("Custom"); // important
    };

    return (
        <Components.CustomPaper>

            {/* Header */}
            <FinanceHeader />

            {/* Date Filters */}
            <DateFilter
                filter={filter}
                fromDate={fromDate}
                toDate={toDate}
                onFilterChange={handleFilterChange}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
                onApply={() => console.log("apply")}
             />

            {/* Summary Cards */}
            <SummaryCards
                fromDate={fromDate}
                toDate={toDate}
            />

            {/* Charts */}
            <Grid
                container
                spacing={2}
                mb={3}
                sx={{ mt: 0.5 }}
            >
                <Grid size={{ xs: 12, lg: 4 }}>
                    <CashFlowChart
                        fromDate={fromDate}
                        toDate={toDate}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <TopProductsChart
                        fromDate={fromDate}
                        toDate={toDate}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <ExpenseChart
                        fromDate={fromDate}
                        toDate={toDate}
                     />
                </Grid>
            </Grid>

            {/* Returns */}
            <ReturnCards />

            {/* Investments */}
            <InvestmentCards />

            {/* Tables */}
            <Grid
                container
                spacing={2}
                sx={{ mt: 0.5 }}
            >
                <Grid size={{ xs: 12, lg: 6 }}>
                    <EmployeeSalaryTable />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <RecentTransactionsTable />
                </Grid>
            </Grid>

        </Components.CustomPaper>
    );
};

export default React.memo(Finance);