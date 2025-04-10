const taskConatiner = document.getElementById("app");

// Lista de tareas mockeadas
let tasks = taskTitles.map((title, index) => {
  return new Task(title, taskDescriptions[index], getRandomFutureDate());
});

function loadData() {
  if (tasks.length > 0) {
    // implementar el renderizado de las tareas
  } else {
    taskConatiner.innerHTML = `<div class="text-center text-gray-400 text-2xl">No hay tareas</div>`;
  }
}

function postData(event) {
  event.preventDefault();

  try {
    // Get form data

    saveTask(task);
    form.reset();
    const modal = document.getElementById("task-modal");
    modal.checked = false;
    showNotification("Tarea añadida correctamente!");
  } catch (error) {
    showNotification("Error al añadir la tarea. Inténtalo de nuevo.");
  }
}

/**
 *  
 * task actions 
 * 
 * */

function saveTask(task) {
  // implementar la creación de la tarea
  console.log(task);

  loadData();
}

function deleteTask(id) {
  // implementar la eliminación de la tarea

  loadData();
}

/**
 * challenges
 * 
 * */

// Aqui implementar la logica para la busqueda de tareas
function handleChangeFindTask(event) {
  event.preventDefault();
}

// Aqui implementar la logica para eliminar tareas
function handleDeleteTask(id) {}

// Aqui implementar la ogica de ver la cnatidad de tareas

// Aqui implementar la logica de ver la cantidad de tareas completadas

// Aqui implementar la logica de ver la cantidad de tareas pendientes

// Aqui implementar la logica de ver la cantidad de tareas en progreso