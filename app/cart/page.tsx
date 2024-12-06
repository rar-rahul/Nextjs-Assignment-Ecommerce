"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeCart } from "./../../reducer/ProductSlice";
import { toast } from "react-toastify";
import Image from "next/image";

interface ProductCart {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, product: ProductCart) => acc + product.price * product.qty,
    0,
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Product</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Qty</th>
                <th className="px-4 py-2 border-b">Total</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: ProductCart) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border-b">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                        priority
                        className="object-cover"
                      />
                      <span className="text-lg">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">Rs. {item.price}</td>
                  <td className="px-4 py-2 border-b">{item.qty}</td>

                  <td className="px-4 py-2 border-b">
                    Rs. {item.price * item.qty}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => {
                        dispatch(removeCart(item.id));
                        toast.success("Item removed from cart!");
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6">
            <span className="text-lg font-semibold">
              Total: Rs. {totalPrice}
            </span>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-blue-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
