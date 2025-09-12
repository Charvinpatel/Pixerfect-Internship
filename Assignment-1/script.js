document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const dateEl = document.getElementById("date");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";

  const save = () => localStorage.setItem("tasks", JSON.stringify(tasks));

  dateEl.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Render tasks
  function render() {
    taskList.innerHTML = "";
    let filtered = tasks.filter((t) =>
      currentFilter === "all"
        ? true
        : currentFilter === "completed"
        ? t.completed
        : !t.completed
    );

    filtered.forEach((t, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${t.completed ? "checked" : ""}>
        <span class="${t.completed ? "done" : ""}">${t.text}</span>
        <button>&times;</button>
      `;

      li.querySelector("input").onclick = () => {
        tasks[i].completed = !tasks[i].completed;
        save();
        render();
      };

      li.querySelector("button").onclick = () => {
        tasks.splice(i, 1);
        save();
        render();
      };

      taskList.appendChild(li);
    });
  }

  // Add new task
  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return alert("Please enter a task!");
    tasks.push({ text, completed: false });
    taskInput.value = "";
    save();
    render();
  }

  // Events
  addBtn.onclick = addTask;
  taskInput.onkeypress = (e) => {
    if (e.key === "Enter") addTask();
  };

  filterBtns.forEach(
    (btn) =>
      (btn.onclick = () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        render();
      })
  );

  clearCompletedBtn.onclick = () => {
    tasks = tasks.filter((t) => !t.completed);
    save();
    render();
  };

  render();
});
