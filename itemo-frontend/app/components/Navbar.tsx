'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Define a type for the user info object for better type safety
interface UserInfo {
  name: string;
  email: string;
  token: string;
  _id: string;
}

export default function Navbar() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // It safely accesses localStorage to get user information.
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [pathname]); // Re-check user info on route change

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem('userInfo');
    // Reset state and close dropdown
    setUserInfo(null);
    setIsDropdownOpen(false);
    // Redirect to the login page
    router.push('/login');
  };

  // Don't render the navbar on login/register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <nav className="bg-neutral-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
        >
          MJ Entertainment
        </Link>
        <div className="relative">
          {userInfo ? (
            <>
              {/* Button to toggle the dropdown */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none p-2 rounded-md hover:bg-neutral-700"
              >
                <span className="font-medium">{userInfo.name}</span>
                <motion.svg
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              {/* Dropdown Menu with animation */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg py-1 z-50"
                  >
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            // Show login/register links if no user is logged in
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="font-medium hover:text-gray-300 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="font-medium hover:text-gray-300 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
