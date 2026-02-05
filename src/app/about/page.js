"use client";

import {
    Heart,
    Target,
    Users,
    Globe,
    Award,
    TrendingUp,
    Shield,
    Star,
    Clock,
    CheckCircle,
    ArrowRight,
    MapPin,
    Mail,
    Phone,
    Instagram,
    Facebook,
    Twitter,
    Linkedin
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AboutPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('mission');

    const stats = [
        { value: "50K+", label: "Lives Impacted", icon: <Users className="w-6 h-6" /> },
        { value: "₹5Cr+", label: "Total Raised", icon: <TrendingUp className="w-6 h-6" /> },
        { value: "200+", label: "Campaigns", icon: <Target className="w-6 h-6" /> },
        { value: "24/7", label: "Support", icon: <Clock className="w-6 h-6" /> }
    ];

    const values = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Transparency",
            description: "Every rupee is accounted for with detailed reports and real-time updates on fund utilization."
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Compassion",
            description: "We operate with empathy and understanding, treating every beneficiary with dignity and respect."
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Accountability",
            description: "Regular audits and third-party verification ensure funds reach their intended recipients."
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Inclusivity",
            description: "We serve all communities regardless of religion, caste, gender, or economic background."
        }
    ];

    const team = [
        { name: "Dr. Arjun Patel", role: "Founder & CEO", bio: "Former UNICEF Director with 15+ years in humanitarian work", imgColor: "from-blue-500 to-cyan-400" },
        { name: "Priya Sharma", role: "Operations Director", bio: "MBA from IIM with expertise in nonprofit management", imgColor: "from-purple-500 to-pink-500" },
        { name: "Rohan Singh", role: "Tech Director", bio: "Ex-Google engineer leading our transparency initiatives", imgColor: "from-green-500 to-teal-400" },
        { name: "Anjali Mehta", role: "Community Head", bio: "Social worker connecting donors with grassroots initiatives", imgColor: "from-orange-500 to-red-400" }
    ];

    const milestones = [
        { year: "2018", event: "Founded with a mission to make giving transparent" },
        { year: "2019", event: "Launched first 50 campaigns impacting 5,000+ lives" },
        { year: "2020", event: "COVID relief efforts raised ₹2Cr for emergency aid" },
        { year: "2021", event: "Received 80G certification from Income Tax Dept" },
        { year: "2022", event: "Expanded to 10+ states across India" },
        { year: "2023", event: "Crossed ₹5Cr in total donations with 95% success rate" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <Heart className="w-4 h-4" fill="currentColor" />
                            <span className="text-sm font-medium">Since 2018 • Trusted by 50,000+ Donors</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Our <span className="text-yellow-300">Story</span> of Hope
                        </h1>

                        <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                            We&apos;re on a mission to create a world where every act of giving is transparent,
                            impactful, and accessible to all.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                            <div className="flex justify-center mb-3 text-blue-600">
                                {stat.icon}
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                            <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Mission & Vision Tabs */}
                <div className="mb-20">
                    <div className="flex border-b border-gray-200 mb-8">
                        <button
                            onClick={() => setActiveTab('mission')}
                            className={`flex-1 py-4 text-lg font-semibold transition-colors ${activeTab === 'mission'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Our Mission
                        </button>
                        <button
                            onClick={() => setActiveTab('vision')}
                            className={`flex-1 py-4 text-lg font-semibold transition-colors ${activeTab === 'vision'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Our Vision
                        </button>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
                        {activeTab === 'mission' ? (
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="md:w-1/3">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Target className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-lg text-gray-700 mb-4">
                                        To bridge the gap between compassionate donors and genuine needs through technology-enabled
                                        transparency, ensuring every contribution creates maximum impact.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">Make giving accessible to everyone, anywhere</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">Ensure 100% transparency in fund utilization</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">Build trust through verified campaigns and real impact</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="md:w-1/3">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Globe className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-lg text-gray-700 mb-4">
                                        To create a world where no act of kindness goes unaccounted for, and every individual
                                        has the opportunity to make a meaningful difference in someone's life.
                                    </p>
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <p className="text-gray-700 italic">
                                            &quot;We envision an India where giving is not just an act of charity, but a culture of
                                            shared responsibility and transparent impact.&quot;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Our Values */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            These principles guide every decision we make and every campaign we support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Journey
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            From a small idea to impacting thousands of lives across India.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className="md:w-1/2 md:px-8 mb-6 md:mb-0">
                                        <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                            <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                                            <p className="text-gray-700">{milestone.event}</p>
                                        </div>
                                    </div>

                                    <div className="md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                                    <div className="md:w-1/2 md:px-8"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Passionate individuals dedicated to making a difference through technology and compassion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className={`h-40 bg-gradient-to-br ${member.imgColor}`}></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                    <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                                    <p className="text-gray-600 text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Awards & Recognition */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Recognition & Trust
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our commitment to transparency and impact has been recognized by leading institutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: "80G Certified", desc: "Tax exemption from Income Tax Dept" },
                            { title: "ISO 27001", desc: "Information security certified" },
                            { title: "Best NGO Tech", desc: "Awarded by Digital India Foundation" },
                            { title: "Transparency 5★", desc: "Rated by Charity Navigator" }
                        ].map((award, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{award.title}</h4>
                                <p className="text-sm text-gray-600">{award.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We&apos;d love to hear from you. Whether you have questions or want to partner with us.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Our Office</h4>
                                        <p className="text-gray-600">123 Charity Street, Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Email Us</h4>
                                        <p className="text-gray-600">contact@humanityfoundation.org</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Call Us</h4>
                                        <p className="text-gray-600">+91 1800 123 4567 (Toll-free)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4">Follow Our Journey</h4>
                                <div className="flex gap-4">
                                    {[Instagram, Facebook, Twitter, Linkedin].map((Icon, index) => (
                                        <a key={index} href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Ready to Make a Difference?</h3>
                            <p className="text-blue-100 mb-8">
                                Join our community of changemakers. Whether you want to donate, volunteer, or partner with us.
                            </p>
                            <button
                                onClick={() => router.push("/contact")}
                                className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                Contact Us Today
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}