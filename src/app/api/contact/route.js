import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// In-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

// Basic HTML sanitizer to prevent injection
function sanitize(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Rate Limiting Check
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW,
    );

    if (validTimestamps.length >= MAX_REQUESTS) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many requests. Please wait a few minutes before trying again.",
        },
        { status: 429 },
      );
    }

    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    const body = await req.json();
    const { name, email, topic, subject, message, _honeypot } = body;

    // 2. Honeypot Bot Trap Check
    if (_honeypot && String(_honeypot).trim().length > 0) {
      // Silently accept bot submission without processing
      return NextResponse.json({
        success: true,
        message:
          "Message sent! Thanks for reaching out. I'll get back to you soon.",
      });
    }

    // 3. Strict Validation
    if (!name || String(name).trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your name (minimum 2 characters).",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const allowedTopics = [
      "Job Opportunity",
      "Collaboration",
      "Project",
      "Freelance Work",
      "Other",
    ];

    if (!topic || !allowedTopics.includes(topic)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid topic." },
        { status: 400 },
      );
    }

    if (!message || String(message).trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a message (minimum 10 characters).",
        },
        { status: 400 },
      );
    }

    // 4. Sanitize data
    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim());
    const cleanTopic = sanitize(topic);
    const cleanSubject = sanitize(subject ? subject.trim() : "New Inquiry");
    const cleanMessage = sanitize(message.trim());

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "shudhanshukumar9713@gmail.com";

    // 5. Check if SMTP credentials exist in environment
    const smtpUser =
      process.env.EMAIL_USER || process.env.GMAIL_USER || process.env.SMTP_USER;
    const smtpPass =
      process.env.EMAIL_PASS ||
      process.env.GMAIL_APP_PASSWORD ||
      process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      // Production SMTP Dispatch via Nodemailer
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || "gmail",
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE === "false" ? false : true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${cleanName}" <${smtpUser}>`,
        replyTo: cleanEmail,
        to: receiverEmail,
        subject: `[Portfolio] ${cleanTopic}: ${cleanSubject}`,
        text: `New Portfolio Message\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nTopic: ${cleanTopic}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}\n\nSent at: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #14100c; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(254, 159, 10, 0.3);">
            <div style="background-color: #fe9f0a; padding: 20px 28px;">
              <h2 style="margin: 0; color: #14100c; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">New Message from Portfolio</h2>
            </div>
            <div style="padding: 28px;">
              <p style="margin: 0 0 16px; color: #d4d4d8; font-size: 15px;"><strong>From:</strong> ${cleanName} (<a href="mailto:${cleanEmail}" style="color: #fe9f0a; text-decoration: none;">${cleanEmail}</a>)</p>
              <p style="margin: 0 0 16px; color: #d4d4d8; font-size: 15px;"><strong>Topic:</strong> <span style="background: rgba(254, 159, 10, 0.15); color: #fe9f0a; padding: 4px 10px; border-radius: 999px; font-size: 13px; font-weight: 700;">${cleanTopic}</span></p>
              <p style="margin: 0 0 20px; color: #d4d4d8; font-size: 15px;"><strong>Subject:</strong> ${cleanSubject}</p>
              <div style="background-color: rgba(255, 255, 255, 0.04); border-left: 3px solid #fe9f0a; padding: 16px 20px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</p>
              </div>
              <p style="margin: 24px 0 0; color: #71717a; font-size: 12px;">Sent via Portfolio 2026 Contact Form on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      // Local / Development Fallback: Log inquiry safely & store to fallback messages directory
      console.log("=========================================");
      console.log("📥 NEW PORTFOLIO INQUIRY RECEIVED");
      console.log("From:   ", cleanName, `<${cleanEmail}>`);
      console.log("Topic:  ", cleanTopic);
      console.log("Subject:", cleanSubject);
      console.log("Message:", cleanMessage);
      console.log("Time:   ", new Date().toISOString());
      console.log(
        "Note: Set GMAIL_USER & GMAIL_APP_PASSWORD in .env.local for direct SMTP dispatch.",
      );
      console.log("=========================================");

      // Persist to local fallback inbox so messages are never lost
      try {
        const dataDir = path.join(process.cwd(), "src", "data");
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        const filePath = path.join(dataDir, "inquiries_log.json");
        let existing = [];
        if (fs.existsSync(filePath)) {
          try {
            existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
          } catch {
            existing = [];
          }
        }
        existing.push({
          id: Date.now(),
          name: cleanName,
          email: cleanEmail,
          topic: cleanTopic,
          subject: cleanSubject,
          message: cleanMessage,
          createdAt: new Date().toISOString(),
          ip,
        });
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
      } catch (logErr) {
        console.warn(
          "Could not save to local inquiries_log.json:",
          logErr.message,
        );
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Message sent! Thanks for reaching out. I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to send message right now. Please email directly at shudhanshukumar9713@gmail.com.",
      },
      { status: 500 },
    );
  }
}
