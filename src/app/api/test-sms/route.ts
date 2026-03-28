import { NextResponse } from "next/server";
import { SolapiMessageService } from "solapi";

export async function GET() {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const from = process.env.SOLAPI_SENDER_PHONE;

  // 환경변수 확인
  if (!apiKey || !apiSecret || !from) {
    return NextResponse.json({
      error: "환경변수 미설정",
      hasKey: !!apiKey,
      hasSecret: !!apiSecret,
      hasFrom: !!from,
    });
  }

  try {
    const sms = new SolapiMessageService(apiKey, apiSecret);
    const result = await sms.sendOne({
      to: "01025576086",
      from,
      text: "[Vercel 테스트] SMS 발송 테스트입니다.",
    });
    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message, raw: String(err) });
  }
}
