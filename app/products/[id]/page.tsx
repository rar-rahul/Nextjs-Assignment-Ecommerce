import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
}

// static path genration
export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products = data.products;

  // Return paths for static generation
  return products.map((product: { id: number }) => ({
    id: product.id.toString(), // Convert the ID to a string
  }));
}

const page = async ({ params }: { params: Product }) => {
  // Fetch directly in page (server component)
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-700 font-semibold">
            Rs.{product.price}
          </p>
          <p className="text-gray-500">{product.description}</p>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-gray-700">Rating:</span>
            <div className="flex items-center">
              {/* Displaying Star Rating */}
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={product.rating >= index + 1 ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  className={`w-5 h-5 ${product.rating >= index + 1 ? "text-yellow-400" : "text-gray-300"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.25l3.7 2.19-.7-4.11L18 9.4l-4.1-.6L12 3 10.1 8.8 6 9.4l2.1 5.88-.7 4.11L12 17.25z"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-500">{product.rating} / 5</span>
            </div>
          </div>

          {/* Product Category */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Category:{" "}
              <span className="text-indigo-600">{product.category}</span>
            </p>
          </div>

          {/* Product Stock Information */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Stock:
              <span
                className={`text-${product.stock > 0 ? "green" : "red"}-600`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
