import { POST_QUERY } from "@/sanity/queries";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import Footer from "@/components/footer";
import Section from "@/components/Section";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options,
  );

  if (!post) {
    return (
      <div className="error-container h-dvh flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-center">
          Post under maintenance or does not exist.
        </h1>
        <Link
          href="/"
          className="bg-gray-100 text-gray-950 rounded-full px-4 py-2 my-6 w-max"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const postImageUrl = post.heroImage
    ? urlFor(post.heroImage)?.width(1920).height(1280).format("webp").url()
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: post.title,
            datePublished: post.publishedAt,
            keywords: post.tags,
            author: {
              "@type": "Person",
              name: `${post.author}`,
            },
          }),
        }}
      />

      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-2">
        <Link
          href="/"
          className="hover:bg-gray-100 hover:text-gray-950 border-2 border-gray-300 rounded-full px-4 py-2 mb-4 w-max"
        >
          ← Back to Home
        </Link>

        <div className="prose">
          <p className="opacity-60">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>

        <h1 className="text-4xl font-bold leading-12">{post.title}</h1>
        <span>
          <a
            href={post.authorWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:underline cursor-pointer"
          >
            By {post.author}
          </a>
        </span>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-6 ">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="text-sm bg-gray-800 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className=" font-light leading-7">{post.subtitle}</p>

        <div className="mb-8 leading-8">
          <p>
            <span className="font-semibold">Role: </span>
            {post.role}
          </p>

          {post.collaborators?.length > 0 && (
            <div>
              <span className="font-semibold">Collaborators: </span>
              {post.collaborators.map(
                (
                  c: {
                    person: {
                      name: string;
                      portfolio?: string;
                      linkedin?: string;
                    };
                    role?: string;
                  },
                  i: number,
                ) => {
                  const url = c.person.portfolio || c.person.linkedin;
                  const nameWithRole = c.role
                    ? `${c.person.name} (${c.role})`
                    : c.person.name;
                  return (
                    <span key={c.person.name}>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {nameWithRole}
                        </a>
                      ) : (
                        <span>{nameWithRole}</span>
                      )}
                      {i < post.collaborators.length - 1 && ", "}
                    </span>
                  );
                },
              )}
            </div>
          )}

          <p>
            <span className="font-semibold">Focus Areas: </span>{" "}
            {post.focusAreas}
          </p>
          <p>
            <span className="font-semibold">Primary Metric: </span>
            {post.primaryMetric}
          </p>
        </div>

        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="rounded-xl w-full"
            height="310"
          />
        )}

        {/* Sections */}
        {post.sections?.map((section: any) => (
          <Section key={section._key} section={section} />
        ))}

        <Footer />
      </main>
    </>
  );
}
