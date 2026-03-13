import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { LogoIcon } from "@/components/IconMap";

import { client } from "@/sanity/client";
import Footer from "@/components/footer";

const POSTS_QUERY = `*[
  _type == "caseStudy"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, heroImage, publishedAt}`;

// helper for generating Sanity image URLs
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      <main className="container min-h-dvh max-w-3xl p-8 gap-6 flex flex-col mx-auto max-sm:justify-center">
        <div className="header flex justify-between">
          <h1 className="text-4xl font-bold mb-8">Home</h1>
          <span>{LogoIcon.logoIcon}</span>
        </div>
        <div className="my-posts-container flex justify-center gap-12 max-sm:flex max-sm:flex-col max-sm:w-[80%]">
          {posts.map((post) => {
            const imageUrl = post.heroImage
              ? urlFor(post.heroImage)?.width(800).height(550).url()
              : null;

            return (
              <div key={post._id} className="mb-8 w-75 max-sm:w-full">
                <Link href={`/${post.slug.current}`}>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="rounded-t-2xl w-full"
                    />
                  )}
                </Link>

                <ul className="flex flex-col gap-y-4 bg-gray-700 p-4 pb-6 rounded-b-2xl">
                  <li className="hover:underline" key={post._id}>
                    <Link href={`/${post.slug.current}`}>
                      <p className="opacity-60 py-2">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                      <h2 className="text-xl font-semibold max-sm:text-xl">
                        {post.title}
                      </h2>
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
