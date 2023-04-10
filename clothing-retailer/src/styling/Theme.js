import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
const theme = {
    palette: {
        secondary: { main: "#FFF" }
    }
}

const Theme = ({ children }) => {
    return (<ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>);
}

export default Theme;