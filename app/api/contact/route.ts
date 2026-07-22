import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Constants — Input Validation Limits                               */
/* ------------------------------------------------------------------ */
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/*  Simple In-Memory Rate Limiter (per serverless instance)           */
/* ------------------------------------------------------------------ */
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max requests per window
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

/* ------------------------------------------------------------------ */
/*  Validation helper                                                 */
/* ------------------------------------------------------------------ */
function validateString(
  value: unknown,
  fieldName: string,
  maxLength: number
): string | NextResponse {
  if (typeof value !== "string" || value.trim().length === 0) {
    return NextResponse.json(
      { error: `${fieldName} is required` },
      { status: 400 }
    );
  }
  if (value.length > maxLength) {
    return NextResponse.json(
      { error: `${fieldName} exceeds maximum length of ${maxLength}` },
      { status: 400 }
    );
  }
  return value.trim();
}

/* ------------------------------------------------------------------ */
/*  POST /api/contact                                                 */
/* ------------------------------------------------------------------ */
export async function POST(req: Request) {
  try {
    // --- Rate Limiting ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, token } = body;

    // --- Input Validation ---
    const validatedName = validateString(name, "Name", MAX_NAME);
    if (validatedName instanceof NextResponse) return validatedName;

    const validatedEmail = validateString(email, "Email", MAX_EMAIL);
    if (validatedEmail instanceof NextResponse) return validatedEmail;

    if (!EMAIL_REGEX.test(validatedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const validatedSubject = validateString(subject, "Subject", MAX_SUBJECT);
    if (validatedSubject instanceof NextResponse) return validatedSubject;

    const validatedMessage = validateString(message, "Message", MAX_MESSAGE);
    if (validatedMessage instanceof NextResponse) return validatedMessage;

    if (typeof token !== "string" || token.trim().length === 0) {
      return NextResponse.json(
        { error: "Captcha token is required" },
        { status: 400 }
      );
    }

    // --- Verify Turnstile Token ---
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY is not configured!");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

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

    // --- Log masked submission (no sensitive data exposed) ---
    const maskedEmail =
      validatedEmail.slice(0, 3) + "***@" + validatedEmail.split("@")[1];
    console.log("Contact form submission received:", {
      from: maskedEmail,
      subject: validatedSubject,
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
