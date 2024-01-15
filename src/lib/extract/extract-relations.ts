import { readRelations } from "@directus/sdk";
import { client } from "../directus";
import { writeToFile } from "../file-interactions";

export default async () => {
  const result = await client.request(readRelations());

  const out = result.filter((i) => !i.collection.startsWith("directus_"));
  writeToFile("relations.json", out);
};
