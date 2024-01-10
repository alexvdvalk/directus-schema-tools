import { createCollection, updateCollection } from "@directus/sdk";
import { destination } from "../directus";
import { readFromFile } from "../file-interactions";

export const loadCollections = async () => {
  const collections = readFromFile("collections.json");

  const removedGroupKey = structuredClone(collections).map((col) => {
    delete col.meta.group;
    return col;
  });

  await addCollections(removedGroupKey);
  await updateCollections(collections);
};

const addCollections = async (collections: any[]) => {
  const fields = readFromFile("fields.json");

  for await (const collection of collections) {
    collection.fields = fields.filter(
      (field: any) => field.collection === collection.collection
    );
    await destination.request(createCollection(collection));
  }
  return;
};

const updateCollections = async (collections: any[]) => {
  for await (const collection of collections) {
    if (collection.meta.group) {
      const pl = {
        meta: {
          group: collection.meta.group,
        },
      };
      await destination.request(updateCollection(collection.collection, pl));
    }
  }
};
