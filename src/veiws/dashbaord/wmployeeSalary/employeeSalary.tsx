import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Chip,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../redux/actions/GetRequest";
import { Token } from "../../../constant/token";
import CopyButton from "../../../components/CopyButton/CopyButton";
import CustomTableBody from "./components/SalaryTableBody";
import { Components } from "../../../components";
import { PostRequest } from "../../../redux/actions/PostRequest";
import { UpdateOwnState } from "../../../redux/actions/state/state";
import { ExpandCircleDownOutlined } from "@mui/icons-material";

const EmployeeSalaryHistory = () => {
  const dispatch = useDispatch();
  const url = useSelector((state : any) => state.Api);

  const [employees, setEmployees] = useState([]);
  const [salaryData, setSalaryData] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedEmployee , setSelectedEmployee] = useState()
  const [payment , setPayment ] = useState({

  })



  const fetchEmployees = async () => {
    const res = await dispatch(GetRequest(url.GetEmployee, Token));
    setEmployees(res?.employees || []);
  };
  // 📥 LOAD EMPLOYEES
  useEffect(() => {

    fetchEmployees();
  }, []);

//   // 📥 LOAD SALARY PER EMPLOYEE
//   const loadSalary = async (employee_id) => {
//     if (salaryData[employee_id]) return;

//     const res = await dispatch(
//       GetRequest(`${url.ShowEmployee}${employee_id}`, Token)
//     );

//     setSalaryData((prev) => ({
//       ...prev,
//       [employee_id]: res?.salary || [],
//     }));
//   };
const loadSalary = async (employee_id, force = false) => {
  if (!force && salaryData[employee_id]) return;

  const res = await dispatch(
    GetRequest(`${url.ShowEmployee}${employee_id}`, Token)
  );

  setSalaryData((prev) => ({
    ...prev,
    [employee_id]: res?.salary || [],
  }));
};

  const submitform = async(e) => {

    // employee_id, amount, description
    const payload = {
        employee_id : selectedEmployee,
        description: payment.Description,
        amount: payment.amount
        // ...payment
    }
    // alert("hell owurld")
    const getres = await dispatch(PostRequest(url.EmployeePayment , Token , payload ))
    await loadSalary(selectedEmployee , 'true')
    setOpen(false)
    console.log(payload)
  }
  const openPop = (e)=>{
    setOpen(true)
    setSelectedEmployee(e)
  }

  return (
        <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background: "linear-gradient(180deg,#ffffff,#f8fafc)",
              }}
            >

      <Typography fontSize="20px" fontWeight={700}>
        💰 Employee Salary History
      </Typography>

      <Divider sx={{ my: 2 }} />
    {/* <Divider sx={{ mb: 2 }} /> */}

      {employees.map((emp) => {
        const ledger = salaryData[emp.user_id] || [];

        // 💡 COPY TEXT PER EMPLOYEE (FIXED)
        const copyText = ledger
          .map(
            (i) =>
              `SALARY | ${emp.name} | ${i.pay_out} | ${i.description} | ${i.Date}`
          )
          .join("\n");

        return (
            <Stack spacing={1.5} mt={1}>
                <Accordion
                        key={emp.user_id}
                    //   key={index}
                        disableGutters
                        onChange={(e, expanded) => {
                        if (expanded) loadSalary(emp.user_id);
                        }}
                        elevation={0}
                        sx={{
                        borderRadius: 3,
                        border: "1px solid #e5e7eb",
                        overflow: "hidden",
                        padding: "8px 15px",
                        "&:before": { display: "none" },
                        }}
                    >
        
                            {/* SUMMARY */}
                            {/* <AccordionSummary expandIcon={<ExpandCircleDownOutlined />}></AccordionSummary> */}


                {/* HEADER */}
                <AccordionSummary expandIcon={<ExpandCircleDownOutlined />}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                    <Typography fontWeight={600}>
                    {emp.name}
                    </Typography>

                    {/* <Chip label={emp.role} size="small" /> */}
                     <Chip
                        label={emp.role}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            borderRadius: "8px",
                            backgroundColor:
                            emp.role === "PARTNER"
                                ? "#dcfce7"
                                : emp.role === "SALESMAN"
                                ? "#dbeafe"
                                : "#fef3c7",
                            color: "#111827",
                        }}
                        />
                </Stack>
                </AccordionSummary>

                {/* DETAILS */}
                <AccordionDetails>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Box>
                        <Components.CustomBtn
                            click={() => openPop(emp.user_id)}
                            data="Pay Employee"
                            style={{
                                maxWidth: "300px"
                            }}
                        />

                        
                        <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        fullWidth
                        maxWidth="xs"
                        >
                        <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
                            Pay Salary
                        </DialogTitle>

                        <DialogContent sx={{ mt: 1 }}>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                            <Components.Input onChange={(e)=>setPayment((old:any)=>({...old , amount: e.target.value}))} label="Amount" name="amount" type="number" fullWidth />

                            <Components.Input onChange={(e)=>setPayment((old:any)=>({...old , Description: e.target.value}))} label="Description" name="description" fullWidth />
                            
                            {/* <Components.CustomBtn
                                data="Submit"
                                click={() => submitform(emp)}
                            /> */}

                            <DialogActions
                            sx={{
                                p: 2,
                                display: "flex",
                                gap: 1.5,
                            }}
                            >

                            {/* CANCEL */}
                            <Box sx={{ flex: 1 }}>
                                <Button
                                onClick={() => setOpen(false)}
                                fullWidth
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "10px",
                                    height: "40px",
                                }}
                                variant="outlined"
                                >
                                Cancel
                                </Button>
                            </Box>

                            {/* SUBMIT */}
                            <Box sx={{ flex: 1 }}>
                                <Components.CustomBtn
                                data="Submit"
                                click={() => submitform(emp)}
                                style={{
                                    height: "40px",
                                }}
                                />
                            </Box>

                            </DialogActions>
                            </Box>

                        </DialogContent>
                        </Dialog>
                    </Box>
                    <Box>
                        <CopyButton text={copyText} />
                        
                    </Box>
                </Box>

                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                    </TableHead>

                    <CustomTableBody
                    data={ledger}
                    columns={[
                        { key: "pay_out" },
                        { key: "description" },
                        { key: "Date" },
                    ]}
                    />
                </Table>

                </AccordionDetails>

            </Accordion>

            </Stack>

        );
      })}
    </Paper>
  );
};

export default EmployeeSalaryHistory;