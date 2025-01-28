function insertMath() {
    const math = prompt("اكتب معادلتك بصيغة LaTeX:");
    if (math) {
        const editor = document.getElementById("editor");
        const mathContent = `\\(${math}\\)`;
        editor.innerHTML += mathContent;
        MathJax.typesetPromise(); // تحديث عرض المعادلات
    }
}

function exportToPDF() {
    const element = document.getElementById("editor");
    const opt = {
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}
