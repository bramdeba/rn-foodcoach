import Airtable from "airtable";
Airtable.configure({
  endpointUrl: process.env.AIRTABLE_API_URL,
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID || "");

export const fetchRecipes = async (maxRecords: number): Promise<Recipe[]> => {
  const recipes: Recipe[] = [];
  return new Promise((resolve, reject) => {
    base("Recipes")
      .select({
        maxRecords,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage: Function) {
          records.forEach((record) => {
            recipes.push(record._rawJson);
          });

          fetchNextPage();
        },
        function done(err: Error) {
          if (err) {
            reject(err);
            return;
          }
          resolve(recipes);
        }
      );
  });
};

export const fetchRandomPost = async (): Promise<Post> => {
  const posts = await base("Posts").select({ view: "Grid view" }).all();
  return posts[(posts.length * Math.random()) | 0]._rawJson;
};

export const fetchPost = async (postId: string): Promise<Post> => {
  const post = await base("Posts").find(postId);
  return post._rawJson;
};

export interface Recipe {
  id: string;
  createdTime: Date;
  fields: {
    ID: number;
    Name: string;
    Duration: number;
    Tags: string[];
    Image: {
      url: string;
      thumbnails: {
        large: {
          height: number;
          width: number;
          url: string;
        };
        small: {
          height: number;
          width: number;
          url: string;
        };
        full: {
          height: number;
          width: number;
          url: string;
        };
      };
    }[];
  };
}

export interface Post {
  id: string;
  createdTime: Date;
  fields: {
    ID: number;
    Title: string;
    CTA: string;
    Content: string;
  };
}
