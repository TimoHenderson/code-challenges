import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const AppHeader = ({ basketDetails }) => {
    const { totalBasketPrice, voucherActive, totalMinusDiscount, numItems } = basketDetails



    return (<AppBar position="sticky">
        <Container >
            <Toolbar sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <Box>
                    <Typography variant="h2">
                        Shop
                    </Typography>
                </Box>
                <Box>
                    <Link to="/">Products</Link>
                </Box>
                <Box>
                    <ShoppingBasketIcon />
                    {numItems}
                    <br />
                    £{totalMinusDiscount.toFixed(2)}
                    <br />
                    <Link to="/basket">
                        View Basket
                    </Link>
                </Box>

            </Toolbar>
        </Container>
    </AppBar>);
}

export default AppHeader;