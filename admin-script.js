// Configuração do Firebase 
  const firebaseConfig = {
    apiKey: "AIzaSyDOEn1HggR0un8fS3gkZ3RQDf2fQwtcCbA",
    authDomain: "tattoo-ink-a633c.firebaseapp.com",
    projectId: "tattoo-ink-a633c",
    storageBucket: "tattoo-ink-a633c.firebasestorage.app",
    messagingSenderId: "734329714838",
    appId: "1:734329714838:web:5e1b3ec47efc7d9ded2ab7"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginBox = document.getElementById('loginBox');
const adminPanel = document.getElementById('adminPanel');
const appointmentsContainer = document.getElementById('appointmentsContainer');

// 1. Controle de Sessão
auth.onAuthStateChanged((user) => {
  if (user) {
    loginBox.classList.add('hidden');
    adminPanel.classList.remove('hidden');
    carregarAgendamentos();
  } else {
    loginBox.classList.remove('hidden');
    adminPanel.classList.add('hidden');
  }
});

// 2. Form de Login
document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const pass = document.getElementById('adminPassword').value;

  auth.signInWithEmailAndPassword(email, pass)
    .catch((error) => alert('Erro no login: ' + error.message));
});

// 3. Logout
document.getElementById('btnLogout').addEventListener('click', () => auth.signOut());

// 4. Carregar os agendamentos salvos em tempo real
function carregarAgendamentos() {
  db.collection('agendamentos').orderBy('criadoEm', 'desc').onSnapshot((snapshot) => {
    appointmentsContainer.innerHTML = '';

    if (snapshot.empty) {
      appointmentsContainer.innerHTML = '<p>Nenhum agendamento pendente.</p>';
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const phoneClean = data.celular.replace(/\D/g, '');
      
      // Mensagem pré-formatada para o WhatsApp
      const textWsp = encodeURIComponent(
        `Olá ${data.nome}! Sou a tatuadora do TattooInk. Recebi sua solicitação para o dia ${data.data} às ${data.horario}. Vamos alinhar sua tattoo?`
      );

      const cardHtml = `
        <div class="card-appointment">
          <h3>${data.nome}</h3>
          <p><strong><i class="fa-solid fa-phone"></i> Celular:</strong> ${data.celular}</p>
          <p><strong><i class="fa-solid fa-calendar"></i> Data:</strong> ${data.data}</p>
          <p><strong><i class="fa-solid fa-clock"></i> Horário:</strong> ${data.horario}</p>
          <p><strong><i class="fa-solid fa-pen"></i> Ideia:</strong> ${data.ideia}</p>
          
          <a href="https://wa.me/55${phoneClean}?text=${textWsp}" target="_blank" class="btn-wsp">
            <i class="fa-brands fa-whatsapp"></i> Responder no WhatsApp
          </a>
        </div>
      `;
      appointmentsContainer.innerHTML += cardHtml;
    });
  });
}