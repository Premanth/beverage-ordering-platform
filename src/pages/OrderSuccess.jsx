import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import Confetti from "react-confetti";
import { useCart } from "../context/CartContext";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  // Get payment method from checkout (fallback safe)
  const paymentMethod = location.state?.paymentMethod || "Cash on Delivery";

  // Generate fake order ID
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  // Confetti auto-stop after 10s
  useEffect(() => {
    const timer = setTimeout(() => {
      // confetti naturally unmounts when component unmounts
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    clearCart();       // ✅ Reset cart
    navigate("/");     // ✅ Go home
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <Paper
        elevation={6}
        sx={{
          p: 4,
          textAlign: "center",
          maxWidth: 480,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🎉 Order Placed Successfully!
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={2}>
          Payment completed and order confirmed
        </Typography>

        {/* STATUS CHIPS */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          mb={3}
          flexWrap="wrap"
        >
          <Chip label="✔ Payment Successful" color="success" />
          <Chip label="🟢 Order Confirmed" color="primary" />
        </Stack>

        {/* ORDER DETAILS */}
        <Box sx={{ textAlign: "left", mb: 3 }}>
          <Typography variant="body2">
            <strong>Order ID:</strong> {orderId}
          </Typography>
          <Typography variant="body2">
            <strong>Payment Method:</strong> {paymentMethod}
          </Typography>
          <Typography variant="body2">
            <strong>Status:</strong> Preparing your order
          </Typography>
        </Box>

        <Typography variant="body1" mb={3}>
          🚚 Your beverages will be delivered shortly.  
          Sit back and relax!
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleGoHome}
        >
          Go to Home
        </Button>
      </Paper>
    </Box>
  );
}
