function exportPDF() {
    const element = document.getElementById('editor');
    const content = element.innerHTML;

    const opt = {
        margin: 1,
        filename: 'document.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(content).set(opt).save();
}
