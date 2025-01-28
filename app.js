function insertMath() {
    const math = prompt("اكتب معادلتك بصيغة LaTeX:");
    if (math) {
        try {
            const editor = document.getElementById("editor");
            const mathContent = `\\(${math}\\)`;
            editor.innerHTML += mathContent;
            MathJax.typesetPromise(); // تحديث عرض المعادلات
        } catch (error) {
            alert("حدث خطأ أثناء إدراج المعادلة. يرجى التحقق من صيغة LaTeX.");
        }
    }
}

function exportToPDF() {
    const element = document.getElementById("editor");
    if (element.innerText.trim() === "") {
        alert("المحرر فارغ. يرجى إضافة محتوى قبل التصدير إلى PDF.");
        return;
    }
    const opt = {
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}

function undo() {
    const editor = document.getElementById("editor");
    editor.innerHTML = editor.innerHTML.slice(0, editor.innerHTML.lastIndexOf("<"));
    MathJax.typesetPromise(); // تحديث عرض المعادلات
}
