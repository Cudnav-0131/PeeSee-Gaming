function loginUser(identifier, password) {
    const users = getStorage("gaming_store_users", []);
    const foundUser = users.find(user => {
        const matchesIdentifier = user.username === identifier || user.email === identifier;
        return matchesIdentifier && user.password === password;
    });

    if (!foundUser) {
        return { success: false, message: "Tên đăng nhập/email hoặc mật khẩu không đúng." };
    }

    setStorage("gaming_store_current_user", foundUser);
    return { success: true, message: "Đăng nhập thành công!" };
}

function registerUser(username, email, password) {
    const users = getStorage("gaming_store_users", []);

    if (!username || !email || !password) {
        return { success: false, message: "Vui lòng điền đầy đủ thông tin." };
    }

    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return { success: false, message: "Tên đăng nhập hoặc email đã tồn tại." };
    }

    const newUser = {
        id: `USER-${Date.now()}`,
        username,
        email,
        password,
        role: "user"
    };

    users.push(newUser);
    setStorage("gaming_store_users", users);
    return { success: true, message: "Đăng ký thành công!" };
}

function resetPassword(identifier, newPassword) {
    const users = getStorage("gaming_store_users", []);

    if (!identifier || !newPassword) {
        return { success: false, message: "Vui lòng nhập email/tên đăng nhập và mật khẩu mới." };
    }

    const userIndex = users.findIndex(user => {
        return user.username === identifier || user.email === identifier;
    });

    if (userIndex === -1) {
        return { success: false, message: "Không tìm thấy tài khoản với thông tin đã nhập." };
    }

    users[userIndex].password = newPassword;
    setStorage("gaming_store_users", users);

    return { success: true, message: "Mật khẩu đã được cập nhật thành công. Vui lòng đăng nhập lại." };
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const identifier = document.getElementById("login-identifier").value.trim();
        const password = document.getElementById("login-password").value.trim();

        const result = loginUser(identifier, password);
        alert(result.message);

        if (result.success) {
            const currentUser = getStorage("gaming_store_current_user", null);

            if (currentUser && currentUser.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "../index.html";
            }
        }
    });
}

const forgotPasswordLink = document.getElementById("forgot-password-link");
const forgotPasswordPanel = document.getElementById("forgot-password-panel");
const resetPasswordBtn = document.getElementById("reset-password-btn");

if (forgotPasswordLink && forgotPasswordPanel) {
    forgotPasswordLink.addEventListener("click", function (event) {
        event.preventDefault();
        forgotPasswordPanel.classList.toggle("hidden");
    });
}

if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener("click", function () {
        const identifier = document.getElementById("reset-email").value.trim();
        const newPassword = document.getElementById("reset-password").value.trim();
        const confirmPassword = document.getElementById("reset-confirm-password").value.trim();

        if (!identifier || !newPassword || !confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        const result = resetPassword(identifier, newPassword);
        alert(result.message);

        if (result.success) {
            forgotPasswordPanel.classList.add("hidden");
            document.getElementById("login-identifier").value = identifier;
            document.getElementById("login-password").value = "";
            document.getElementById("reset-email").value = "";
            document.getElementById("reset-password").value = "";
            document.getElementById("reset-confirm-password").value = "";
        }
    });
}

const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("register-username").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();
        const confirmPassword = document
            .getElementById("register-confirm-password")
            .value
            .trim();

        if (!username || !email || !password || !confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp.");
            return;
        }

        const result = registerUser(username, email, password);

        alert(result.message);

        if (result.success) {
            window.location.href = "login.html";
        }
    });
}