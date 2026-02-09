import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Subscriber from "@/model/Subscriber";

export async function POST(req) {
    try {
        await connectDB();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }
        const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase().trim() });
        if (existingSubscriber) {
            return NextResponse.json({ success: false, message: "Email is already subscribed" }, { status: 400 });
        }
        const newSubscriber = new Subscriber({
            email: email.toLowerCase().trim(),
            ip: req.headers.get("x-forwarded-for")
        });
        await newSubscriber.save();
        return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" },
            { status: 500 });
    }
}