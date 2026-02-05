import crypto from 'crypto';
import { NextResponse } from 'next/server';
import Donations from '@/model/Donations';
import connectDB from '@/db/connectDB';
import Campaign from '@/model/Campaign';


export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { orderId, paymentId, signature } = body;
        console.log("orderId", orderId);
        console.log("paymentId", paymentId);
        console.log("signature", signature);

        ////basic validation of signature////
        if (!orderId || !paymentId || !signature) {
            return NextResponse.json({
                success: true, message: "Invalid payment details"
            }, { status: 400 })
        }

        ///signature verification////
        const genratedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(String(orderId).trim() + '|' + String(paymentId).trim())
            .digest('hex');

        console.log("frontend signature:", signature);
        console.log("generated signature:", genratedSignature);

        console.log("orderId length", orderId.length, "paymentId length", paymentId.length);

        if (genratedSignature !== signature) {
            return NextResponse.json({
                success: false,
                message: "payment verification failed"
            }, { status: 400 })
        }

        // ✅ Order find karo aur payment status update karo
        const updatedOrder = await Donations.findOneAndUpdate(
            { razorpayOrderId: orderId },
            {
                paymentStatus: "paid"
                // orderStatus same rahega - "processing"
            },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({
                success: false,
                message: "Order not found"
            }, { status: 404 });
        }

        await Campaign.findByIdAndUpdate(
            updatedOrder.campaignId,
            { $inc: { raisedAmount: updatedOrder.amount } }
        );

        // // 📧 SEND RECEIPT EMAIL (safe)
        // ✅ Call receipt API
        let receiptSent = true;
        try {
            // Use relative path to call internal API and avoid relying on NEXT_PUBLIC_BASE_URL
            const base = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
            const receiptUrl = `${base.replace(/\/$/, '')}/api/senddonation-recipt`;
            const receiptRes = await fetch(receiptUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: updatedOrder.name,
                    email: updatedOrder.email,
                    amount: updatedOrder.amount,
                    orderId: updatedOrder.razorpayOrderId,
                    paymentId: paymentId,
                    campaignTitle: updatedOrder.campaignTitle,
                }),
            });
            if (!receiptRes.ok) {
                receiptSent = false;
                const text = await receiptRes.text();
                console.error('Receipt API failed:', receiptRes.status, text);
            }
        } catch (err) {
            receiptSent = false;
            console.error('Failed to send donation receipt:', err);
        }

        return NextResponse.json({
            success: true,
            message: `Payment verified successfully${receiptSent ? ' & receipt sent' : '; receipt send failed'}`,
            order: updatedOrder
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: err.message || "Internal Server Error"
        }, { status: 500 });
    }
}

