import jsPDF from "jspdf";

export const exportPdf = (rows, summary) => {
  const doc = new jsPDF();

  let y = 10;
  doc.setFontSize(12);
  doc.text("Monthly Report", 10, y);

  y += 8;
  doc.setFontSize(10);
  doc.text(`Entries: ${summary.entries}`, 10, y); y += 6;
  doc.text(`Campers: ${summary.campers}`, 10, y); y += 6;
  doc.text(`Total: ₹ ${summary.total}`, 10, y); y += 6;
  doc.text(`Paid: ₹ ${summary.paid}`, 10, y); y += 6;
  doc.text(`Pending: ₹ ${summary.pending}`, 10, y); y += 10;

  doc.text("Date | Campers | Total | Paid | Pending", 10, y);
  y += 6;

  rows.forEach((e) => {
    if (y > 280) {
      doc.addPage();
      y = 10;
    }

    const line = [
      new Date(e.date || e.createdAt).toLocaleDateString("en-IN"),
      e.camperGiven || 0,
      e.totalAmount || 0,
      e.paymentReceived || 0,
      (e.totalAmount || 0) - (e.paymentReceived || 0),
    ].join(" | ");

    doc.text(line, 10, y);
    y += 6;
  });

  doc.save("report.pdf");
};
