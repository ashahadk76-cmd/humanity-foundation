import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Subscriber from "@/model/Subscriber";
export async function GET() {
    try {
        await connectDB();
        const platformsubcribers = await Subscriber.find().sort({ createdAt: -1 })
            .select("email ip createdAt")
        return NextResponse.json({
            platformsubcribers,
            success: true,
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "subscriber failed to fetch"
        }, { status: 500 })
    }
}