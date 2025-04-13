import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const user = await getDataFromToken(req)
    return NextResponse.json({
      data: user
    })
  } catch (error) {
    return NextResponse.json(
      {error: error.message},
      {status: 400}
    )
  }
}