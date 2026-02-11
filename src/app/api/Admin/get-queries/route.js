import { NextResponse } from "next/server";
import Contact from "@/model/Contact";
import connectDB from "@/db/connectDB";
export async function GET() {
    try {
        await connectDB();
        const contact = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json({
            contact,
            success: true,
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "internal error"
        }, { status: 500 })
    }
}