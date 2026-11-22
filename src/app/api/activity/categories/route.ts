import sql from "@/lib/db";

export async function GET() {
  try {
    const categories = await sql`
      SELECT id, name, color FROM activity_categories ORDER BY name
    `;
    return Response.json(categories);
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, color } = await request.json();
    if (!name) return Response.json({ error: "name required" }, { status: 400 });

    // upsert
    const rows = await sql`
      INSERT INTO activity_categories (name, color)
      VALUES (${name.trim()}, ${color || "#888880"})
      ON CONFLICT (name) DO UPDATE SET color = EXCLUDED.color
      RETURNING id, name, color
    `;
    return Response.json(rows[0]);
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
