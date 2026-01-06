import { useParams } from "react-router-dom";
import { beverages } from "../data/beverages";
import { useCart } from "../context/CartContext";

import { Box, Typography, Button, Container } from "@mui/material";

export default function BeverageDetails() {
  const { id } = useParams();
  const drink = beverages.find((d) => d.id == id);

  const { addToCart } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" gap={4} flexWrap="wrap">
        <Box flex={1}>
          <img
            src={drink.image}
            alt={drink.name}
            style={{ width: "100%", borderRadius: 12 }}
          />
        </Box>

        <Box flex={1}>
          <Typography variant="h4">{drink.name}</Typography>
          <Typography color="text.secondary" my={2}>
            {drink.desc}
          </Typography>
          <Typography variant="h5">₹{drink.price}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => addToCart(drink)}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
