function checkAdminAccess() {
    const currentUser = getStorage("gaming_store_current_user", null);

    // Chưa đăng nhập
    if (!currentUser) {
        alert("Vui lòng đăng nhập tài khoản quản trị.");
        window.location.href = "login.html";
        return false;
    }

    // Không phải admin
    if (currentUser.role !== "admin") {
        alert("Bạn không có quyền truy cập trang quản trị.");
        window.location.href = "../index.html";
        return false;
    }

    return true;
}

checkAdminAccess();

// =========================
// HIỂN THỊ SẢN PHẨM ADMIN
// =========================

let showAllProducts = false;

function displayAdminProducts() {
    const productList = document.getElementById("admin-product-list");
    const productCount = document.getElementById("product-list-count");
    const toggleProductsBtn = document.getElementById("toggle-products-btn");

    if (!productList) {
        return;
    }

    const products = getStorage("gaming_store_products", []);

    if (products.length === 0) {
        productList.innerHTML = `
            <tr>
                <td colspan="7">
                    Chưa có sản phẩm.
                </td>
            </tr>
        `;

        if (productCount) {
            productCount.textContent = "Hiển thị 0 sản phẩm";
        }

        if (toggleProductsBtn) {
            toggleProductsBtn.style.display = "none";
        }

        return;
    }

    const visibleProducts = showAllProducts
        ? products
        : products.slice(0, 8);

    productList.innerHTML = visibleProducts.map(product => `
        <tr>
            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>${product.brand || "—"}</td>

            <td>
                ${Number(product.price || 0).toLocaleString("vi-VN")}đ
            </td>

            <td>${product.stock ?? 0}</td>

            <td>
                <button
                    type="button"
                    class="admin-edit-btn"
                    onclick="editAdminProduct('${product.id}')"
                >
                    Sửa
                </button>

                <button
                    type="button"
                    class="admin-delete-btn"
                    onclick="deleteAdminProduct('${product.id}')"
                >
                    Xóa
                </button>
            </td>
        </tr>
    `).join("");

    if (productCount) {
        productCount.textContent =
            `Hiển thị ${visibleProducts.length} / ${products.length} sản phẩm`;
    }

    if (toggleProductsBtn) {
        if (products.length <= 8) {
            toggleProductsBtn.style.display = "none";
        } else {
            toggleProductsBtn.style.display = "inline-block";
            toggleProductsBtn.textContent =
                showAllProducts ? "Thu gọn" : "Xem thêm";
        }
    }
}

displayAdminProducts();

const toggleProductsBtn =
    document.getElementById("toggle-products-btn");

if (toggleProductsBtn) {
    toggleProductsBtn.addEventListener("click", function () {

        showAllProducts = !showAllProducts;

        displayAdminProducts();
    });
}

function deleteAdminProduct(productId) {
    const products = getStorage("gaming_store_products", []);

    const product = products.find(item => item.id === productId);

    if (!product) {
        alert("Không tìm thấy sản phẩm.");
        return;
    }

    const confirmed = confirm(
        `Bạn có chắc muốn xóa sản phẩm "${product.name}" không?`
    );

    if (!confirmed) {
        return;
    }

    const updatedProducts = products.filter(
        item => item.id !== productId
    );

    setStorage("gaming_store_products", updatedProducts);

    displayAdminProducts();

    alert("Đã xóa sản phẩm thành công.");
}

// =========================
// SỬA SẢN PHẨM
// =========================

function editAdminProduct(productId) {
    const products = getStorage("gaming_store_products", []);

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        alert("Không tìm thấy sản phẩm.");
        return;
    }

    const modal = document.getElementById("edit-product-modal");

    if (!modal) {
        return;
    }

    document.getElementById("edit-product-id").value =
        product.id;

    document.getElementById("edit-product-name").value =
        product.name || "";

    document.getElementById("edit-product-brand").value =
        product.brand || "";

    document.getElementById("edit-product-category").value =
        product.category || "";

    document.getElementById("edit-product-price").value =
        product.price || 0;

    document.getElementById("edit-product-old-price").value =
        product.oldPrice || product.price || 0;

    document.getElementById("edit-product-stock").value =
        product.stock ?? 0;

    document.getElementById("edit-product-image").value =
        product.image || "";

    document.getElementById("edit-product-description").value =
        product.description || "";

    modal.classList.remove("hidden");
}

