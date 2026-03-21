import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ja", "vi", "en", "my", "id", "zh"],
  defaultLocale: "ja",
});
