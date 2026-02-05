import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ loggedIn: false }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.json({
            loggedIn: true,
            user: {
                email: decoded.email,
                name: decoded.name,
            },
        });
    } catch (error) {
        console.log("ME API ERROR:", error.message);
        return NextResponse.json({ loggedIn: false }, { status: 401 });
    }
}
