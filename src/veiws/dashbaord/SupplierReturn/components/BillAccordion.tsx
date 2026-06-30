import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { GetRequest } from "../../../redux/actions/GetRequest";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../../constant/token";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import Showimage from "../../../../components/showimage/showimage";
import { Components } from "../../../../components";
import ReturnProductPopup from "./returnProductsPopup";
import { UpdateOwnState } from "../../../../redux/actions/state/state";

const BillAccordion = ({ bill }) => {
    const Token = getToken();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState([]);
  const url = useSelector((state)=>state.Api)
  const updateState = useSelector((state)=>state.UpdateState)
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 📡 load items only when opened
  const fetchItems = async () => {
    if (products.length > 0) return;

    const res = await dispatch(
      GetRequest(`${url.ShowBillProducts}${bill.id}`, Token)
    );
    
    setProducts(res.data || { items: [], returnItems: [] });
  };

  useEffect(() => {
    if (expanded) fetchItems();
  }, [expanded, updateState]);

  // 🔥 Group returns by product_id
  const returnMap = useMemo(() => {
    const map = {};

    (products.returnItems || []).forEach((r) => {
      if (!map[r.product_id]) {
        map[r.product_id] = {
          total: 0,
          items: [],
        };
      }

      map[r.product_id].total += Number(r.quantity);
      map[r.product_id].items.push(r);
    });

    return map;
  }, [products.returnItems]);


  const purchaseTotal = products?.items?.reduce(
  (sum, p) => sum + (p.quantity * p.cost_price),
  0
) || 0;

const returnTotal = products?.returnItems?.reduce(
  (sum, r) => sum + Number(r.total),
  0
) || 0;

const netTotal = purchaseTotal - returnTotal;

  return (
    <Accordion
      expanded={expanded}
      onChange={async (_, isOpen) => {
        setExpanded(isOpen);
        if (isOpen) await fetchItems();
      }}
    >
      {/* 🔹 HEADER */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
            px: 2,
            py: 1.5,
            borderRadius: "12px",
            transition: "0.25s ease",
            "&:hover": {
            backgroundColor: "rgba(0,0,0,0.03)",
            },
        }}
        >
        <Box
            sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr",
            alignItems: "center",
            gap: 2,
            }}
        >
            {/* Bill No */}
            <Box>
            <Typography variant="caption" color="text.secondary">
                Bill Number
            </Typography>
            <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#1f2937" }}
            >
                {bill.bill_no}
            </Typography>
            </Box>

            {/* Supplier */}
            <Box>
            <Typography variant="caption" color="text.secondary">
                Supplier
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
                {bill.supplier_name}
            </Typography>
            </Box>

            {/* Amount */}
            <Box>
            <Typography variant="caption" color="text.secondary">
                Total
            </Typography>
            <Typography
                sx={{
                fontWeight: 700,
                color: "#16a34a",
                }}
            >
                {bill.total_amount}
            </Typography>
            </Box>

            {/* Phone */}
            <Box>
            <Typography variant="caption" color="text.secondary">
                Phone
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
                {bill.supplier_phone}
            </Typography>
            </Box>
        </Box>
        </AccordionSummary>

        <ReturnProductPopup
            open={openReturn}
            onClose={() => setOpenReturn(false)}
            productName={selectedProduct?.product_name}
            maxQuantity={selectedProduct?.remaining_quantity}
            selectedItem={selectedProduct}
            onSubmit={(data) => {
                returnItemAPI({
                ...data,
                purchase_item_id: selectedProduct.id,
                product_id: selectedProduct.product_id,
                purchase_bill_id: selectedProduct.bill_id
                });

                setOpenReturn(false);
            }}
            />

      {/* 🔹 DETAILS */}
      <AccordionDetails>
        <Divider sx={{ mb: 2 }} />

        <TableContainer
            component={Paper}
            sx={{
                mt: 2,
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #eee",
            }}
            >
            <Table>
                {/* HEADER */}
                <TableHead>
                <TableRow sx={{ background: "#f1f5f9" }}>
                    <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Remaining Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
                </TableHead>

                {/* BODY */}
                <TableBody>
                {products?.items?.map((p, i) => (
                    <TableRow
                    key={i}
                    sx={{
                        "&:hover": {
                        backgroundColor: "#f9fafb",
                        },
                    }}
                    >
                    <TableCell>
                        <Components.Showimage
                            src={
                                p.product_image
                            }
                            sx={{
                                width: 80 ,
                                height: 80,
                            }}
                        />
                    </TableCell>
                    <TableCell>{p.product_name}</TableCell>
                    <TableCell>{p.quantity}</TableCell>
                    <TableCell>{p.remaining_quantity}</TableCell>
                    <TableCell>{p.cost_price}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                        {p.quantity * p.cost_price}
                    </TableCell>
                    <TableCell>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => {
                            setSelectedProduct(p);
                            setOpenReturn(true);
                            }}
                        >
                            Return
                        </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            {/* FOOTER */}
            <Box
                sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                background: "#0f172a",
                color: "white",
                }}
            >
                <Typography>
                Items: {products?.items?.length || 0}
                </Typography>

                <Typography fontWeight={700}>
                Total:{" "}
                {products?.items?.reduce(
                    (sum, p) => sum + p.quantity * p.cost_price,
                    0
                )}
                </Typography>
            </Box>
        </TableContainer>
        

        {products?.returnItems?.length > 0 && (
            <Box sx={{ mt: 3 }}>
                
                <Typography
                sx={{
                    fontWeight: 700,
                    color: "red",
                    mb: 1
                }}
                >
                Returned Items
                </Typography>

                <TableContainer component={Paper} sx={{ borderRadius: 2, border: "1px solid #ffdddd" }}>

                <Table size="small">

                    <TableHead>
                    <TableRow sx={{ background: "#fff1f1" }}>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Reason</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {products.returnItems.map((r, i) => (
                        <TableRow key={i}>

                        <TableCell sx={{ fontWeight: 600, color: "red" }}>
                            {r.product_name}
                        </TableCell>

                        <TableCell sx={{ color: "red" }}>
                            -{r.quantity}
                        </TableCell>

                        <TableCell>{r.price}</TableCell>

                        <TableCell sx={{ fontWeight: 600 }}>
                            {r.total}
                        </TableCell>

                        <TableCell>{r.reason}</TableCell>

                        </TableRow>
                    ))}
                    </TableBody>

                </Table>

                </TableContainer>
                
                <Box
                sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    background: "#0f172a",
                    color: "white",
                }}
                >

                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    Bill Summary
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Purchase Total</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                    {purchaseTotal}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, color: "red" }}>
                    <Typography>Returned Total</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                    - {returnTotal}
                    </Typography>
                </Box>

                <Divider sx={{ background: "rgba(255,255,255,0.2)", my: 1 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 700 }}>
                    Net Payable
                    </Typography>

                    <Typography sx={{ fontWeight: 800, color: "#22c55e" }}>
                    {netTotal}
                    </Typography>
                </Box>

                </Box>
            </Box>
            )}
      </AccordionDetails>
    </Accordion>
  );
};

export default BillAccordion;