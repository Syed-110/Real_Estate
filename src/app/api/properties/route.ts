import { NextRequest, NextResponse } from "next/server";
import {
  getPropertiesFromDb,
  insertPropertyIntoDb,
  updatePropertyInDb,
  deletePropertyFromDb,
} from "@/lib/db";
import { Property } from "@/data/properties";

// GET /api/properties - Fetch all properties from DB
export async function GET() {
  try {
    const properties = await getPropertiesFromDb();
    return NextResponse.json({
      success: true,
      data: properties,
      count: properties.length,
    });
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch properties from database" },
      { status: 500 }
    );
  }
}

// POST /api/properties - Add a new property into DB
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !body.title) {
      return NextResponse.json(
        { success: false, error: "Invalid property data" },
        { status: 400 }
      );
    }

    const newProperty: Property = {
      ...body,
      id: body.id || `prop-${Date.now()}`,
      status: body.status || "active",
      formattedPrice: body.formattedPrice || `₹${(body.price / 100000).toFixed(0)} Lakh`,
    };

    const inserted = await insertPropertyIntoDb(newProperty);

    return NextResponse.json({
      success: true,
      message: "Property created successfully in database",
      data: inserted,
    });
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to insert property into database" },
      { status: 500 }
    );
  }
}

// PATCH /api/properties - Update an existing property or its status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing property ID" },
        { status: 400 }
      );
    }

    const updated = await updatePropertyInDb(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property updated successfully in database",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update property in database" },
      { status: 500 }
    );
  }
}

// DELETE /api/properties?id=... - Delete property from DB
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing property ID" },
        { status: 400 }
      );
    }

    const deleted = await deletePropertyFromDb(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property deleted from database",
    });
  } catch (error) {
    console.error("DELETE /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete property from database" },
      { status: 500 }
    );
  }
}
