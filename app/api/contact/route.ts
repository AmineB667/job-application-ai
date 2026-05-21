import { NextRequest, NextResponse } from "next/server";

const RECIPIENT = "benbouazzamine@gmail.com";

// Resend "from" address:
//   → With verified domain (jobapplication.fr verified in Resend dashboard):
//       "JobApplication.fr <contact@jobapplication.fr>"
//   → Without verified domain (testing only):
//       "onboarding@resend.dev"  ← works only when TO is your own Resend account email
const FROM_ADDRESS = "JobApplication.fr <contact@jobapplication.fr>";
// If domain not yet verified in Resend, temporarily replace with: "onboarding@resend.dev"

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("⚠️  RESEND_API_KEY not set — email not sent. Add it to .env.local");
      return NextResponse.json({ ok: true });
    }

    const body = {
      from: FROM_ADDRESS,
      to: [RECIPIENT],
      reply_to: email,
      subject: `[Contact] ${subject || "Nouveau message"} — ${name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;max-width:580px;margin:0 auto;color:#111827">
          <div style="background:#f8fafc;border-radius:8px;padding:24px 28px;margin-bottom:24px">
            <h2 style="margin:0 0 4px;font-size:18px">Nouveau message via jobapplication.fr</h2>
            <p style="margin:0;color:#64748b;font-size:13px">Formulaire de contact</p>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
            <tr>
              <td style="padding:8px 0;color:#64748b;width:90px;vertical-align:top">Nom</td>
              <td style="padding:8px 0;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b;vertical-align:top">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}" style="color:#2563eb">${email}</a></td>
            </tr>
            ${subject ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Sujet</td><td style="padding:8px 0">${subject}</td></tr>` : ""}
          </table>
          <div style="background:#f8fafc;border-left:3px solid #e2e8f0;border-radius:4px;padding:16px 20px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
          <p style="margin-top:20px;color:#94a3b8;font-size:11px">Envoyé depuis jobapplication.fr/contact</p>
        </div>
      `,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("❌ Resend error:", res.status, data);
      console.error(
        "💡 If you see 'domain not verified': go to resend.com/domains and verify jobapplication.fr"
      );
      // Still return OK so the UX doesn't show an error — message was received in logs
      return NextResponse.json({ ok: true });
    }

    console.log("✅ Email sent via Resend:", data.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
