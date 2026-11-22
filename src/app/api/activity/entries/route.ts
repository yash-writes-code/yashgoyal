import sql from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // specific date lookup
    const range = searchParams.get("range") || "week";

    // --- single-date mode ---
    if (date) {
      const entries = await sql`
        SELECT
          e.id,
          e.date::text,
          e.productive_hours,
          e.activity,
          e.category_id,
          c.name  AS category,
          c.color AS category_color
        FROM activity_entries e
        JOIN activity_categories c ON e.category_id = c.id
        WHERE e.date = ${date}
        ORDER BY e.created_at ASC
      `;
      return Response.json({ entries });
    }

    // --- range mode ---
    let days = 7;
    if (range === "2weeks") days = 14;
    if (range === "month") days = 30;

    const dailyTotals = await sql`
      SELECT
        date::text,
        SUM(productive_hours) AS total_hours
      FROM activity_entries
      WHERE date >= CURRENT_DATE - ${days - 1} * INTERVAL '1 day'
      GROUP BY date
      ORDER BY date
    `;

    const categoryTotals = await sql`
      SELECT
        c.name,
        c.color,
        SUM(e.productive_hours) AS total_hours
      FROM activity_entries e
      JOIN activity_categories c ON e.category_id = c.id
      WHERE e.date >= CURRENT_DATE - ${days - 1} * INTERVAL '1 day'
      GROUP BY c.name, c.color
      ORDER BY total_hours DESC
    `;

    const entries = await sql`
      SELECT
        e.id,
        e.date::text,
        e.productive_hours,
        e.activity,
        e.category_id,
        c.name  AS category,
        c.color AS category_color
      FROM activity_entries e
      JOIN activity_categories c ON e.category_id = c.id
      WHERE e.date >= CURRENT_DATE - ${days - 1} * INTERVAL '1 day'
      ORDER BY e.date DESC, e.created_at DESC
    `;

    return Response.json({ dailyTotals, categoryTotals, entries });
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { date, productiveHours, activity, categoryId } = await request.json();

    if (!date || productiveHours == null || !activity || !categoryId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO activity_entries (date, productive_hours, activity, category_id)
      VALUES (${date}, ${productiveHours}, ${activity.trim()}, ${categoryId})
      RETURNING id, date::text, productive_hours, activity, category_id
    `;

    return Response.json(rows[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, productiveHours, activity, categoryId } = await request.json();
    if (!id) return Response.json({ error: "id required" }, { status: 400 });

    const rows = await sql`
      UPDATE activity_entries
      SET
        productive_hours = ${productiveHours},
        activity         = ${activity.trim()},
        category_id      = ${categoryId}
      WHERE id = ${id}
      RETURNING id, date::text, productive_hours, activity, category_id
    `;

    return Response.json(rows[0]);
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return Response.json({ error: "id required" }, { status: 400 });
    await sql`DELETE FROM activity_entries WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
