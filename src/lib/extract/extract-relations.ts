import { type RestClient, readRelations } from "@directus/sdk";
import { writeToFile } from "../file-interactions.js";

export default async (client: RestClient<any>) => {
  const result = await client.request(readRelations());

  const out = result.filter((i) => !i.collection.startsWith("directus_"));
  writeToFile("relations.json", out);
};
