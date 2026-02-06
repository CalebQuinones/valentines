document.addEventListener("DOMContentLoaded", () => {

  console.log("JS is running ❤️");

  // State management
  const state = {
    date: '',
    time: '',
    food: '',
    dateType: '',
    request: ''
  };

  const noPhrases = [
    'No',
    'Please, Rethink Your Decision 🥺',
    "I'm Going To Die 😭",
    'Are You Sure?? 😢',
    'I\'ll Give You Snacks If You Click Yes! 🍩'
  ];

  let noPressCount = 0;

  // Button references
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const unavailableMsg = document.getElementById('unavailableMsg');

  const nextBtns = [
    document.getElementById('nextBtn1'),
    document.getElementById('nextBtn2'),
    document.getElementById('nextBtn3'),
    document.getElementById('nextBtn4')
  ];

  const backBtns = [
    document.getElementById('backBtn1'),
    document.getElementById('backBtn2'),
    document.getElementById('backBtn3'),
    document.getElementById('backBtn4'),
    document.getElementById('backBtn5')
  ];

  const sections = Array.from(document.querySelectorAll('.section'));
  let currentSection = 0;

  function showSection(index) {
    sections.forEach(s => s.classList.remove('active'));
    if (sections[index]) {
      sections[index].classList.add('active');
      currentSection = index;
      window.scrollTo(0, 0);
    }
  }

  function showNextSection() {
    showSection(currentSection + 1);
  }

  function showPrevSection() {
    showSection(currentSection - 1);
  }

  function celebrate() {
    const celebration = document.getElementById('celebration');
    celebration.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = [
        'var(--primary-pink)',
        'var(--dark-pink)',
        'var(--light-pink)',
        'var(--accent-orange)'
      ][Math.floor(Math.random() * 4)];
      celebration.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  // YES
  yesBtn.addEventListener('click', () => {
    celebrate();
    setTimeout(showNextSection, 300);
  });

  // NO
  noBtn.addEventListener('click', () => {
    if (noPressCount < noPhrases.length) {
      noBtn.textContent = noPhrases[noPressCount];
    }
    noPressCount++;

    const size = parseFloat(yesBtn.style.fontSize) || 16;
    yesBtn.style.fontSize = (size + 8) + 'px';
  });

  // Date validation
  dateInput.addEventListener('change', () => {
    const date = new Date(dateInput.value);
    if (date.getDate() === 14) {
      unavailableMsg.classList.add('show');
      dateInput.value = '';
      state.date = '';
    } else {
      unavailableMsg.classList.remove('show');
      state.date = dateInput.value;
    }
  });

  timeInput.addEventListener('change', () => {
    state.time = timeInput.value;
  });

  document.querySelectorAll('[data-food]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-food]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.food = btn.dataset.food;
    });
  });

  document.querySelectorAll('[data-datetype]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-datetype]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.dateType = btn.dataset.datetype;
    });
  });

  document.querySelectorAll('[data-request]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-request]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.request = btn.dataset.request;
    });
  });

  nextBtns[0].addEventListener('click', () => state.date && state.time ? showNextSection() : alert('Select date & time'));
  nextBtns[1].addEventListener('click', () => state.food ? showNextSection() : alert('Select food'));
  nextBtns[2].addEventListener('click', () => state.dateType ? showNextSection() : alert('Select date type'));
  nextBtns[3].addEventListener('click', () => {
    showNextSection();
    displayAgenda();
    celebrate();
  });

  backBtns.forEach(btn => btn.addEventListener('click', showPrevSection));

  function displayAgenda() {
    document.getElementById('agendaDate').textContent = state.date;
    document.getElementById('agendaTime').textContent = state.time;
    document.getElementById('agendaFood').textContent = state.food;
    document.getElementById('agendaActivity').textContent = state.dateType;
    document.getElementById('agendaRequest').textContent = state.request || 'Surprise 💕';
  }

});
