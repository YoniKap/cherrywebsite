import clsx from "clsx";

/** Hand-drawn-style cherries and snakes that echo the logo. Decorative only. */
const DOODLES = {
  cherry: { src: "/images/doodles/cherry.svg", width: 160, height: 204 },
  cherries: { src: "/images/doodles/cherries.svg", width: 240, height: 224 },
  snake: { src: "/images/doodles/snake.svg", width: 352, height: 116 },
} as const;

export type DoodleKind = keyof typeof DOODLES;

export function Doodle({ kind, className }: { kind: DoodleKind; className?: string }) {
  const d = DOODLES[kind];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed
    <img
      src={d.src}
      width={d.width}
      height={d.height}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={clsx("doodle pointer-events-auto h-auto select-none", className)}
    />
  );
}
