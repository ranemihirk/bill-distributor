import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { fetchUserBills, setUserBills } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email"); // User email

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const data = await fetchUserBills(email);
    return NextResponse.json({ data: data ? data.message.data.json() : null });
  } catch (error) {
    console.error("Redis GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Redis" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, bills } = body;

    if (!user || bills === undefined) {
      return NextResponse.json(
        { error: "Missing user or bills" },
        { status: 400 }
      );
    }

    await setUserBills(user, bills);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis POST error:", error);
    return NextResponse.json(
      { error: "Failed to save data to Redis" },
      { status: 500 }
    );
  }
}
