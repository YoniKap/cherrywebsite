import { BandStrip } from "@/components/home/BandStrip";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { Hero } from "@/components/home/Hero";
import { LatestVisual } from "@/components/home/LatestVisual";
import { UpcomingShows } from "@/components/home/UpcomingShows";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedRelease />
      <UpcomingShows />
      <BandStrip />
      <LatestVisual />
    </>
  );
}
