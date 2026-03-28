import { SolapiMessageService } from "solapi";

const ADMIN_PHONE = "01025576086";

function getMessageService() {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  if (!apiKey || !apiSecret) return null;
  return new SolapiMessageService(apiKey, apiSecret);
}

/** 신청자에게 접수 확인 문자 발송 */
export async function sendApplicantSMS(phone: string, name: string) {
  const sms = getMessageService();
  if (!sms) {
    console.warn("[SMS] 솔라피 키 미설정 — 신청자 문자 생략");
    return;
  }

  const from = process.env.SOLAPI_SENDER_PHONE;
  if (!from) {
    console.warn("[SMS] 발신번호 미설정 — 신청자 문자 생략");
    return;
  }

  try {
    await sms.sendOne({
      to: phone.replace(/-/g, ""),
      from,
      text: `[스마트팜 클러스터] ${name}님, 입주 희망 신청이 접수되었습니다. 검토 후 안내드리겠습니다. 감사합니다.`,
    });
    console.log(`[SMS] 신청자(${phone}) 문자 발송 완료`);
  } catch (err) {
    console.error("[SMS] 신청자 문자 발송 실패:", err);
  }
}

/** 관리자에게 새 신청 알림 문자 발송 */
export async function sendAdminSMS(name: string, phone: string, region: string, crop: string) {
  const sms = getMessageService();
  if (!sms) {
    console.warn("[SMS] 솔라피 키 미설정 — 관리자 문자 생략");
    return;
  }

  const from = process.env.SOLAPI_SENDER_PHONE;
  if (!from) {
    console.warn("[SMS] 발신번호 미설정 — 관리자 문자 생략");
    return;
  }

  try {
    await sms.sendOne({
      to: ADMIN_PHONE,
      from,
      text: `[새 입주신청] ${name}님 (${phone})\n지역: ${region} / 작목: ${crop}`,
    });
    console.log("[SMS] 관리자 알림 문자 발송 완료");
  } catch (err) {
    console.error("[SMS] 관리자 문자 발송 실패:", err);
  }
}
