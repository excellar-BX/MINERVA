import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email } = body;

    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // TODO: Save to DB (e.g. Prisma) or send email notification
    // Example:
    // await prisma.bookingRequest.create({ data: { firstName, lastName, phone, email } });
    // or send via Resend/Nodemailer

    console.log("New booking request:", { firstName, lastName, phone, email });

    return NextResponse.json({ success: true, message: "Booking request received" }, { status: 200 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}