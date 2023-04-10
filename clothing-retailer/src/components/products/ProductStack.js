import { Stack } from '@mui/material'
import ProductCard from './ProductCard';

const ProductStack = ({ products, addToBasket }) => {
    const productNodes = products.map((product, index) => (
        <ProductCard key={`${Date.now()}${index}`} product={product} addToBasket={addToBasket} />
    ))
    return (

        <Stack sx={{ padding: "2rem" }} spacing={2}>
            {productNodes}
        </Stack>

    );
}

export default ProductStack;