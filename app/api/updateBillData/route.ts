import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "billsData.json");

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  try {
    console.log("updateBillData");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    console.log("data: ", typeof data, data);
    const body = await request.json();
    console.log("body: ", body);
    if (body != null && data.bills) {
      // Using `some` (returns true/false)
      const exists = data.bills.some((bill) => bill.id === body.id);
      console.log(exists); // true
      let updateBillData;
      try {
        if (exists) {
          updateBillData = data.bills.map((bill) =>
            bill.id === body.id ? body : bill
          );
        } else {
          updateBillData = data.bills.push(body);
        }
        console.log("updateBillData: ", updateBillData);
        const newData = {
          bills: updateBillData,
        };
        await fs.writeFile(filePath, JSON.stringify(newData), "utf8");
        // file written successfully
      } catch (err) {
        console.error(err);
      }
    }

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
