//menggunkaan hingga seluruh  konten halaman dimuat sebelum menjalankan script javascrpit

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#datepicker", {
    dateFormat: "Y-m-d",
    defaultDate: "today",
    allowInput: true,
  });

  //menginstalasi datapicker menggunakan flatpick
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

  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Menambahkan event listener pada form untuk menangani submit event
  document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Mendapatkan nilai dari input form dan menghapus spasi di awal dan akhir
    const todoName = document.getElementById("todo-name").value.trim();
    const todoPosition = document.getElementById("todo-position").value.trim();
    const todoInput = document.getElementById("todo-input").value.trim();
    const todoDescription = document
      .getElementById("todo-description")
      .value.trim();
    const todoPriority = document.getElementById("todo-priority").value;
    const todoDate = document.getElementById("datepicker").value.trim();

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

      let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
      todoList.push(todo);
      localStorage.setItem("todoList", JSON.stringify(todoList));

      document.getElementById("todo-form").reset();

      // Tampilkan modal sukses
      const modal = document.getElementById("success-modal");
      modal.classList.remove("hidden");
    }
  });
});
