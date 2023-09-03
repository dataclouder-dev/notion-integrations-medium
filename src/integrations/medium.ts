import { Client } from "@notionhq/client";

const dotenv = require('dotenv');
dotenv.config();


export async function testConnection() {
    const notionClient = new Client({auth: process.env.NOTION_KEY});
    const databaseId = process.env.NOTION_KEY as string;
    const pageId = process.env.NOTION_PAGE_ID as string;

    console.log('token',process.env.NOTION_KEY ,'pageId', pageId);

    const data = await notionClient.databases.retrieve({database_id: databaseId});
    console.log('data', data);
}


