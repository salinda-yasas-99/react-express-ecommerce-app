import React, { useContext,useEffect,useState} from 'react'
import { ShopContext } from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import axios from 'axios';

const Product = () => {
  // const {all_product} =  useContext(ShopContext);
  // const {productID} =useParams();
  // // const product = all_product.find((e) => e.id === Number(productID));
  // const product =  all_product.find((e)=>e.id === Number(productID))

  

 
  // if (!product) {
  //   console.log("Product not found"); 
  //   return <div>Product not found</div>;
  // }

  // return (
  //   <div className='product'>
  //      <Breadcrum product={product}/>
  //      <ProductDisplay product={product}/>
  //   </div>
  // )
  const[products,setProducts] =useState([]);

useEffect(()=>{
    axios.get("http://localhost:7000/api/products/getAllProducts")
    .then(response => {
        setProducts(response.data);
       
    })
    .catch(error => console.error('Error fetching products:', error));
},[])
  // const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const  product =  products.find((e) => e.id === productId);
  console.log(products);

  return (

    <div>
      
      <Breadcrum product={product}/>
      <ProductDisplay product ={product }/>
    </div>
  )


}

export default Product
