import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import Footer from "@/components/footer";

const POST_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0]`;

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
  const postImageUrl = post.heroImage
    ? urlFor(post.heroImage)?.width(1920).height(1280).format("webp").url()
    : null;

  const solution = post.solutionSections;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
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

      <p className=" font-light leading-7">{post.subtitle}</p>

      <div className="mb-8 leading-8">
        <p>
          <span className="font-semibold">Role: </span>
          {post.role}
        </p>
        <p>
          <span className="font-semibold">Focus Areas: </span> {post.focusAreas}
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
      <section className="mt-12 max-sm:mt-8">
        <PortableText
          value={post.context}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-4">{children}</h2>
              ),
              normal: ({ children }) => <p className="leading-7">{children}</p>,
            },
          }}
        />
      </section>

      <section className="mt-12 max-sm:mt-8">
        <PortableText
          value={post.problem}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-4">{children}</h2>
              ),
              normal: ({ children }) => <p className="leading-7">{children}</p>,
            },
            types: {
              image: ({ value }) => {
                const imageUrl = urlFor(value)
                  ?.width(1920)
                  .format("webp")
                  .url();
                return imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Post image"
                    className=" rounded-xl w-full"
                    height={310}
                  />
                ) : null;
              },
            },
          }}
        />
      </section>

      <section className="mt-6 max-sm:mt-4">
        <PortableText
          value={post.research}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-4">{children}</h2>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-semibold my-2 last-of-type:mt-7">
                  {children}
                </h4>
              ),
              normal: ({ children }) => (
                <p className="leading-7 mb-4">{children}</p>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc pl-8 space-y-2">{children}</ul>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li>{children}</li>,
            },
            types: {
              image: ({ value }) => {
                const imageUrl = urlFor(value)
                  ?.width(1920)
                  .format("webp")
                  .url();
                return imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Post image"
                    className="rounded-2xl w-full my-12 max-sm:my-6"
                    height={310}
                  />
                ) : null;
              },
            },
          }}
        />
      </section>

      <section className="mt-12 max-sm:mt-8">
        <PortableText
          value={post.strategy}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-4">{children}</h2>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-semibold my-2 last-of-type:mt-7">
                  {children}
                </h4>
              ),
              normal: ({ children }) => (
                <p className="mb-4 leading-7">{children}</p>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc pl-8 space-y-2">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal pl-8 space-y-2">{children}</ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li>{children}</li>,
              number: ({ children }) => <li>{children}</li>,
            },
            types: {
              image: ({ value }) => {
                const imageUrl = urlFor(value)
                  ?.width(1920)
                  .format("webp")
                  .url();
                return imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Post image"
                    className="rounded-2xl w-full my-12 max-sm:my-7"
                    height={310}
                  />
                ) : null;
              },
            },
          }}
        />
      </section>

      <section className="mt-5 max-sm:mt-0">
        {solution.map((section: any, index: number) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-bold ">{section.title}</h2>
            <PortableText
              value={section.content}
              components={{
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-8 space-y-2 mt-2">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal pl-8 space-y-2 mt-2">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li>{children}</li>,
                  number: ({ children }) => <li>{children}</li>,
                },

                block: {
                  h4: ({ children }) => (
                    <h4 className="text-lg font-semibold mt-6">{children}</h4>
                  ),
                  normal: ({ children }) => (
                    <p className="leading-7 mb-4">{children}</p>
                  ),
                },

                types: {
                  image: ({ value }) => {
                    const imageUrl = urlFor(value)
                      ?.width(1920)
                      .format("webp")
                      .url();
                    return imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Post image"
                        className="rounded-2xl w-full my-12 max-sm:my-6"
                        height={310}
                      />
                    ) : null;
                  },
                },
              }}
            />
          </div>
        ))}
      </section>

      <section className="mt-2 max-sm:mt-0">
        <PortableText
          value={post.reflection}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold my-2">{children}</h2>
              ),

              normal: ({ children }) => (
                <p className="leading-7 mb-4">{children}</p>
              ),
            },
          }}
        />
      </section>
      <div>
        <Footer />
      </div>
    </main>
  );
}
