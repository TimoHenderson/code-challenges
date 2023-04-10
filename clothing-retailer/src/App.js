import { useState } from 'react'
import shopStock from './data/shop_stock.json'
import './App.css';
import ProductStack from './components/products/ProductStack';
import { Container, Paper } from '@mui/material';
import Basket from './components/basket/Basket';
import Theme from './styling/Theme';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from './components/AppHeader';


const voucherCodes = [{ code: "5OFF", discount: 5, minSpend: 0, category: "" }, { code: "10OFF", minSpend: 50, discount: 10, category: "" }, { code: "15OFF", discount: 15, minSpend: 75, category: "Footwear" }]

function App() {
  const [stock, setStock] = useState(shopStock)
  const [basket, setBasket] = useState([])
  const [activeVoucher, setActiveVoucher] = useState(null)

  const changeStockQuantity = (productId, change) => {
    const newStock = stock.map((product) => {
      if (product.id === productId) {
        const newProduct = { ...product }
        newProduct.quantity += change
        return newProduct
      } else {
        return product
      }
    })
    setStock(newStock)
  }

  const applyVoucher = (voucherText) => {
    if (voucherText) {
      const voucher = voucherCodes.find((code) => code.code === voucherText)
      if (voucher) {
        setActiveVoucher(voucher)
      } else {
        setActiveVoucher("Invalid Code")
      }
    } else {
      setActiveVoucher(null)
    }
  }
  const changeBasketQuantity = (productId, change) => {
    const newBasket = { ...basket }
    if (!Object.keys(newBasket).includes(String(productId))) {
      newBasket[productId] = 0
    }
    newBasket[productId] += change
    if (newBasket[productId] < 1) {
      delete newBasket[productId]
    }
    setBasket(newBasket)
  }

  const addToBasket = (productId) => {
    changeStockQuantity(productId, -1)
    changeBasketQuantity(productId, 1)
  }
  const removeFromBasket = (productId) => {
    changeStockQuantity(productId, 1)
    changeBasketQuantity(productId, -1)
  }

  const basketItems = Object.keys(basket).map((key) => {
    const product = stock.find((item) => item.id === Number(key))
    return { numInBasket: basket[key], product }
  })

  const checkVoucherCriteria = (totalPrice) => {
    if (activeVoucher && activeVoucher !== "Invalid Code") {
      const minSpend = totalPrice >= activeVoucher.minSpend
      const categoryInBasket = basketItems.find((item) => item.product.category.includes("Footwear"))
      return minSpend && categoryInBasket
    } else {
      return false
    }
  }
  const calculateTotal = () => {
    return basketItems.reduce((total, item) => {
      total.totalBasketPrice += item.numInBasket * item.product.price
      total.numItems += item.numInBasket
      return total
    }, { totalBasketPrice: 0, numItems: 0 })
  }

  const { totalBasketPrice, numItems } = calculateTotal()
  const voucherActive = checkVoucherCriteria(totalBasketPrice)
  const totalMinusDiscount = voucherActive ? totalBasketPrice - activeVoucher.discount : totalBasketPrice
  const basketDetails = { totalBasketPrice, voucherActive, totalMinusDiscount, numItems }


  return (
    <Theme>

      <Router>
        <AppHeader basketDetails={basketDetails} />
        <Routes>
          <Route path="/basket" element={
            <Container component={Paper}>
              <Basket
                basketItems={basketItems}
                removeFromBasket={removeFromBasket}
                activeVoucher={activeVoucher}
                applyVoucher={applyVoucher}
                basketDetails={basketDetails} />
            </Container>}>
          </Route>
          <Route path="/" element={
            <Container component={Paper}>
              <ProductStack
                products={stock}
                addToBasket={addToBasket}
                removeFromBasket={removeFromBasket} />
            </Container>} >
          </Route>
        </Routes>
      </Router>
    </Theme >
  );
}

export default App;
