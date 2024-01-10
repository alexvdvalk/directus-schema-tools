import { readCollections } from "@directus/sdk";
import { client } from "../directus";
import { writeToFile } from "../file-interactions";

export default async () => {
  const result = await client.request(readCollections());
  const collections = result.filter(
    (i: { collection: string }) => !i.collection.startsWith("directus_")
  );
  writeToFile("collections.json", collections);
};
