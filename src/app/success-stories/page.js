"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
    Heart,
    Share2,
    ChevronRight,
    Quote,
    Users,
    TrendingUp,
    Award,
    ExternalLink,
    Play,
    Pause
} from "lucide-react";

// ---------- DATA ----------
const stories = [
    {
        id: 1,
        title: "From streets to school: 200 children now have a future",
        excerpt: "Your support helped build two new classrooms and provided scholarships for girls in rural Rajasthan.",
        image: "/images/success/education-story.jpg",
        category: "Education",
        raised: "₹84,50,000",
        goal: "₹1,00,00,000",
        donors: 1432,
        impact: "200 children",
        readTime: "5 min read",
        featured: true,
        gradient: "from-blue-50 to-indigo-50",
        accent: "blue",
        quote: "I never imagined I would hold a pencil again. Today, I want to be a teacher.",
        author: "Priya, 14",
        authorRole: "Scholarship recipient",
        authorImage: "/images/success/priya.jpg"
    },
    {
        id: 2,
        title: "Life-saving heart surgery for 47 infants",
        excerpt: "A specialised paediatric cardiac camp gave newborn babies a second chance at life.",
        image: "/images/success/medical-story.jpg",
        category: "Medical",
        raised: "₹1,24,00,000",
        goal: "₹1,20,00,000",
        donors: 2107,
        impact: "47 infants",
        readTime: "6 min read",
        featured: true,
        gradient: "from-red-50 to-rose-50",
        accent: "red",
        quote: "The day my son's surgery succeeded, I saw the sun after months of rain.",
        author: "Lakshmi",
        authorRole: "Mother",
        authorImage: "/images/success/lakshmi.jpg"
    },
    {
        id: 3,
        title: "Clean water restored for 15 villages in Bundelkhand",
        excerpt: "Solar-powered water purification units now serve 12,000 people daily.",
        image: "/images/success/water-story.jpg",
        category: "Environment",
        raised: "₹63,00,000",
        goal: "₹75,00,000",
        donors: 876,
        impact: "15 villages",
        readTime: "4 min read",
        featured: false,
        gradient: "from-cyan-50 to-teal-50",
        accent: "teal",
        quote: "Our daughters no longer walk 6km for water. They walk to school instead.",
        author: "Sarpanch, Amarpur",
        authorRole: "Village head",
        authorImage: "/images/success/sarpanch.jpg"
    },
    {
        id: 4,
        title: "Empowering 300 women artisans through fair-trade",
        excerpt: "A cooperative model helped rural women earn sustainable livelihoods from traditional crafts.",
        image: "/images/success/women-story.jpg",
        category: "Livelihood",
        raised: "₹42,00,000",
        goal: "₹40,00,000",
        donors: 654,
        impact: "300 women",
        readTime: "7 min read",
        featured: false,
        gradient: "from-purple-50 to-pink-50",
        accent: "purple",
        quote: "My embroidery now sends my daughter to college. Stitch by stitch, we built this.",
        author: "Meera",
        authorRole: "Artisan cooperative leader",
        authorImage: "/images/success/meera.jpg"
    }
];

const metrics = [
    { label: "Campaigns fully funded", value: "124", icon: Award },
    { label: "Lives impacted", value: "1,75,000+", icon: Users },
    { label: "Average funding speed", value: "23 days", icon: TrendingUp },
    { label: "Repeat donor rate", value: "68%", icon: Heart }
];

