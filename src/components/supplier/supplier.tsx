import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, MenuItem, Select, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetRequest } from '../../redux/actions/GetRequest';
import { Token } from '../../constant/token';
import { VerifiedUserSharp } from '@mui/icons-material';
import { IconUser, IconUserX } from '@tabler/icons-react';

const Supplier = ({ getvalue, label = "Please Select Supplier" }) => {
  const dispatch = useDispatch();
  const url = useSelector((state : any) => state.Api);
  const theme = useTheme().palette;

  const [categories, setCategories] = useState([]);
  const [ selectcat , setSelectcat ] = useState()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dispatch(GetRequest(url.GetSupplier, Token));
        setCategories(res?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, [dispatch, url.GetCategory]);



  const updateState = async(e) => {
    setSelectcat(e)
    getvalue(e) 
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center"
      }}
    >
      
        <Box sx={{
          background: theme.secondary.light,
          width: "40px",
          height: "40px",
          marginLeft: "10px",
          borderRadius: "7px",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <IconUser style={{
            color : theme.primary.main,
            fontSize: "20px",
            height: "27px"
          }} />
        </Box>
      <Select
        value={selectcat || ""}
        onChange={(e) => updateState(e.target.value)}
        fullWidth
        displayEmpty
        sx={{
          paddingLeft: "50px",
          position: "relative",
        }}
      >
        <MenuItem value="">{label}</MenuItem>

        {categories.map((cat) => (
          <MenuItem key={cat.id} value={String(cat.id)}>
            {cat.name} , {cat.phone}
          </MenuItem>
        ))}
      </Select>

    </Box>
  );
  
}

Supplier.propTypes = {}

export default Supplier