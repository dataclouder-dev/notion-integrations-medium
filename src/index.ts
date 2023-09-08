import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import * as notion from "./integrations/notion";
import * as medium from "./integrations/medium";
import { ExportMediumResult } from "./integrations/types";

dotenv.config();

export const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
  const dbEntries = await notion.getEntriesReady();

  const userId = await medium.getMediumUserId();
  const results: ExportMediumResult[] = [];

  for (const dbID of Object.keys(dbEntries)) {
    console.log(`Processing ${dbID}`);

    if(dbEntries[dbID].length === 0) {
      results.push({ description: `No entries to export`, db: dbID });
    }

    for (const entry of dbEntries[dbID]) {
      console.log(`Processing ${entry}`);
      try {
        const notionHtmlPage = await notion.getHtmlPage(entry.public_url as string);

        const postResult = await medium.createStory(userId, notionHtmlPage.title as string, notionHtmlPage.html, ["Dataclouder"]);
        results.push({
          description: `Story was published ${postResult.publishStatus}`,
          db: dbID,
          title: notionHtmlPage.title,
          mediumUrl: postResult.url,
        });
      } catch (e) {
        results.push({ description: `Error ${entry.title} - ${e}` });
      }
    }
  }

  res.send(results);
});

app.get("/test", async (req: Request, res: Response) => {
  console.log("Getting medium user id");
  notion.initPropertiesIsNeeded("1262c9f128f149108ece1d0916eb39c4");
  res.send("working");
});
