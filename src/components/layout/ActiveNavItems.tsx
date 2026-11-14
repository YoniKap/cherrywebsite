"use client";

import { usePathname } from "next/navigation";
import { NavItems } from "./NavItems";

export function ActiveNavItems() {
  return <NavItems pathname={usePathname()} />;
}
