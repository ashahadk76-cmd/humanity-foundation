import connectDB from "@/db/connectDB";
import Admin from "@/model/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"; //

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json()
        const { email, password } = body
        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        const existingAdmin = await Admin.findOne({ email })

        if (!existingAdmin) {
            return NextResponse.json({
                success: false,
                message: "email password are required"
            }, { status: 400 })
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            existingAdmin.password,
        );

        if (!isPasswordMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid email and password"
            }, { status: 400 })
        }

        const token = jwt.sign(
            {
                email: existingAdmin.email,
                name: existingAdmin.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        const response = NextResponse.json({
            success: true,
            message: "Login successfull"
        }, { status: 200 })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",   // 🔥 ADD THIS
            maxAge: 60 * 60 * 24,
            path: "/",
        });


        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "internal server error"
        }, { status: 500 })
    }
}