import React, { useEffect, useState } from "react";

import { Grid, useTheme } from "@mui/material";

import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

// import FinanceCard from "./FinanceCard";
import FinanceCard from "./FinanceCard";
import { MoneyOutlined, Shop2Outlined, ShopOutlined, ShoppingBagOutlined, TrendingUpOutlined, WalletOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { Token } from "../../../../constant/token";


const SummaryCards = (props : any) => {
    const theme = useTheme().palette
    const url = useSelector((state)=>state.Api.FinanceCard)
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
        console.log(res)
        setData([ 
            {
                id: 6,
                title: "Invoices",
                value: res.data.totalInvoices,
                percentage: 7.9,
                trend: "up",
                color: "info",
                icon: <ReceiptLongRoundedIcon />,
            },
            
            {
                id: 4,
                title: "Total Sales",
                value: res.data.totalSales,
                percentage: 10.2,
                trend: "up",
                color: "warning",
                icon: <MoneyOutlined />,
            },
              {
                id: 5,
                title: "Total Returns",
                value: res.data.totalReturns,
                percentage: 3.4,
                trend: "up",
                color: "primary",
                icon: <PaymentsRoundedIcon />,
            },
        

            {
                id: 2,
                title: "Total Expense",
                value: res.data.totalExpense,
                percentage: 4.3,
                trend: "down",
                color: "error",
                icon: <WalletOutlined />,
            },
            {
                id: 1,
                title: "Total Revenue",
                value: res.data.netRevenue,
                percentage: 12.5,
                trend: "up",
                color: "primary",
                icon: <ShoppingBagOutlined />,
            },
            {
                id: 3,
                title: "Net Profit",
                value: res.data.netProfit,
                percentage: 18.6,
                trend: "up",
                color: "primary",
                icon: <TrendingUpOutlined />,
            },
            ])
          
    }
    useEffect(()=>{
        myfunc()
    },[props.fromDate , props.toDate , props])
    
  
    return (
        <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
        >
            {data.map((card) => (
                <Grid
                    key={card.id}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 2,
                    }}
                >
                    <FinanceCard
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                        change={`${card.percentage}%`}
                        positive={card.trend === "up"}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default React.memo(SummaryCards);