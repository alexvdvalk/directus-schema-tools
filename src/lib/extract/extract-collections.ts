import { RestClient, readCollections } from "@directus/sdk";
import { writeToFile } from "../file-interactions.js";

export default async (client: RestClient<any>) => {
  const result = await client.request(readCollections());
  const collections = result.filter(
    (i: { collection: string }) => !i.collection.startsWith("directus_")
  );
  writeToFile("collections.json", collections);
};
