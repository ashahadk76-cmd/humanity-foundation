"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import jsPDF from "jspdf";
import { Suspense } from "react";
const PageContent = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Donor";
  const orderId = searchParams.get("orderId") || "—";
  const amount = searchParams.get("amount") || "—";
  const title = searchParams.get("title") || "Humanity Donation";

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Donation Receipt", 20, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Name: ${name}`, 20, 50);
    doc.text(`Campaign: ${title}`, 20, 60);
    doc.text(`Amount: ₹${amount}`, 20, 70);
    doc.text(`Order ID: ${orderId}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);

    doc.setFontSize(10);
    doc.text(
      "Thank you for supporting Humanity Charity.\nThis receipt is system generated.",
      20,
      115
    );

    doc.save(`Donation_Receipt_${orderId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Thank you, {name}
          </h1>

          <p className="mt-2 text-gray-500 text-sm">
            Your donation was successful.
          </p>

          {/* Receipt Card */}
          <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-sm text-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Campaign</span>
              <span className="font-medium">{title}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Amount</span>
              <span className="font-medium">₹{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono text-xs">{orderId}</span>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            A confirmation email has been sent to you.
          </p>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={downloadPDF}
              className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              Download Receipt (PDF)
            </button>

            <button
              onClick={() => window.location.href = "/"}
              className="w-full rounded-xl border py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
