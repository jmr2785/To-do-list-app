const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterDate = document.getElementById("filterDate");

// Load saved tasks
window.onload = () => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(t => addTask(t.text, t.completed, t.date));
};

addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;

    const dateValue = taskDate.value || new Date().toISOString().split("T")[0];

    addTask(taskInput.value, false, dateValue);
    saveTasks();
    taskInput.value = "";
});

function addTask(text, completed, date) {
    const li = document.createElement("li");

    if (completed) li.classList.add("completed");

    li.innerHTML = `
        <div>
            <span class="task-text">${text}</span>
            <span class="task-date">${date}</span>
        </div>
        <button class="delete">X</button>
    `;

    li.addEventListener("click", e => {
        if (e.target.classList.contains("delete")) return;
        li.classList.toggle("completed");
        saveTasks();
    });

    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").textContent,
            date: li.querySelector(".task-date").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

filterDate.addEventListener("change", () => {
    const selected = filterDate.value;
    const items = document.querySelectorAll("li");

    items.forEach(li => {
        const taskDate = li.querySelector(".task-date").textContent;
        li.style.display = !selected || taskDate === selected ? "flex" : "none";
    });
});
