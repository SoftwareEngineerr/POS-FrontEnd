import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Token } from "../../../../constant/token";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { ExpandLess } from "@mui/icons-material";
import ListAccordionDetails from "./accordionDetails";

const SupplierList = () => {
  const [data, setData] = useState();
  const [expanded, setExpanded] = useState(null); // 👈 track open accordion

  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);
  const state = useSelector((state) => state.UpdateState);

  const GetSuppliers = async () => {
    const getdata = await dispatch(GetRequest(url.GetCustomer, Token));
    setData(getdata.data);
  };

  useEffect(() => {
    GetSuppliers();
  }, [state]);

  // 👇 handle expand
  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Customer Accounts
      </Typography>

      {data?.length > 0 ? (
        data.map((supplier) => (
          <Accordion
            key={supplier.id}
            expanded={expanded === supplier.id} // 👈 control expansion
            onChange={handleChange(supplier.id)}
            sx={{ mb: 1, borderRadius: "10px" }}
          >
            <AccordionSummary expandIcon={<ExpandLess />}>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {supplier.name}
                </Typography>

                <Typography sx={{ fontSize: "12px", color: "#64748b" }}>
                  {supplier.phone}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {/* 👇 ONLY LOAD WHEN OPEN */}
              {expanded === supplier.id && (
                <ListAccordionDetails supplier={supplier?.id} />
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box sx={{ textAlign: "center", color: "#94a3b8" }}>
          No suppliers yet 🚀
        </Box>
      )}
    </Paper>
  );
};

export default SupplierList;