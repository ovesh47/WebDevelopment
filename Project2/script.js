// Get DOM elements
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Where we'll keep tasks in memory (and sync with localStorage)
let tasks = [];

// Load tasks from localStorage when the page loads
function loadTasks() {
  const raw = localStorage.getItem('tasks');
  if (raw) {
    try {
      tasks = JSON.parse(raw);
    } catch (e) {
      tasks = [];
    }
  }
}

// Save current tasks array to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render the tasks array to the DOM
function renderTasks() {
  taskList.innerHTML = ''; // clear current list

  // create <li> for each task object
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    // left area: checkbox + text
    const left = document.createElement('div');
    left.className = 'left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('click', (e) => {
      e.stopPropagation(); // avoid also toggling li click
      toggleDone(index);
    });

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = task.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    // right area: delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent parent handlers
      deleteTask(index);
    });

    // apply done style on the li if task.done is true
    if (task.done) {
      li.classList.add('done');
    } else {
      li.classList.remove('done');
    }

    // make clicking the list item toggle done too (optional UX)
    li.addEventListener('click', () => {
      toggleDone(index);
    });

    li.appendChild(left);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add new task
function addTask(text) {
  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
}

// Delete task by index
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Toggle done state for a task
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}
// Wire up the Add button
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText === '') return;
  addTask(taskText);
  input.value = '';
  input.focus();
});

// Allow Enter key to add task
input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

// Initial load
loadTasks();
renderTasks();
// Save snapshot as PNG using html2canvas
const saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click', () => {
  // Choose the DOM node to capture. Use the app container if you have one,
  // otherwise fallback to the whole body or to the taskList element.
  const nodeToCapture = document.querySelector('.app') || document.body;

  // html2canvas options: increase scale for better quality
  html2canvas(nodeToCapture, { scale: 2, useCORS: true }).then(canvas => {
    // Convert canvas to blob and trigger download
    canvas.toBlob(blob => {
      if (!blob) {
        alert('Failed to create image');
        return;
      }
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);

      // filename with timestamp
      const timestamp = new Date().toISOString().slice(0,19).replace(/[:T]/g, '-');
      a.href = url;
      a.download = `todo-${timestamp}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }).catch(err => {
    console.error('html2canvas error:', err);
    alert('Could not capture image. See console for details.');
  });
});
