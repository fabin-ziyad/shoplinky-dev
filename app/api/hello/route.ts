
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: Request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World this is new" }, { status: 200 });
}

export async function POST(request: Request) {
  // Do whatever you want
  const method = request.method
  const body = await request.json()
  console.log({method,body})
  return NextResponse.json({ message: "Hello World this is new" }, { status: 200 });
}