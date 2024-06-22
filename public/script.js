document.addEventListener("DOMContentLoaded", function () {
  // Menginstalasi datepicker menggunakan flatpickr
  flatpickr("#datepicker", {
    dateFormat: "Y-m-d",
    defaultDate: "today",
    allowInput: true,
  });

  // Fungsi untuk memperbarui tanggal dan waktu
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDateTime = now.toLocaleDateString("id-ID", options);
    document.getElementById("current-datetime").textContent = formattedDateTime;
  }

  // Memperbarui tanggal dan waktu saat ini dan setiap detik
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Menambahkan event listener pada form untuk menangani submit event
  document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Mengambil nilai dari input form dan menghapus spasi di awal dan akhir
    const todoName = document.getElementById("todo-name").value.trim();
    const todoPosition = document.getElementById("todo-position").value.trim();
    const todoInput = document.getElementById("todo-input").value.trim();
    const todoDescription = document
      .getElementById("todo-description")
      .value.trim();
    const todoPriority = document.getElementById("todo-priority").value;
    const todoDate = document.getElementById("datepicker").value.trim();

    // Memastikan bahwa semua input yang diperlukan tidak kosong
    if (todoName && todoPosition && todoInput && todoDate) {
      // Membuat objek todo baru dengan nilai yang diambil dari form
      const todo = {
        name: todoName,
        position: todoPosition,
        task: todoInput,
        description: todoDescription,
        priority: todoPriority,
        date: todoDate,
      };

      // Mengambil daftar todo dari localStorage atau membuat array baru jika belum ada
      let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
      // Menambahkan todo baru ke daftar
      todoList.push(todo);
      // Menyimpan kembali daftar todo yang diperbarui ke localStorage
      localStorage.setItem("todoList", JSON.stringify(todoList));

      // Mereset form setelah data berhasil disimpan
      document.getElementById("todo-form").reset();

      // Tampilkan modal sukses jika ada, jika tidak ada, tampilkan alert
      const modal = document.getElementById("success-modal");
      if (modal) {
        // Menghapus kelas "hidden" untuk menampilkan modal
        modal.classList.remove("hidden");
      } else {
        // Menampilkan pesan sukses menggunakan alert jika modal tidak ditemukan
        alert("Task added successfully!");
      }
    }
  });
});
