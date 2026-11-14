import Link from "next/link";
import { Doodle } from "@/components/ui/Doodle";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70dvh] flex-col justify-center py-24">
      <Doodle kind="snake" className="mb-10 w-64 sm:w-96" />
      <p className="type-kicker text-ash">Error 404</p>
      <h1 className="mt-4 max-w-[12ch] type-display text-headline">This page took a bad bet.</h1>
      <p className="mt-6 font-serif text-2xl text-bone/80 italic">
        It doesn&rsquo;t exist, or it moved.
      </p>
      <p className="mt-10 type-kicker">
        <Link href="/" className="link-wipe hover:text-mustard">
          ← Back to the start
        </Link>
      </p>
    </section>
  );
}
