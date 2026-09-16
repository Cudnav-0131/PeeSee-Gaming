// Xác định đường dẫn đến Header
const isPagesFolder = window.location.pathname.includes("/pages/");
const headerPath = isPagesFolder
    ? "../components/header.html"
    : "components/header.html";

// Tải Header
fetch(headerPath)
    .then(response => {
        if (!response.ok) {
            throw new Error("Không thể tải Header");
        }

        return response.text();
    })
    .then(data => {

        // Chèn Header vào trang
        document.getElementById("header").innerHTML = data;

        // Sửa đường dẫn ảnh khi Header nằm trong pages/
        if (isPagesFolder) {

            const logo = document.querySelector(".logo img");
            const userIcon = document.querySelector(".login-btn img");
            const cartIcon = document.querySelector(".cart-btn img");

            if (logo) {
                logo.src = "../images/logo-peesee.png";
            }

            if (userIcon) {
                userIcon.src = "../images/logo-user.png";
            }
            if (cartIcon) {
                cartIcon.src = "../images/logo-cart.png";
            }
            const logoLink = document.querySelector(".logo");
            const cartLink = document.querySelector(".cart-btn");
            const loginLink = document.querySelector(".login-btn");

            if (logoLink) {
                logoLink.href = "../index.html";
            }

            if (cartLink) {
                cartLink.href = "cart.html";
            }

            if (loginLink) {
                loginLink.href = "login.html";
            }
        }
    })
    .catch(error => {
        console.error("Lỗi Header:", error);
    });