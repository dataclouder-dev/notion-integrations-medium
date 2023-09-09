import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type ExportMediumResult = { db?: string; title?: string; mediumUrl?: string, description?: string };

export type DbEntries = { [key: string]: DatabaseObjectResponse[] };

// SelectColor Copied from notion since is not exported
export type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";

export type MediumStory = {
    title: string;
    contentFormat: string;
    content: string;
    tags: string[];
    canonicalUrl?: string;
    publishStatus: string;
    license?: string;
    notifyFollowers?: boolean;
  };
  
  export type MediumStoryResponse = {
    id: string;
    title: string;
    authorId: string;
    tags: string[];
    url: string;
    canonicalUrl?: string;
    publishStatus: string;
    publishedAt: number;
    license?: string;
    notifyFollowers?: boolean;
  };