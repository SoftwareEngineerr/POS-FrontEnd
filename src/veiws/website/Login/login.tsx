import React from "react";
import Auth from "./components/auth";
import PageContainer from "../../../components/Container/pageContainer";
import { Box, Card, Grid, Typography } from "@mui/material";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const Login = () => {

  const [width, height] = useWindowSize();

  return (
    <PageContainer title="عینو بازار" description="Login Page">

      {/* 🎉 Confetti */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={80}
        recycle={true}
        gravity={0.15}
      />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #5f72bd 0%, #9b23ea 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* ✨ glow background */}
        <Box
          sx={{
            position: "absolute",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.2), transparent)",
            filter: "blur(120px)",
            top: "-100px",
            left: "-100px",
          }}
        />

        <Grid container justifyContent="center">
          <Grid item xs={11} sm={8} md={6} lg={4}>

            <Card
              sx={{
                p: 5,
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 35px 80px rgba(0,0,0,0.35)",
                transition: "all .35s ease",
                position: "relative",
                zIndex: 2,

                "&:hover": {
                  transform: "translateY(-8px) scale(1.01)",
                  boxShadow: "0 45px 100px rgba(0,0,0,0.45)",
                },
              }}
            >
              <Box textAlign="center" mb={4}>

                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    letterSpacing: "1px",
                    color: "#333"
                  }}
                >
                  عینو بازار
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ fontSize: 15 }}
                >
                  Welcome back! Please login
                </Typography>

              </Box>

              <Auth />

            </Card>

          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login;