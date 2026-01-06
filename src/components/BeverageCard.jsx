import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSnackbar } from "notistack";
import { useCart } from "../context/CartContext";

export default function BeverageCard({ item }) {
  const [qty, setQty] = useState(0);
  const { cart, addToCart, updateQty } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const found = cart.find((c) => c.id === item.id);
    setQty(found ? found.qty : 0);
  }, [cart, item.id]);

  const inc = () => {
    const newQty = qty + 1;
    if (qty === 0) {
      addToCart({ ...item, qty: 1 });
    } else {
      updateQty(item.id, newQty);
    }
    enqueueSnackbar(`${item.name} added`, { variant: "success" });
    setHighlight(true);
    setTimeout(() => setHighlight(false), 220);
  };

  const dec = () => {
    if (qty === 0) return;
    updateQty(item.id, qty - 1);
  };

  return (
    <Card sx={{ maxWidth: 340, p: 1, border: highlight ? "2px solid #4caf50" : "1px solid transparent", transition: "200ms" }}>
      <CardMedia component="img" height="160" image={item.image} alt={item.name} />
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="text.secondary">₹{item.price}</Typography>
        {qty > 0 && <Typography sx={{ color: "green", mt: 1 }}>In Cart: {qty}</Typography>}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <IconButton size="small" onClick={dec} disabled={qty === 0}><RemoveIcon /></IconButton>
          <Typography>{qty}</Typography>
          <IconButton size="small" onClick={inc}><AddIcon /></IconButton>
        </div>

        <Button variant="contained" onClick={inc} disabled={false}>Add</Button>
      </CardActions>
    </Card>
  );
}
