import connectDB from "@/db/connectDB";
import Contact from "@/model/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();

        const { name, email, phone, message, contactType } = await req.json();

        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        await Contact.create({
            name,
            email,
            phone,
            message,
            contactType,
        });

        return NextResponse.json(
            { success: true, message: "Contact form submitted successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
