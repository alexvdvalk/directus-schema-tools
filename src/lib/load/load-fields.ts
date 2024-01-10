import { createField } from "@directus/sdk";
import { destination } from "../directus";
import { readFromFile } from "../file-interactions";

export default async () => {
  const fields = readFromFile("fields.json");

  await addFields(fields);
};

const addFields = async (fields: any[]) => {
  for await (const field of fields) {
    try {
      await destination.request(createField(field.collection, field));
    } catch (error) {
      console.log("error on field", field.field);
      console.log(error.errors[0].message);
    }
  }
};
