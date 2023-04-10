import { Stack, TextField, Button, Card } from "@mui/material";
import BasketCard from "./BasketCard";
import { useState } from "react";

const Basket = ({ basketItems, basketDetails, removeFromBasket, applyVoucher, activeVoucher }) => {
    const [voucherField, setVoucherField] = useState("")

    const handleApplyVoucher = (e) => {
        e.preventDefault()
        applyVoucher(voucherField)
    }

    const handleTextChange = (e) => {

        if (activeVoucher === "Invalid Code") {
            applyVoucher(null)
        }
        setVoucherField(e.target.value)
    }
    const basketNodes = basketItems.map((item) => (
        <BasketCard key={item.product.id} basketItem={item} removeFromBasket={removeFromBasket} />
    ))

    const getHelperText = () => {
        if (activeVoucher === "Invalid Code") return "Invalid Code"
        if (!activeVoucher) return "Voucher Code"
        if (activeVoucher) return `Code ${activeVoucher.code} applied`
    }

    const helperText = getHelperText()
    const { totalBasketPrice, voucherActive, totalMinusDiscount } = basketDetails

    return (
        <Stack spacing={2} sx={{ padding: "2rem" }}>
            {basketNodes}

            <Card sx={{ padding: "2rem" }}>
                <form onSubmit={(e) => handleApplyVoucher(e)}>
                    <TextField
                        helperText={helperText}
                        label="Enter Code"
                        error={activeVoucher === "Invalid Code"}
                        value={voucherField}
                        onChange={handleTextChange} />
                    <Button type="submit">Apply</Button>
                </form>
                <p>Total Price: £{totalBasketPrice.toFixed(2)}</p>
                {voucherActive && <span>
                    <p>-£{activeVoucher.discount} Voucher: {activeVoucher.code}</p>
                    <p>= £{totalMinusDiscount.toFixed(2)}</p>
                </span>}
            </Card>
        </Stack >
    );
}

export default Basket;