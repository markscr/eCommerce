import {
  AppBar,
  FormControlLabel,
  FormGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { DarkModeSwitch } from "./DarkModeSwitch";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const NavBar = ({ darkMode, toggleDarkMode }: Props) => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6">eCommerce</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <DarkModeSwitch
                sx={{ m: 1 }}
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            }
            label="Dark Mode"
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
};
