type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function getFromAddress(): string {
  const value = (process.env.RESEND_FROM_EMAIL ?? "").trim();
  if (value) {
    return value;
  }
  return "LeadNexa <no-reply@leadnexa.ai>";
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  const resendApiKey = (process.env.RESEND_API_KEY ?? "").trim();
  if (!resendApiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing RESEND_API_KEY in production.");
    }

    // Local fallback so developers can continue the flow without an email provider.
    console.info("[dev-email]", {
      to: input.to,
      subject: input.subject,
      text: input.text
    });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: getFromAddress(),
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Failed to send email: ${response.status} ${details}`.trim());
  }
}
