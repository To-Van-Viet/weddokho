function ktten() {
  var ten = document.getElementById("name").value;
  var ht = /^(?:[A-ZÀ-Ỵ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỵ][a-zà-ỹ]+)+)$/;
  var erollable = document.getElementById("er1");
  if (ht.test(ten)) {
    erollable.innerHTML = "Hợp lệ";
    erollable.className = "text-success";
    return true;
  } else {
    erollable.innerHTML = "Không hợp lệ";
    erollable.className = "text-danger";
    return false;
  }
}
function kttel() {
  var tel = document.getElementById("telnumber").value;
  var sdt = /^(03|05|07|08|09)\d{8}$/;
  var erollable1 = document.getElementById("er2");
  if (sdt.test(tel)) {
    erollable1.innerHTML = "Hợp lệ";
    erollable1.className = "text-success";
    return true;
  } else {
    erollable1.innerHTML = "Không hợp lệ";
    erollable1.className = "text-danger";
    return false;
  }
}
 function checkAge() {
    const input = document.getElementById("date").value;

    if (!input) {
      alert("Vui lòng chọn ngày sinh!");
      return false;
    }

    const birthDate = new Date(input);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    // Kiểm tra đã qua sinh nhật năm nay chưa
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 16) {
      alert("Bạn chưa đủ 16 tuổi!");
      return false;
    } else {
      alert("Hợp lệ (đủ 16 tuổi)");
      return true;
    }
  }
function ktemail() {
  var mail = document.getElementById("email").value;
  var e_mail = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
  var erollable2 = document.getElementById("er3");
  if (e_mail.test(mail)) {
    erollable2.innerHTML = "Hợp lệ";
    erollable2.className = "text-success";
    return true;
  } else {
    erollable2.innerHTML = "Không hợp lệ";
    erollable2.className = "text-danger";
    return false;
  }
}
function ktpassword() {
  var pass = document.getElementById("pw").value;
  // Regex: ít nhất 6 ký tự, 1 số, 1 chữ thường, 1 chữ hoa, 1 ký tự đặc biệt
  var passw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&]).{6,}$/;
  var erollable3 = document.getElementById("er4");

  if (passw.test(pass)) {
    erollable3.innerHTML = "Hợp lệ";
    erollable3.className = "text-success small";
    return true;
  } else {
    erollable3.innerHTML =
      "Mật khẩu yếu (Cần 6 ký tự, hoa, thường, số, ký tự đặc biệt)";
    erollable3.className = "text-danger small";
    return false;
  }
}

// Hàm mới để hiện/ẩn mật khẩu bằng nút bấm
function togglePassword() {
  var input = document.getElementById("pw");
  var btn = document.getElementById("btnShow");

  if (input.type === "password") {
    input.type = "text";
    btn.innerText = "Ẩn";
    btn.className = "btn btn-secondary"; // Đổi màu nút khi đang hiện
  } else {
    input.type = "password";
    btn.innerText = "Hiện";
    btn.className = "btn btn-outline-secondary";
  }
}
function togglePassword2() {
  var input = document.getElementById("pw2");
  var btn = document.getElementById("btnShow2");

  if (input.type === "password") {
    input.type = "text";
    btn.innerText = "Ẩn";
    btn.className = "btn btn-secondary"; // Đổi màu nút khi đang hiện
  } else {
    input.type = "password";
    btn.innerText = "Hiện";
    btn.className = "btn btn-outline-secondary";
  }
}
// kiểm tra pass word có trùng khớp không
function checkpassword2() {
  var input = document.getElementById("pw").value;
  var input2 = document.getElementById("pw2").value;
  var error6 = document.getElementById("er6");
  if (input2 == input) {
    error6.innerHTML = "Mật khẩu trùng khớp";
    error6.className = "text-success";
    return true;
  } else {
    error6.innerHTML = "Mật chưa khẩu trùng khớp";
    error6.className = "text-danger";
  }
  return false;
}
function kttendn() {
  var tendn = document.getElementById("name23").value;
  var regexdn = /^.{5,12}$/;
  var er5 = document.getElementById("er66");
  if (regexdn.test(tendn)) {
    er5.innerHTML = "Hợp lệ";
    er5.className = "text-success";
    return true;
  } else {
    er5.innerHTML = "Không hợp lệ";
    er5.className = "text-danger";
  }
  return false;
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Chạy các hàm kiểm tra đã viết
        const okName = ktten();
        const okTel = kttel();
        const okEmail = ktemail();
        const okNe = kttendn();
        const okPass = ktpassword();
        const okPass2 = document.getElementById("pw").value === document.getElementById("pw2").value;

        if (okName && okTel && okEmail && okPass && okPass2 && okNe) {
            // 1. Lấy dữ liệu từ form
            const username = document.getElementById("name23").value;
            const password = document.getElementById("pw").value;

            // 2. Lấy danh sách tài khoản đã có trong LocalStorage (nếu chưa có thì tạo mảng rỗng)
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // 3. Kiểm tra xem tên đăng nhập này đã tồn tại chưa
            const isExisted = users.some(user => user.username === username);

            if (isExisted) {
                alert("Tên đăng nhập này đã có người sử dụng. Vui lòng chọn tên khác!");
                return; // Dừng lại không lưu
            }

            // 4. Thêm tài khoản mới vào mảng
            users.push({
                username: username,
                password: password
            });

            // 5. Lưu mảng ngược lại vào LocalStorage
            localStorage.setItem("users", JSON.stringify(users));

            alert("Đăng ký thành công! Đang chuyển đến trang đăng nhập...");
            
            // 6. Chuyển hướng sang trang đăng nhập
            window.location.href = "login.html"; 

        } else {
            alert("Vui lòng nhập đúng và đầy đủ thông tin trước khi lưu!");
        }
    });
});

 function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('preview');
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview');
    const errorSpan = document.getElementById('erFile');

    if (file) {
      const fileName = file.name.toLowerCase();
      const validExtensions = /\.(jpg|jpeg|png|gif)$/i;

      if (!validExtensions.test(fileName)) {
        errorSpan.textContent = "Chỉ chấp nhận ảnh JPG, PNG, GIF.";
        preview.style.display = "none";
        preview.src = "";
        return;
      }

      errorSpan.textContent = ""; // xoá lỗi nếu hợp lệ
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = "block";
      }
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
      preview.style.display = "none";
    }
  }
