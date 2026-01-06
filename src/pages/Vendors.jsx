import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const vendors = [
  { id: 1, name: "Juice Corner", image: "vendor1.jpg" },
  { id: 2, name: "Coffee House", image: "vendor2.jpg" },
  { id: 3, name: "Soft Drink Hub", image: "vendor3.jpg" },
];

export default function Vendors() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Vendors</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {vendors.map((v) => (
          <Grid item xs={12} sm={6} md={4} key={v.id}>
            <Card component={Link} to={`/vendor/${v.id}`} sx={{ textDecoration: "none" }}>
              <CardMedia component="img" height="160" image={v.image} />
              <CardContent>
                <Typography>{v.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
