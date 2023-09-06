import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPage } from "notion-page-to-html/dist/main/use-cases/notion-api-to-html";

import NotionPageToHtml from 'notion-page-to-html';

const MIN_FREQUENCY = 55;

type DbEntries = {[key:string]: DatabaseObjectResponse[]} ;

export async function getHtmlPage(publicUrl: string) : Promise<NotionPage> {
    const notionHtmlPage = await NotionPageToHtml.convert(publicUrl);
    return notionHtmlPage;
  }


// not used yet
async function getBlockContent(entry:any) {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });
  const blocks = await notionClient.blocks.children.list({ block_id: entry.id});
  console.log(blocks);  
}


export async function getLatestEntries(): Promise<DbEntries> {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });

  const filterDate = getFilterDate();

  const filterCreated: any = {
    timestamp: "created_time",
    created_time: { on_or_after: filterDate },
  };

  const databaseIds = (process.env.NOTION_DB_IDs as string).split(",");

  const dbEntries: DbEntries = {};

  for (const databaseId of databaseIds) {
    const response = await notionClient.databases.query({database_id: databaseId,filter: filterCreated});
    dbEntries[databaseId] = (response.results || []) as DatabaseObjectResponse[];
  }

  return dbEntries
}

function getFilterDate(): string {
  const currentDate = new Date();
  const difference = currentDate.getMinutes() - MIN_FREQUENCY;
  currentDate.setMinutes(difference);
  const filterDate = currentDate.toISOString();
  return filterDate;
}

