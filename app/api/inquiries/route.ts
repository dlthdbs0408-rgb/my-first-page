import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, contact, message } = await request.json().catch(() => ({}));

  const fields = [name, contact, message];
  if (fields.some((f) => typeof f !== "string" || !f.trim())) {
    return NextResponse.json({ error: "이름, 연락처, 내용을 모두 입력해 주세요." }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "서버 설정(.env)이 비어 있습니다." }, { status: 500 });
  }

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name: name.trim(), contact: contact.trim(), message: message.trim() }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Supabase insert failed:", res.status, detail);
    return NextResponse.json({ error: "저장에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
