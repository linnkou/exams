function updatePreview() {
    const editor = document.getElementById('editor').value;
    const preview = document.getElementById('preview');
    preview.innerHTML = editor;
    MathJax.typesetPromise();
}

function exportPDF() {
    const element = document.getElementById('preview');
    html2pdf().from(element).save();
}
