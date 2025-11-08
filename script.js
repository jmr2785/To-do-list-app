const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = () => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(t => addTask(t.text, t.completed));
};

addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;
    addTask(taskInput.value, false);
    saveTasks();
    taskInput.value = "";
});

function addTask(text, completed) {
    const li = document.createElement("li");

    if (completed) li.classList.add("completed");

    li.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="delete">X</button>
    `;

    // Toggle complete
    li.addEventListener("click", e => {
        if (e.target.classList.contains("delete")) return;
        li.classList.toggle("completed");
        saveTasks();
    });

    // Delete task
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
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
