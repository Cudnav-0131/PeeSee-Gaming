function updateCartBadge() {
    const cart = getStorage("gaming_store_cart", []);
    const totalQuantity = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const cartBadge = document.querySelector(".cart-count");

    if (cartBadge) {
        cartBadge.textContent = totalQuantity;
    }
}

function updateHeaderAuthState() {
    const currentUser = getStorage("gaming_store_current_user", null);
    const loginBtn = document.querySelector(".login-btn");

    if (!loginBtn) {
        return;
    }

    const loginUrl = window.location.pathname.includes("/pages/") ? "login.html" : "pages/login.html";

    if (!currentUser) {
        const span = loginBtn.querySelector("span");
        if (span) {
            span.textContent = "Đăng nhập";
        }

        loginBtn.href = loginUrl;
        loginBtn.removeAttribute("data-logout");
        loginBtn.onclick = null;
        return;
    }

    const name = currentUser.username || currentUser.email || "Tài khoản";
    const span = loginBtn.querySelector("span");
    if (span) {
        span.textContent = name;
    }

    loginBtn.href = "#";
    loginBtn.setAttribute("data-logout", "true");
    loginBtn.onclick = function (event) {
        event.preventDefault();
        removeStorage("gaming_store_current_user");
        updateHeaderAuthState();
        window.location.href = loginUrl;
    };
}

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
        updateCartBadge();
        updateHeaderAuthState();

        if (typeof initSearch === "function") {
            initSearch();
        }

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