import {
  AppBar,
  Badge,
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const NavBar = ({ darkMode, toggleDarkMode }: Props) => {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography component={NavLink} to={"/"} variant="h6" sx={navStyles}>
            eCommerce
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <DarkModeSwitch
                  sx={{ m: 1 }}
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              }
              label=""
            />
          </FormGroup>
        </Box>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => {
            return (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            );
          })}
        </List>
        <Box display="flex" justifyItems="center">
          <IconButton
            size="large"
            sx={{
              color: "inherit",
            }}
          >
            <Badge badgeContent="4" color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => {
              return (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
