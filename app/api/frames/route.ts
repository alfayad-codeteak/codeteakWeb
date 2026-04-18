import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const PUBLIC_FRAMES_DIR = path.join(process.cwd(), "public", "frames");

export async function GET() {
  try {
    const entries = await fs.readdir(PUBLIC_FRAMES_DIR, { withFileTypes: true });
    const frameFiles = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => /\.(png|jpg|jpeg|webp|gif)$/i.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

    const frames = frameFiles.map((name) => `/frames/${name}`);
    return NextResponse.json({ frames });
  } catch {
    return NextResponse.json({ frames: [] });
  }
}
