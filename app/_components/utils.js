export function fmtDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long", //  values: 'long', 'short', 'narrow'
    year: "numeric", //  values: 'numeric', '2-digit'
    month: "short", //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: "numeric", //  values: 'numeric', '2-digit'
  });
}

export function fmtDateWithTime(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long", //  values: 'long', 'short', 'narrow'
    year: "numeric", //  values: 'numeric', '2-digit'
    month: "short", //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: "numeric", //  values: 'numeric', '2-digit'
    hour: "numeric", // values: 'numeric', '2-digit'
    minute: "numeric", // values: 'numeric', '2-digit'
  });
}
