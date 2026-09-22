export function addTask(tasks, text, id) {
  const title = text.trim();
  if (!title) return tasks;
  return [...tasks, { id, title, done: false }];
}

export function toggleTask(tasks, id) {
  return tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task);
}

export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function loadTasks(value) {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((task) =>
      task && typeof task.id === "string" && typeof task.title === "string" && typeof task.done === "boolean"
    );
  } catch {
    return [];
  }
}
