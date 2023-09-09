import axios from "axios";
import { MediumStory, MediumStoryResponse } from "./types";

function get_headers() {
  const token = process.env.MEDIUM_TOKEN;
  return { Authorization: `Bearer ${token}` };
}

export async function getMediumUserId(): Promise<string> {
  const response = await axios.get("https://api.medium.com/v1/me", { headers: get_headers() });

  return response.data.data.id;
}

export async function createStory(
  userId: string,
  title: string,
  content: string,
  canonicalUrl: string = "",
  tags: string[]
): Promise<MediumStoryResponse> {
  canonicalUrl: ""; // set notion public page.

  console.log("Creating story...");
  const story: MediumStory = { title, content, canonicalUrl, tags, publishStatus: "public", contentFormat: "html" };

  const response = await axios.post(`https://api.medium.com/v1/users/${userId}/posts`, story, { headers: get_headers() });

  return response.data.data;
}
