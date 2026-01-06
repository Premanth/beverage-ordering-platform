import React, { useState } from "react";
import {
  Drawer, Box, Typography, IconButton, Divider, TextField, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, clearCart } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const nav = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const delivery = subtotal > 300 ? 0 : subtotal > 0 ? 30 : 0;
  const gst = subtotal * 0.05;
  const total = subtotal + delivery + gst - discount;

  const applyPromo = () => {
    if (promo.trim().toLowerCase() === "prem10") setDiscount(Math.round(subtotal * 0.1));
    else setDiscount(0);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={300}
      PaperProps={{ sx: { width: 380, p: 2, display: "flex", flexDirection: "column" } }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>

      <Divider sx={{ my: 1 }} />

      {cart.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" width="120" alt="empty" />
          <Typography mt={2} color="text.secondary">Your cart is empty</Typography>
        </Box>
      ) : (
        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {cart.map((item) => (
            <ListItem key={item.id} secondaryAction={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" onClick={() => updateQty(item.id, item.qty - 1)}><RemoveIcon /></IconButton>
                <Typography>{item.qty}</Typography>
                <IconButton size="small" onClick={() => updateQty(item.id, item.qty + 1)}><AddIcon /></IconButton>
              </Box>
            }>
              <ListItemAvatar><Avatar src={item.image} variant="square" /></ListItemAvatar>
              <ListItemText primary={item.name} secondary={`₹${item.price} each`} />
            </ListItem>
          ))}
        </List>
      )}

      <Divider />

      <Box sx={{ mt: 2 }}>
        <TextField label="Promo Code" fullWidth value={promo} onChange={(e) => setPromo(e.target.value)} />
        <Button variant="outlined" sx={{ mt: 1 }} onClick={applyPromo}>Apply</Button>

        <Box sx={{ mt: 2 }}>
          <Typography>Subtotal: ₹{subtotal.toFixed(0)}</Typography>
          <Typography>Delivery Fee: {delivery === 0 ? <span style={{color:"green"}}>FREE</span> : `₹${delivery}`}</Typography>
          <Typography>GST (5%): ₹{Math.round(gst)}</Typography>
          {discount > 0 && <Typography color="green">Discount: -₹{discount}</Typography>}
          <Typography variant="h6" mt={1}>Total: ₹{Math.round(total)}</Typography>
        </Box>

        <Button variant="contained" size="large" fullWidth sx={{ mt: 2 }} disabled={cart.length === 0} onClick={() => { onClose(); nav("/checkout"); }}>
          Proceed to Checkout
        </Button>

        <Button variant="text" fullWidth sx={{ mt: 1 }} onClick={() => clearCart()}>Clear Cart</Button>
      </Box>
    </Drawer>
  );
}
