let currentTask = null;

// Tämä funktio renderöi kaikki tehtävät sivulle
function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  // Haetaan tehtävät ja kommentit localStoragesta
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const comments = JSON.parse(localStorage.getItem('comments')) || {};

   // Haetaan valittu suodatin ("all", "active" tai "done")
  const filter = document.getElementById("filterTasks")?.value || "all";

  // Suodatetaan tehtävät käyttäjän valinnan mukaan
  const filteredTasks = tasks.filter(task => {
    if (filter === "done") return task.done;
    if (filter === "active") return !task.done;
    return true;
  });

  // Lajitellaan tehtävät niin, että tekemättömät tulevat ensin
  const sortedTasks = [...filteredTasks].sort((a, b) => a.done - b.done);

  // Luodaan jokaiselle tehtävälle oma näkymä (kortti)
  sortedTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task" + (task.done ? " done" : "");

    // Tehtävän nimi
    const name = document.createElement("div");
    name.className = "task-name";
    name.textContent = task.name;
    taskDiv.appendChild(name);

    // Tehtävän kuvaus
    if (task.description) {
      const description = document.createElement("div");
      description.className = "extra-info";
      description.textContent = "Kuvaus: " + task.description;
      taskDiv.appendChild(description);
    }

    // Tehtävän päivämäärä
    if (task.date) {
      const dueDate = new Date(task.date);
      const now = new Date();
      const timeDiff = (dueDate - now) / (1000 * 60 * 60 * 24);

      const date = document.createElement("div");
      date.className = "date-box " + (timeDiff < 2 ? "date-red" : "date-yellow");
      date.textContent = task.date;
      taskDiv.appendChild(date);
    }

    // Näytetään kommentti, jos tehtävä on valmis
    if (task.done && comments[task.name]) {
      const commentDiv = document.createElement("div");
      commentDiv.className = "extra-info";
      commentDiv.textContent = "Kommentti: " + comments[task.name];
      taskDiv.appendChild(commentDiv);
    }

    // "Open Task" nappi (käyttäjä voi lisätä kommentin)
    const commentBtn = document.createElement("button");
    commentBtn.textContent = "Open Task";
    commentBtn.onclick = () => openComment(task.name);
    taskDiv.appendChild(commentBtn);

    // Chek ja back button pop up:ille
    if (!task.done) {
      const check = document.createElement("button");
      check.className = "check-button";
      check.textContent = "✔";
      check.title = "Merkitse valmiiksi";
      check.onclick = () => {
        tasks[index].done = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      };
      taskDiv.appendChild(check);
    } else {
      const undo = document.createElement("button");
      undo.className = "check-button";
      undo.textContent = "↩";
      undo.title = "Palauta tekemättömäksi";
      undo.onclick = () => {
        tasks[index].done = false;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      };
      taskDiv.appendChild(undo);
    }

    list.appendChild(taskDiv);
  });
}

// Avaa kommenttipopupin tehtävää varten
function openComment(task) {
  currentTask = task; //Tallennetaaan current task
  const popup = document.getElementById('popupOverlay');
  popup.classList.remove('hidden');
  // Näytetään tehtävän nimi popupissa
  document.getElementById('taskTitle').textContent = task;
  // Tallennetaan kommentti
  const comments = JSON.parse(localStorage.getItem('comments')) || {};
  const textarea = popup.querySelector('textarea');
  textarea.value = comments[task] || '';
}

//Voidaan sulkea kommentti pop up
function closeComment() {
  const popup = document.getElementById('popupOverlay');
  popup.classList.add('hidden');
  currentTask = null;
}

//Merkataan tehtävä tehdyksi
function markTaskDone() {
  const popup = document.getElementById('popupOverlay');
  const textarea = popup.querySelector('textarea');
  const comment = textarea.value;

  const comments = JSON.parse(localStorage.getItem('comments')) || {};
  comments[currentTask] = comment;
  localStorage.setItem('comments', JSON.stringify(comments));
    // Tallennetaan kommentti "completedTasks" 
  const completed = JSON.parse(localStorage.getItem('completedTasks')) || {};
  completed[currentTask] = comment;
  localStorage.setItem('completedTasks', JSON.stringify(completed));
  // Näytetään ilmoitus
  showNotice(`Tehtävä "${currentTask}" merkitty valmiiksi!`);
  closeComment(); // Suljetaan popup
  renderTasks();  // Päivitetään näkymä
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});

//Kun tehtävä on valmis käyttäjä saa pop up ilmoituksen "chek"//
function showNotice(message, color = "green") {
  const notice = document.createElement("div");
  notice.textContent = message;
  notice.style.backgroundColor = color;
  notice.style.color = "white";
  notice.style.padding = "10px";
  notice.style.borderRadius = "5px";
  notice.style.marginTop = "10px";
  document.querySelector('.container').prepend(notice);
  setTimeout(() => notice.remove(), 3000);
}
