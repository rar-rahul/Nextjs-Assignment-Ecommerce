"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromWishlist } from "./../../reducer/WishlistSlice";
import Image from "next/image";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

const WishlistPage = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.wishList);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item: WishlistItem) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="absolute top-2 right-2 p-1 text-gray-700 hover:text-red-500 focus:outline-none"
              >
                <FaTrashAlt size={18} />
              </button>

              <Link href={`/products/${item.id}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={200}
                  priority
                  className="w-full h-48 object-cover"
                />
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">Rs.{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
