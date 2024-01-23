import { RestClient, createCollection, updateCollection } from "@directus/sdk";
import { readFromFile } from "../file-interactions.js";

export const loadCollections = async (client: RestClient<any>) => {
  const collections = readFromFile("collections.json");

  const removedGroupKey = structuredClone(collections).map((col) => {
    delete col.meta.group;
    return col;
  });

  await addCollections(removedGroupKey, client);
  await updateCollections(collections, client);
};

const addCollections = async (collections: any[], client: RestClient<any>) => {
  const fields = readFromFile("fields.json");

  for await (const collection of collections) {
    collection.fields = fields.filter(
      (field: any) => field.collection === collection.collection
    );
    await client.request(createCollection(collection));
  }
  return;
};

const updateCollections = async (
  collections: any[],
  client: RestClient<any>
) => {
  for await (const collection of collections) {
    if (collection.meta.group) {
      const pl = {
        meta: {
          group: collection.meta.group,
        },
      };
      await client.request(updateCollection(collection.collection, pl));
    }
  }
};
