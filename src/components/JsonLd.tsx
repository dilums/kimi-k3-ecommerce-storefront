import type { JsonLdData } from "@/lib/seo";

/** Renders structured data. `<` is escaped so JSON can't break out of the tag. */
export default function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
