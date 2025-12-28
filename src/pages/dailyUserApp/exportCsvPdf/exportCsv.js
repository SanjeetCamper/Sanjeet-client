export const exportCsv = (rows, summary) => {
  const headers = [
    "Date",
    "Campers Given",
    "Rate",
    "Total Amount",
    "Paid",
    "Pending",
  ];

  const csvRows = rows.map((e) => [
    new Date(e.date || e.createdAt).toLocaleDateString("en-IN"),
    e.camperGiven || 0,
    e.rate || 0,
    e.totalAmount || 0,
    e.paymentReceived || 0,
    (e.totalAmount || 0) - (e.paymentReceived || 0),
  ]);

  const summaryRows = [
    [],
    ["SUMMARY"],
    ["Entries", summary.entries],
    ["Campers", summary.campers],
    ["Total", summary.total],
    ["Paid", summary.paid],
    ["Pending", summary.pending],
  ];

  const csv = [
    headers,
    ...csvRows,
    ...summaryRows,
  ]
    .map((r) => r.join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "report.csv";
  a.click();

  URL.revokeObjectURL(url);
};
