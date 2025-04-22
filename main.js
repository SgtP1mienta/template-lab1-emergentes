const taskConatiner = document.getElementById("app");

class Task {
  constructor(name, description, dueDate) {
    this.id = Math.floor(Math.random() * 10000);
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.status = "in-progress";
    this.progress = Math.floor(Math.random() * 100);
  }

  static buildTaskCard(task) {
    return `<div class="glass-card rounded-lg p-4 mb-4 flex flex-col" data-id="${task.id}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-3">
                                <div class="task-status" style="background: ${
                                  task.status === "completed"
                                    ? "var(--secondary)"
                                    : "var(--accent)"
                                };"></div>
                                <h3 class="text-xl font-semibold">${task.name}</h3>
                            </div>
                            <div class="flex gap-2">
                                <button class="p-2 rounded-full hover:bg-[rgba(0,247,255,0.1)] transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--primary)]"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button onclick="deleteTask(${task.id})" class="p-2 rounded-full hover:bg-[rgba(255,0,128,0.1)] transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--accent)]" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p class="text-gray-300 mb-3">${task.description}</p>
                        <div class="mt-auto">
                            <div class="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progreso: 30%</span>
                                <span>Vence: ${task.dueDate}</span>
                            </div>
                            <div class="progress-bar w-full">
                                <div class="h-full bg-[var(--secondary)]" style="width: ${task.progress}%"></div>
                            </div>
                        </div>
                    </div>`;
  }
}

let tasks = taskTitles.map((title, index) => {
  return new Task(title, taskDescriptions[index], getRandomFutureDate());
});

function loadData(filteredTasks = tasks) {
  if (filteredTasks.length > 0) {
    taskConatiner.innerHTML = filteredTasks
      .map((task) => Task.buildTaskCard(task))
      .join("");
  } else {
    taskConatiner.innerHTML = `<div class="text-center text-gray-400 text-2xl">No hay tareas</div>`;
  }
}

function postData(event) {
  event.preventDefault();

  try {
    saveTask(task);
    form.reset();
    const modal = document.getElementById("task-modal");
    modal.checked = false;
    showNotification("Tarea añadida correctamente!");
  } catch (error) {
    showNotification("Error al añadir la tarea. Inténtalo de nuevo.");
  }
}

function saveTask(task) {
  tasks.push(task);
  loadData();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  loadData();
}

document.getElementById("search-input").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
  );
  loadData(filteredTasks);
});

// Aquí podrías implementar más lógicas para estadísticas (pendientes, completadas, etc.)

function countTasksByStatus(status) {
  return tasks.filter((task) => task.status === status).length;
}

function countTotalTasks() {
  return tasks.length;
}

function countPendingTasks() {
  return countTasksByStatus("in-progress");
}

function countCompletedTasks() {
  return countTasksByStatus("completed");
}

function countOverdueTasks() {
  return tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== "completed"
  ).length;
}
