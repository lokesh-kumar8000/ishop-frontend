import ProductEdit from '@/components/admin/ProductEdit';
import { getBrand, getCategory, getcolor } from '@/library/api.call'
import React from 'react'

 async function page({params}) { 
  const {edit_id} = await params;
  const categoryJSON = await getCategory(); 
  const brandJSON = await getBrand(); 
  const colorsJSON = await getcolor(); 

  return (
    <ProductEdit category={categoryJSON.data} brand = {brandJSON.data} color = {colorsJSON.data} id = {edit_id}  />
  )
}

export default page; 