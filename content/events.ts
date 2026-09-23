export type Performance = { id: string; date: string; title: string; venue: string; city: string; access: string; url: string; time?: string; age?: string };
export const performances: Performance[] = [
  ["2026-11-13", "novembre"],
  ["2026-12-11", "decembre"],
  ["2027-01-15", "janvier"],
  ["2027-03-05", "mars"],
  ["2027-04-30", "avril"],
].map(([date, id]) => ({
  id, date, title: "Paillettes & Pavés", venue: "MPT – Salle des Rancy", city: "Lyon",
  access: "Prix libre", url: "https://www.lesrancy.fr/evenements/paillettes-et-paves/",
}));
export function splitPerformances(items: Performance[], today: string) {
  const ordered = [...items].sort((a, b) => a.date.localeCompare(b.date));
  return { upcoming: ordered.filter(e => e.date >= today), past: ordered.filter(e => e.date < today).reverse() };
}
export function parisToday() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
