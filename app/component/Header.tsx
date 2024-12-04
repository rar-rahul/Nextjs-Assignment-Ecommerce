'use client'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { FaShoppingCart } from 'react-icons/fa' // Cart Icon from react-icons

const Header = () => {
  const store = useSelector((state: RootState) => state.products)
  const cartItemsCount = store.cart.length // Assuming 'cart' is an array in your redux store
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        
        {/* Left Section: Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo</span>
           

Logo
          </Link>
        </div>

        {/* Center Section: Search Box (for mobile and desktop) */}
        <div className="flex justify-center w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full lg:w-96 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Right Section: Navigation and Cart Menu */}
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          {/* Products Link */}
          <Link href="/products" className="text-sm font-semibold text-gray-900">
            Products
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative text-gray-700">
            <FaShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-50 px-6 py-4 space-y-4">
          <Link href="/products" className="block text-gray-900 font-semibold">Products</Link>
          <Link href="/cart" className="block text-gray-900 font-semibold">Cart</Link>
        </div>
      )}
    </header>
  )
}

export default Header
