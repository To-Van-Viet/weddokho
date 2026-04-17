// Kiểm tra tên đăng nhập (từ 5-12 ký tự)
function kttendn() {
    var tendn = document.getElementById("name23").value;
    var regexdn = /^.{5,12}$/;
    var er5 = document.getElementById("er66");
    if (regexdn.test(tendn)) {
        er5.innerHTML = "Hợp lệ";
        er5.className = "text-success small";
        return true;
    } else {
        er5.innerHTML = "Tên đăng nhập từ 5-12 ký tự";
        er5.className = "text-danger small";
        return false;
    }
}

// Kiểm tra mật khẩu (đơn giản hơn khi đăng nhập, chỉ cần không trống)
function ktpassword() {
    var pass = document.getElementById("pw").value;
    var erollable3 = document.getElementById("er4");

    if (pass.length >= 6) {
        erollable3.innerHTML = "Hợp lệ";
        erollable3.className = "text-success small";
        return true;
    } else {
        erollable3.innerHTML = "Mật khẩu phải có ít nhất 6 ký tự";
        erollable3.className = "text-danger small";
        return false;
    }
}

// Hiện/ẩn mật khẩu
function togglePassword() {
    var input = document.getElementById("pw");
    var btn = document.getElementById("btnShow");

    if (input.type === "password") {
        input.type = "text";
        btn.innerText = "Ẩn";
        btn.className = "btn btn-secondary";
    } else {
        input.type = "password";
        btn.innerText = "Hiện";
        btn.className = "btn btn-outline-secondary";
    }
}

// Xử lý khi nhấn nút Đăng nhập
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Lấy thông tin người dùng nhập vào
        const usernameInput = document.getElementById("name23").value;
        const passwordInput = document.getElementById("pw").value;

        // 1. Lấy danh sách tài khoản từ LocalStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 2. Tìm tài khoản trong danh sách
        const userFound = users.find(user => user.username === usernameInput);

        if (!userFound) {
            // Trường hợp tài khoản không tồn tại
            alert("Tài khoản này chưa tồn tại. Vui lòng đăng ký!");
            window.location.href = "register.html"; // Chuyển sang trang đăng ký
            return;
        }

        // 3. Nếu tìm thấy tài khoản, đối chiếu mật khẩu
        if (userFound.password === passwordInput) {
            alert("Đăng nhập thành công! Chào mừng " + userFound.username);
            
            // Lưu trạng thái đã đăng nhập (nếu cần)
            sessionStorage.setItem("isLoggedIn", "true");
            
            window.location.href = "../html/home.html"; // Vào trang chủ
        } else {
            // Sai mật khẩu
            alert("Mật khẩu không chính xác. Vui lòng thử lại!");
            document.getElementById("er4").innerHTML = "Mật khẩu sai!";
            document.getElementById("er4").className = "text-danger small";
        }
    });
});