// =========================
// THÊM SẢN PHẨM
// =========================

const openAddProductBtn =
    document.getElementById("open-add-product-btn");

const addProductModal =
    document.getElementById("add-product-modal");

const addProductForm =
    document.getElementById("add-product-form");

const cancelAddProductBtn =
    document.getElementById("cancel-add-product-btn");

const closeAddProductBtn =
    document.getElementById("close-add-product");

const addProductOverlay =
    document.querySelector(".add-product-overlay");


// Mở popup
if (openAddProductBtn && addProductModal) {
    openAddProductBtn.addEventListener("click", function () {
        addProductModal.classList.remove("hidden");
    });
}


// Đóng popup
function closeAddProductModal() {
    if (addProductModal) {
        addProductModal.classList.add("hidden");
    }
}


// Nút Hủy
if (cancelAddProductBtn) {
    cancelAddProductBtn.addEventListener(
        "click",
        closeAddProductModal
    );
}


// Nút X
if (closeAddProductBtn) {
    closeAddProductBtn.addEventListener(
        "click",
        closeAddProductModal
    );
}


// Click nền tối để đóng
if (addProductOverlay) {
    addProductOverlay.addEventListener(
        "click",
        closeAddProductModal
    );
}


// Lưu sản phẩm
if (addProductForm) {
    addProductForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const id =
            document.getElementById("product-id").value.trim();

        const name =
            document.getElementById("product-name").value.trim();

        const brand =
            document.getElementById("product-brand").value.trim();

        const category =
            document.getElementById("product-category").value;

        const price =
            Number(
                document.getElementById("product-price").value
            );

        const stock =
            Number(
                document.getElementById("product-stock").value
            );


        if (!id || !name || !brand || !category) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
            return;
        }


        if (!Number.isFinite(price) || price < 0) {
            alert("Giá sản phẩm không hợp lệ.");
            return;
        }


        if (!Number.isInteger(stock) || stock < 0) {
            alert("Số lượng tồn kho không hợp lệ.");
            return;
        }


        const products =
            getStorage("gaming_store_products", []);


        const existingProduct = products.find(
            product =>
                String(product.id).toLowerCase() ===
                id.toLowerCase()
        );


        if (existingProduct) {
            alert("Mã sản phẩm đã tồn tại.");
            return;
        }


        const newProduct = {
            id: id,
            name: name,
            category: category,
            brand: brand,
            series: "",
            price: price,
            oldPrice: price,
            discount: 0,
            image: "",
            rating: 0,
            sold: 0,
            stock: stock,
            description: "",
            specifications: {}
        };


        products.push(newProduct);

        setStorage(
            "gaming_store_products",
            products
        );


        displayAdminProducts();

        updateDashboard();


        alert("Đã thêm sản phẩm thành công.");


        // Xóa dữ liệu form
        addProductForm.reset();


        // Đóng popup
        closeAddProductModal();
    });
}

// =========================
// QUẢN LÝ ĐƠN HÀNG
// =========================

