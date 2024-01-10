import { createDirectus, rest, staticToken } from "@directus/sdk";
import "dotenv/config";

export const destination = createDirectus(process.env.DEST_URL)
  .with(staticToken(process.env.DEST_TOKEN))
  .with(rest());

export const client = createDirectus(process.env.SOURCE_URL)
  .with(staticToken(process.env.SOURCE_TOKEN))
  .with(rest());
