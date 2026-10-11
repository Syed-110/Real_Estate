import { NextResponse } from "next/server";
import { resetPropertiesInDb } from "@/lib/db";

// POST /api/properties/reset - Reset properties back to initial curated dataset
export async function POST() {
  try {
    const properties = await resetPropertiesInDb();
    return NextResponse.json({
      success: true,
      message: "Database reset to curated defaults",
      data: properties,
    });
  } catch (error) {
    console.error("POST /api/properties/reset error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset database" },
      { status: 500 }
    );
  }
}
