"use client"

import React, { useState, useEffect, useRef } from "react"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { LogOut } from "lucide-react"

const Page = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-start px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">User Profile</h1>
      <div className="relative flex justify-center mt-20" ref={dropdownRef}>
        {/* Profile Button - Simple */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
        >
          {session?.user?.image && (
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={session.user.image}
                alt="avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span className="text-sm font-medium">Profile</span>
        </button>

        {/* Dropdown Menu - Simple & Clean */}
        {open && (
          <div className="absolute top-14 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                {session?.user?.image && (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={() => signOut()}
                className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 py-2.5 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page