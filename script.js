const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// Exemplo de redirecionamento no script do login:
const loginForm = document.querySelector('.sign-in form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Redireciona para a home após efetuar o "login"
  window.location.href = 'home.html';
});