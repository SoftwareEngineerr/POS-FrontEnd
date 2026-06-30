import React, { useEffect, useMemo, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    AreaChart,
} from "recharts";

import { useTheme, Box, Stack, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ChartCard from "./ChartCard";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { Token } from "../../../../constant/token";

const fullData = {
    today: [
        { time: "9AM", cashIn: 3200, cashOut: 1800, profit: 1400 },
        { time: "12PM", cashIn: 5400, cashOut: 2600, profit: 2800 },
        { time: "3PM", cashIn: 7800, cashOut: 4200, profit: 3600 },
        { time: "6PM", cashIn: 9100, cashOut: 5000, profit: 4100 },
    ],
};

const KPI = ({ label, value, color }) => (
    <Box
        sx={{
            flex: 1,
            p: 2,
            borderRadius: 3,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.08)",
        }}
    >
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, color }}>
            {value}
        </Typography>
    </Box>
);

const CashFlowChart = (props) => {
    const theme = useTheme();
    const [view, setView] = useState("today");

    
    const url = useSelector((state)=>state.Api.CashFlow)
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
        
    // const data = fullData[view];

    const totals = useMemo(() => {
        return data.reduce(
            (acc, cur) => {
                acc.cashIn += cur.cashIn;
                acc.cashOut += cur.cashOut;
                acc.profit += cur.profit;
                return acc;
            },
            { cashIn: 0, cashOut: 0, profit: 0 }
        );
    }, [data]);

    return (
        <ChartCard title="Cash Flow Intelligence" subtitle="Real-time business performance insights">

            {/* KPI ROW */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                <KPI label="Cash In" value={totals.cashIn} color="#6C63FF" />
                <KPI label="Cash Out" value={totals.cashOut} color="#FF5C93" />
                <KPI label="Profit" value={totals.profit} color="#00C48C" />
            </Stack>

            {/* Toggle */}
            {/* <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, v) => v && setView(v)}
                size="small"
                sx={{
                    mb: 2,
                    "& .MuiToggleButton-root": {
                        color: theme.palette.text.secondary,
                        borderRadius: 2,
                        textTransform: "none",
                        px: 2,
                    },
                }}
            >
                <ToggleButton value="today">Today</ToggleButton>
                <ToggleButton value="yesterday">Yesterday</ToggleButton>
            </ToggleButtonGroup> */}

            {/* CHART */}
            <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={data}>

                    {/* Gradient Definitions */}
                    <defs>
                        <linearGradient id="cashIn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                        </linearGradient>

                        <linearGradient id="cashOut" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5C93" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#FF5C93" stopOpacity={0} />
                        </linearGradient>

                        <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00C48C" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#00C48C" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />

                    <XAxis
                        dataKey="time"
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis hide />

                    <Tooltip
                        contentStyle={{
                            background: "rgba(20,20,30,0.9)",
                            border: "none",
                            borderRadius: 12,
                            color: "#fff",
                        }}
                    />

                    <Legend />

                    {/* Animated Smooth Areas */}
                    <Area
                        type="monotone"
                        dataKey="cashIn"
                        stroke="#6C63FF"
                        fill="url(#cashIn)"
                        strokeWidth={3}
                        isAnimationActive
                        animationDuration={1200}
                    />

                    <Area
                        type="monotone"
                        dataKey="cashOut"
                        stroke="#FF5C93"
                        fill="url(#cashOut)"
                        strokeWidth={3}
                        isAnimationActive
                        animationDuration={1200}
                    />

                    <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#00C48C"
                        fill="url(#profit)"
                        strokeWidth={3}
                        isAnimationActive
                        animationDuration={1200}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default React.memo(CashFlowChart);