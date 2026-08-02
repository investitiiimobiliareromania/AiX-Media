const romanianDateFormatter = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const romanianDateTimeFormatter = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = value instanceof Date ? value : new Date(value);

  if (options) {
    return new Intl.DateTimeFormat("ro-RO", options).format(date);
  }

  return romanianDateFormatter.format(date);
}

export function formatDateTime(value: string | number | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return romanianDateTimeFormatter.format(date);
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return "Sub 1 min";
  }

  return `${Math.ceil(minutes)} min citire`;
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
