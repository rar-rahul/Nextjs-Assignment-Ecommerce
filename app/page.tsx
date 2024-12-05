'use client'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch } from "@/store";
import { RootState } from '@/store';
import Link from "next/link";
import { addToCart } from "./../reducer/ProductSlice";
import { toast } from 'react-toastify';
import axios from "axios";


interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  images: string;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  //const products = useSelector((state: RootState) => state.products.products)
  const [page, setPage] = useState(1)  
  const [pageSize] = useState(12) 
  const [totalPages, setTotalPages] = useState(1)
  const[products,setProducts] = useState([])
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery)


  const fetchPaginatedProducts = async (page: number) => {
    const res = await axios.get(`https://dummyjson.com/products?limit=${pageSize}&skip=${(page - 1) * pageSize}`);
    setTotalPages(Math.ceil(res.data.total / pageSize));  // Calculate total pages based on API response
    return res.data.products;
  }

    //fetch product using keyword
    const fetchSearchProduct = useCallback(async () => {
      const res = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
      setProducts(res.data.products);
    },[])

    const loadProducts = useCallback(async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    }, []);

  useEffect(() => {
    loadProducts();
  }, [page]); 

  useEffect(() => {
    fetchSearchProduct(); 
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-4">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={500}
                height={200}
                priority
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-500 text-sm">{product.price}</p>
              <p className="text-gray-700 text-base mt-2">Some description of the product.</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                onClick={() => {
                  dispatch(addToCart({ id: product.id, price: product.price, qty: 1,title:product.title,image:product.images[0] }));
                  toast.success(`${product.title} has been added to your cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-full"
          disabled={page === 1}
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-full"
          disabled={page === totalPages}
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
