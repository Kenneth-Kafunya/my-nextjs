import Link from "next/link";

type Post = {
  title: string;
  slug: string;
};

type Props = {
  previousPost?: Post | null;
  nextPost?: Post | null;
};

export default function ProjectNavigation({ previousPost, nextPost }: Props) {
  return (
    <div className="my-6 flex justify-between">
      {previousPost ? (
        <Link
          href={`/case-study/${previousPost.slug}`}
          className="text-blue-600"
        >
          ← Previous
        </Link>
      ) : (
        <div></div>
      )}

      {nextPost ? (
        <Link
          href={`/case-study/${nextPost.slug}`}
          className="text-blue-600 ml-auto"
        >
          Next →
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
