'use client'
import Image from "next/image";
import { fetchProducts } from "./../reducer/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "@/store";
import { RootState } from '@/store'
import Link from "next/link";
import { addToCart } from "./../reducer/ProductSlice";
import { toast } from 'react-toastify';


export default function Home() {
  const products = useSelector((state:RootState) => state.products.products)
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    //trigger asyncthunk function
      dispatch(fetchProducts())
  },[])

  return (
    <div className="container mx-auto p-4">
    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product:any) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
        <Link href={`/products/${product.id}`}>
         <Image
        src={product.images[0]}  
        alt={product.name}
        width={500}   
        height={200} 
        className="w-full h-48 object-cover" 
      />
      </Link>  
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500 text-sm">{product.price}</p>
            <p className="text-gray-700 text-base mt-2">Some description of the product.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"  onClick={() => {dispatch(addToCart({id:product.id,price:product.price,qty:1})) 
             toast.success(`${product.title} has been added to your cart!`);
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
