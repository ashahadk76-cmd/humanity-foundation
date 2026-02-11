import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Subscriber from "@/model/Subscriber";

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const deletesubscribers = await Subscriber.findByIdAndDelete(id)
        if (!deletesubscribers) {
            return NextResponse.json({
                success: true,
                message: "id not found"
            }, { status: 401 })
        }

        if (deletesubscribers) {
            return NextResponse.json({
                success: true,
                message: "Delete successfully"
            }, { status: 200 })
        }


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "server error"
        }, { status: 500 })
    }

}