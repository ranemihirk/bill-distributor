import { NextResponse } from "next/server";
import path from "path";
import { connectToRedis } from "./../../connector";

const filePath = path.join(process.cwd(), "data", "billsData.json");

export async function GET(request: Request) {
  try {
    connectToRedis();
    const data = { status: 200, message: "Connected to Redis." };
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch file data",
    });
  }
}
