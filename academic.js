/*
   PDF bağlantıları:
   - Tarayıcı PDF görüntüleyebiliyorsa bağlantı yeni sekmede açılır.
   - Yerleşik PDF desteği yoksa dosya indirilir.
   - JavaScript kapalıysa normal bağlantı davranışı geçerli olur.
*/
(function () {
    "use strict";

    function browserCanViewPdf() {
        if (typeof navigator.pdfViewerEnabled === "boolean") {
            return navigator.pdfViewerEnabled;
        }

        if (navigator.mimeTypes && navigator.mimeTypes["application/pdf"]) {
            return true;
        }

        return Array.from(navigator.plugins || []).some(function (plugin) {
            return /pdf/i.test(plugin.name);
        });
    }

    document.querySelectorAll(".pdf-link").forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (browserCanViewPdf()) {
                return;
            }

            event.preventDefault();

            var downloadLink = document.createElement("a");
            downloadLink.href = link.href;
            downloadLink.download = link.dataset.download || "ders-notu.pdf";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
        });
    });
}());
