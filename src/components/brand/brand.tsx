import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../redux/actions/GetRequest";
import { getToken } from "../../constant/token";

import { Controller } from "react-hook-form";
import { Select, MenuItem, Box, useTheme } from "@mui/material";
import { BrandingWatermarkOutlined } from "@mui/icons-material";

const Brand = memo(({ control  , name = "Brand", label = "Select Brand" }) => {
  const Token = getToken();
  const checkState = useSelector((state : any)=> state.UpdateState)
  const dispatch = useDispatch();
  const url = useSelector((state : any) => state.Api);
  const theme = useTheme().palette

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dispatch(GetRequest(url.GetBrand, Token));
        setCategories(res?.data || res || []);
      } catch (err) {
        console.log("Brand API error:", err);
      }
    };

    fetchCategories();
  }, [dispatch, url.GetBrand , checkState]);

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
          <BrandingWatermarkOutlined style={{
            color : theme.primary.main,
            fontSize: "20px",
            height: "27px"
          }} />
        </Box>
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
                sx={{
                  paddingLeft: "50px",
                  position: "relative",
                }}
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
    </Box>
  );
});

export default memo(Brand)