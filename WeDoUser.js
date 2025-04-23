let currentTask = null;

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const sortedTasks = [...tasks].sort((a, b) => a.done - b.done);

  sortedTasks.forEach((task, index) => {
    const now = new Date();
    const dueDate = new Date(task.date);
    const timeDiff = (dueDate - now) / (1000 * 60 * 60 * 24);

    const taskDiv = document.createElement("div");
    taskDiv.className = "task" + (task.done ? " done" : "");

    const name = document.createElement("div");
    name.className = "task-name";
    name.textContent = task.name;
    taskDiv.appendChild(name);

    const date = document.createElement("div");
    date.className = "date-box " + (timeDiff < 2 ? "date-red" : "date-yellow");
    date.textContent = task.date;
    taskDiv.appendChild(date);

    const extra = document.createElement("div");
    extra.className = "extra-info";
    extra.textContent = "Lisätietoja";
    taskDiv.appendChild(extra);

    const commentBtn = document.createElement("button");
    commentBtn.textContent = "Open Task";
    commentBtn.onclick = () => openComment(task.name);
    taskDiv.appendChild(commentBtn);

    if (!task.done) {
      const check = document.createElement("button");
      check.className = "check-button";
      check.textContent = "✔";
      check.onclick = () => {
        tasks[index].done = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      };
      taskDiv.appendChild(check);
    }

    list.appendChild(taskDiv);
  });
}

function openComment(task) {
  currentTask = task;

  const popup = document.getElementById('popupOverlay');
  popup.classList.remove('hidden');

  document.getElementById('taskTitle').textContent = task;

  const comments = JSON.parse(localStorage.getItem('comments')) || {};
  const textarea = popup.querySelector('textarea');
  textarea.value = comments[task] || '';
}

function closeComment() {
  const popup = document.getElementById('popupOverlay');
  popup.classList.add('hidden');
  currentTask = null;
}

function markTaskDone() {
  const popup = document.getElementById('popupOverlay');
  const textarea = popup.querySelector('textarea');
  const comment = textarea.value;

  const comments = JSON.parse(localStorage.getItem('comments')) || {};
  comments[currentTask] = comment;
  localStorage.setItem('comments', JSON.stringify(comments));

  const completed = JSON.parse(localStorage.getItem('completedTasks')) || {};
  completed[currentTask] = comment;
  localStorage.setItem('completedTasks', JSON.stringify(completed));

  alert(`Tehtävä "${currentTask}" merkitty valmiiksi!`);
  closeComment();
  renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});
