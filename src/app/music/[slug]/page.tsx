import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RELEASE_TYPE_LABEL, getReleaseBySlug, getReleases } from "@/lib/content";
import { formatDate } from "@/lib/dates";

export function generateStaticParams() {
  return getReleases().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/music/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};
  return {
    title: release.title,
    description: `${release.title} — ${RELEASE_TYPE_LABEL[release.type].toLowerCase()} by Cherry Supreza.`,
  };
}

// Phase 1 stub — artwork, links, credits and video arrive in Phase 3.
export default async function ReleasePage({ params }: PageProps<"/music/[slug]">) {
  // Unknown/draft slugs render not-found + noindex. Under Cache Components the
  // shared shell has already streamed, so the HTTP status stays 200 (soft 404).
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) notFound();

  return (
    <article className="container-site pt-14 sm:pt-24">
      <p className="type-kicker text-ash">
        <Link href="/music" className="link-wipe hover:text-bone">
          ← Music
        </Link>
      </p>
      <h1 className="mt-6 type-display text-headline">{release.title}</h1>
      <p className="mt-6 type-kicker text-ash">
        {RELEASE_TYPE_LABEL[release.type]}
        {release.releaseDate && (
          <>
            {" · "}
            <time dateTime={release.releaseDate}>{formatDate(release.releaseDate)}</time>
          </>
        )}
      </p>
    </article>
  );
}
