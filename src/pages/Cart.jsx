import React, { useState } from "react";
import {
  Container, Typography, List, ListItem, ListItemAvatar, Avatar, IconButton, ListItemText, Divider, Box, Button, TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQty } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  const deliveryFee = subtotal > 0 ? 30 : 0;
  const total = subtotal - discount + deliveryFee;

  const applyPromo = () => {
    if (promo.trim().toLowerCase() === "prem10") setDiscount(Math.round(subtotal * 0.1));
    else setDiscount(0);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>Your Cart</Typography>

      <List>
        {cart.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <IconButton onClick={() => updateQty(item.id, 0)}><DeleteIcon /></IconButton>
          }>
            <ListItemAvatar><Avatar src={item.image} /></ListItemAvatar>

            <ListItemText primary={`${item.name} — ₹${item.price}`} secondary={`Total: ₹${item.price * item.qty}`} />

            <IconButton onClick={() => updateQty(item.id, item.qty - 1)}><RemoveIcon /></IconButton>
            <Typography sx={{ mx: 1 }}>{item.qty}</Typography>
            <IconButton onClick={() => updateQty(item.id, item.qty + 1)}><AddIcon /></IconButton>
          </ListItem>
        ))}

        {cart.length === 0 && <Typography>No items in cart.</Typography>}
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Apply Promo Code</Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <TextField label="Promo Code" value={promo} onChange={(e) => setPromo(e.target.value)} />
        <Button variant="contained" onClick={applyPromo}>Apply</Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography>Subtotal: ₹{subtotal}</Typography>
        <Typography>Discount: -₹{discount}</Typography>
        <Typography>Delivery Fee: ₹{deliveryFee}</Typography>
        <Typography variant="h5" mt={1}>Total: ₹{total}</Typography>
      </Box>

      <Button variant="contained" fullWidth sx={{ mt: 3 }} href="/checkout" disabled={cart.length === 0}>Proceed to Checkout</Button>
    </Container>
  );
}
