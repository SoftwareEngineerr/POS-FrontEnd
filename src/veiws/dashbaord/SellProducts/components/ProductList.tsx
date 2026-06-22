import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import { Token } from "../../../../constant/token";
import { Components } from "../../../../components";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
};

const ProductList = ({ cart, setCart }: any) => {
  const dispatch = useDispatch();
  const url = useSelector((state: any) => state.Api);
  const stateChecker = useSelector((state: any) => state.UpdateState);

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(30);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const loader = useRef<HTMLDivElement | null>(null);

  // =========================
  // LOAD PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await dispatch(
          GetRequest(url.GetProducts, Token, "")
        );

        setProducts(response?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [dispatch, url.GetProducts , stateChecker]);

  // =========================
  // INFINITE SCROLL
  // =========================
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 20);
      }
    });

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, []);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product: Product) => {
    const exist = cart.find((item: any) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item: any) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // =========================
  // FILTER + PAGINATION
  // =========================
  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (category ? p.category == category : true))
    .filter((p) => (brand ? p.brand == brand : true))
    .slice(0, visibleCount);

    // console.log(    products.filter((p) => (category ? console.log(p.category , category) : true)))

  return (
    <Box p={2} height="100%" overflow="auto">


         {/* Filters */}
        <Grid container spacing={1}>
            <Grid size={{
                lg:6 , xs:12
            }}>
                <Components.Input
                label="Search product"
                fullWidth
                // size="small"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(30);
                }}
                />
            </Grid>
            <Grid  size={{
                lg:3 , xs:12
            }}>
                <Components.Categorytypetwo
                    getvalue={(e)=>{
                        console.log(e)
                        setCategory(e);
                        setVisibleCount(30);
                    }
        
                    }
                />
            </Grid>

            <Grid size={{
                lg:3 , xs:12
            }}>
                <Components.Brandtypetwo
                    getvalue={(e)=>{
                        console.log(e)
                        setBrand(e);
                        setVisibleCount(30);
                    }
        
                    }
                />
            </Grid>
            
        </Grid>

        <Divider sx={{margin: "10px 0px 20px" , }} />

      {/* PRODUCT GRID (FIXED MUI v5 STYLE) */}
      <Grid container spacing={2}>
        {filtered.map((product) => (
          <Grid
            size={{
                md:2,
                sm:6,
                xs:12
            }}
            key={product.id}
          >
            <Card
              onClick={() => addToCart(product)}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                width: "100%",
                "&:hover": { boxShadow: 4 },
              }}
            >
              {/* <CardMedia
                component="img"
                height="120"
                image={`${url.ImageServer}${product.image_url}`}
                loading="lazy"
              /> */}
              <Components.Showimage
                src={`${product.image_url}`}
                sx={{height:"120px"}}

              />

              <CardContent>
                <Typography fontWeight="bold">
                  {product.name}
                </Typography>

                <Typography color="text.secondary">
                  {product.price} PKR
                </Typography>

                {product.stock !== undefined && (
                  <Typography fontSize={12} color="green">
                    Stock: {product.stock}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* INFINITE SCROLL TRIGGER */}
      <div ref={loader} style={{ height: 20 }} />
    </Box>
  );
};

export default ProductList;