import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Media",
  description: "Videos, photos, artwork and posters from Cherry Supreza.",
};

export default function MediaPage() {
  return (
    <>
      <PageIntro kicker="04 / Archive" title="Media" />
      <section className="container-site py-12">
        <div className="border-y border-bone/15 py-14">
          <p className="type-display text-title">The archive is still empty.</p>
          <p className="mt-3 font-serif text-2xl text-bone/80 italic">
            Videos, photos and posters will land here.
          </p>
        </div>
      </section>
    </>
  );
}
