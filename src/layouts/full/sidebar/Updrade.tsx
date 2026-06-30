import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import './upgrade.scss'
import CountdownTimer from '../../../components/counter/countDownTimer';
import { CustomBtn } from '../../../components/button/button';

export const Upgrade = () => {
    const navigate = useNavigate();
    const userData = sessionStorage.getItem('User_Data');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [openpassword, setOpenpassword] = useState(false);
    const handleOpenpassword = () => setOpenpassword(true);
    const handleClosepassword = () => setOpenpassword(false);

    
    const rowData =  JSON.parse(userData)?.branch;
    const branchUser = userData ? JSON.parse(userData)?.branch?.main_branch : undefined;
    const logOut = () => {
        localStorage.removeItem("login_timer_start"); 
        // localStorage.setItem("LoggedIn", 'False');
        sessionStorage.clear(); 
        navigate('/login')

      // window.location.reload(true)
      // window.location.href = "/login";
    }
    const refresh = () => { 
        if (window.electron) { 
          window.location.reload(); // Use this for both browsers and Electron
        } else { 
          window.location.reload(true);
        }
      };
    const updateDetails = () => {
        // alert("sami")
    }
    return (
        <>
                <Box className="loggingOut">
                    {/* <Button onClick={refresh}>Refresh</Button> */}
                </Box>
                <Box  mt={1}>
                    {/* <Button onClick={logOut}>Logout</Button> */}
                    <CustomBtn
                      style={{
                        width: "100px",
                        height:"30px",
                        marginLeft:"10px"
                      }}
                      data="Logout"
                      click={logOut}
                    />
                    {/* <Box sx={{width:"20px",height:"10pxs"}}></Box> */}
                    {/* / */}
                </Box>
                <Box className='loggingOut' mt={1}>
                    <CountdownTimer />
                </Box>
 
        </>
    );
};
