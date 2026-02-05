import connectDB from "@/db/connectDB";
import Admin from "@/model/Admin";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({
                message: "All fields are required"
            }, { status: 400 })
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json({
                message: "Admin already exists"
            }, { status: 400 })
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            email,
            password: hashedpassword
        })
        await newAdmin.save();
        return NextResponse.json({
            success: true,
            message: "Admin created successfully"
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            message: "internal server error "

        }, { status: 500 })
    }
}
