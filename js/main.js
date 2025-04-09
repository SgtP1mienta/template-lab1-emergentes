const taskConatiner = document.getElementById("app");

class Task {
  constructor(name, description, dueDate) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.status = "in-progress";
    this.progress = 0;
  }

  buildTaskCard() {
    return `<div class="glass-card rounded-lg p-4 mb-4 flex flex-col">
                      <div class="flex justify-between items-start mb-2">
                          <div class="flex items-center gap-3">
                              <div class="task-status" style="background: ${this.status === 'completed' ? 'var(--secondary)' : 'var(--accent)'};"></div>
                              <h3 class="text-xl font-semibold">${this.name}</h3>
                          </div>
                          <div class="flex gap-2">
                              <button class="p-2 rounded-full hover:bg-[rgba(0,247,255,0.1)] transition-all">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--primary)]"
                                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                              </button>
                              <button class="p-2 rounded-full hover:bg-[rgba(255,0,128,0.1)] transition-all">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--accent)]" fill="none"
                                      viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                              </button>
                          </div>
                      </div>
                      <p class="text-gray-300 mb-3">${this.description}</p>
                      <div class="mt-auto">
                          <div class="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Progreso: 30%</span>
                              <span>Vence: ${this.dueDate}</span>
                          </div>
                          <div class="progress-bar w-full">
                              <div class="h-full bg-[var(--secondary)]" style="width: ${this.progress}%"></div>
                          </div>
                      </div>
                  </div>`;
  }
}

function loadData() {
  if (localStorage.getItem("tasks")) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    taskConatiner.innerHTML = tasks
      .map((task) =>
        new Task(task.name, task.description, task.dueDate).buildTaskCard()
      )
      .join("");
  } else {
    taskConatiner.innerHTML = `<div class="text-center text-gray-400">No hay tareas</div>`;
  }
}

// Placeholder for the postData function
function postData(event) {
  event.preventDefault();
  try {
    const form = event.target;

    const name = form.name.value;
    const description = form.description.value;
    const dueDate = form.due_date.value;
    const task = new Task(name, description, dueDate);
    // tasks.push(task);
    saveTaskInLocalStorage(task);
    document.getElementById("task-modal").checked = false;
    form.reset();
    loadData();
    showNotification("Tarea creada con éxito");
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    showNotification("Error al crear la tarea");
  }
}

function saveTaskInLocalStorage(task) {
  if (!localStorage.getItem("tasks")) {
    let tasksArray = [];
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  } else {
    let tasksStorage;
    try {
      tasksStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      tasksStorage = [];
    }
    tasksStorage.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksStorage));
  }
}
