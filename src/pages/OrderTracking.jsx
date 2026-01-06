import React from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function OrderTracking() {
  const location = useLocation();
  const success = location.state?.success;
  const msg = location.state?.msg;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Order Tracking</Typography>
      {success && <Typography color="green" sx={{ mt: 2 }}>{msg}</Typography>}
      <Typography sx={{ mt: 2 }}>Order # {Math.floor(Math.random() * 90000 + 10000)}</Typography>
      <ul>
        <li>Order Placed</li>
        <li>Preparing</li>
        <li>Out for delivery</li>
        <li>Delivered</li>
      </ul>
    </Container>
  );
}
