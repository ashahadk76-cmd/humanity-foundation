"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ImageSlider from '@/components/ImageSlider'
import { Suspense } from 'react'
const PageContent = () => {
    const [campaignData, setCampaignData] = useState(null)
    const searchParams = useSearchParams()
    const campaignId = searchParams.get("id")

    useEffect(() => {
        if (!campaignId) return;
        fetch(`/api/campaign/getcampaign?id=${campaignId}`)
            .then((res) => res.json())
            .then((data) => setCampaignData(data.campaigns));
    }, [campaignId]);



    useEffect(() => {
        console.log("campaign data", campaignId)

    }, [])
    return (
        <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-32 ">
                {/* ---------- Image Slider ---------- */}
                <section>
                    <ImageSlider
                        media={campaignData?.media?.map((m) => m.url)}
                    />
                </section>

                {/* ---------- Campaign Content ---------- */}
                <section className="bg-white rounded-2xl shadow p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {campaignData?.title}
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        {campaignData?.description}
                    </p>

                    <div className="mt-6">
                        <p className="font-semibold">
                            Raised ₹{campaignData?.raisedAmount}
                        </p>
                        <p className="text-sm text-gray-500">
                            Target ₹{campaignData?.targetAmount}
                        </p>
                    </div>
                    <div className='py-3' >
                        <button onClick={() => window.location.href = `/donate?id=${campaignId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Donate Now
                        </button>
                    </div>
                </section>
            </main>
        )
    }

export default function page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">Loading...</div>}>
            <PageContent />
        </Suspense>
    )
}
