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
