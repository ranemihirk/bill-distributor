import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "billsData.json");

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  const data = await fs.readFile(filePath, "utf8");
  return NextResponse.json({ success: true, data: data });
}

async function addBillData(){

}

async function updateBillData(){

}