import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

export interface Post {
  metadata: {
    date: string;
    url: string;
    image?: string;
    excerpt: string;
    tags: string[];
  };
  slug: string;
  title: string;
  content: string;
}

export default function PostsService() {
  return {
    async getAll(): Promise<Post[]> {
      const PATH_POSTS = path.resolve(".", "_data", "posts");

      const postFiles = await fs.readdir(PATH_POSTS, { encoding: "utf-8" });

      const postsPromise = postFiles.map(async (postFileName) => {
        const filePath = path.join(PATH_POSTS, postFileName);
        const postFile = await fs.readFile(filePath, { encoding: "utf-8" });
        const { data, content } = matter(postFile);

        const post: Post = {
          metadata: {
            date: new Date(data.date).toISOString(),
            excerpt: data.excerpt,
            image: data?.image ?? "",
            tags: data.tags,
            url: data.url,
          },
          title: data.title,
          slug: data.slug,
          content,
        };

        console.log(post);
        return post;
      });

      const posts = await Promise.all(postsPromise);
      return posts;
    },
  };
}
