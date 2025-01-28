// تنسيق النص
function formatText(command, value = null) {
    const selection = window.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : document.createRange();
    const newNode = document.createElement(command === 'insertOrderedList' || command === 'insertUnorderedList' ? 'ul' : 'span');

    if (command === 'bold') {
        newNode.style.fontWeight = 'bold';
    } else if (command === 'italic') {
        newNode.style.fontStyle = 'italic';
    } else if (command === 'underline') {
        newNode.style.textDecoration = 'underline';
    } else if (command === 'foreColor') {
        newNode.style.color = value;
    } else if (command === 'fontSize') {
        newNode.style.fontSize = value;
    } else if (command === 'fontName') {
        newNode.style.fontFamily = value;
    } else if (command === 'justifyLeft') {
        newNode.style.textAlign = 'left';
    } else if (command === 'justifyCenter') {
        newNode.style.textAlign = 'center';
    } else if (command === 'justifyRight') {
        newNode.style.textAlign = 'right';
    } else if (command === 'insertOrderedList') {
        newNode.tagName = 'ol';
    } else if (command === 'insertUnorderedList') {
        newNode.tagName = 'ul';
    }

    range.deleteContents();
    range.insertNode(newNode);
    selection.removeAllRanges();
    selection.addRange(range);
}

// تغيير لون النص
function changeColor(color) {
    formatText('foreColor', color);
}

// تغيير حجم الخط
function changeFontSize(size) {
    formatText('fontSize', size);
}

// تغيير نوع الخط
function changeFontFamily(font) {
    formatText('fontName', font);
}

// إدراج معادلة
function insertMath() {
    const math = prompt("اكتب معادلتك بصيغة LaTeX:");
    if (math) {
        try {
            const editor = document.getElementById("editor");
            const mathContent = `\\(${math}\\)`;
            editor.innerHTML += mathContent;
            MathJax.typesetPromise().then(() => {
                alert("المعادلة أُدخلت بنجاح.");
            }).catch((error) => {
                alert("حدث خطأ أثناء إدراج المعادلة. يرجى التحقق من صيغة LaTeX.");
            });
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
                table += `<td contenteditable="true">${i + 1},${j + 1}</td>`;
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
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.margin = '0 auto';
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
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css'], before: '.page-break' }
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
    if (document.body.classList.contains('dark-mode')) {
        document.body.style.transition = 'background-color 0.3s, color 0.3s';
    } else {
        document.body.style.transition = 'background-color 0.3s, color 0.3s';
    }
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
