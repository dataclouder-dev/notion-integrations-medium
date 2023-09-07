import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import * as notion from "./integrations/notion";
import * as medium from "./integrations/medium";

dotenv.config();

export const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
  const dbEntries = await notion.getLatestEntries();

  type ExportMediumResult = {db: string, title?: string, mediumUrl: string};

  const userId = await medium.getMediumUserId();
  const results: ExportMediumResult[] = [];

  for (const dbID of Object.keys(dbEntries)) {
    console.log(`Processing ${dbID}` );
    
    for (const entry of dbEntries[dbID]) {

      console.log(`Processing ${entry}` );
      const notionHtmlPage = await notion.getHtmlPage(entry.public_url as string);

      const postResult = await medium.createStory(userId,
        notionHtmlPage.title as string,
        notionHtmlPage.html,
        ["Dataclouder"]
      );

      results.push({db: dbID, title: notionHtmlPage.title, mediumUrl: postResult.url});
    };
  }
  
  res.send(results);
});
