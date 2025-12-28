export const getMonthName = (monthIndex) =>
  new Date(2000, monthIndex).toLocaleString("en-IN", {
    month: "long",
  });
