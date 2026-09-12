function initUsers() {
    const existingUsers = getStorage("gaming_store_users", null);

    if (!existingUsers) {
        const defaultUsers = [
            {
                id: "AD01",
                username: "admin",
                email: "admin@gmail.com",
                password: "admin123",
                role: "admin"
            }
        ];

        setStorage("gaming_store_users", defaultUsers);

        console.log("Đã khởi tạo tài khoản admin!");
    } else {
        console.log("Tài khoản đã tồn tại.");
    }
}

function initProducts() {
    const existingProducts = getStorage("gaming_store_products", null);

    if (!existingProducts) {
        setStorage("gaming_store_products", products);
        console.log("Đã khởi tạo dữ liệu sản phẩm!");
    } else {
        console.log("Dữ liệu sản phẩm đã tồn tại.");
    }
}

initUsers();
initProducts();