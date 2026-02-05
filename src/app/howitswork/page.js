"use client";

import {
  Search,
  Target,
  Shield,
  BarChart3,
  CheckCircle,
  Users,
  Clock,
  FileText,
  Heart,
  ArrowRight,
  DollarSign,
  CreditCard,
  TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HowItWorksPage() {
  const router = useRouter();

  const steps = [
    {
      step: 1,
      icon: <Search className="w-8 h-8" />,
      title: "Browse Campaigns",
      description: "Explore our verified campaigns across various categories. Read stories, check progress, and find causes that resonate with you.",
      details: [
        "Filter by category (Medical, Education, Disaster Relief, etc.)",
        "View campaign details, images, and updates",
        "Check transparency reports and fund utilization"
      ]
    },
    {
      step: 2,
      icon: <Target className="w-8 h-8" />,
      title: "Select Amount",
      description: "Choose how much you want to contribute. Every donation, big or small, makes a significant impact.",
      details: [
        "Donate any amount starting from ₹10",
        "One-time or monthly recurring donations",
        "Tax-deductible donations under 80G"
      ]
    },
    {
      step: 3,
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description: "Complete your donation through our 100% secure payment gateway powered by Razorpay.",
      details: [
        "Bank-level SSL encryption",
        "Multiple payment options (Cards, UPI, Net Banking)",
        "Instant payment confirmation"
      ]
    },
    {
      step: 4,
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Impact",
      description: "Follow the campaign's progress and see exactly how your donation is making a difference.",
      details: [
        "Receive regular updates via email",
        "View fund utilization reports",
        "See beneficiary stories and photos"
      ]
    }
  ];

  const trustFeatures = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "100% Verified Campaigns",
      description: "Every campaign undergoes thorough verification and documentation checks."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Direct to Beneficiary",
      description: "Funds are transferred directly to hospitals, schools, or individuals in need."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Track every rupee with live progress updates and financial transparency."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "80G Tax Benefits",
      description: "Receive tax exemption certificates for all eligible donations."
    }
  ];

  const donationExamples = [
    { amount: "₹500", impact: "Feeds 5 children for a week" },
    { amount: "₹1,000", impact: "Provides school supplies for 2 students" },
    { amount: "₹2,500", impact: "Covers medical tests for 1 patient" },
    { amount: "₹5,000", impact: "Supports livelihood for 1 family" },
    { amount: "₹10,000", impact: "Funds emergency relief for disasters" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Transparent & Trusted Giving</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How It <span className="text-yellow-300">Works</span>
            </h1>

            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Your guide to making a meaningful impact through transparent, secure, and effective donations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Intro */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Simple Steps to Create Change
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From discovering a cause to seeing its impact, we&apos;ve made the donation process transparent,
            secure, and rewarding every step of the way.
          </p>
        </div>

        {/* Steps Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {step.step}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Transparency */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Trust Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards of transparency and accountability in every donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Examples */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Donation&apos;s Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how different amounts can create meaningful change in people&apos;s lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {donationExamples.map((example, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-3">{example.amount}</div>
                  <div className="text-sm text-gray-600">{example.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Process Timeline
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From donation to impact delivery, here&apos;s what happens behind the scenes.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-0">
              {[
                { day: "Day 1", title: "Donation Received", desc: "Your donation is securely processed and verified" },
                { day: "Day 2", title: "Funds Allocated", desc: "Money is transferred to the specific campaign" },
                { day: "Day 3-5", title: "Resource Procurement", desc: "Necessary items/services are purchased" },
                { day: "Day 6-10", title: "Beneficiary Support", desc: "Direct assistance provided to those in need" },
                { day: "Day 11-15", title: "Impact Report", desc: "Detailed report sent to you via email" }
              ].map((item, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="lg:w-1/2 lg:px-8 mb-6 lg:mb-0">
                    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="text-sm font-semibold text-blue-600 mb-2">{item.day}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>

                  <div className="lg:w-8 lg:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                  <div className="lg:w-1/2 lg:px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers about the donation process.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                q: "How do I know my donation is being used properly?",
                a: "We provide detailed financial reports, photos, and beneficiary stories for every campaign. You can track exactly how funds are utilized."
              },
              {
                q: "Is my payment information secure?",
                a: "Absolutely. We use bank-level SSL encryption and partner with Razorpay, India's leading payment gateway for secure transactions."
              },
              {
                q: "How do I get my 80G tax exemption certificate?",
                a: "Certificates are automatically emailed within 7-10 working days of your donation. You can also download them from your account dashboard."
              },
              {
                q: "Can I donate anonymously?",
                a: "Yes, you can choose to donate anonymously. Your contribution will still be counted but your details won't be publicly displayed."
              },
              {
                q: "What happens if a campaign doesn't reach its goal?",
                a: "Funds are still transferred to the beneficiary. If funds are insufficient for the original goal, we work to achieve the maximum impact possible."
              },
              {
                q: "How often will I receive updates?",
                a: "You'll receive immediate payment confirmation, weekly progress updates, and a final impact report when the campaign concludes."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of donors who are creating positive change through transparent giving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/campaigns")}
                className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-lg flex items-center justify-center gap-2"
              >
                Browse Campaigns
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push("/contact")}
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg"
              >
                Have Questions?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}