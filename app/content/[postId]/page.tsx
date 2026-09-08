import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetail from "@/components/pages/PostDetail";
import JsonLd from "@/components/JsonLd";
import { postBySlug, posts } from "@/data/content";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Params = Promise<{ postId: string }>;

export function generateStaticParams() {
  return posts.map((p) => ({ postId: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { postId } = await params;
  const post = postBySlug(postId);
  if (!post) return { title: "Essay Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/content/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — Aurelle Journal`,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { postId } = await params;
  const post = postBySlug(postId);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "The Journal", path: "/content" },
            { name: post.title, path: `/content/${post.slug}` },
          ]),
        ]}
      />
      <PostDetail postId={post.slug} />
    </>
  );
}
