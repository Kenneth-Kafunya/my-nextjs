export const POST_QUERY = `
*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  publishedAt,
  tags,
  slug,
  author,
  authorWebsite,
  collaborators[]{
    role,
    person->{
      name,
      photo,
      portfolio,
      linkedin
    }
  },

  heroImage,
  subtitle,
  role,
  focusAreas,
  primaryMetric,
  sections[]{
    heading,
    content[]{
      ...,
      _type == "image" => {
        _type,
        asset->{url},
        caption
      },
      _type == "imageSlider" => {
        _type,
        images[]{
          asset->{url},
          caption
        }
      }
    }
  }
}
`;
