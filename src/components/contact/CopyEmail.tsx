"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

/** Copies the address for people without a mail app set up. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the mailto link and visible address still work.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-ink/30 px-3 py-2 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:border-cherry hover:bg-cherry hover:text-bone"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
