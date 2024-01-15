import { createRelation } from "@directus/sdk";
import { destination } from "../directus";
import { readFromFile } from "../file-interactions";

export default async () => {
  const relations = readFromFile("relations.json");
  const a = relations.map((i) => {
    delete i.meta.id;
    return i;
  });
  await addRelations(a);
};

const addRelations = async (relations: any[]) => {
  for await (const relation of relations) {
    try {
      await destination.request(createRelation(relation));
    } catch (e) {
      console.log(e);
    }
  }
  return;
};
