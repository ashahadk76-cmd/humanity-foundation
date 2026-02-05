"use client"
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast' // ✅ correct import

const Page = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include" // cookie send
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Login Successful"); // ✅ correct toast
        window.location.href = '/admin/dashboard';
        setForm("")
      } else {
        toast.error(result.message); // ✅ correct toast
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <Toaster position="top-right" /> {/* ✅ correct placement */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm relative"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Page
