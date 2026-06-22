import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../redux/actions/GetRequest";
import { Token } from "../../constant/token";

import { Controller } from "react-hook-form";
import { Select, MenuItem } from "@mui/material";

const Category = memo(({ control  , name = "category", label = "Select Category" }) => {
    const checkState = useSelector((state : any)=> state.UpdateState)
  const dispatch = useDispatch();
  const url = useSelector((state : any) => state.Api);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dispatch(GetRequest(url.GetCategory, Token));
        setCategories(res?.data || res || []);
      } catch (err) {
        console.log("Category API error:", err);
      }
    };

    fetchCategories();
  }, [dispatch, url.GetCategory , checkState]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Select
          {...field}
          value={field.value ? String(field.value) : ""}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            {label}
          </MenuItem>

          {categories.map((cat) => (
            <MenuItem
              key={cat.id}
              value={String(cat.id)}
            >
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
});

export default memo(Category)