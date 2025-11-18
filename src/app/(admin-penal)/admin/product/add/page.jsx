import ProductAdd from '@/components/admin/ProductAdd'
import { getBrand, getCategory, getcolor } from '@/library/api.call'
import React from 'react'

 async function page() { 
  const categoryJSON = await getCategory(); 
  const brandJSON = await getBrand(); 
  const colorsJSON = await getcolor(); 
  return (
    <ProductAdd category={categoryJSON.data} brand = {brandJSON.data} color = {colorsJSON.data}  />
  )
}

export default page; 