// ---------- COMPONENT ----------
export default function SuccessStories() {
    const [selectedStory, setSelectedStory] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const featuredStories = stories.filter(s => s.featured);
    const regularStories = stories.filter(s => !s.featured);

    return (
        <div className="min-h-screen bg-white font-sans antialiased selection:bg-blue-100 selection:text-blue-900">

            {/* HERO – subtle, spacious, Apple-like */}
            <section className="relative px-4 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className={`max-w-3xl mx-auto text-center space-y-8 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                            <Heart className="w-4 h-4 text-blue-500 fill-blue-500" />
                            Your kindness in action
                        </span>
                        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                            Stories of change,
                            <br />written by you.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Every donation creates a ripple. Here are real lives touched by your generosity — intimate, honest, and hopeful.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </section>

            {/* METRICS – clean, data-like, floating */}
            <section ref={sectionRef} className="max-w-7xl mx-auto px-4 -mt-8 pb-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {metrics.map((metric, idx) => {
                        const Icon = metric.icon;
                        return (
                            <div
                                key={idx}
                                className="group bg-white/70 backdrop-blur-sm border border-gray-100/80 rounded-3xl px-6 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className="flex flex-col items-start gap-3">
                                    <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">{metric.value}</p>
                                        <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* FEATURED STORIES – large cards, emotional core */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Featured impact</h2>
                        <p className="text-lg text-gray-500 font-light">Moments that moved us — and our community.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {featuredStories.map((story) => (
                        <div
                            key={story.id}
                            className="group relative bg-white rounded-3xl border border-gray-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_50px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out overflow-hidden"
                        >
                            {/* subtle gradient background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

                            <div className="relative p-8 md:p-10 flex flex-col h-full">
                                {/* category & read time */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`inline-flex items-center px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-full text-xs font-semibold uppercase tracking-wider text-${story.accent}-700 shadow-sm`}>
                                        {story.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono">{story.readTime}</span>
                                </div>

                                {/* main content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-tight mb-5">
                                        {story.title}
                                    </h3>
                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 font-light">
                                        {story.excerpt}
                                    </p>

                                    {/* quote card - emotional anchor */}
                                    <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
                                        <Quote className="w-8 h-8 text-gray-300 mb-3" />
                                        <p className="text-gray-800 text-lg italic font-serif leading-relaxed mb-4">
                                            "{story.quote}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" /> {/* placeholder for author image */}
                                            <div>
                                                <p className="font-semibold text-gray-900">{story.author}</p>
                                                <p className="text-xs text-gray-500">{story.authorRole}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* impact stats */}
                                    <div className="flex flex-wrap items-center gap-6 mb-8">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Raised</p>
                                            <p className="text-2xl font-semibold text-gray-900">{story.raised}</p>
                                            <p className="text-xs text-gray-400">of {story.goal}</p>
                                        </div>
                                        <div className="w-px h-10 bg-gray-200" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Donors</p>
                                            <p className="text-2xl font-semibold text-gray-900">{story.donors.toLocaleString()}</p>
                                        </div>
                                        <div className="w-px h-10 bg-gray-200" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Impact</p>
                                            <p className="text-2xl font-semibold text-gray-900">{story.impact}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button className="group/btn inline-flex items-center justify-between w-full mt-2 pt-6 border-t border-gray-100 transition-all">
                                    <span className="text-sm font-medium text-gray-700 group-hover/btn:text-blue-600 transition-colors">
                                        Read full story
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover/btn:text-blue-600 group-hover/btn:translate-x-1 transition-all" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* STORY GRID – elegant, quiet, minimal cards */}
            <section className="max-w-7xl mx-auto px-4 pb-28">
                <div className="border-t border-gray-100 pt-20 mb-12">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-3">More stories</h2>
                    <p className="text-lg text-gray-500 font-light">Every campaign has a heart. Explore recent successes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {regularStories.map((story) => (
                        <div
                            key={story.id}
                            className="group bg-white rounded-2xl border border-gray-100/80 p-6 shadow-[0_5px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 flex flex-col"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-10 rounded-2xl pointer-events-none`} />

                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs font-semibold uppercase tracking-wider text-${story.accent}-700 bg-${story.accent}-50/50 px-3 py-1.5 rounded-full border border-${story.accent}-100`}>
                                        {story.category}
                                    </span>
                                    <span className="text-xs text-gray-400">{story.readTime}</span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {story.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                                    {story.excerpt}
                                </p>

                                <div className="flex items-center justify-between mb-5 text-sm">
                                    <div>
                                        <span className="text-gray-900 font-semibold">{story.raised}</span>
                                        <span className="text-gray-400 text-xs ml-1">raised</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <Users className="w-4 h-4" />
                                        <span className="text-xs">{story.donors}</span>
                                    </div>
                                </div>

                                <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors pt-2 border-t border-gray-100 w-full justify-between">
                                    <span>View impact</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* VIDEO ESSAY / CINEMATIC MOMENT — Apple-like quiet video card */}
            <section className="max-w-7xl mx-auto px-4 pb-32">
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-4xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="absolute inset-0 bg-[url('/images/success/video-poster.jpg')] bg-cover bg-center" />

                    <div className="relative z-20 px-8 py-20 md:px-20 md:py-28 flex flex-col items-center text-center text-white">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20">
                                <Play className="w-6 h-6 text-white fill-white/90 ml-1" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                                One year of change
                            </h3>
                            <p className="text-white/70 text-lg font-light max-w-lg mx-auto">
                                Watch how your support transformed a community. A short film by our ground partners.
                            </p>
                            <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all shadow-xl hover:scale-105 mt-4">
                                Watch film
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* subtle footer note */}
            <footer className="max-w-7xl mx-auto px-4 pb-16 text-center">
                <div className="border-t border-gray-100 pt-12">
                    <p className="text-sm text-gray-400 font-light tracking-wide">
                        Every number represents a name, a family, a dream. Thank you for being part of these stories.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                        <span className="text-xs text-gray-400">80G tax benefits apply to donations</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}