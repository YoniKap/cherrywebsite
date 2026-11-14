import { ShowList } from "@/components/shows/ShowList";
import { ShowsEmpty } from "@/components/shows/ShowsEmpty";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getShows } from "@/lib/content";
import { getToday } from "@/lib/today";

export async function UpcomingShows() {
  const { upcoming } = getShows(await getToday());

  return (
    <section aria-labelledby="shows-heading" className="container-site py-20 sm:py-28">
      <SectionHeading
        side="B"
        title="Next shows"
        id="shows-heading"
        href="/shows"
        linkLabel="All shows"
      />
      <div className="mt-10 reveal">
        {upcoming.length > 0 ? <ShowList shows={upcoming.slice(0, 3)} /> : <ShowsEmpty />}
      </div>
    </section>
  );
}
