import type { Lang } from "../i18n"

// Formats a frontmatter date as e.g. "March 2021" / "mars 2021".
//
// Uses the year and month exactly as written in the date string, ignoring
// its UTC offset, so the result never depends on the timezone of the build
// machine or the reader's browser. (A post dated 2021-03-01T00:00+01:00 is a
// March post, even though it is still February in UTC.)
export function formatMonthYear(
  date: string | null | undefined,
  lang: Lang
): string {
  const match = /^(\d{4})-(\d{2})/.exec(date ?? "")
  if (!match) return ""
  const [, year, month] = match
  return new Intl.DateTimeFormat(lang, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(Date.UTC(Number(year), Number(month) - 1, 1))
}
