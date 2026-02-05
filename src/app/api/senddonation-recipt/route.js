import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, amount, orderId, paymentId, campaignTitle } = await req.json();

        if (!name || !email || !amount || !orderId || !paymentId) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Gmail App Password
            },
        });

        await transporter.sendMail({
            from: `"Humanity Charity" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Donation Successful – Receipt",
            html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6">
        <img src="https://www.oxfam.org.nz/wp-content/uploads/2019/06/Donation-Thank-You-From-Oxfam-New-Zealand.jpg" alt="Humanity Charity" style="width:150px ;"/>
          <h2>🙏 Thank You for Your Donation!</h2>
          <p>Hi <b>${name}</b>,</p>
          <p>Your donation has been received. Details:</p>
          <table style="border-collapse: collapse;">
            <tr><td><b>Amount:</b></td><td>₹${amount}</td></tr>
            <tr><td><b>Campaign:</b></td><td>${campaignTitle || "General Donation"}</td></tr>
            <tr><td><b>Order ID:</b></td><td>${orderId}</td></tr>
            <tr><td><b>Payment ID:</b></td><td>${paymentId}</td></tr>
            <tr><td><b>Date:</b></td><td>${new Date().toLocaleDateString()}</td></tr>
          </table>
          <p>Thanks for supporting us! 💙</p>
          <p>Regards,<br/><b>Humanity Charity Team</b></p>
        </div>
      `,
        });

        return NextResponse.json({ success: true, message: "Donation receipt sent successfully" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ success: false, message: err.message || "Internal Server Error" }, { status: 500 });
    }
}
