import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useColorMode } from "../theme.jsx";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { toggleColorMode } = useColorMode();

  return (
    <AppBar position="sticky" color="primary" sx={{ mb: 2 }}>
      <Toolbar>
        <IconButton component={Link} to="/" edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BeverageHub
        </Typography>

        <Button color="inherit" component={Link} to="/menu">
          Menu
        </Button>

        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>

        <IconButton color="inherit" onClick={toggleColorMode}>
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
