function toggleTaskList() {
  const list = document.getElementById('taskList');
  list.classList.toggle('hidden');
}

function addTask() {
  const taskText = document.getElementById('newTaskInput').value.trim();
  const taskDate = document.getElementById('newTaskDate').value;

  if (!taskText || !taskDate) return;

  const newTask = {
    name: taskText,
    date: taskDate,
    done: false
  };

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  const li = createTaskElement(newTask);
  document.getElementById('taskItems').appendChild(li);
  document.getElementById('newTaskInput').value = '';
  document.getElementById('newTaskDate').value = '';
}

function createTaskElement(taskObj) {
  const li = document.createElement('li');

  const taskSpan = document.createElement('span');
  taskSpan.textContent = `${taskObj.name} - ${taskObj.date}`;

  const commentInfo = document.createElement('div');
  commentInfo.className = 'comment-info';

  const completed = JSON.parse(localStorage.getItem('completedTasks')) || {};
  if (completed[taskObj.name]) {
    const commentText = document.createElement('p');
    commentText.textContent = `Kommentti: ${completed[taskObj.name]}`;
    commentText.style.fontStyle = 'italic';
    commentText.style.color = 'green';
    commentInfo.appendChild(commentText);
  }

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Muokkaa';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => editTask(taskSpan, li, taskObj);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Poista';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    removeTaskFromStorage(taskObj.name);
    li.remove();
  };

  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  li.appendChild(commentInfo);

  return li;
}

function editTask(taskSpan, li, taskObj) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = taskObj.name;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Valmis';
  saveBtn.className = 'save-btn';
  saveBtn.onclick = () => {
    const newText = input.value.trim();
    if (newText !== '') {
      taskSpan.textContent = `${newText} - ${taskObj.date}`;
      updateTaskInStorage(taskObj.name, newText);
    }
    li.replaceChild(taskSpan, input);
    li.removeChild(saveBtn);
  };

  li.replaceChild(input, taskSpan);
  li.appendChild(saveBtn);
}

function updateTaskInStorage(oldName, newName) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task =>
    task.name === oldName ? { ...task, name: newName } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskName) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t.name !== taskName);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function shareList() {
  alert("Lista jaettu! (tässä voisi olla jakolinkin generointi)");
}

window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const completed = JSON.parse(localStorage.getItem('completedTasks')) || [];

  const listElement = document.getElementById('taskItems');
  listElement.innerHTML = "";

  savedTasks.forEach(task => {
    if (completed[task.name]) {
      task.done = true;
    }

    const li = createTaskElement(task);
    listElement.appendChild(li);
  });
};
