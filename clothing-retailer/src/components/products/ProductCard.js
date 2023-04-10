import { Card, CardContent, Button, Box } from "@mui/material";

const ProductCard = ({ product, addToBasket }) => {
    const handleAddToBasket = () => {
        addToBasket(product.id)
    }
    return (<Card >
        <CardContent sx={{ display: "grid", gridTemplateColumns: "4fr 1fr" }}>
            <Box>
                <p>{product.category}</p>
                <p>{product.product}</p>
                <p>{product.variant}</p>
            </Box>
            <Box>

                <p>£{product.price.toFixed(2)}</p>

                <p>{product.quantity} in stock</p>


                <p>{product.quantity > 0 ?
                    <Button onClick={handleAddToBasket}>Add to Basket</Button> :
                    <Button disabled>Out of Stock</Button>}
                </p>
            </Box>

        </CardContent>

    </Card>);
}

export default ProductCard;