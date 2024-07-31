export function fmtDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long", //  values: 'long', 'short', 'narrow'
    year: "numeric", //  values: 'numeric', '2-digit'
    month: "short", //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: "numeric", //  values: 'numeric', '2-digit'
  });
}

export function fmtDateWithTime(date) {
  const parsedDate = new Date(date);
  const parsedDateYear = parsedDate.getFullYear();
  const currentYear = new Date().getFullYear();

  let dateOptions = {
    weekday: "short", //  values: 'long', 'short', 'narrow'
    month: "short", //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: "numeric", //  values: 'numeric', '2-digit'
    hour: "numeric", // values: 'numeric', '2-digit'
    minute: "numeric", // values: 'numeric', '2-digit'
  };

  if (currentYear !== currentYear) {
    dateOptions = { ...dateOptions, year: "numeric" };
  }

  return parsedDate.toLocaleDateString("en-US", dateOptions);
}

export function confirmAction(formAction, message = "Are you sure?") {
  return (...args) => {
    if (confirm(message)) {
      return formAction(...args);
    }
  };
}
