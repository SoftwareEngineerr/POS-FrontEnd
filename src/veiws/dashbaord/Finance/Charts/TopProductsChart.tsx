import React, { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    LabelList,
} from "recharts";

import { useTheme } from "@mui/material";

import ChartCard from "./ChartCard";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { Token } from "../../../../constant/token";

const data = [
    { name: "Long Dress", revenue: 8450 },
    { name: "Abaya", revenue: 5980 },
    { name: "Hijab", revenue: 3750 },
    { name: "Formal Wear", revenue: 2890 },
    { name: "Casual Wear", revenue: 2120 },
    { name: "Scarf", revenue: 1660 },
    { name: "Co-Ord Set", revenue: 1250 },
];

const TopProductsChart = (props) => {
    const theme = useTheme();
    const url = useSelector((state)=>state.Api.TopProducts)
    const dispatch = useDispatch()
    const [data , setData ] = useState([])

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
    }
    useEffect(()=>{
            myfunc()
        },[props.fromDate , props.toDate , props])
        

    return (
        <ChartCard title="Top Selling Products">
            <ResponsiveContainer width="100%" height={320}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 35,
                        left: 20,
                        bottom: 5,
                    }}
                    barCategoryGap={18}
                >
                    <XAxis type="number" hide />

                    <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        width={90}
                        tick={{
                            fill: theme.palette.text.secondary,
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `$${value.toLocaleString()}`,
                            "Revenue",
                        ]}
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                            border: "none",
                            borderRadius: 12,
                            background: theme.palette.background.paper,
                            boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                        }}
                    />

                    <defs>
                        <linearGradient
                            id="productGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#6D28D9" />
                        </linearGradient>
                    </defs>

                    <Bar
                        dataKey="value"
                        fill="url(#productGradient)"
                        radius={[10, 10, 10, 10]}
                        barSize={10}
                        animationDuration={900}
                    >
                        {data.map((_, index) => (
                            <Cell key={index} />
                        ))}

                        <LabelList
                            dataKey="value"
                            position="right"
                                formatter={(v, entry) =>
                                `$${v.toLocaleString()} | ${entry.quantity} pcs`
                            }

                            style={{
                                fill: theme.palette.text.primary,
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default React.memo(TopProductsChart);