function displayAdminOrders() {
    const orderList = document.getElementById("admin-order-list");

    if (!orderList) {
        return;
    }

    const orders = getStorage("gaming_store_orders", []);

    if (orders.length === 0) {
        orderList.innerHTML = `
            <tr>
                <td colspan="7">Chưa có đơn hàng.</td>
            </tr>
        `;
        return;
    }

    orderList.innerHTML = orders.map(order => {
        const totalItems = order.items.reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
        );

        const paymentMethod =
            order.paymentMethod === "bank"
                ? "Chuyển khoản"
                : "Thanh toán khi nhận hàng";

        return `
            <tr>
                <td>${order.id}</td>

                <td>${order.customer?.name || "—"}</td>

                <td>${order.customer?.phone || "—"}</td>

                <td>${totalItems}</td>

                <td>
                    ${Number(order.total || 0).toLocaleString("vi-VN")}đ
                </td>

                <td>${paymentMethod}</td>

                <td>
                    <select
                        class="order-status-select"
                        data-order-id="${order.id}"
                    >
                        <option value="pending" ${order.status === "pending" ? "selected" : ""}>
                            Chờ xử lý
                        </option>

                        <option value="processing" ${order.status === "processing" ? "selected" : ""}>
                            Đang xử lý
                        </option>

                        <option value="shipping" ${order.status === "shipping" ? "selected" : ""}>
                            Đang giao
                        </option>

                        <option value="completed" ${order.status === "completed" ? "selected" : ""}>
                            Hoàn thành
                        </option>

                        <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>
                            Đã hủy
                        </option>
                    </select>
                </td>
                <td>
                    <button
                        type="button"
                        class="admin-detail-btn"
                        onclick="viewOrderDetail('${order.id}')"
                    >
                        Xem chi tiết
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

displayAdminOrders();

const orderList = document.getElementById("admin-order-list");

if (orderList) {
    orderList.addEventListener("change", function (event) {
        if (!event.target.classList.contains("order-status-select")) {
            return;
        }

        const orderId = event.target.dataset.orderId;
        const newStatus = event.target.value;

        const orders = getStorage("gaming_store_orders", []);

        const orderIndex = orders.findIndex(
            order => order.id === orderId
        );

        if (orderIndex === -1) {
            alert("Không tìm thấy đơn hàng.");
            return;
        }

        orders[orderIndex].status = newStatus;

        setStorage("gaming_store_orders", orders);

        alert("Đã cập nhật trạng thái đơn hàng.");
    });
}

// =========================
// CHI TIẾT ĐƠN HÀNG
// =========================

function viewOrderDetail(orderId) {
    const orders = getStorage("gaming_store_orders", []);

    const order = orders.find(item => item.id === orderId);

    if (!order) {
        alert("Không tìm thấy đơn hàng.");
        return;
    }

    const modal = document.getElementById("order-detail-modal");
    const content = document.getElementById("order-detail-content");

    if (!modal || !content) {
        return;
    }

    const paymentMethod =
        order.paymentMethod === "bank"
            ? "Chuyển khoản ngân hàng"
            : "Thanh toán khi nhận hàng";

    const statusText = {
        pending: "Chờ xử lý",
        processing: "Đang xử lý",
        shipping: "Đang giao",
        completed: "Hoàn thành",
        cancelled: "Đã hủy"
    };

    const itemsHtml = order.items.map(item => {
        const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);

        return `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${Number(item.price || 0).toLocaleString("vi-VN")}đ</td>
                <td>${itemTotal.toLocaleString("vi-VN")}đ</td>
            </tr>
        `;
    }).join("");

    content.innerHTML = `
        <div class="order-info-grid">
            <div>
                <strong>Mã đơn hàng</strong>
                <span>${order.id}</span>
            </div>

            <div>
                <strong>Trạng thái</strong>
                <span>${statusText[order.status] || order.status || "Chờ xử lý"}</span>
            </div>

            <div>
                <strong>Khách hàng</strong>
                <span>${order.customer?.name || "—"}</span>
            </div>

            <div>
                <strong>Số điện thoại</strong>
                <span>${order.customer?.phone || "—"}</span>
            </div>

            <div class="order-info-full">
                <strong>Địa chỉ giao hàng</strong>
                <span>${order.customer?.address || "—"}</span>
            </div>

            <div class="order-info-full">
                <strong>Phương thức thanh toán</strong>
                <span>${paymentMethod}</span>
            </div>
        </div>

        <h3 class="order-items-title">Sản phẩm</h3>

        <div class="order-items-table-wrapper">
            <table class="order-items-table">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>SL</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>

                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
        </div>

        <div class="order-detail-total">
            <span>Tổng thanh toán</span>
            <strong>${Number(order.total || 0).toLocaleString("vi-VN")}đ</strong>
        </div>
    `;

    modal.classList.remove("hidden");
}
const orderDetailModal = document.getElementById("order-detail-modal");
const closeOrderDetail = document.getElementById("close-order-detail");
const closeOrderDetailBtn = document.getElementById("close-order-detail-btn");
const orderDetailOverlay = document.querySelector(".order-detail-overlay");

function closeOrderDetailModal() {
    if (orderDetailModal) {
        orderDetailModal.classList.add("hidden");
    }
}

if (closeOrderDetail) {
    closeOrderDetail.addEventListener("click", closeOrderDetailModal);
}

if (closeOrderDetailBtn) {
    closeOrderDetailBtn.addEventListener("click", closeOrderDetailModal);
}

if (orderDetailOverlay) {
    orderDetailOverlay.addEventListener("click", closeOrderDetailModal);
}
// =========================
// DASHBOARD THỐNG KÊ
// =========================

function updateDashboard() {
    const products = getStorage("gaming_store_products", []);
    const orders = getStorage("gaming_store_orders", []);

    const totalProducts = products.length;
    const totalOrders = orders.length;

    const completedOrders = orders.filter(
        order => order.status === "completed"
    ).length;

    const totalRevenue = orders
        .filter(order => order.status === "completed")
        .reduce((sum, order) => {
            return sum + Number(order.total || 0);
        }, 0);

    const totalProductsElement = document.getElementById("total-products");
    const totalOrdersElement = document.getElementById("total-orders");
    const completedOrdersElement = document.getElementById("completed-orders");
    const totalRevenueElement = document.getElementById("total-revenue");

    if (totalProductsElement) {
        totalProductsElement.textContent = totalProducts;
    }

    if (totalOrdersElement) {
        totalOrdersElement.textContent = totalOrders;
    }

    if (completedOrdersElement) {
        completedOrdersElement.textContent = completedOrders;
    }

    if (totalRevenueElement) {
        totalRevenueElement.textContent =
            totalRevenue.toLocaleString("vi-VN") + "đ";
    }
}

updateDashboard();

const editProductForm = document.getElementById("edit-product-form");

if (editProductForm) {
    editProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const productId =
            document.getElementById("edit-product-id").value;

        const name =
            document.getElementById("edit-product-name").value.trim();

        const brand =
            document.getElementById("edit-product-brand").value.trim();

        const category =
            document.getElementById("edit-product-category").value;

        const price =
            Number(document.getElementById("edit-product-price").value);

        const oldPrice =
            Number(document.getElementById("edit-product-old-price").value);

        const stock =
            Number(document.getElementById("edit-product-stock").value);

        const image =
            document.getElementById("edit-product-image").value.trim();

        const description =
            document.getElementById("edit-product-description").value.trim();

        if (!name || !brand || !category) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
            return;
        }

        if (!Number.isFinite(price) || price < 0) {
            alert("Giá sản phẩm không hợp lệ.");
            return;
        }

        if (!Number.isFinite(oldPrice) || oldPrice < 0) {
            alert("Giá cũ không hợp lệ.");
            return;
        }

        if (!Number.isInteger(stock) || stock < 0) {
            alert("Số lượng tồn kho không hợp lệ.");
            return;
        }

        const products = getStorage("gaming_store_products", []);

        const productIndex = products.findIndex(
            item => item.id === productId
        );

        if (productIndex === -1) {
            alert("Không tìm thấy sản phẩm.");
            return;
        }

        let discount = 0;

        if (oldPrice > price && oldPrice > 0) {
            discount = Math.round(
                ((oldPrice - price) / oldPrice) * 100
            );
        }

        products[productIndex].name = name;
        products[productIndex].brand = brand;
        products[productIndex].category = category;
        products[productIndex].price = price;
        products[productIndex].oldPrice = oldPrice;
        products[productIndex].discount = discount;
        products[productIndex].stock = stock;
        products[productIndex].image = image;
        products[productIndex].description = description;

        setStorage("gaming_store_products", products);

        displayAdminProducts();

        document
            .getElementById("edit-product-modal")
            .classList.add("hidden");

        alert("Đã cập nhật sản phẩm thành công.");
    });
}

const closeEditProduct =
    document.getElementById("close-edit-product");

const cancelEditProduct =
    document.getElementById("cancel-edit-product");

const editProductOverlay =
    document.querySelector(".edit-product-overlay");

function closeEditProductModal() {
    const modal = document.getElementById("edit-product-modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}

if (closeEditProduct) {
    closeEditProduct.addEventListener(
        "click",
        closeEditProductModal
    );
}

if (cancelEditProduct) {
    cancelEditProduct.addEventListener(
        "click",
        closeEditProductModal
    );
}

if (editProductOverlay) {
    editProductOverlay.addEventListener(
        "click",
        closeEditProductModal
    );
}
// =========================
// CHUYỂN MỤC ADMIN
// =========================

const adminNavItems = document.querySelectorAll(".admin-nav-item");
const adminSections = document.querySelectorAll(".admin-section");

adminNavItems.forEach(item => {
    item.addEventListener("click", function (event) {
        const sectionId = this.dataset.section;

        if (!sectionId) {
            return;
        }

        event.preventDefault();

        // Ẩn tất cả section
        adminSections.forEach(section => {
            section.classList.add("hidden");
        });

        // Dashboard gồm cả thống kê và biểu đồ
        if (sectionId === "dashboard") {
            const dashboard = document.getElementById("dashboard");
            const revenueSection = document.getElementById("revenue-section");
            const recentOrders = document.getElementById("recent-orders");

            if (dashboard) {
                dashboard.classList.remove("hidden");
            }

            if (revenueSection) {
                revenueSection.classList.remove("hidden");
            }

            if (recentOrders) {
                recentOrders.classList.remove("hidden");
            }
            // Vẽ lại biểu đồ sau khi Dashboard đã hiện
            setTimeout(() => {
                updateRevenueChart();
            }, 0);
        } else {
            const targetSection = document.getElementById(sectionId);

            if (targetSection) {
                targetSection.classList.remove("hidden");
            }
        }

        // Cập nhật menu đang active
        adminNavItems.forEach(navItem => {
            navItem.classList.remove("active");
        });

        this.classList.add("active");

        window.location.hash = sectionId;
    });
});

// =========================
// BIỂU ĐỒ DOANH THU
// =========================

function updateRevenueChart() {
    const chartContainer = document.getElementById("revenue-chart");
    const periodSelect = document.getElementById("revenue-period");

    if (!chartContainer || !periodSelect) {
        return;
    }

    const orders = getStorage("gaming_store_orders", []);

    const completedOrders = orders.filter(
        order => order.status === "completed"
    );

    chartContainer.innerHTML = `
        <canvas id="revenue-canvas"></canvas>
    `;

    const canvas = document.getElementById("revenue-canvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    const width = chartContainer.clientWidth;
    const height = chartContainer.clientHeight;

    canvas.width = width;
    canvas.height = height;

    let labels = [];
    let values = [];

    const period = periodSelect.value;

    if (period === "week") {

        labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
        values = new Array(7).fill(0);

        completedOrders.forEach(order => {
            const date = new Date(order.createdAt);

            const day = date.getDay();
            const index = day === 0 ? 6 : day - 1;

            values[index] += Number(order.total || 0);
        });

    } else if (period === "month") {

        labels = [
            "T1", "T2", "T3", "T4", "T5", "T6",
            "T7", "T8", "T9", "T10", "T11", "T12"
        ];

        values = new Array(12).fill(0);

        completedOrders.forEach(order => {
            const date = new Date(order.createdAt);
            const month = date.getMonth();

            values[month] += Number(order.total || 0);
        });

    } else {

        const groupedData = {};

        completedOrders.forEach(order => {
            const date = new Date(order.createdAt);

            const key =
                date.getFullYear() +
                "-" +
                String(date.getMonth() + 1).padStart(2, "0");

            if (!groupedData[key]) {
                groupedData[key] = 0;
            }

            groupedData[key] += Number(order.total || 0);
        });

        labels = Object.keys(groupedData).sort();
        values = labels.map(label => groupedData[label]);

        if (labels.length === 0) {
            labels = ["Chưa có dữ liệu"];
            values = [0];
        }
    }

    const maxValue = Math.max(...values, 1);

    const padding = {
        top: 25,
        right: 25,
        bottom: 45,
        left: 70
    };

    const chartWidth =
        width - padding.left - padding.right;

    const chartHeight =
        height - padding.top - padding.bottom;

    // Cột
    const barWidth =
        chartWidth / values.length * 0.55;

    values.forEach((value, index) => {

        const x =
            padding.left +
            (chartWidth / values.length) *
            (index + 0.5) -
            barWidth / 2;

        const barHeight =
            (value / maxValue) * chartHeight;

        const y =
            padding.top +
            chartHeight -
            barHeight;

        ctx.fillStyle = "#1e88e5";
        ctx.fillRect(
            x,
            y,
            barWidth,
            barHeight
        );

        // Nhãn
        ctx.fillStyle = "#666";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            labels[index],
            x + barWidth / 2,
            height - 18
        );

        if (value > 0) {
            ctx.fillStyle = "#333";
            ctx.font = "11px Arial";

            ctx.fillText(
                value.toLocaleString("vi-VN"),
                x + barWidth / 2,
                y - 7
            );
        }
    });
}


// Khởi tạo biểu đồ
updateRevenueChart();


// Đổi khoảng thời gian
const revenuePeriod =
    document.getElementById("revenue-period");

if (revenuePeriod) {
    revenuePeriod.addEventListener(
        "change",
        updateRevenueChart
    );
}

// =========================
// ĐƠN HÀNG GẦN ĐÂY
// =========================

function updateRecentOrders() {
    const orderList = document.getElementById("recent-order-list");

    if (!orderList) {
        return;
    }

    const orders = getStorage("gaming_store_orders", []);

    if (orders.length === 0) {
        orderList.innerHTML = `
            <tr>
                <td colspan="4">Chưa có đơn hàng.</td>
            </tr>
        `;
        return;
    }

    const statusText = {
        pending: "Chờ xử lý",
        processing: "Đang xử lý",
        shipping: "Đang giao",
        completed: "Hoàn thành",
        cancelled: "Đã hủy"
    };

    const recentOrders = [...orders]
        .sort((a, b) => {
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        })
        .slice(0, 5);

    orderList.innerHTML = recentOrders.map(order => `
        <tr>
            <td>${order.id}</td>

            <td>${order.customer?.name || "—"}</td>

            <td>
                ${Number(order.total || 0).toLocaleString("vi-VN")}đ
            </td>

            <td>
                ${statusText[order.status] || "Chờ xử lý"}
            </td>
        </tr>
    `).join("");
}

updateRecentOrders();

// =========================
// QUẢN LÝ KHÁCH HÀNG
// =========================

function displayAdminCustomers(keyword = "") {
    const customerList = document.getElementById("admin-customer-list");

    if (!customerList) {
        return;
    }

    const users = getStorage("gaming_store_users", []);

    const searchKeyword = keyword.trim().toLowerCase();

    const filteredUsers = users.filter(user => {
        const username = String(user.username || "").toLowerCase();
        const email = String(user.email || "").toLowerCase();

        return (
            username.includes(searchKeyword) ||
            email.includes(searchKeyword)
        );
    });

    if (filteredUsers.length === 0) {
        customerList.innerHTML = `
            <tr>
                <td colspan="6">
                    Không tìm thấy khách hàng phù hợp.
                </td>
            </tr>
        `;
        return;
    }

    customerList.innerHTML = filteredUsers.map(user => {

        const roleText =
            user.role === "admin"
                ? "Quản trị viên"
                : "Khách hàng";

        let createdDate = "—";

        if (user.createdAt) {
            const date = new Date(user.createdAt);

            if (!Number.isNaN(date.getTime())) {
                createdDate = date.toLocaleDateString("vi-VN");
            }
        }

        return `
            <tr>
                <td>${user.id || "—"}</td>

                <td>${user.username || "—"}</td>

                <td>${user.email || "—"}</td>

                <td>${roleText}</td>

                <td>${createdDate}</td>

                <td>
                    ${user.id === getStorage("gaming_store_current_user", null)?.id
                ? `<span class="account-current">Tài khoản hiện tại</span>`
                : `
                                <button
                                    type="button"
                                    class="admin-delete-btn"
                                    onclick="deleteAdminCustomer('${user.id}')"
                                >
                                    Xóa
                                </button>
                            `
            }
                </td>
            </tr>
        `;
    }).join("");
}

displayAdminCustomers();

const customerSearchInput =
    document.getElementById("customer-search-input");

if (customerSearchInput) {
    customerSearchInput.addEventListener("input", function () {
        displayAdminCustomers(this.value);
    });
}
// =========================
// THỐNG KÊ
// =========================

function updateStatistics() {
    const revenueElement = document.getElementById("statistics-revenue");
    const completedElement = document.getElementById("statistics-completed");
    const cancelledElement = document.getElementById("statistics-cancelled");
    const averageElement = document.getElementById("statistics-average");
    const bestSellingElement = document.getElementById("best-selling-products");
    const orderStatusElement = document.getElementById("order-status-statistics");

    if (
        !revenueElement &&
        !completedElement &&
        !cancelledElement &&
        !averageElement &&
        !bestSellingElement &&
        !orderStatusElement
    ) {
        return;
    }

    const orders = getStorage("gaming_store_orders", []);
    const products = getStorage("gaming_store_products", []);

    // =========================
    // TỔNG QUAN ĐƠN HÀNG
    // =========================

    const completedOrders = orders.filter(
        order => order.status === "completed"
    );

    const cancelledOrders = orders.filter(
        order => order.status === "cancelled"
    );

    const revenue = completedOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const averageOrderValue =
        completedOrders.length > 0
            ? revenue / completedOrders.length
            : 0;

    if (revenueElement) {
        revenueElement.textContent =
            revenue.toLocaleString("vi-VN") + "đ";
    }

    if (completedElement) {
        completedElement.textContent = completedOrders.length;
    }

    if (cancelledElement) {
        cancelledElement.textContent = cancelledOrders.length;
    }

    if (averageElement) {
        averageElement.textContent =
            Math.round(averageOrderValue).toLocaleString("vi-VN") + "đ";
    }

    // =========================
    // SẢN PHẨM BÁN CHẠY
    // =========================

    if (bestSellingElement) {
        const soldProducts = {};

        orders.forEach(order => {
            if (!order.items || order.status === "cancelled") {
                return;
            }

            order.items.forEach(item => {
                const quantity = Number(item.quantity || 0);

                if (!soldProducts[item.id]) {
                    soldProducts[item.id] = {
                        id: item.id,
                        name: item.name || "Sản phẩm",
                        quantity: 0
                    };
                }

                soldProducts[item.id].quantity += quantity;
            });
        });

        const bestSelling = Object.values(soldProducts)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

        if (bestSelling.length === 0) {
            bestSellingElement.innerHTML = `
                <tr>
                    <td colspan="2">Chưa có dữ liệu.</td>
                </tr>
            `;
        } else {
            bestSellingElement.innerHTML = bestSelling.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                </tr>
            `).join("");
        }
    }

    // =========================
    // TRẠNG THÁI ĐƠN HÀNG
    // =========================

    if (orderStatusElement) {
        const statusData = {
            pending: {
                label: "Chờ xử lý",
                count: 0
            },
            processing: {
                label: "Đang xử lý",
                count: 0
            },
            shipping: {
                label: "Đang giao",
                count: 0
            },
            completed: {
                label: "Hoàn thành",
                count: 0
            },
            cancelled: {
                label: "Đã hủy",
                count: 0
            }
        };

        orders.forEach(order => {
            const status = order.status || "pending";

            if (statusData[status]) {
                statusData[status].count++;
            }
        });

        orderStatusElement.innerHTML = Object.values(statusData).map(
            status => `
                <div class="statistics-status-row">
                    <span>${status.label}</span>
                    <strong>${status.count}</strong>
                </div>
            `
        ).join("");
    }
}

