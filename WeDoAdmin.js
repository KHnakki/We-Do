function toggleTaskList() {
    const list = document.getElementById('taskList');
    list.classList.toggle('hidden');
  }
  
  function addTask() {
    const taskText = document.getElementById('newTaskInput').value.trim();
    if (!taskText) return;
  
    const li = createTaskElement(taskText);
    document.getElementById('taskItems').appendChild(li);
    document.getElementById('newTaskInput').value = '';

    //Tallennus LocalStorageen//
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //Talennuksen testi//
    console.log("Tallennetut tehtävät:", localStorage.getItem('tasks'));
  }
  
  function createTaskElement(text) {
    const li = document.createElement('li');
  
    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
  
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Muokkaa';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editTask(taskSpan, li);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Poista';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      removeTaskFromStorage(text);
      li.remove();
    };
  
    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
  
    return li;
  }
  
  function editTask(taskSpan, li) {
    const currentText = taskSpan.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
  
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Valmis';
    saveBtn.className = 'save-btn';
    saveBtn.onclick = () => {
      const newText = input.value.trim();
      if (newText !== '') {
        taskSpan.textContent = newText;
      }
      li.replaceChild(taskSpan, input);
      li.removeChild(saveBtn);
    };
  
    li.replaceChild(input, taskSpan);
    li.appendChild(saveBtn);
  }
  
  function shareList() {
    alert("Lista jaettu! (tässä voisi olla jakolinkin generointi)");
  }

  //Tallentaa edillisen kerran listan//
  window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
      const li = createTaskElement(taskText);
      document.getElementById('taskItems').appendChild(li);
    });
  };

  //Poistaa myös LocalStoragesta//
  function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
