"use client";

import { useState } from 'react';
import {
    Search,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    HelpCircle,
    Shield,
    CreditCard,
    FileText,
    Users,
    TrendingUp,
    Mail,
    Phone,
    MessageSquare,
    CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FAQPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-5 h-5" />, count: 25 },
        { id: 'donation', label: 'Donations', icon: <CreditCard className="w-5 h-5" />, count: 8 },
        { id: 'campaign', label: 'Campaigns', icon: <TrendingUp className="w-5 h-5" />, count: 6 },
        { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" />, count: 5 },
        { id: 'tax', label: 'Tax & Legal', icon: <FileText className="w-5 h-5" />, count: 4 },
        { id: 'account', label: 'Account', icon: <Users className="w-5 h-5" />, count: 2 }
    ];

    const faqs = [
        {
            id: 1,
            category: 'donation',
            question: 'How do I know my donation is being used properly?',
            answer: 'We provide detailed financial reports, photos, and beneficiary stories for every campaign. You can track exactly how funds are utilized through our transparent reporting system. Every campaign includes: 1) Pre-verification of requirements, 2) Real-time fund tracking, 3) Post-completion impact reports with photos and receipts, 4) Quarterly audits by third-party firms.'
        },
        {
            id: 2,
            category: 'security',
            question: 'Is my payment information secure?',
            answer: 'Absolutely. We use bank-level 256-bit SSL encryption and partner with Razorpay, India\'s leading PCI-DSS compliant payment gateway. Your payment details are never stored on our servers. All transactions are secured with 2-factor authentication and real-time fraud monitoring.'
        },
        {
            id: 3,
            category: 'tax',
            question: 'How do I get my 80G tax exemption certificate?',
            answer: '80G certificates are automatically generated and emailed within 7-10 working days of your donation. You can also download them anytime from your account dashboard under "My Donations". Certificates are valid for filing ITR under Section 80G of Income Tax Act, 1961.'
        },
        {
            id: 4,
            category: 'donation',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major payment methods: Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking (All major Indian banks), Wallets, and EMI options. All payments are processed through our secure Razorpay gateway.'
        },
        {
            id: 5,
            category: 'campaign',
            question: 'What happens if a campaign doesn\'t reach its goal?',
            answer: 'Funds are still transferred to the beneficiary even if the target isn\'t fully met. We work with campaigners to adjust the scope or extend the timeline. If the original goal becomes unachievable, donors are informed and can choose to redirect funds to similar campaigns or request a refund.'
        },
        {
            id: 6,
            category: 'account',
            question: 'Can I donate anonymously?',
            answer: 'Yes, you can choose to donate anonymously during checkout. Your contribution will still be counted in campaign totals but your name won\'t appear publicly. However, we\'ll still send you impact reports and tax certificates privately.'
        },
        {
            id: 7,
            category: 'security',
            question: 'How is my personal data protected?',
            answer: 'We are GDPR compliant and follow strict data protection policies. Personal information is encrypted and used only for donation processing and communication. We never sell or share donor data with third parties. Read our Privacy Policy for detailed information.'
        },
        {
            id: 8,
            category: 'donation',
            question: 'Can I get a refund for my donation?',
            answer: 'Refunds are processed in exceptional cases: 1) Duplicate payment, 2) Technical error, 3) Campaign cancellation before funds are disbursed. Refund requests must be made within 7 days of donation. Contact support@humanityfoundation.org with your transaction ID.'
        },
        {
            id: 9,
            category: 'campaign',
            question: 'How are campaigns verified?',
            answer: 'Every campaign undergoes a 5-step verification: 1) Document verification, 2) Need assessment by our team, 3) Beneficiary background check, 4) Medical/legal certification (if applicable), 5) Follow-up plan review. Only 1 in 5 applications gets approved after this rigorous process.'
        },
        {
            id: 10,
            category: 'tax',
            question: 'Is there a minimum donation amount?',
            answer: 'No, you can donate any amount starting from ₹10. Every contribution makes a difference. For 80G tax benefits, the minimum eligible amount is ₹500 per financial year. Smaller donations are still accepted but won\'t qualify for tax exemption.'
        },
        {
            id: 11,
            category: 'donation',
            question: 'How often will I receive updates?',
            answer: 'You\'ll receive: 1) Immediate payment confirmation, 2) Weekly progress updates (if campaign is active), 3) Milestone achievements, 4) Final impact report, 5) Quarterly newsletter. You can customize update frequency in account settings.'
        },
        {
            id: 12,
            category: 'campaign',
            question: 'How long does it take for funds to reach beneficiaries?',
            answer: 'Funds are transferred within 48 hours of campaign completion or milestone achievement. For emergency campaigns, we process funds within 24 hours. You\'ll receive transfer confirmation with beneficiary details.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const popularQuestions = [
        "How secure is my payment?",
        "When will I get my 80G certificate?",
        "Can I donate anonymously?",
        "What happens if campaign goal isn't met?",
        "How are campaigns verified?"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <HelpCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Got Questions? We Have Answers</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Frequently Asked <span className="text-yellow-300">Questions</span>
                        </h1>

                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Find quick answers to common questions about donations, campaigns, security, and more.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for questions about donations, security, tax, etc..."
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <p className="text-sm text-blue-200 mt-3">
                                Try searching: &quot;80G certificate&quot;, &quot;payment security&quot;, &quot;campaign verification&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                {/* Popular Questions */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        Most Popular Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                        {popularQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => setSearchQuery(question.split('?')[0])}
                                className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-blue-300 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <HelpCircle className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{question}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-6 text-lg">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all ${activeCategory === category.id
                                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`${activeCategory === category.id ? 'text-blue-600' : 'text-gray-400'}`}>
                                                {category.icon}
                                            </div>
                                            <span className="font-medium">{category.label}</span>
                                        </div>
                                        <span className={`text-sm ${activeCategory === category.id ? 'text-blue-600' : 'text-gray-400'}`}>
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Quick Help */}
                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4">Still Need Help?</h4>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => router.push('/contact')}
                                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <MessageSquare className="w-5 h-5" />
                                        <span>Contact Support</span>
                                    </button>
                                    <button
                                        onClick={() => router.push('/contact')}
                                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <Mail className="w-5 h-5" />
                                        <span>Send Email</span>
                                    </button>
                                    <div className="p-3">
                                        <div className="text-sm text-gray-500">Call us at</div>
                                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                                            <Phone className="w-4 h-4" />
                                            <span>+91 1800 123 4567</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="lg:w-3/4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {activeCategory === 'all' ? 'All Questions' :
                                        categories.find(c => c.id === activeCategory)?.label}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {filteredFaqs.length} questions found
                                    {searchQuery && ` for "${searchQuery}"`}
                                </p>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="space-y-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                                    <HelpCircle className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                            {categories.find(c => c.id === faq.category)?.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-blue-600 ml-4 flex-shrink-0">
                                                {openIndex === index ? (
                                                    <ChevronUp className="w-6 h-6" />
                                                ) : (
                                                    <ChevronDown className="w-6 h-6" />
                                                )}
                                            </div>
                                        </button>

                                        {openIndex === index && (
                                            <div className="px-6 pb-6">
                                                <div className="pl-14 border-t border-gray-100 pt-6">
                                                    <div className="prose prose-blue max-w-none">
                                                        <p className="text-gray-700">{faq.answer}</p>
                                                    </div>
                                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <CheckCircle className="w-4 h-4" />
                                                            <span>Verified Information</span>
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Last updated: Dec 2024
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                                    <div className="text-gray-400 mb-4">
                                        <HelpCircle className="w-16 h-16 mx-auto" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No questions found</h3>
                                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                                        {searchQuery
                                            ? `No results found for "${searchQuery}". Try different keywords.`
                                            : `No questions available in this category.`}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setActiveCategory('all');
                                        }}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        View All Questions
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Still Have Questions */}
                        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="md:w-2/3">
                                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                                    <p className="text-blue-100">
                                        Can&apos;t find the answer you're looking for? Our support team is here to help you 24/7.
                                    </p>
                                </div>
                                <div className="md:w-1/3">
                                    <button
                                        onClick={() => router.push('/contact')}
                                        className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                                    >
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Related Topics */}
                        <div className="mt-16">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Topics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { title: "Donation Process Guide", link: "/how-it-works" },
                                    { title: "Campaign Verification", link: "/transparency" },
                                    { title: "Tax Benefits (80G)", link: "/80g-certificate" },
                                    { title: "Payment Security", link: "/security" },
                                    { title: "Privacy Policy", link: "/privacy-policy" },
                                    { title: "Refund Policy", link: "/refund-policy" }
                                ].map((topic, index) => (
                                    <a
                                        key={index}
                                        href={topic.link}
                                        className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700 group-hover:text-blue-600">
                                                {topic.title}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}