import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">Welcome to BeverageHub</Typography>
      <Typography sx={{ mt: 1, mb: 2 }} color="text.secondary">
        Order beverages from local vendors — fast & fresh.
      </Typography>
      <Button variant="contained" component={Link} to="/menu">Browse Menu</Button>
    </Box>
  );
}
