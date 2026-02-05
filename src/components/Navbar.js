"use client"

import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Heart, Home, DollarSign, Users, User, Mail, X, Menu } from 'lucide-react'

const Navbar = () => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/donate", label: "Donate", icon: <DollarSign className="w-5 h-5" /> },
    { href: "/about", label: "About Us", icon: <Users className="w-5 h-5" /> },
    { href: "/user", label: "Profile", icon: <User className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                  <Heart className="w-6 h-6 text-blue-600" fill="currentColor" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-gray-900 tracking-tight">
                  Humanity
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                  FOUNDATION
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* User Profile */}
            {session ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => signOut()}
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Sign Out
                </button>

                <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-gray-100 object-cover"
                  />
                  <div className="hidden lg:flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {session.user.name?.split(' ')[0]}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session.user.email}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => signIn()}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow"
                >
                  Sign In
                </button>

                <button
                  onClick={() => signIn()}
                  className="px-5 py-2.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 mt-2 py-4 shadow-lg rounded-b-lg animate-slideDown">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <div className="text-blue-500">
                    {link.icon}
                  </div>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 px-4">
              {session ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {session.user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.user.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      closeMenu()
                      signOut()
                    }}
                    className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      closeMenu()
                      signIn()
                    }}
                    className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      closeMenu()
                      signIn()
                    }}
                    className="w-full px-4 py-2.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Animation for slide down */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  )
}

export default Navbar