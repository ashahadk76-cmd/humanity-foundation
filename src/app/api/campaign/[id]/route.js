import { NextResponse } from "next/server";
import Campaign from "@/model/Campaign";
import connectDB from "@/db/connectDB";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret, // Click 'View API Keys' above to copy your API secret
});

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const deletedCampaign = await Campaign.findByIdAndDelete(id);
        if (!deletedCampaign) {
            return NextResponse.json({ success: true, message: "Campaign not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Campaign deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to delete campaign" }, { status: 500 });
    }
}


export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ success: false, message: "id not found" }, { status: 404 })
        }
        const campaign = await Campaign.findById(id)
        if (!campaign) {
            return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 401 })
        }
        return NextResponse.json({ success: true, campaign }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch campaign" }, { status: 500 })
    }
}




export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ success: false, message: "id not found" }, { status: 404 });
        }
        const data = await req.formData();
        const title = data.get("title");
        const description = data.get("description");
        const targetAmount = parseFloat(data.get("targetAmount"));
        const mediaFiles = data.getAll("media");
        const media = [];
        
        // yahan se logic start hoga Cloudinary ka 

        for (const file of mediaFiles) {
            if (!file || typeof file.arrayBuffer !== "function") continue; // safety

            const buffer = Buffer.from(await file.arrayBuffer()); // convert to buffer

            // Cloudinary upload
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "Donations",
                        resource_type: "auto", // image/video/pdf
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(buffer); // send file to cloudinary
            });

            // Push Cloudinary info to media array
            media.push({
                url: result.secure_url,    // frontend ke liye
                publicId: result.public_id // future delete ke liye
            });
        }

        // yahan tak logic hoga
        const deletedImages = JSON.parse(data.get("deletedImages") || "[]");

        for (const public_id of deletedImages) {
            await cloudinary.uploader.destroy(public_id);
        }

        const updateData = {}; // already initialized in STEP 3/4
        if (deletedImages.length > 0) {
            updateData.$pull = {
                media: { publicId: { $in: deletedImages } },
            };
        }
        // Add new media if exists
        if (media.length > 0) {
            updateData.$push = {
                media: { $each: media }, // multiple new images
            };
        }

        // Add/update text fields
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (!isNaN(targetAmount)) updateData.targetAmount = targetAmount;

        // Update DB
        const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document
        });

        if (!updatedCampaign) {
            return NextResponse.json(
                { success: false, message: "Campaign not found" },
                { status: 404 }
            );
        }

        // Return success + updated campaign
        return NextResponse.json(
            {
                success: true,
                message: "Campaign updated successfully",
                campaign: updatedCampaign,
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
