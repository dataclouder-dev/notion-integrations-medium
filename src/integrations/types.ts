import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type ExportMediumResult = { db?: string; title?: string; mediumUrl?: string, description?: string };

export type DbEntries = { [key: string]: DatabaseObjectResponse[] };

// SelectColor Copied from notion since is not exported
export type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
