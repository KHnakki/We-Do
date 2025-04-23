function openComment(task) {
    document.getElementById('commentSection').classList.remove('hidden');
}
  
function closeComment() {
    document.getElementById('commentSection').classList.add('hidden');
}
  
function saveComment() {
    const comment = document.getElementById('commentBox').value;
    alert("Kommentti tallennettu: " + comment);
    closeComment();
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Näytetään tallennetut tehtävät ---
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskListView = document.getElementById('taskListView');
  
    taskList.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      taskListView.appendChild(li);
    });
  });
  
