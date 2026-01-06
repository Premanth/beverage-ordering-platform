import React, { useState } from "react";
import { beverages } from "../data/beverages";
import { Container, Typography, Grid, Tabs, Tab, TextField } from "@mui/material";
import BeverageCard from "../components/BeverageCard";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Juice", "Soft Drinks", "Milkshakes", "Coffee"];

  const items = beverages;
  const filtered = items.filter((item) => {
    const inCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return inCat && matchSearch;
  });

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" mb={2}>Menu</Typography>

      <Tabs value={activeCategory} onChange={(e, v) => setActiveCategory(v)} sx={{ mb: 2 }}>
        {categories.map((cat) => (<Tab key={cat} label={cat} value={cat} />))}
      </Tabs>

      <TextField fullWidth placeholder="Search beverages..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        {filtered.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <BeverageCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
