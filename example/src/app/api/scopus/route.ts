import { api } from "@/utils/values";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token");

    const body = await req.json();
    
    const res = await fetch(`${api}content/search/scopus?query=${body.query}`, {
      headers: {
        'Accept': 'application/json',
        "X-ELS-APIKey": "2f7ee9a31424de6b6aa40c6d35c57f7a",
      },
    }).then((d) => d.json());
 
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
