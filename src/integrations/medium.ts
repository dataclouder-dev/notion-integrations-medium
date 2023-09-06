import axios from "axios";

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

// {
//     "data": {
//       "id": "1230e24d6e38ca33f1ae6873ec4d8e3d5fc9c26aa0b7f1b58839aa16fee53f89e",
//       "username": "dataclouder",
//       "name": "Dataclouder Dev",
//       "url": "https://medium.com/@dataclouder",
//       "imageUrl": "https://cdn-images-1.medium.com/fit/c/400/400/0*n3sgmXqbKSziPIyK"
//     }
//   }

function get_headers(){
    const token = process.env.MEDIUM_TOKEN;
    return { Authorization: `Bearer ${token}` }
}

export async function getMediumUserId(): Promise<string> {

  const response = await axios.get("https://api.medium.com/v1/me", {headers: get_headers()});

  return response.data.data.id;
}

export async function createStory(userId: string, title: string, content: string, tags: string[]): Promise<MediumStoryResponse> {
  canonicalUrl: ""; // set notion public page.

  console.log("Creating story...");
  const story: MediumStory = {
    title,
    content,
    tags,
    publishStatus: "public",
    contentFormat: "html",
  };

  const response = await axios.post(
    `https://api.medium.com/v1/users/${userId}/posts`,
    story,
    {headers: get_headers()}
  );

  return response.data.data;
}
