import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import * as notion from "./integrations/notion";
import * as medium from "./integrations/medium";
import { ExportResults, MediumStory } from "./integrations/types";

dotenv.config();

export const app: Express = express();

app.get("/", async (req: Request, res: Response) => {

  const dbEntries = await notion.getEntriesReady();

  const userId = await medium.getMediumUserId();
  const results: ExportResults = {};


  for (const dbID of Object.keys(dbEntries)) {

    results[dbID] = [];
    
    console.log(`Processing ${dbID}`);

    if (dbEntries[dbID].length === 0) {
      results[dbID] = [{ exported: false, description: `No entries to export`, db: dbID }];
      continue;
    }

    for (const entry of dbEntries[dbID]) {
      console.log(`Processing ${entry}`);
      try {
        const notionHtmlPage = await notion.getHtmlPage(entry.public_url as string);
        
        const tags = notion.get_multiselect_values(entry.properties["Tags"])

        const story: MediumStory = { title:notionHtmlPage.title as string, content: notionHtmlPage.html, 
          canonicalUrl: entry.public_url as string, 
          tags, 
          publishStatus: "public", 
          contentFormat: "html" };

        const postResult = await medium.createStory(userId, story);

        results[dbID].push({
          exported: true,
          description: `Medium Story Status ${postResult.publishStatus}`,
          db: dbID,
          title: notionHtmlPage.title,
          mediumUrl: postResult.url,
        });

        notion.updateEntryStatus(entry.id);

      } catch (e) {
        results[dbID].push({ exported: false, description: `Error ${entry.public_url} - ${e}` });
      }
    }
  }

  res.send(results);
});

