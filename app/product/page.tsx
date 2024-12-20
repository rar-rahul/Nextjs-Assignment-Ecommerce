"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart } from "./../../reducer/ProductSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "@/store";
import Link from "next/link";

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

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(20);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery,
  );
  const dispatch = useDispatch<AppDispatch>();

  const fetchAllProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=0");
    setProducts(res.data.products);
    setFilteredProducts(res.data.products);
  };

  const fetchAllCategory = async () => {
    const res = await axios.get("https://dummyjson.com/products/category-list");
    setCategory(res.data);
  };

  //fetch product using keyword
  const fetchSearchProduct = async () => {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${searchQuery}`,
    );
    setFilteredProducts(res.data.products);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategory();
  }, []);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Handle price range filter change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };

  const applyFilters = () => {
    let filtered = products;
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product: Product) =>
        selectedCategories.includes(product.category),
      );
    }
    // Filter by price range
    filtered = filtered.filter(
      (product: Product) => product.price <= priceRange,
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    //when price range and categories change then this filter function will trigger and page rerender
    applyFilters();
  }, [selectedCategories, priceRange]);

  useEffect(() => {
    fetchSearchProduct();
  }, [searchQuery]);

  return (
    <div className="p-6 space-x-6">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for filters */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Price Range</h3>
            <input
              type="range"
              min={0}
              max={500}
              step={10}
              id="price-range"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-sm">
              <span>Rs.0</span>
              <span id="price-value">Rs.250</span>
              <span>Rs.500</span>
            </div>
          </div>
          {/* Categories Filter */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Categories</h3>
            <div className="space-y-2">
              {category.map((category, index) => (
                <label className="flex items-center space-x-2" key={index}>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Apply Filters Button */}
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-4 text-center text-xl font-semibold">
              No products found
            </div>
          ) : (
            filteredProducts.map((product: Product) => (
              <div
                className="bg-white p-4 rounded-lg shadow-lg"
                key={product.id}
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
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">Rs.{product.price}</p>

                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        price: product.price,
                        qty: 1,
                        title: product.title,
                        image: product.images[0],
                      }),
                    );
                    toast.success(
                      `${product.title} has been added to your cart!`,
                    );
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
