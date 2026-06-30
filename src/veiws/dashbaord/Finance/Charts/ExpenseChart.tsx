import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { Token } from "../../../../constant/token";

// const data = [
//     { name: "Salary", value: 35 },
//     { name: "Rent", value: 20 },
//     { name: "Marketing", value: 15 },
//     { name: "Electricity", value: 10 },
//     { name: "Transport", value: 10 },
//     { name: "Other", value: 10 },
// ];
const COLORS = [
  "#8B5CF6",
  "#EC4899",
  "#38BDF8",
  "#FDBA74",
  "#FCA5A5",
  "#E5E7EB",
  "#22C55E",
  "#F97316",
  "#3B82F6",
  "#A855F7",
  "#EF4444",
  "#14B8A6",
  "#FACC15",
  "#0EA5E9",
  "#6366F1",
  "#10B981",
  "#FB7185",
  "#F59E0B",
  "#84CC16",
  "#06B6D4",
  "#9333EA",
  "#DB2777",
  "#2563EB",
  "#4ADE80",
  "#F43F5E",
  "#EAB308",
  "#0F172A",
  "#334155",
  "#64748B",
  "#94A3B8",
  "#C084FC",
  "#F472B6",
  "#2DD4BF",
  "#60A5FA",
  "#FCD34D",
  "#FB923C",
  "#A3E635",
  "#7C3AED",
  "#FB7185",
  "#22D3EE",
  "#D946EF"
];


const ExpenseChart = (props) => {
    const theme = useTheme()
    const url = useSelector((state)=>state.Api.GetExpenseChart)
    const dispatch = useDispatch()
    const [data , setData ] = useState([])
    const [total  , setTotal ] = useState()

    const myfunc = async()=> {
        const params = new URLSearchParams({
            from: props.fromDate,
            to: props.toDate
        });

        const res = await dispatch(
            GetRequest(
                `${url}?${params.toString()}`,
                Token,
                "type"
            ) 
        );
        setData(res.data)
        const gettotal = res.data.reduce((acc , crr)=>{
            acc += crr.value
            return acc
        },0)
        setTotal(gettotal)
    }
    useEffect(()=>{
            myfunc()
        },[props.fromDate , props.toDate , props])
        
    

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
                        {
                            total
                        }
                    </text>

                    <Tooltip
                        // formatter={(value , ) => [`${value}`, "Expense"]}
                        formatter={(value, entry) => {
                            const item = data.find(
                                (d) => d.value === value
                            );
                            console.log(data , value , item)
                            return [`${value}`, item?.name]

                        }}
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
                                    {value} :
                                    <span
                                        style={{
                                            float: "right",
                                            color:
                                                theme.palette.text.primary,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item?.value}
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