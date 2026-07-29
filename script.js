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

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Botões Desktop
if (registerBtn && loginBtn) {
  registerBtn.addEventListener('click', () => {
    container.classList.add('active');
  });

  loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
  });
}

// Botões Abas Mobile
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');

if (tabLogin && tabRegister) {
  tabLogin.addEventListener('click', () => {
    container.classList.remove('active');
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  });

  tabRegister.addEventListener('click', () => {
    container.classList.add('active');
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
  });
}

// Redirecionamento ao Enviar Login/Cadastro para a Home
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'home.html';
  });
});
