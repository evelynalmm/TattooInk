// 1. Configuração do Firebase 
 const firebaseConfig = {
    apiKey: "AIzaSyDOEn1HggR0un8fS3gkZ3RQDf2fQwtcCbA",
    authDomain: "tattoo-ink-a633c.firebaseapp.com",
    projectId: "tattoo-ink-a633c",
    storageBucket: "tattoo-ink-a633c.firebasestorage.app",
    messagingSenderId: "734329714838",
    appId: "1:734329714838:web:5e1b3ec47efc7d9ded2ab7"
  };


// Inicializa o Firebase e o Banco de Dados
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// 2. Lógica do Formulário de Agendamento
var bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var clientName = document.getElementById('clientName').value;
    var clientPhone = document.getElementById('clientPhone').value;
    var bookingDate = document.getElementById('bookingDate').value;
    var ideaDescription = document.querySelector('textarea').value;

    // Pega o botão de horário selecionado sem usar a sintaxe '?'
    var selectedBtn = document.querySelector('.slot-btn.selected');
    var selectedSlot = selectedBtn ? selectedBtn.innerText : 'Não especificado';

    // Salva na coleção 'agendamentos' do Firestore
    db.collection('agendamentos').add({
      nome: clientName,
      celular: clientPhone,
      data: bookingDate,
      horario: selectedSlot,
      ideia: ideaDescription,
      status: 'Pendente',
      criadoEm: new Date()
    })
    .then(function () {
      alert('Solicitação de agendamento enviada com sucesso! A tatuadora entrará em contato em breve.');
      bookingForm.reset();
      
      var slots = document.querySelectorAll('.slot-btn');
      slots.forEach(function (btn) {
        btn.classList.remove('selected');
      });
    })
    .catch(function (error) {
      console.error("Erro ao salvar agendamento:", error);
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    });
  });
}

// Fechar o menu mobile ao clicar em um link
var navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});


// Menu Mobile Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Seleção de Horários no Formulário
const slotBtns = document.querySelectorAll('.slot-btn');

slotBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    slotBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Filtro de Portfólio
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove classe ativa de todos e adiciona no clicado
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      if (filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Envio do Formulário de Agendamento (Simulação)
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Solicitação enviada com sucesso! O estúdio entrará em contato via WhatsApp/E-mail para confirmar a sessão.');
  bookingForm.reset();
  slotBtns.forEach(b => b.classList.remove('selected'));
});

// Máscara automática de telefone para o campo Celular/WhatsApp
const phoneInput = document.getElementById('clientPhone');

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    
    if (value.length > 11) value = value.slice(0, 11);
    
    // Formata o número (XX) XXXXX-XXXX
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    e.target.value = value;
  });
}
