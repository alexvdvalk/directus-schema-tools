import { RestClient, readFields } from "@directus/sdk";
import { writeToFile } from "../file-interactions.js";

export default async (client: RestClient<any>) => {
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
