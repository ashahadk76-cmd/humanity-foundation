import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectDB();

        const response = NextResponse.json({
            success: true,
            message: "Logout successful"
        }, { status: 200 })
        response.cookies.delete("token");
        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
}