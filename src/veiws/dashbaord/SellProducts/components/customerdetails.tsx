import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { Token } from "../../../../constant/token";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { Components } from "../../../../components";
import ShowModal from "../../../../redux/reducer/showmodal";

const CustomerModal = (props) => {
const [customers, setCustomers] = useState<any[]>([]);
const [customerId, setCustomerId] = useState("-1");
const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const url = useSelector((state: any) => state.Api);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await dispatch(
      PostRequest(url.AddCustomer, Token, form , 'true')
    );

    if(res.status == 201){
        console.log(res)
        setForm({ name: "", phone: "", address: "" , oldDues: 0});
        // dispatch(ShowModal("Customer Register","success"))
    
        // onSuccess(); // reload customers in parent
        onClose();
        loadCustomers()
    }
  };

  const loadCustomers = async () => {
  const res: any = await dispatch(
    GetRequest(url.GetCustomer, Token, "")
  );

  setCustomers(res?.data || []);
};
useEffect(() => {
  loadCustomers();
}, []);

const onClose = ()=>{
    setOpen(false)
}

useEffect(()=>{
    props.Customer(customerId)
}, [customerId])

  

  return (
    <>
    <Box p={2} bgcolor="white">

        {/* SELECT CUSTOMER */}
        <Typography fontWeight="bold">
            Select Customer
        </Typography>
        <Grid container spacing={1} >
            <Grid  size={{xs:8,md:8}}>
                <Select
                    fullWidth
                    size="small"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                >
                    <MenuItem value="-1">
                    Walk-in Customer
                    </MenuItem>

                    {customers.map((c: any) => (
                    <MenuItem key={c.id} value={c.id}>
                        {c.name} - {c.phone}
                    </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid  size={{xs:4,md:4}}>
                {/* ADD BUTTON */}
                
                <Components.CustomBtn
                    data="+ Add "
                    click={() => setOpen(true)}
                />
            </Grid>
        </Grid>


    </Box>
        <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>➕ Add Customer</DialogTitle>

        <DialogContent>
            <Stack spacing={2} mt={1}>
            <Components.Input
                name="name"
                label="Name"
                value={form.name}
                onChange={handleChange}
            />

            <Components.Input
                name="phone"
                label="Phone"
                value={form.phone}
                onChange={handleChange}
            />

            <Components.Input
                name="address"
                label="Address"
                value={form.address}
                onChange={handleChange}
            />
            <Components.Input
                name="oldDues"
                label="Old Dues"
                type="number"
                value={form.oldDues}
                defaultValue={0}
                minProp={0}
                onChange={handleChange}
            />

            <Grid container spacing={1}>
                <Grid size={{md:6,xs:6 }}>
                    <Components.CustomBtn
                        click={onClose}
                        data="Canel"
                        />
                </Grid>
                <Grid size={{md:6,xs:6 }}>
                    <Components.CustomBtn
                    click={handleSubmit}
                    data="Save Customer"
                    />
                </Grid>

            </Grid>
            </Stack>
        </DialogContent>
        </Dialog>
    </>
  );
};

export default CustomerModal;