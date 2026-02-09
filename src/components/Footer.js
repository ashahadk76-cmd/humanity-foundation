"use client";

import {
    Heart,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    CreditCard,
    Shield,
    FileText,
    Globe,
    ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast,Toaster} from "react-hot-toast";
import { ToastContainer } from "react-toast";

const Footer = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNewsletter = async (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/subscriber", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Successfully subscribed to newsletter!");
                setEmail("");
            } else {
                toast.error(result.message || "Subscription failed");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Campaigns", path: "/" },
        { name: "How It Works", path: "/howitswork" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "FAQ", path: "/faq" },
    ];

    const campaignCategories = [
        { name: "Medical", path: "/campaigns?category=medical" },
        { name: "Education", path: "/campaigns?category=education" },
        { name: "Disaster Relief", path: "/campaigns?category=disaster" },
        { name: "Animal Welfare", path: "/campaigns?category=animals" },
        { name: "Environment", path: "/campaigns?category=environment" },
        { name: "Community", path: "/campaigns?category=community" },
    ];

    const legalLinks = [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Refund Policy", path: "/refund-policy" },
        { name: "80G Certificate", path: "/80g-certificate" },
        { name: "Transparency Report", path: "/transparency" },
        { name: "Complaints", path: "/complaints" },
    ];

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "#" },
        { icon: <Twitter className="w-5 h-5" />, name: "Twitter", url: "#" },
        { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "#" },
        { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", url: "#" },
        { icon: <Youtube className="w-5 h-5" />, name: "YouTube", url: "#" },
    ];

    const trustBadges = [
        { icon: <Shield className="w-6 h-6" />, text: "100% Secure Donations" },
        { icon: <CreditCard className="w-6 h-6" />, text: "SSL Encrypted" },
        { icon: <FileText className="w-6 h-6" />, text: "80G Tax Benefits" },
        { icon: <Globe className="w-6 h-6" />, text: "Verified Campaigns" },
    ];

    return (
        <>
          <ToastContainer className="bottom-0" />
            <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
                {/* Newsletter Section */}
                <div className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div className="text-center lg:text-left max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    Stay Connected With Our Mission
                                </h3>
                                <p className="text-lg text-blue-100">
                                    Subscribe to receive inspiring stories, campaign updates, and impact reports directly in your inbox.
                                </p>
                            </div>

                            <div className="w-full lg:w-auto">
                                <form onSubmit={handleNewsletter} className="max-w-md lg:max-w-lg">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative flex-1">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your.email@example.com"
                                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                                                    Subscribing...
                                                </>
                                            ) : (
                                                <>
                                                    Subscribe
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-sm text-blue-200/80 mt-3">
                                        We respect your privacy. No spam, unsubscribe anytime.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                        
                        {/* Logo & Description */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <Heart className="w-7 h-7 text-white" fill="currentColor" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold tracking-tight">Humanity</div>
                                    <div className="text-sm text-gray-400 font-medium tracking-wider">FOUNDATION</div>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                A trusted platform connecting compassionate donors with verified causes. Together, we create lasting change.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-300">Helpline</div>
                                        <div className="text-gray-400 text-sm">+91 1800 123 4567</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-300">Email</div>
                                        <div className="text-gray-400 text-sm">support@humanityfoundation.org</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-300">Address</div>
                                        <div className="text-gray-400 text-sm">Mumbai, Maharashtra 400001</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 pb-3 border-b border-gray-800 text-gray-300">
                                Quick Links
                            </h4>
                            <ul className="space-y-4">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => router.push(link.path)}
                                            className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 flex items-center gap-2 group"
                                        >
                                            <div className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Campaign Categories */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 pb-3 border-b border-gray-800 text-gray-300">
                                Campaign Types
                            </h4>
                            <ul className="space-y-4">
                                {campaignCategories.map((category) => (
                                    <li key={category.name}>
                                        <button
                                            onClick={() => router.push(category.path)}
                                            className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 flex items-center gap-2 group"
                                        >
                                            <div className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal & Social */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 pb-3 border-b border-gray-800 text-gray-300">
                                Legal
                            </h4>
                            <ul className="space-y-4 mb-10">
                                {legalLinks.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => router.push(link.path)}
                                            className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 flex items-center gap-2 group"
                                        >
                                            <div className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div>
                                <h5 className="font-semibold mb-5 text-gray-300">Follow Our Journey</h5>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-gray-800 hover:bg-blue-600/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 border border-gray-700 hover:border-blue-500/50"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-16 pt-12 border-t border-gray-800">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {trustBadges.map((badge, index) => (
                                <div key={index} className="flex items-center gap-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg flex items-center justify-center">
                                        <div className="text-blue-400">
                                            {badge.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm text-gray-300">{badge.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mt-12 pt-10 border-t border-gray-800">
                        <div className="mb-6">
                            <h5 className="text-gray-400 text-sm font-medium mb-4">We Accept</h5>
                            <div className="flex flex-wrap gap-3 items-center">
                                {[
                                    "Visa", "Mastercard", "Razorpay", "Paytm",
                                    "Google Pay", "PhonePe", "UPI", "Net Banking"
                                ].map((method) => (
                                    <div
                                        key={method}
                                        className="px-4 py-2 bg-gray-800/50 rounded-lg text-sm text-gray-300 border border-gray-700/50 hover:border-gray-600 transition-colors"
                                    >
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-12 pt-10 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <div className="text-gray-400 text-sm">
                                    © {new Date().getFullYear()} Humanity Foundation. All rights reserved.
                                </div>
                                <div className="text-gray-500 text-xs mt-2">
                                    Registered under Section 8 of Companies Act, 2013. 80G Tax Exemption Certificate No. ABC123456789.
                                </div>
                            </div>

                            <div className="flex gap-8 text-sm">
                                <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Sitemap
                                </a>
                                <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Accessibility
                                </a>
                                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
                            <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
                                This website is compliant with the Information Technology Act, 2000 and follows all RBI guidelines for online transactions. 
                                All donations are eligible for tax exemption under section 80G of the Income Tax Act, 1961.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;