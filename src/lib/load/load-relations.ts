import { RestClient, createRelation } from "@directus/sdk";
import { readFromFile } from "../file-interactions.js";

export default async (client: RestClient<any>) => {
  const relations = readFromFile("relations.json");
  const a = relations.map((i) => {
    delete i.meta.id;
    return i;
  });
  await addRelations(a, client);
};

const addRelations = async (relations: any[], client: RestClient<any>) => {
  for await (const relation of relations) {
    try {
      await client.request(createRelation(relation));
    } catch (e) {
      console.log(e);
    }
  }
  return;
};
