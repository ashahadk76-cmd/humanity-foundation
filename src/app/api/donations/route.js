import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import Donations from "@/model/Donations";
import Razorpay from "razorpay";


export const POST = async (req) => {
    try {
        await connectDB();
        const { name, email, amount, campaignId } = await req.json();
        if (!name || !email) {
            return NextResponse.json({
                success: false,
                message: "Name and Email are required"
            }),
                { status: 400 }
        }
        if (!amount) {
            return NextResponse.json({
                success: false,
                message: "Amount is required"
            })
        }
        ///razor pay logic here///
        if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
            throw new Error("Razorpay keys are not set in environment variables");;
        }
        // Line 24 pe: "instace" → "instance"
        var instance = new Razorpay({  // ✅ CORRECT
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // Line 28 pe: "razordpayOrder" → "razorpayOrder"
        let razorpayOrder;  // ✅ CORRECT
        try {
            razorpayOrder = await instance.orders.create({
                amount: (amount * 100),
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            })
        } catch (error) {
            console.error("Razorpay order error:", error);
            return NextResponse.json({
                success: false,
                message: err.error?.description || "Payment gateway error"
            }, { status: 500 });

        }
        // save to database
        const donation = await Donations.create({
            name,
            email,
            amount,
            campaignId,
            razorpayOrderId: razorpayOrder.id
        })
        console.log("donation", donation);

        return NextResponse.json({
            success: true,
            message: "Donation successful",
            donation
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}


export async function GET(req) {
    try {
        await connectDB();
        const donations = await Donations.find({}); // sirf us user ke donations
        return NextResponse.json({ success: true, donations });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
