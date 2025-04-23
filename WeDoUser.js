const tasks = [
    { name: "Astianpesu", date: "2025-05-01", done: false },
    { name: "Imurointi", date: "2025-05-18", done: false },
    { name: "Vessan pesu", date: "2025-05-18", done: false }
  ];
  
  function renderTasks() {
    const list = document.getElementById("task-list");
    list.innerHTML = "";
  
    // Järjestä niin, että tehdyt ovat listan lopussa
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
  
      if (!task.done) {
        const check = document.createElement("button");
        check.className = "check-button";
        check.textContent = "✔";
        check.onclick = () => {
          tasks[index].done = true;
          renderTasks();
        };
        taskDiv.appendChild(check);
      }
  
      list.appendChild(taskDiv);
    });
  }
  
  renderTasks();
