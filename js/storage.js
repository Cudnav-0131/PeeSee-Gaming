// ===============================
// STORAGE KEYS
// ===============================

const STORAGE_KEYS = {
    USERS: "gaming_store_users",
    CART: "gaming_store_cart",
    ORDERS: "gaming_store_orders",
    CURRENT_USER: "gaming_store_current_user"
};


// ===============================
// LẤY DỮ LIỆU
// ===============================

function getStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);

    if (!data) {
        return defaultValue;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Lỗi đọc LocalStorage:", error);
        return defaultValue;
    }
}


// ===============================
// LƯU DỮ LIỆU
// ===============================

function setStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


// ===============================
// XÓA DỮ LIỆU
// ===============================

function removeStorage(key) {
    localStorage.removeItem(key);
}


// ===============================
// XÓA TOÀN BỘ LOCAL STORAGE
// ===============================

function clearStorage() {
    localStorage.clear();
}