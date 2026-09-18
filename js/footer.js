function normalizeFooterImages() {
    const footerContainer = document.getElementById("footer");

    if (!footerContainer) return;

    const isPagesFolder = window.location.pathname.includes("/pages/");
    const images = footerContainer.querySelectorAll("img");

    images.forEach(img => {
        const src = img.getAttribute("src");

        if (!src || src.startsWith("http") || src.startsWith("data:")) {
            return;
        }

        if (isPagesFolder) {
            if (!src.startsWith("../") && !src.startsWith("/")) {
                img.setAttribute("src", "../" + src);
            }
        } else {
            if (src.startsWith("../")) {
                img.setAttribute("src", src.replace(/^\.\.\//, ""));
            }
        }
    });
}

function loadFooter() {
    const footerContainer = document.getElementById("footer");

    if (!footerContainer) return;

    const footerPath = window.location.pathname.includes("/pages/")
        ? "../components/footer.html"
        : "components/footer.html";

    fetch(footerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể tải Footer");
            }

            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
            normalizeFooterImages();
        })
        .catch(error => {
            console.error("Lỗi Footer:", error);
        });
}

loadFooter();