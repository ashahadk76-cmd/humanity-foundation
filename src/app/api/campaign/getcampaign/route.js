import { NextResponse } from "next/server";
import Campaign from "@/model/Campaign";
import connectDB from "@/db/connectDB";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        let campaigns;
        if (id) {
            campaigns = await Campaign.findById(id).lean();
        } else {
            campaigns = await Campaign.find({}).lean();
        }
        // const campaigns = await Campaign.find({}).populate('createdBy','name email');
        return NextResponse.json({ campaigns }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to fetch campaigns" }, { status: 500 });
    }
}