import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetRequest } from '../../redux/actions/GetRequest';
import { Token } from '../../constant/token';

const Categorytypetwo = ({ getvalue, label = "Select Category" }) => {
  const dispatch = useDispatch();
  const url = useSelector((state : any) => state.Api);

  const [categories, setCategories] = useState([]);
  const [ selectcat , setSelectcat ] = useState()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dispatch(GetRequest(url.GetCategory, Token));
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
    <Select
      value={selectcat || ""}
      onChange={(e) => updateState(e.target.value)}
      fullWidth
      displayEmpty
    >
      <MenuItem value="">{label}</MenuItem>

      {categories.map((cat) => (
        <MenuItem key={cat.id} value={String(cat.id)}>
          {cat.name}
        </MenuItem>
      ))}
    </Select>
  );
  
}

Categorytypetwo.propTypes = {}

export default memo(Categorytypetwo)