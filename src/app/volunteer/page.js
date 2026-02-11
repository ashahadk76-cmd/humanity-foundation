// app/volunteer/page.js
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Heart, Users, Calendar, MapPin, Clock, Award, 
    ChevronRight, CheckCircle, Mail, Phone, Globe,
    Briefcase, GraduationCap, Star, ArrowRight
} from "lucide-react";

const VolunteerPage = () => {
    const [activeTab, setActiveTab] = useState("opportunities");
    const [formData, setFormData] = useState({
        fullName: "", email: "", phone: "", address: "",
        occupation: "", qualification: "", skills: "",
        interests: [], experience: "", message: ""
    });

    const interestOptions = [
        "Teaching", "Healthcare", "Environment", "Animal Welfare",
        "Elderly Care", "Child Development", "Disaster Relief", 
        "Fundraising", "Marketing", "Event Management"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (interest) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Thank you for volunteering! We'll contact you soon.");
    };

    const opportunities = [
        {
            title: "Teaching Assistant",
            location: "Mumbai",
            commitment: "4-6 hrs/week",
            category: "Education",
            image: "/images/volunteer/opportunities/teaching.jpg",
            spots: 12,
            icon: <GraduationCap className="w-6 h-6" />
        },
        {
            title: "Medical Camp Volunteer",
            location: "Delhi NCR",
            commitment: "Weekends",
            category: "Healthcare",
            image: "/images/volunteer/opportunities/medical.jpg",
            spots: 8,
            icon: <Heart className="w-6 h-6" />
        },
        {
            title: "Environmental Cleanup",
            location: "Pune",
            commitment: "Flexible",
            category: "Environment",
            image: "/images/volunteer/opportunities/environment.jpg",
            spots: 25,
            icon: <Globe className="w-6 h-6" />
        },
        {
            title: "Animal Caretaker",
            location: "Bangalore",
            commitment: "2-3 hrs/day",
            category: "Animal Welfare",
            image: "/images/volunteer/opportunities/animals.jpg",
            spots: 6,
            icon: <Users className="w-6 h-6" />
        }
    ];

    const stats = [
        { value: "500+", label: "Active Volunteers" },
        { value: "50+", label: "Partner NGOs" },
        { value: "25k+", label: "Hours Contributed" },
        { value: "100+", label: "Monthly Programs" }
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Teaching Volunteer",
            image: "/images/volunteer/testimonials/volunteer1.jpg",
            quote: "Volunteering with Humanity Foundation has been life-changing. The joy of teaching underprivileged children is unmatched.",
            rating: 5
        },
        {
            name: "Rahul Verma",
            role: "Medical Volunteer",
            image: "/images/volunteer/testimonials/volunteer2.jpg",
            quote: "Being part of medical camps in rural areas gave me purpose. We're making healthcare accessible to all.",
            rating: 5
        },
        {
            name: "Anjali Desai",
            role: "Environmental Volunteer",
            image: "/images/volunteer/testimonials/volunteer3.jpg",
            quote: "From beach cleanups to tree plantation drives - every small action counts. Join us in saving our planet!",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* HERO SECTION - FIXED IMAGE */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* ✅ FIXED: Background image with inline style */}
                <div 
                    className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
                    style={{ backgroundImage: "url('/images/volunteer/hero/hero-bg.jpg')" }}
                ></div>
                
                <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                                <span className="text-sm font-semibold">Join Our Mission</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Make a Difference
                                <span className="block text-yellow-300">With Your Time & Skills</span>
                            </h1>
                            
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                                Become a volunteer and help us create lasting change in communities. 
                                Your time can transform lives.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="#apply" className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                                    Apply Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="#opportunities" className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2 text-lg border border-white/30">
                                    View Opportunities
                                </Link>
                            </div>
                        </div>
                        
                        <div className="flex-1 relative hidden lg:block">
                            <div className="relative w-full h-96">
                                {/* ✅ FIXED: Unoptimized Image */}
                                <img
                                    src="/images/volunteer/hero/hero-image.jpg"
                                    alt="Volunteers helping"
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS SECTION */}
            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHY VOLUNTEER SECTION */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Volunteer With Us?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of volunteers who are creating meaningful impact in communities across India
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        {
                            icon: <Heart className="w-8 h-8 text-red-500" />,
                            title: "Make Impact",
                            desc: "Directly contribute to positive change in communities"
                        },
                        {
                            icon: <Users className="w-8 h-8 text-blue-500" />,
                            title: "Build Network",
                            desc: "Connect with like-minded people and organizations"
                        },
                        {
                            icon: <Award className="w-8 h-8 text-yellow-500" />,
                            title: "Gain Experience",
                            desc: "Develop new skills and enhance your resume"
                        },
                        {
                            icon: <Clock className="w-8 h-8 text-green-500" />,
                            title: "Flexible Timing",
                            desc: "Choose opportunities that fit your schedule"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* TABS */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 pb-4">
                        <button
                            onClick={() => setActiveTab("opportunities")}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                                activeTab === "opportunities"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Briefcase className="w-5 h-5" />
                            Open Opportunities
                        </button>
                        <button
                            onClick={() => setActiveTab("apply")}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                                activeTab === "apply"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Heart className="w-5 h-5" />
                            Apply Now
                        </button>
                        <button
                            onClick={() => setActiveTab("testimonials")}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                                activeTab === "testimonials"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Star className="w-5 h-5" />
                            Volunteer Stories
                        </button>
                    </div>
                </div>

                {/* OPPORTUNITIES TAB - FIXED IMAGES */}
                {activeTab === "opportunities" && (
                    <div id="opportunities" className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {opportunities.map((opp, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100 group">
                                    {/* ✅ FIXED: Opportunity card image with fallback */}
                                    <div 
                                        className="relative h-56 bg-cover bg-center"
                                        style={{ 
                                            backgroundImage: `url('${opp.image}')`,
                                            backgroundColor: '#3b82f6', // fallback color
                                            backgroundBlendMode: 'overlay'
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                                            {opp.spots} spots left
                                        </div>
                                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                                {opp.icon}
                                            </div>
                                            <span className="font-semibold">{opp.category}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{opp.title}</h3>
                                        
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                                                {opp.location}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="w-5 h-5 mr-3 text-gray-400" />
                                                {opp.commitment}
                                            </div>
                                        </div>
                                        
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 group">
                                            Apply Now
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* APPLY TAB */}
                {activeTab === "apply" && (
                    <div id="apply" className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Volunteer Application</h3>
                            <p className="text-gray-600 mb-10 text-center text-lg">
                                Fill out the form below and our team will connect with you within 48 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">City/Location *</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your city"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                                        <input type="text" name="occupation" value={formData.occupation} onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Student, Professional"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification</label>
                                        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your educational background"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skills & Expertise</label>
                                    <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="List your relevant skills..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-4">Areas of Interest *</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {interestOptions.map((interest) => (
                                            <label key={interest} className="flex items-center space-x-3">
                                                <input type="checkbox" checked={formData.interests.includes(interest)}
                                                    onChange={() => handleCheckboxChange(interest)}
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-gray-700">{interest}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Volunteer Experience</label>
                                    <textarea name="experience" value={formData.experience} onChange={handleChange} rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tell us about any previous volunteering experience..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Why do you want to volunteer? *</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Share your motivation to join us..."
                                    ></textarea>
                                </div>

                                <button type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Heart className="w-5 h-5" />
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* TESTIMONIALS TAB - FIXED IMAGES */}
                {activeTab === "testimonials" && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="flex items-center gap-4 mb-6">
                                        {/* ✅ FIXED: Testimonial profile image with fallback */}
                                        <div className="relative w-16 h-16">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-full h-full rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.split(' ').join('+')}&background=3b82f6&color=fff`;
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                            <div className="flex items-center mt-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* CTA SECTION */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 mt-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                        Join our community of changemakers today. Your journey to create impact starts here.
                    </p>
                    <Link href="#apply" className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Become a Volunteer
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { q: "Who can become a volunteer?", a: "Anyone above 18 years with a passion to serve can volunteer. Some roles may have specific requirements." },
                        { q: "What is the time commitment?", a: "It varies by opportunity - from few hours weekly to full-time. We offer flexible options." },
                        { q: "Do you provide training?", a: "Yes, all volunteers receive orientation and role-specific training before starting." },
                        { q: "Can I get a certificate?", a: "Yes, volunteers receive completion certificates and letters of recommendation." }
                    ].map((faq, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                            <p className="text-gray-600">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerPage;