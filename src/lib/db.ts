import fs from "fs";
import path from "path";
import { PROPERTIES, Property } from "@/data/properties";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "properties.json");

// Ensure data directory and database file exist
function initDb(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(PROPERTIES, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to initialize database file:", err);
  }
}

// Read all properties from DB
export async function getPropertiesFromDb(): Promise<Property[]> {
  initDb();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return PROPERTIES;
  } catch (err) {
    console.error("Error reading properties from database:", err);
    return PROPERTIES;
  }
}

// Write all properties to DB
async function writeAllProperties(list: Property[]): Promise<void> {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), "utf-8");
}

// Insert new property into DB
export async function insertPropertyIntoDb(newProp: Property): Promise<Property> {
  const current = await getPropertiesFromDb();
  // Prepend so newest appears first
  const updated = [newProp, ...current.filter((p) => p.id !== newProp.id)];
  await writeAllProperties(updated);
  return newProp;
}

// Update existing property in DB
export async function updatePropertyInDb(
  id: string,
  updates: Partial<Property>
): Promise<Property | null> {
  const current = await getPropertiesFromDb();
  let updatedItem: Property | null = null;

  const nextList = current.map((p) => {
    if (p.id === id) {
      updatedItem = { ...p, ...updates };
      return updatedItem;
    }
    return p;
  });

  if (updatedItem) {
    await writeAllProperties(nextList);
  }

  return updatedItem;
}

// Delete property from DB
export async function deletePropertyFromDb(id: string): Promise<boolean> {
  const current = await getPropertiesFromDb();
  const filtered = current.filter((p) => p.id !== id);
  if (filtered.length !== current.length) {
    await writeAllProperties(filtered);
    return true;
  }
  return false;
}

// Reset DB back to original curated properties
export async function resetPropertiesInDb(): Promise<Property[]> {
  initDb();
  await writeAllProperties(PROPERTIES);
  return PROPERTIES;
}
