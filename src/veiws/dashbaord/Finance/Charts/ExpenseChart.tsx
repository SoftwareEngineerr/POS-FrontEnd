import React from "react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

import { useTheme } from "@mui/material";

import ChartCard from "./ChartCard";

const data = [
    { name: "Salary", value: 35 },
    { name: "Rent", value: 20 },
    { name: "Marketing", value: 15 },
    { name: "Electricity", value: 10 },
    { name: "Transport", value: 10 },
    { name: "Other", value: 10 },
];

const COLORS = [
    "#8B5CF6",
    "#EC4899",
    "#38BDF8",
    "#FDBA74",
    "#FCA5A5",
    "#E5E7EB",
];

const TOTAL = "$8,430";

const ExpenseChart = () => {
    const theme = useTheme();

    return (
        <ChartCard title="Expense Breakdown">
            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="38%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={2}
                        stroke="none"
                        cornerRadius={8}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <text
                        x="28%"
                        y="46%"
                        textAnchor="middle"
                        fill={theme.palette.text.secondary}
                        fontSize="13"
                        fontWeight="500"
                    >
                        Total
                    </text>

                    <text
                        x="28%"
                        y="56%"
                        textAnchor="middle"
                        fill={theme.palette.text.primary}
                        fontSize="24"
                        fontWeight="700"
                    >
                        {TOTAL}
                    </text>

                    <Tooltip
                        formatter={(value) => [`${value}%`, "Expense"]}
                        contentStyle={{
                            border: "none",
                            borderRadius: 12,
                            background: theme.palette.background.paper,
                            boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                        }}
                    />

                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        formatter={(value, entry) => {
                            const item = data.find(
                                (d) => d.name === value
                            );

                            return (
                                <span
                                    style={{
                                        color:
                                            theme.palette.text.secondary,
                                        fontSize: 13,
                                        display: "inline-block",
                                        width: 110,
                                    }}
                                >
                                    {value}
                                    <span
                                        style={{
                                            float: "right",
                                            color:
                                                theme.palette.text.primary,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item?.value}%
                                    </span>
                                </span>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default React.memo(ExpenseChart);