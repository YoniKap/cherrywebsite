import { expect, test } from "@playwright/test";
import { NAV_ITEMS } from "../../src/lib/site";
import { ROUTES } from "./routes";

test.describe("routes", () => {
  for (const path of ROUTES) {
    test(`${path} renders with one h1`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("unknown pages return a branded 404", async ({ page }) => {
    const res = await page.goto("/nope-not-here");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("bad bet");
  });

  for (const slug of ["not-a-real-release"]) {
    test(`/music/${slug} is a real 404`, async ({ page }) => {
      const res = await page.goto(`/music/${slug}`);
      expect(res?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toContainText("bad bet");
    });
  }

  test("dev-only pages 404 in production", async ({ page }) => {
    const res = await page.goto("/dev/type");
    expect(res?.status()).toBe(404);
  });
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("skip link jumps to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });

  test("nav links route and mark the current page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("banner").getByRole("navigation", { name: "Main" });
    for (const item of NAV_ITEMS) {
      await nav.getByRole("link", { name: item.label }).click();
      await expect(page).toHaveURL(item.href);
      await expect(nav.getByRole("link", { name: item.label })).toHaveAttribute(
        "aria-current",
        "page",
      );
    }
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("is keyboard operable and keeps focus inside", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Menu" });
    await trigger.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();

    for (let i = 0; i < NAV_ITEMS.length + 2; i++) {
      await page.keyboard.press("Tab");
      const inside = await dialog.evaluate((el) => el.contains(document.activeElement));
      expect(inside, `focus escaped the menu after ${i + 1} tabs`).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("menu links navigate and close the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await dialog.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
  });
});
