
import CartPage from '@/components/website/store/CartPage'
import { getProducts } from '@/library/api.call'
import React from 'react'

async function page() {
    const productJSON = await getProducts()
    const products = productJSON.data;
  return (
    <CartPage products= {products} />
  )
}

export default page