updateStatistics();
// =========================
// QUẢN LÝ DANH MỤC
// =========================

function displayAdminCategories() {
    const categoryList = document.getElementById("admin-category-list");

    if (!categoryList) {
        return;
    }

    const products = getStorage("gaming_store_products", []);

    const categories = [
        {
            id: "laptop",
            name: "Laptop"
        },
        {
            id: "laptop-gaming",
            name: "Laptop Gaming"
        },
        {
            id: "pc-ps",
            name: "PC / PS"
        },
        {
            id: "components",
            name: "Linh kiện"
        },
        {
            id: "case",
            name: "Case"
        },
        {
            id: "speaker-microphone",
            name: "Loa / Micro"
        },
        {
            id: "monitor",
            name: "Màn hình"
        },
        {
            id: "keyboard",
            name: "Bàn phím"
        },
        {
            id: "mouse-mousepad",
            name: "Chuột / Lót chuột"
        },
        {
            id: "headphone",
            name: "Tai nghe"
        },
        {
            id: "chair-desk",
            name: "Ghế / Bàn"
        }
    ];

    categoryList.innerHTML = categories.map(category => {

        const productCount = products.filter(
            product => product.category === category.id
        ).length;

        return `
            <tr>
                <td>${category.name}</td>

                <td>${productCount}</td>

                <td>
                    <span class="category-status">
                        Đang sử dụng
                    </span>
                </td>
            </tr>
        `;
    }).join("");
}

