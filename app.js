// تنسيق النص
function formatText(command, value = null) {
    document.execCommand(command, false, value);
}

// تغيير لون النص
function changeColor(color) {
    formatText('foreColor', color);
}

// إدراج معادلة
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

// إدراج جدول
function insertTable() {
    const rows = prompt("عدد الصفوف:");
    const cols = prompt("عدد الأعمدة:");
    if (rows && cols) {
        let table = '<table border="1">';
        for (let i = 0; i < rows; i++) {
            table += '<tr>';
            for (let j = 0; j < cols; j++) {
                table += `<td>${i + 1},${j + 1}</td>`;
            }
            table += '</tr>';
        }
        table += '</table>';
        document.getElementById('editor').innerHTML += table;
    }
}

// إدراج صورة
function insertImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('editor').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

// تصدير إلى PDF
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

// تصدير إلى TXT
function exportToTXT() {
    const content = document.getElementById('editor').innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.txt';
    a.click();
}

// تبديل الوضع الليلي
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('editor').classList.toggle('dark-mode');
}

// حفظ المحتوى تلقائيًا
document.getElementById("editor").addEventListener("input", function() {
    localStorage.setItem("editorContent", this.innerHTML);
});

// تحميل المحتوى المحفوظ عند التحميل
window.onload = function() {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
        document.getElementById("editor").innerHTML = savedContent;
        MathJax.typesetPromise(); // تحديث عرض المعادلات
    }
};
