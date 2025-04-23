document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('loggedUser');
    if (user !== 'user') {
      alert('Pääsy evätty! Kirjaudu ensin käyttäjätilillä.');
      window.location.href = 'index.html';
    }
  });
  
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
  
  function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
  }
  