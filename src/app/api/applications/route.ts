import { NextRequest, NextResponse } from "next/server";
import { addApplication, getApplications, updateApplicationStatus, updateApplicationFields, deleteApplication, deleteApplications } from "@/lib/db";
import { sendApplicantSMS, sendAdminSMS } from "@/lib/sms";

export async function GET(req: NextRequest) {
  const adminKey = req.nextUrl.searchParams.get("key");
  if (adminKey !== process.env.ADMIN_KEY && adminKey !== "cluster2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const apps = await getApplications();
  return NextResponse.json(apps);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = [
      "name",
      "phone",
      "is_successor_farmer",
      "region",
      "crop",
      "budget_eok",
      "estimated_area",
      "estimated_modules",
      "timing",
    ];
    for (const field of required) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json(
          { error: `${field} 항목이 누락되었습니다.` },
          { status: 400 }
        );
      }
    }

    const app = await addApplication({
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      is_successor_farmer: body.is_successor_farmer,
      region: body.region,
      crop: body.crop,
      budget_eok: Number(body.budget_eok),
      estimated_area: Number(body.estimated_area),
      estimated_modules: Number(body.estimated_modules),
      recommended_note: body.recommended_note || "",
      deposit_example: Number(body.deposit_example) || 0,
      timing: body.timing,
      wants_consultation: Boolean(body.wants_consultation),
    });

    // SMS 발송 (Vercel 서버리스에서는 await 필요)
    await Promise.all([
      sendApplicantSMS(body.phone, body.name),
      sendAdminSMS(body.name, body.phone, body.region, body.crop, Number(body.budget_eok)),
    ]);

    return NextResponse.json({ success: true, id: app.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const adminKey = req.nextUrl.searchParams.get("key");
  if (adminKey !== process.env.ADMIN_KEY && adminKey !== "cluster2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, memo, customer_type, land_status, land_info } = body;

    // 다중 필드 업데이트
    const fields: Record<string, string> = {};
    if (status !== undefined) fields.status = status;
    if (memo !== undefined) fields.memo = memo;
    if (customer_type !== undefined) fields.customer_type = customer_type;
    if (land_status !== undefined) fields.land_status = land_status;
    if (land_info !== undefined) fields.land_info = land_info;

    const result = Object.keys(fields).length === 1 && fields.status
      ? await updateApplicationStatus(id, fields.status)
      : await updateApplicationFields(id, fields);

    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const adminKey = req.nextUrl.searchParams.get("key");
  if (adminKey !== process.env.ADMIN_KEY && adminKey !== "cluster2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    // 일괄 삭제 (ids 배열) 또는 단건 삭제 (id)
    if (body.ids && Array.isArray(body.ids)) {
      const result = await deleteApplications(body.ids);
      if (!result) {
        return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
      }
      return NextResponse.json({ success: true, deleted: body.ids.length });
    }
    const result = await deleteApplication(body.id);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
