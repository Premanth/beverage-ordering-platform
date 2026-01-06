import {
  Container,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Box,
  Divider,
  Button,
  Snackbar,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cod");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography align="center" variant="h5">
          Your cart is empty
        </Typography>
      </Container>
    );
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 300 ? 0 : 30;
  const gst = subtotal * 0.05;
  const total = subtotal + delivery + gst;

  const validatePayment = () => {
    if (payment === "upi") {
      if (!upiId.includes("@")) {
        setError("Enter a valid UPI ID");
        return false;
      }
    }

    if (payment === "card") {
      if (
        card.number.length !== 16 ||
        card.cvv.length !== 3 ||
        !card.expiry
      ) {
        setError("Enter valid card details");
        return false;
      }
    }

    return true;
  };

  const placeOrder = () => {
    if (!validatePayment()) return;

    // SIMULATED PAYMENT SUCCESS
    clearCart();
    navigate("/order-success", {
      state: { paymentMethod: payment },
    });
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" mb={3}>
        Checkout
      </Typography>

      {/* PAYMENT METHOD */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Payment Method</Typography>

        <RadioGroup
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          <FormControlLabel value="card" control={<Radio />} label="Credit / Debit Card" />
        </RadioGroup>

        {/* UPI */}
        {payment === "upi" && (
          <TextField
            fullWidth
            label="UPI ID (example@upi)"
            sx={{ mt: 2 }}
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}

        {/* CARD */}
        {payment === "card" && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Card Number"
              fullWidth
              inputProps={{ maxLength: 16 }}
              sx={{ mb: 2 }}
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Expiry (MM/YY)"
                fullWidth
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              />
              <TextField
                label="CVV"
                fullWidth
                inputProps={{ maxLength: 3 }}
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              />
            </Box>
          </Box>
        )}
      </Paper>

      {/* ORDER SUMMARY */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Order Summary</Typography>

        {cart.map((item) => (
          <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{item.name} × {item.qty}</Typography>
            <Typography>₹{item.price * item.qty}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography>Subtotal: ₹{subtotal.toFixed(2)}</Typography>
        <Typography>GST (5%): ₹{gst.toFixed(2)}</Typography>
        <Typography>Delivery: ₹{delivery}</Typography>

        <Typography variant="h5" mt={1}>
          Total: ₹{total.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        message={error}
      />
    </Container>
  );
}
