export function generateGenericPDF(title: string, excerpt: string, summary: string, filename: string): void {
  // Placeholder implementation: create a simple PDF Blob and trigger download.
  // In production, replace with proper PDF generation logic (e.g., pdf-lib or puppeteer).
  const content = `Title: ${title}\nExcerpt: ${excerpt}\nSummary: ${summary}`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
