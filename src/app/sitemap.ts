import { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "caseStudy"
  && defined(slug.current)
]{slug, publishedAt, _updatedAt}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(POSTS_QUERY);

  const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `https://blog.kennethkafunya.com/${post.slug.current}`,
    lastModified: post._updatedAt ?? post.publishedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://blog.kennethkafunya.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postEntries,
  ];
}
