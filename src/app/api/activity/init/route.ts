import { initDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
