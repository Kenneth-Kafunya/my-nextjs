import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Footer from "@/components/footer";
import EmailLink from "@/components/EmailLink";

const POSTS_QUERY = `*[
  _type == "caseStudy"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, heroImage, publishedAt, subtitle,tags}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const [featured, ...rest] = posts;

  const dateFmt = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="hero-glow">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <Link
            href="/"
            className="flex items-center font-display text-sm font-semibold uppercase tracking-[0.25em]"
          >
            {/* <span className="inline-flex h-9 w-9 mr-3.5 items-center justify-center grayscale transition duration-300 hover:grayscale-0">
              {LogoIcon.logoIcon}
            </span> */}
            Kenneth Kafunya
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <EmailLink
              email="kennethkafunya@gmail.com"
              className="transition-colors py-2 px-3 border-2 rounded-full hover:text-foreground"
            >
              Contact me
            </EmailLink>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Product designer · Lusaka
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] md:text-7xl">
            Case studies on{" "}
            <span className="text-gradient">
              turning problems into products
            </span>{" "}
            people can use.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            In-depth stories covering the research, strategy, design decisions,
            and trade-offs behind each digital product I work on.
          </p>
        </section>
      </div>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-baseline justify-between border-b border-border pb-4">
          <h2 className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Selected work
          </h2>
          <span className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? "study" : "studies"}
          </span>
        </div>

        {featured && (
          <Link
            href={`/${featured.slug.current}`}
            className="group grid gap-8 overflow-hidden rounded-4xl border border-border bg-surface shadow-card md:grid-cols-2"
          >
            <div className="aspect-4/3 overflow-hidden md:aspect-auto md:h-full">
              {featured.heroImage && (
                <img
                  src={urlFor(featured.heroImage)
                    ?.width(1200)
                    .height(900)
                    .url()}
                  alt={featured.title}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <span className="w-fit rounded-full border-2 border-border px-3 py-2 text-xs text-muted-foreground">
                Latest
              </span>
              <h3 className="text-3xl font-bold md:text-4xl">
                {featured.title}
              </h3>

              {featured.subtitle && (
                <p className="text-base leading-relaxed text-muted-foreground">
                  {featured.subtitle}
                </p>
              )}

              {featured.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 px-3 py-1 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{dateFmt(featured.publishedAt)}</span>
                <span className="h-px w-8 bg-border" />
                <span className="text-foreground transition-transform group-hover:translate-x-1">
                  Read case study →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* grid */}
        <div className="mt-8 flex flex-col gap-8">
          {rest.map((post) => (
            <Link
              key={post._id}
              href={`/${post.slug.current}`}
              className="group grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/3 transition-transform duration-300 hover:-translate-y-1 md:grid-cols-2"
            >
              <div className="aspect-4/3 overflow-hidden md:aspect-auto md:h-full">
                {post.heroImage && (
                  <img
                    src={urlFor(post.heroImage)!
                      .width(1200)
                      .height(900)
                      .fit("crop")
                      .url()}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center gap-3 p-6 md:p-12">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {dateFmt(post.publishedAt)}
                </p>
                <h3 className="text-2xl font-semibold">{post.title}</h3>
                {post.subtitle && (
                  <p className="text-sm leading-relaxed text-white/60">
                    {post.subtitle}
                  </p>
                )}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="mt-2 text-sm text-foreground transition-transform group-hover:translate-x-1">
                  Read case study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
