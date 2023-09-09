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


export async function createStory(userId: string, story: MediumStory): Promise<MediumStoryResponse> {
  console.log(`Creating story ${story.title}`);
  const response = await axios.post(`https://api.medium.com/v1/users/${userId}/posts`, story, { headers: get_headers() });

  return response.data.data;
}
