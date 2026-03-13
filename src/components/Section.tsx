import { PortableText } from "@portabletext/react";
import ImageSlider from "./ImageSlider";

export default function Section({ section }: any) {
  const components = {
    types: {
      image: ({ value }: any) => (
        <figure className="my-8 max-sm:my-6">
          <img
            src={`${value.asset.url}?fm=webp&w=1920`}
            alt={value.caption || ""}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-400 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ),

      imageSlider: ({ value }: any) => <ImageSlider images={value.images} />,
    },
  };

  return (
    <section className="mb-6">
      {section.heading && (
        <h2 className="text-2xl font-semibold mb-6">{section.heading}</h2>
      )}
      <div className="prose prose-lg max-w-none">
        <PortableText value={section.content} components={components} />
      </div>
    </section>
  );
}
