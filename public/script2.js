document.addEventListener("DOMContentLoaded", function () {
  // Mengambil daftar tugas dari localStorage atau membuat daftar kosong jika tidak ada
  const taskList = JSON.parse(localStorage.getItem("todoList")) || [];
  const taskListContainer = document.getElementById("task-list");

  // Iterasi melalui setiap tugas dalam daftar dan membuat baris tabel untuk setiap tugas
  taskList.forEach((task, index) => {
    const row = document.createElement("tr");

    // Menambahkan kelas coretan jika tugas selesai
    if (task.completed) {
      row.classList.add("line-through");
    }

    // Membuat sel tombol hapus
    const deleteButtonCell = document.createElement("td");
    deleteButtonCell.classList.add("border");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "px-3",
      "py-1",
      "bg-red-500",
      "text-white",
      "rounded",
      "hover:bg-red-600"
    );
    // Menambahkan event listener untuk menghapus tugas
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(deleteButtonCell);

    // Membuat sel checkbox
    const checkboxCell = document.createElement("td");
    checkboxCell.classList.add("text-center", "border");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    // Menambahkan event listener untuk toggle tugas selesai
    checkbox.addEventListener("change", function () {
      toggleCompleted(index, row);
    });
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    // Membuat sel untuk setiap atribut tugas
    const columns = [
      "name",
      "position",
      "task",
      "description",
      "priority",
      "date",
    ];
    columns.forEach((column) => {
      const cell = document.createElement("td");
      cell.textContent = task[column];
      cell.classList.add("py-2", "px-4", "border");
      row.appendChild(cell);
    });

    // Menambahkan baris ke container daftar tugas
    taskListContainer.appendChild(row);
  });

  // Fungsi untuk menghapus tugas
  function deleteTask(index) {
    let taskList = JSON.parse(localStorage.getItem("todoList")) || [];
    taskList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(taskList));
    location.reload(); // Memuat ulang halaman untuk memperbarui daftar tugas
  }

  // Fungsi untuk toggle tugas selesai
  function toggleCompleted(index, row) {
    let taskList = JSON.parse(localStorage.getItem("todoList")) || [];
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem("todoList", JSON.stringify(taskList));

    // Menambahkan atau menghapus kelas coretan pada baris
    if (taskList[index].completed) {
      row.classList.add("line-through");
    } else {
      row.classList.remove("line-through");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Mengambil tanggal yang dipilih dari localStorage
  const selectedDate = localStorage.getItem("selectedDate");

  // Menampilkan tanggal yang dipilih di elemen HTML dengan id "selected-date"
  const selectedDateElement = document.getElementById("selected-date");
  if (selectedDateElement) {
    selectedDateElement.textContent = selectedDate;
  }
});

function goToIndex() {
  // Mengarahkan kembali ke halaman index
  window.location.href = "index.html"; // Ganti 'index.html' dengan nama halaman index Anda
}

document.addEventListener("DOMContentLoaded", function () {
  const taskListContainer = document.getElementById("task-list");
  const doneTaskListContainer = document.getElementById("task-list-done");

  // Fungsi untuk memindahkan task yang sudah selesai ke dalam task list done
  function moveTaskToDone(index, task) {
    let doneTaskList = JSON.parse(localStorage.getItem("doneTaskList")) || [];
    doneTaskList.push(task);
    localStorage.setItem("doneTaskList", JSON.stringify(doneTaskList));

    // Hapus task dari task list yang belum selesai
    let taskList = JSON.parse(localStorage.getItem("todoList")) || [];
    taskList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(taskList));

    // Perbarui tampilan di HTML
    renderTaskList();
    renderDoneTaskList();
  }

  // Render ulang task list yang belum selesai
  function renderTaskList() {
    taskListContainer.innerHTML = ""; // Kosongkan kontainer sebelum diisi ulang

    let taskList = JSON.parse(localStorage.getItem("todoList")) || [];

    taskList.forEach((task, index) => {
      const row = createTaskRow(task, index);
      taskListContainer.appendChild(row);
    });
  }

  // Render ulang task list yang sudah selesai
  function renderDoneTaskList() {
    doneTaskListContainer.innerHTML = ""; // Kosongkan kontainer sebelum diisi ulang

    let doneTaskList = JSON.parse(localStorage.getItem("doneTaskList")) || [];

    doneTaskList.forEach((task, index) => {
      const row = createTaskRow(task, index, true); // Tandai sebagai task yang sudah selesai
      doneTaskListContainer.appendChild(row);
    });
  }

  // Fungsi pembantu untuk membuat baris task dalam tabel
  function createTaskRow(task, index, completed = false) {
    const row = document.createElement("tr");

    // Tambahkan kelas untuk efek coretan jika task sudah selesai
    if (completed) {
      row.classList.add("line-through");
    }

    // Tombol delete
    const deleteButtonCell = document.createElement("td");
    deleteButtonCell.classList.add("border");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "px-3",
      "py-1",
      "bg-red-500",
      "text-white",
      "rounded",
      "hover:bg-red-600"
    );
    deleteButton.addEventListener("click", function () {
      deleteTask(index, completed);
    });
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(deleteButtonCell);

    // Checkbox untuk menandai task sebagai selesai
    const checkboxCell = document.createElement("td");
    checkboxCell.classList.add("text-center", "border");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        moveTaskToDone(index, task);
      }
    });
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    // Kolom-kolom lainnya
    const columns = [
      "name",
      "position",
      "task",
      "description",
      "priority",
      "date",
    ];
    columns.forEach((column) => {
      const cell = document.createElement("td");
      cell.textContent = task[column];
      cell.classList.add("py-2", "px-4", "border");
      row.appendChild(cell);
    });

    return row;
  }

  // Fungsi untuk menghapus task dari localStorage dan render ulang tampilan
  function deleteTask(index, completed) {
    if (completed) {
      let doneTaskList = JSON.parse(localStorage.getItem("doneTaskList")) || [];
      doneTaskList.splice(index, 1);
      localStorage.setItem("doneTaskList", JSON.stringify(doneTaskList));
      renderDoneTaskList();
    } else {
      let taskList = JSON.parse(localStorage.getItem("todoList")) || [];
      taskList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(taskList));
      renderTaskList();
    }
  }

  // Panggil fungsi untuk pertama kali saat halaman dimuat
  renderTaskList();
  renderDoneTaskList();
});

// Fungsi untuk kembali ke halaman utama
function goToIndex() {
  window.location.href = "index.html";
}
