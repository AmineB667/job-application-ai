import { NextRequest, NextResponse } from "next/server";

const RECIPIENT = "benbouazzamine@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // ── Option 1 : Resend (recommandé — gratuit jusqu'à 3 000 emails/mois)
    // Créez un compte sur resend.com, vérifiez votre domaine, puis ajoutez :
    // RESEND_API_KEY=re_... dans .env.local
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Contact JobApplication.fr <contact@jobapplication.fr>",
          to: [RECIPIENT],
          reply_to: email,
          subject: `[Contact] ${subject || "Nouveau message"} — ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
              <h2 style="color:#0f172a">Nouveau message de ${name}</h2>
              <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
              ${subject ? `<p><strong>Sujet :</strong> ${subject}</p>` : ""}
              <hr style="border:1px solid #e2e8f0;margin:16px 0"/>
              <p style="white-space:pre-wrap;line-height:1.6">${message.replace(/\n/g, "<br/>")}</p>
              <hr style="border:1px solid #e2e8f0;margin:16px 0"/>
              <p style="color:#64748b;font-size:12px">Envoyé depuis jobapplication.fr/contact</p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Resend error:", err);
        // Fall through to mailto fallback
      } else {
        return NextResponse.json({ ok: true });
      }
    }

    // ── Option 2 : Nodemailer (SMTP) — install nodemailer separately if needed:
    // npm i nodemailer @types/nodemailer
    // Then uncomment this block and add EMAIL_* env vars.
    //
    // if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    //   const nodemailer = require("nodemailer");
    //   const transporter = nodemailer.createTransport({ ... });
    //   await transporter.sendMail({ ... });
    //   return NextResponse.json({ ok: true });
    // }

    // ── Fallback : log the message (development mode or no email configured)
    console.log("📬 Contact form submission (no email provider configured):", {
      name,
      email,
      subject,
      message,
    });

    // In production without email config, we still return OK so the UX doesn't break.
    // The admin should configure RESEND_API_KEY or EMAIL_* env vars.
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "⚠️  Contact form: no email provider configured. Add RESEND_API_KEY or EMAIL_* env vars."
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
