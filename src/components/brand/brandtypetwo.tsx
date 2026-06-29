import React, { memo, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../redux/actions/GetRequest";
import { Token } from "../../constant/token";
import { BrandingWatermarkOutlined } from "@mui/icons-material";

// 👇 Styled Select (same design as your Input)
const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  paddingLeft: "50px",
  position: "relative",
                

  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },

  "& .MuiOutlinedInput-root": {
    borderRadius: 6,
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.25s ease",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
    transition: "all 0.25s ease",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light,
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },

  "&.Mui-focused": {
    boxShadow: `0 0 0 4px ${theme.palette.primary.main}15`,
  },

  "& .MuiSelect-select": {
    padding: "14px 16px",
    fontSize: "0.95rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
  },

  "& .Mui-disabled": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Brandtypetwo = ({ getvalue, label = "Select Brand" }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.Api);

  const [brands, setBrands] = useState([]);
  const [selectBrand, setSelectBrand] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await dispatch(GetRequest(url.GetBrand, Token));
        setBrands(res?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBrands();
  }, [dispatch, url.GetBrand]);

  const updateState = (value) => {
    setSelectBrand(value);
    getvalue(value);
  };
  const theme = useTheme().palette

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
    <StyledSelect
      value={selectBrand}
      onChange={(e) => updateState(e.target.value)}
      displayEmpty
      fullWidth
    >
      <MenuItem value="">{label}</MenuItem>

      {brands.map((brand) => (
        <MenuItem key={brand.id} value={String(brand.id)}>
          {brand.name}
        </MenuItem>
      ))}
    </StyledSelect>
    </Box>
  );
};

export default memo(Brandtypetwo);