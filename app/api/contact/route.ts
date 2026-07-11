import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, token } = body;

    // Basic validation
    if (!name || !email || !subject || !message || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Default testing secret

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${turnstileSecret}&response=${token}`,
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      console.error("Turnstile verification failed:", verifyData);
      return NextResponse.json(
        { error: "Invalid captcha" },
        { status: 400 }
      );
    }

    // TODO: In a real production app, send email here via Resend, Nodemailer, etc.
    console.log("Contact form submission received:", {
      name,
      email,
      subject,
      message,
    });

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
