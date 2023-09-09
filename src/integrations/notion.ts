import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPage } from "notion-page-to-html/dist/main/use-cases/notion-api-to-html";

import NotionPageToHtml from "notion-page-to-html";
import { DbEntries, MediumStatus, SelectColor } from "./types";

export async function getHtmlPage(publicUrl: string): Promise<NotionPage> {
  const notionHtmlPage = await NotionPageToHtml.convert(publicUrl);
  return notionHtmlPage;
}

export async function getEntriesReady(): Promise<DbEntries> {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });

  const databaseIds = (process.env.NOTION_DB_IDs as string).split(",");

  const dbEntries: DbEntries = {};

  const filter = { property: "Medium Status", select: { equals: "Ready" } };

  for (const databaseId of databaseIds) {
    await initPropertiesIsNeeded(databaseId);
    const response = await notionClient.databases.query({ database_id: databaseId, filter });
    dbEntries[databaseId] = (response.results || []) as DatabaseObjectResponse[];
  }

  return dbEntries;
}

export async function initPropertiesIsNeeded(dbId: string): Promise<void> {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });
  const notionDB = await notionClient.databases.retrieve({ database_id: dbId });
  console.log("notionDB", notionDB);
  if ("Medium Status" in notionDB.properties && "Published" in notionDB.properties) {
    console.log("DB is ready");
  } else {
    await addPropertiesToDatabase(dbId);
  }
}

export async function addPropertiesToDatabase(dbId: string) {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });

  const update = {
    properties: {
      Published: { date: {} },
      "Medium Status": {
        select: {
          options: [
            {
              name: "Draft",
              color: "red" as SelectColor,
            },
            {
              name: "Ready",
              color: "blue" as SelectColor,
            },
            {
              name: "Published",
              color: "green" as SelectColor,
            },
          ],
        },
      },
    },
  };

  const results = await notionClient.databases.update({ database_id: dbId, ...update });
  console.log("database property was updated", results);
}

export async function updateEntryStatus(entryId: string) {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });

  const properties = {
    Published: { date: { start: new Date().toISOString() } },
    "Medium Status": { select: { name: MediumStatus.Published } },
  };

  const results = notionClient.pages.update({ page_id: entryId, properties });
  console.log("database property was updated", results);

  return results;
}

export function get_multiselect_values(multiselect: any): string[] {
  console.log("multiselect", multiselect);
  const values = multiselect["multi_select"].map((item: any) => item.name);

  return values;
}
