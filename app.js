// تنسيق النص
function formatText(command) {
    document.execCommand(command, false, null);
}

// إدراج معادلة رياضية بصيغة LaTeX
function insertMath() {
    const math = prompt("اكتب معادلتك بصيغة LaTeX:");
    if (math) {
        const editor = document.getElementById("editor");
        const mathContent = `\\(${math}\\)`;
        editor.innerHTML += mathContent;
        MathJax.typesetPromise(); // تحديث عرض المعادلات
    }
}

// التصدير إلى PDF
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

// التبديل بين الوضع الداكن والمضيء
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("bg-gray-100");
    body.classList.toggle("bg-gray-900");
    body.classList.toggle("text-white");
}

// معاينة المعادلة
document.addEventListener("input", (event) => {
    if (event.target.id === "editor") {
        const preview = document.getElementById("latex-preview");
        preview.innerHTML = event.target.innerHTML;
        MathJax.typesetPromise(); // تحديث عرض المعاينة
    }
});
