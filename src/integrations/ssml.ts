import { Client } from "@notionhq/client";
import { BlockObjectResponse, DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPage } from "notion-page-to-html/dist/main/use-cases/notion-api-to-html";
import * as notion from "./notion";

import { ColorOptions } from "./types";

import NotionPageToHtml from "notion-page-to-html";
import { DbEntries, MediumStatus, SelectColor } from "./types";
import e from "express";
import { types } from "util";

// TODO poner un ejemplo de web page id
const notionPageId = "85fa7ec84f634f7db88f4ec9145158e1";

export async function getSsmlFromPage(pageId: string): Promise<void> {

    const pageBlocks = await notion.getPageBlocks(pageId);
    console.log("test", pageBlocks);

    const ssmlArray = pageBlocks.map( (block: any) => getTextFromBlock(block));

    let ssmlText = ssmlArray.join(" ");

    ssmlText = `<speak>${ssmlText}</speak>`

    console.log(ssmlText);
    return ssmlText;
}

export function getTextFromBlock(block: BlockObjectResponse): string {

    if (block.type === "paragraph") {
        if (block.paragraph.rich_text.length == 0) {
            return '<break time="300ms"/>'
        }
      
        const text = block.paragraph.rich_text.map((text) => {
            if (text.annotations.bold) {
                return `<emphasis level="strong">${text.plain_text}</emphasis>`;
            }
            if (text.annotations.color !=  ColorOptions.Default) {
                const options = getColorSettings(text.annotations.color as ColorOptions);
                return `<prosody rate="${options.rate}" pitch="${options.pitch}">${text.plain_text}</prosody>`
            }

            return text.plain_text;
        });
        return text.join(" ");
    } else {
        // Not supported other types
        return "";
    }
  
}

function getColorSettings(color: ColorOptions){
    const settings: Record<ColorOptions, { rate: number, pitch: number }> = {
        [ColorOptions.Default]: {rate: 0, pitch: 0},
        [ColorOptions.Gray]: { rate: 0.6, pitch: -15 },
        [ColorOptions.Brown]: { rate: 0.7, pitch: -12 },
        [ColorOptions.Orange]: { rate: 0.8, pitch: -8 },
        [ColorOptions.Yellow]: { rate: 0.9, pitch: -4 },
        [ColorOptions.Green]: { rate: 1, pitch: 1 },
        [ColorOptions.Blue]: { rate: 1, pitch: 5 },
        [ColorOptions.Purple]: { rate: 1.1, pitch: 9 },
        [ColorOptions.Pink]: { rate: 1.2, pitch: 12 },
        [ColorOptions.Red]: { rate: 1.3, pitch: 15 },
        [ColorOptions.GrayBackground]: { rate: 0.8, pitch: -7 },
        [ColorOptions.BrownBackground]: { rate: 0.9, pitch: -3 },
        [ColorOptions.OrangeBackground]: { rate: 1, pitch: 1 },
        [ColorOptions.YellowBackground]: { rate: 1.1, pitch: 5 },
        [ColorOptions.GreenBackground]: { rate: 1.2, pitch: 9 },
        [ColorOptions.BlueBackground]: { rate: 1.3, pitch: 12 },
        [ColorOptions.PurpleBackground]: { rate: 1.4, pitch: 15 },
        [ColorOptions.PinkBackground]: { rate: 1.5, pitch: 18 },
        [ColorOptions.RedBackground]: { rate: 1.6, pitch: 21 }
    }

    return settings[color];

    

}



