// Näyttää ja piilottaa tehtävälistan
function toggleTaskList() {
  const list = document.getElementById('taskList');
  list.classList.toggle('hidden');
}
//Sama kuin ylemmässä mutta tehtävissä
function toggleCompleted() {
  const completed = document.getElementById('completedItems');
  completed.classList.toggle('hidden');
}
//Lisätään local storageen 
function addTask() {
  const taskText = document.getElementById('newTaskInput').value.trim();
  const taskDate = document.getElementById('newTaskDate').value;
  const taskDesc = document.getElementById('newTaskDescription').value.trim();

  if (!taskText) return; //Varmistetaan että ei voi lisätä tyhjää tehtävää
  //Tehtävän objekti
  const newTask = {
    name: taskText,
    date: taskDate || null, 
    description: taskDesc || null,
    done: false
  };

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  //Lisätään tehtävä objektit oikeaan listaan
  const li = createTaskElement(newTask);
  document.getElementById('taskItems').appendChild(li);
  document.getElementById('newTaskInput').value = '';
  document.getElementById('newTaskDate').value = '';
  document.getElementById('newTaskDescription').value = '';
  if (newTask.done) {
    document.getElementById('completedItems').appendChild(li);
  } else {
    document.getElementById('taskItems').appendChild(li);
  }
  //Kerrotaan käyttäjälle että tehtävä on lisätty
  const notice = document.createElement('div');
  notice.textContent = "Tehtävä lisätty!";
  notice.style.color = "green";
  notice.style.marginTop = "10px";
  document.querySelector('.container').prepend(notice);
  setTimeout(() => notice.remove(), 3000);
}
// Luo uuden tehtäväelementin
function createTaskElement(taskObj) {
  const li = document.createElement('li');
if (taskObj.done) {
  const doneLabel = document.createElement('span');
  doneLabel.textContent = "✅ Valmis";
  doneLabel.style.color = "green";
  li.appendChild(doneLabel);
} else {
  li.style.backgroundColor = '#fff';
}
  // Näytetään tehtävän nimi ja päivämäärä
  const taskSpan = document.createElement('span');
  taskSpan.textContent = `${taskObj.name} - ${taskObj.date}`;

  const commentInfo = document.createElement('div');
  commentInfo.className = 'comment-info';
  // Jos tehtävällä on kuvaus, näytetään se
  if (taskObj.description) {
    const desc = document.createElement('div');
    desc.textContent = "Kuvaus: " + taskObj.description;
    desc.style.fontSize = "14px";
    desc.style.color = "#555";
    li.appendChild(desc);
  }
  // Haetaan mahdollinen valmis-kommentti ja näytetään
  const completed = JSON.parse(localStorage.getItem('completedTasks')) || {};
  if (completed[taskObj.name]) {
    const commentText = document.createElement('p');
    commentText.textContent = `Kommentti: ${completed[taskObj.name]}`;
    commentText.style.fontStyle = 'italic';
    commentText.style.color = 'green';
    commentInfo.appendChild(commentText);
  }
  // Muokkaa-nappi
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Muokkaa';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => editTask(taskSpan, li, taskObj);
  // Poista-nappi
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Poista';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    removeTaskFromStorage(taskObj.name);
    li.remove();
  };
   // Lisätään elementit listaan
  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  li.appendChild(commentInfo);

  return li;
}
//Muokkaus objekti
function editTask(taskSpan, li, taskObj) {
  // Nimi input
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = taskObj.name;

  // Päivämäärä input
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = taskObj.date || '';

  // Kuvaus input (textarea)
  const descInput = document.createElement('textarea');
  descInput.placeholder = "Kuvaus (valinnainen)";
  descInput.value = taskObj.description || '';
  descInput.rows = 2;

  // Piilotetaan muokkaa-nappi
  const editBtn = li.querySelector('.edit-btn');
  editBtn.style.display = 'none';

  // Poistetaan alkuperäinen span ja lisätään muokkauskentät
  li.replaceChild(nameInput, taskSpan);
  li.insertBefore(dateInput, editBtn);
  li.insertBefore(descInput, editBtn);

  // "Valmis"-nappi
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Valmis';
  saveBtn.className = 'save-btn';
  //Tallenetaan muutokset
  saveBtn.onclick = () => {
    const newName = nameInput.value.trim();
    const newDate = dateInput.value;
    const newDesc = descInput.value.trim();

    if (newName !== '') {
      taskSpan.textContent = newName + (newDate ? " - " + newDate : "");
      updateTaskInStorage(taskObj.name, newName, newDate, newDesc);
    }

    li.replaceChild(taskSpan, nameInput);
    li.removeChild(dateInput);
    li.removeChild(descInput);
    li.removeChild(saveBtn);
    editBtn.style.display = 'inline-block';
  };

  li.appendChild(saveBtn);
  nameInput.focus();
}
// Päivittää muokatun tehtävän localStorageen
function updateTaskInStorage(oldName, newName, newDate, newDesc) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task =>
    task.name === oldName ? { ...task, name: newName, date: newDate, description: newDesc } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Poistaa tehtävän localStoragesta
function removeTaskFromStorage(taskName) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t.name !== taskName);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Näyttää alertin jaetusta listasta
function shareList() {
  alert("Lista jaettu!");
}
// Kun sivu latautuu, haetaan tallennetut tehtävät ja näytetään ne
window.onload = function () {
  const taskList = document.getElementById('taskItems');
  const completedList = document.getElementById('completedItems');
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  taskList.innerHTML = '';
  completedList.innerHTML = '';

  if (savedTasks.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = "Ei tehtäviä vielä.";
    emptyMsg.style.color = "gray";
    taskList.appendChild(emptyMsg);
  } else {
    savedTasks.forEach(task => {
      const li = createTaskElement(task);
      if (task.done) {
        completedList.appendChild(li);
      } else {
        taskList.appendChild(li);
      }
    });
  }
};
