import { Card, CardContent, CardHeader, Typography, Button, Box } from "@mui/material";

const BasketCard = ({ basketItem, removeFromBasket }) => {
    const handleRemoveFromBasket = () => {
        removeFromBasket(product.id)
    }
    const product = basketItem.product

    return (<Card >
        <CardContent sx={{ display: "grid", gridTemplateColumns: "4fr 1fr" }}>
            <Box>
                <p>{product.category}</p>
                <p>{product.product}</p>
                <p>{product.variant}</p>
            </Box>
            <Box>

                <p>£{(product.price * basketItem.numInBasket).toFixed(2)}</p>

                <p>{basketItem.numInBasket} in Basket</p>


                <p>
                    <Button sx={{ color: "red" }} onClick={handleRemoveFromBasket}>Remove From Basket</Button>

                </p>
            </Box>

        </CardContent>

    </Card>);
}

export default BasketCard;