#!/usr/bin/env node
import figlet from "figlet";
import { input } from "@inquirer/prompts";
import { createDirectus, rest, staticToken, readMe } from "@directus/sdk";
import select, { Separator } from "@inquirer/select";

console.log(figlet.textSync("Directus Schema Tools"));

const getUrl = async () => {
  const answer = await input({
    message: "Enter your Directus URL",
    default: "https://avcloudloader.directus.app",
  });
  return answer;
};

const getAuthToken = async () => {
  const answer = await input({
    message: "Enter your Directus Auth Token",
    default: "_J4xA5Zj-aFRjqljJ5xVdnDl6WVQJbKe",
  });
  return answer;
};

const getClient = async () => {
  try {
    const url = await getUrl();
    const authToken = await getAuthToken();
    const client = createDirectus(url)
      .with(staticToken(authToken))
      .with(rest());
    const response = await client.request(readMe());
    console.log(`Logged in as ${response.first_name} ${response.last_name}`);
    return client;
  } catch (error) {
    console.log("Invalid token, please try again");
    return getClient();
  }
};

const operation = await select({
  message: "Select an Operation",
  choices: [
    {
      name: "extract",
      value: "extract",
      description: "Extract Schema from existing project",
    },
    {
      name: "load",
      value: "load",
      description: "Load Schema into existing project",
    },
  ],
});
const client = await getClient();

if (operation === "extract") {
  const ex = (await import("./lib/extract/index.js")).default;
  await ex(client);
} else if (operation === "load") {
  const load = (await import("./lib/load/index.js")).default;
  await load(client);
}
