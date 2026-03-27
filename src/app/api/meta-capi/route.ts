import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = "2170436057052012";
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN || "";

export async function POST(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    console.warn("META_CAPI_TOKEN not set, skipping CAPI event");
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    const body = await req.json();
    const { event_name, event_id, event_time, user_data, custom_data } = body;

    const payload = {
      data: [
        {
          event_name,
          event_id,
          event_time: event_time || Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: body.event_source_url || "",
          user_data: user_data || {},
          custom_data: custom_data || {},
        },
      ],
    };

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Meta CAPI error:", err);
    return NextResponse.json({ ok: false, error: "CAPI failed" }, { status: 500 });
  }
}
