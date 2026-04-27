function submitComment(event) {
  event.preventDefault(); // chặn reload

  const name = document.getElementById("usernameh").value.trim();
  const phone = document.getElementById("phoneh").value.trim();
  const email = document.getElementById("emailh").value.trim();
  const comment = document.getElementById("commentInputh").value.trim();

  // Regex
  const nameRegex = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/; 
  const phoneRegex = /^(03|05|06|07|08|09)[0-9]{8}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  let valid = true;

  // Reset lỗi
  document.getElementById("errName").textContent = "";
  document.getElementById("errPhone").textContent = "";
  document.getElementById("errEmail").textContent = "";
  document.getElementById("errComment").textContent = "";

  if (!nameRegex.test(name)) {
    document.getElementById("errName").textContent = "Tên phải có ít nhất 2 từ, mỗi từ viết hoa chữ cái đầu.";
    valid = false;
  }
  if (!phoneRegex.test(phone)) {
    document.getElementById("errPhone").textContent = "SĐT phải bắt đầu bằng 03,05,06,07,08,09 và có đúng 10 số.";
    valid = false;
  }
  if (!emailRegex.test(email)) {
    document.getElementById("errEmail").textContent = "Email không hợp lệ.";
    valid = false;
  }
  if (comment.length === 0) {
    document.getElementById("errComment").textContent = "Vui lòng nhập bình luận.";
    valid = false;
  }

  if (valid) {
    // thêm bình luận vào danh sách
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 mb-3";

    const div = document.createElement("div");
    div.className = "comment-box-display";
    div.innerHTML = `<strong>${name}:</strong> ${comment}`;

    col.appendChild(div);
    document.getElementById("commentSection").appendChild(col);

    // reset ô nhập
    document.getElementById("username").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("commentInput").value = "";

    col.scrollIntoView({ behavior: "smooth" });
  }

  return false;
}



