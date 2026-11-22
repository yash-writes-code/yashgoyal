export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ACTIVITY_ADMIN_PASSWORD;

    if (!adminPassword) {
      return Response.json({ error: "Admin password not configured" }, { status: 500 });
    }

    if (password !== adminPassword) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
