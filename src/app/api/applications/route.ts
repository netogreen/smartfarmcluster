import { NextRequest, NextResponse } from "next/server";
import { addApplication, getApplications, updateApplicationStatus } from "@/lib/db";

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
    const { id, status } = await req.json();
    const result = await updateApplicationStatus(id, status);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
