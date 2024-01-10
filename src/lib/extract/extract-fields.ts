import { readCollections, readFields } from "@directus/sdk";
import { client } from "../directus";
import { writeToFile } from "../file-interactions";

export default async () => {
  const result = await client.request(readFields());

  const fields = result
    .filter(
      (i: { collection: string }) => !i.collection.startsWith("directus_")
    )
    .map((i) => {
      delete i.meta.id;
      return i;
    });

  writeToFile("fields.json", fields);
};
