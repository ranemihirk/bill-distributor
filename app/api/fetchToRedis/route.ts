import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { MainBillProps } from "@/lib/types";
// import { setAndFetchFromRedis } from "@/libs/connector";

const filePath = path.join(process.cwd(), "data", "billsData.json");

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  try {
    const result = false; // setAndFetchFromRedis();
    const data = { status: 200, message: "SET and Fetch from Redis.", result };
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch file data",
    });
  }
}

async function addBillData() {}

async function updateBillData() {}
