import { createMuiTheme } from "@material-ui/core";

export const white = "#fff";
export const background = "#f7f7f7";
export const blue = "#094F8A";
export const lightBlue = "#4FC3E5";
export const red = "#E53852";
export const tan = "#F4D6AB";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue
    },
    secondary: {
      main: red
    }
  },
  typography: {
    fontFamily: "Source Sans Pro",
    h1: {
      fontFamily: "Playfair Display"
    },
    h2: {
      fontFamily: "Playfair Display"
    },
    h3: {
      fontFamily: "Playfair Display"
    },
    h4: {
      fontFamily: "Playfair Display"
    },
    h5: {
      fontFamily: "Playfair Display"
    },
    h6: {
      fontFamily: "Playfair Display"
    }
  }
});
