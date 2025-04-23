let currentTask = null;

document.addEventListener('DOMContentLoaded', () => {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskListView = document.getElementById('taskListView');

  taskList.forEach(task => {
    const li = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const openBtn = document.createElement('button');
    openBtn.textContent = 'Open Task';
    openBtn.onclick = () => openComment(task);

    li.appendChild(taskText);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(openBtn);

    taskListView.appendChild(li);
  });
});

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

function saveComment() {
  const popup = document.getElementById('popupOverlay');
  const textarea = popup.querySelector('textarea');

  const comment = textarea.value;
  const comments = JSON.parse(localStorage.getItem('comments')) || {};
  comments[currentTask] = comment;
  localStorage.setItem('comments', JSON.stringify(comments));

  alert("Kommentti tallennettu: " + comment);
  closeComment();
}
