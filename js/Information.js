document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("formLienHe");
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("hoVaTen").value.trim();
    const email = document.getElementById("thuDienTu").value.trim();
    const message = document.getElementById("noiDungLienHe").value.trim();

    const nameParts = name.split(" ").filter(part => part !== "");
    const validName = nameParts.length >= 2 && nameParts.every(part => /^[A-Z][a-zA-ZÀ-ỹ]*$/.test(part));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);

    const validMessage = message.length > 0;

    if(!validName){
      alert("Tên phải có ít nhất 2 từ và viết hoa chữ cái đầu mỗi từ.");
      return;
    }
    if(!validEmail){
      alert("Email không hợp lệ.");
      return;
    }
    if(!validMessage){
      alert("Nội dung không được để trống.");
      return;
    }

    alert("Form hợp lệ! Đang gửi liên hệ...");

    const contactModalEl = document.getElementById('contactModal');
    if(contactModalEl){
      const contactModal = bootstrap.Modal.getInstance(contactModalEl);
      if(contactModal){ contactModal.hide(); }
    }
  });
});