import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "billsData.json");

export async function GET(request: Request) {
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch file data",
    });
  }
}
