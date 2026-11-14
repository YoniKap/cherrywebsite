import type { Metadata } from "next";
import { ShowList } from "@/components/shows/ShowList";
import { ShowsEmpty } from "@/components/shows/ShowsEmpty";
import { PageIntro } from "@/components/ui/PageIntro";
import { getShows } from "@/lib/content";
import { getToday } from "@/lib/today";

export const metadata: Metadata = {
  title: "Shows",
  description: "Upcoming and past Cherry Supreza shows.",
};

export default async function ShowsPage() {
  const { upcoming } = getShows(await getToday());

  return (
    <>
      <PageIntro kicker="Live" title="Shows" />

      <section aria-labelledby="upcoming-heading" className="container-site py-12">
        <h2 id="upcoming-heading" className="mb-6 type-kicker text-ash">
          Upcoming
        </h2>
        {upcoming.length > 0 ? <ShowList shows={upcoming} /> : <ShowsEmpty />}
      </section>
    </>
  );
}
