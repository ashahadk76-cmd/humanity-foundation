"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, User, AlertCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        contactType: "General Inquiry", // ✅ Schema ke hisaab exact value
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    // ✅ Schema ke exact enum values use karo
    const contactTypes = [
        { value: "General Inquiry", label: "General Inquiry" },
        { value: "Donation Related", label: "Donation Related" },
        { value: "Campaign Support", label: "Campaign Support" },
        { value: "Technical Issue", label: "Technical Issue" },
        { value: "Partnership/Collaboration", label: "Partnership/Collaboration" },
        { value: "Volunteer Opportunity", label: "Volunteer Opportunity" },
    ];

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "success" });
        }, 4000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log("Sending data:", formData); // Debug ke liye

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    contactType: formData.contactType, // ✅ Exact value
                    message: formData.message
                }),
            });

            const result = await response.json();
            console.log("API Response:", result); // Debug ke liye

            if (result.success) {
                showToast("Message sent successfully! We'll contact you soon.", "success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    contactType: "General Inquiry", // ✅ Reset bhi exact value
                    message: "",
                });
            } else {
                showToast(result.message || "Failed to send message. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Network error. Please check your connection.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-50 animate-fade-in">
                    <div className={`max-w-md ${toast.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border rounded-lg shadow-lg p-4 flex items-center`}>
                        <AlertCircle className={`w-5 h-5 ${toast.type === "success" ? "text-green-600" : "text-red-600"} mr-3`} />
                        <p className={`text-sm font-medium ${toast.type === "success" ? "text-green-800" : "text-red-800"}`}>
                            {toast.message}
                        </p>
                        <button
                            onClick={() => setToast({ show: false, message: "", type: "success" })}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto mt-23 ">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions about donations, campaigns, or partnerships? We&quot;re here to help!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Get in Touch
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Call Us</h3>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                        <p className="text-sm text-gray-500">Mon-Sat, 9AM-6PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Mail className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email Us</h3>
                                        <p className="text-gray-600">support@donationapp.com</p>
                                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <MapPin className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Visit Us</h3>
                                        <p className="text-gray-600">123 Charity Street</p>
                                        <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t">
                                    <h3 className="font-semibold text-gray-900 mb-3">Quick Support</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">• Donation Receipts: receipts@donationapp.com</p>
                                        <p className="text-sm text-gray-600">• Campaign Creation: campaigns@donationapp.com</p>
                                        <p className="text-sm text-gray-600">• Emergency: emergency@donationapp.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <div className="flex items-center mb-6">
                                <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Send us a Message
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            <User className="inline w-4 h-4 mr-1" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="inline w-4 h-4 mr-1" />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="inline w-4 h-4 mr-1" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contactType" className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Regarding *
                                        </label>
                                        <select
                                            id="contactType"
                                            name="contactType"
                                            value={formData.contactType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        >
                                            {contactTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="Please describe your inquiry in detail..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Contact Type Info */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    What happens next?
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { type: "Donation Related", response: "Within 2 hours" },
                                        { type: "Technical Issue", response: "Within 1 hour" },
                                        { type: "General Inquiry", response: "Within 24 hours" },
                                        { type: "Partnership/Collaboration", response: "Within 48 hours" },
                                    ].map((item, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="font-medium text-gray-900">{item.type}</div>
                                            <div className="text-sm text-gray-600">Response time: {item.response}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                q: "How long does it take to get a response?",
                                a: "We aim to respond within 24 hours for general inquiries. Urgent donation-related issues are addressed within 2 hours."
                            },
                            {
                                q: "Can I update my donation details?",
                                a: "Yes, please contact our donation support team with your transaction ID for any updates."
                            },
                            {
                                q: "How do I start a new campaign?",
                                a: "Visit our 'Create Campaign' page or email campaigns@donationapp.com for assistance."
                            },
                            {
                                q: "Is my personal information secure?",
                                a: "Yes, we use bank-level encryption and never share your data with third parties."
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}