displayAdminCategories();

// =========================
// XÓA TÀI KHOẢN
// =========================

function deleteAdminCustomer(userId) {
    const users = getStorage("gaming_store_users", []);

    const currentUser = getStorage(
        "gaming_store_current_user",
        null
    );

    // Không cho xóa tài khoản đang đăng nhập
    if (currentUser && currentUser.id === userId) {
        alert("Không thể xóa tài khoản đang đăng nhập.");
        return;
    }

    const user = users.find(
        item => item.id === userId
    );

    if (!user) {
        alert("Không tìm thấy tài khoản.");
        return;
    }

    const confirmed = confirm(
        `Bạn có chắc muốn xóa tài khoản "${user.username}" không?`
    );

    if (!confirmed) {
        return;
    }

    const updatedUsers = users.filter(
        item => item.id !== userId
    );

    setStorage(
        "gaming_store_users",
        updatedUsers
    );

    displayAdminCustomers();

    alert("Đã xóa tài khoản thành công.");
}
// =========================
// TÀI KHOẢN ADMIN
// =========================

function updateAdminAccount() {
    const currentUser = getStorage(
        "gaming_store_current_user",
        null
    );

    if (!currentUser) {
        return;
    }

    const username =
        currentUser.username ||
        currentUser.email ||
        "Admin";

    const sidebarUsername =
        document.getElementById("admin-username");

    const headerUsername =
        document.getElementById("admin-header-username");

    if (sidebarUsername) {
        sidebarUsername.textContent = username;
    }

    if (headerUsername) {
        headerUsername.textContent = username;
    }
}

updateAdminAccount();


// =========================
// TÀI KHOẢN ADMIN SIDEBAR
// =========================

const adminAccount = document.getElementById("admin-account");
const adminAccountBtn =
    document.getElementById("admin-account-btn");

const adminAccountMenu =
    document.getElementById("admin-account-menu");

const adminLogoutBtn =
    document.getElementById("admin-logout-btn");


// Mở / đóng menu tài khoản
if (adminAccountBtn && adminAccountMenu) {

    adminAccountBtn.addEventListener("click", function () {

        adminAccountMenu.classList.toggle("hidden");

        if (adminAccount) {
            adminAccount.classList.toggle(
                "active",
                !adminAccountMenu.classList.contains("hidden")
            );
        }
    });
}


// Đăng xuất
if (adminLogoutBtn) {

    adminLogoutBtn.addEventListener("click", function () {

        const confirmed = confirm(
            "Bạn có chắc muốn đăng xuất không?"
        );

        if (!confirmed) {
            return;
        }

        removeStorage("gaming_store_current_user");

        window.location.href = "login.html";
    });
}