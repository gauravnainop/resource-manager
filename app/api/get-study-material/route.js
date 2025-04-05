import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("resources");
    const qp = await db.collection("studymaterial").find({}).toArray();

    return NextResponse.json({ success: true, data: qp }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
