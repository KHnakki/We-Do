const users = {
    admin: { username: 'admin', password: 'admin123' },
    user: { username: 'user', password: 'user123' }
  };
  
  function login(role) {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (username === users[role].username && password === users[role].password) {
      localStorage.setItem('loggedUser', role);
      window.location.href = role === 'admin' ? 'admin.html' : 'user.html';
    } else {
      alert('Virheellinen käyttäjätunnus tai salasana!');
    }
  }
