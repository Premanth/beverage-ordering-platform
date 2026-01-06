import React, { useState } from "react";
import { Box, Paper, Typography, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";

export default function FloatingCartButton({ onClick }) {
  const { cart } = useCart();
  const [hover, setHover] = useState(false);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <Box
      sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1,
          borderRadius: "28px",
          cursor: "pointer",
          bgcolor: "primary.main",
          color: "white",
        }}
        onClick={onClick}
      >
        <ShoppingCartIcon />
        <Typography sx={{ fontWeight: 600 }}>{totalItems} items</Typography>
        <Typography sx={{ fontWeight: 700 }}>₹{totalPrice}</Typography>
      </Paper>

      {hover && totalItems > 0 && (
        <Paper elevation={8} sx={{ position: "absolute", right: 0, bottom: 70, width: 300, p: 2, borderRadius: 2 }}>
          {cart.slice(0, 3).map((item) => (
            <Box key={item.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar src={item.image} sx={{ width: 44, height: 44, mr: 1 }} />
              <Box sx={{ flex: 1 }}>
                <Typography noWrap>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">x{item.qty} = ₹{item.qty * item.price}</Typography>
              </Box>
            </Box>
          ))}

          {cart.length > 3 && <Typography variant="body2">+ {cart.length - 3} more items…</Typography>}

          <Typography sx={{ mt: 1, fontWeight: "bold" }}>Subtotal: ₹{totalPrice}</Typography>
        </Paper>
      )}
    </Box>
  );
}
