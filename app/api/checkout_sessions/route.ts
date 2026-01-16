import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const quantity = Number(body?.quantity ?? 0);

  if (!Number.isFinite(quantity) || quantity < 5) {
    return NextResponse.json(
      { error: "Minimum purchase is 5 AI Sales Executives." },
      { status: 400 }
    );
  }

  // TODO: Integrate Stripe server-side checkout session creation here.
  // Example: const session = await stripe.checkout.sessions.create(...)
  // Return the session URL for the client to redirect to.
  return NextResponse.json({ url: "/?checkout=stub" });
}

