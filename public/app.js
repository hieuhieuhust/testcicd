import { addTask, toggleTask, removeTask, loadTasks } from "./tasks.js";

const storageKey = "cicd-task-board-v1";
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const empty = document.querySelector("#empty");
const count = document.querySelector("#count");
let tasks = loadTasks(localStorage.getItem(storageKey));

function saveAndRender(nextTasks) {
  tasks = nextTasks;
  localStorage.setItem(storageKey, JSON.stringify(tasks));
  render();
}

function render() {
  list.replaceChildren();
  empty.hidden = tasks.length > 0;
  const remaining = tasks.filter((task) => !task.done).length;
  count.textContent = `${remaining} việc còn lại`;

  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = task.done ? "done" : "";

    const check = document.createElement("button");
    check.type = "button";
    check.className = "check";
    check.textContent = task.done ? "✓" : "";
    check.setAttribute("aria-label", task.done ? `Đánh dấu chưa xong: ${task.title}` : `Đánh dấu hoàn thành: ${task.title}`);
    check.addEventListener("click", () => saveAndRender(toggleTask(tasks, task.id)));

    const title = document.createElement("span");
    title.className = "task-text";
    title.textContent = task.title;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Xóa: ${task.title}`);
    remove.addEventListener("click", () => saveAndRender(removeTask(tasks, task.id)));

    item.append(check, title, remove);
    list.append(item);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nextTasks = addTask(tasks, input.value, crypto.randomUUID());
  if (nextTasks !== tasks) {
    saveAndRender(nextTasks);
    form.reset();
    input.focus();
  }
});

render();
