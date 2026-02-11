import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Contact from "@/model/Contact";

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const delqueries = await Contact.findOneAndDelete(id);
        if (!delqueries) {
            return NextResponse.json({
                success: true,
                message: "query not found"
            }, { status: 400 })
        }
        if (delqueries) {
            return NextResponse.json({
                success: true,
                message: "Delete query successfully"
            }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "falid to query delete"
        }, { status: 500 })
    }
}