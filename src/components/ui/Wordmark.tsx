import clsx from "clsx";

/**
 * Typographic placeholder until the real C-cherry / S-snake mark is supplied.
 * Swap the inner markup for the SVG logo; keep the accessible name.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Cherry Supreza"
      className={clsx("inline-block type-poster leading-none whitespace-nowrap", className)}
    >
      <span aria-hidden="true">
        Cherry <span className="italic">Supreza</span>
      </span>
    </span>
  );
}
