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
            'I\'m Going To Die 😭',
            'Are You Sure?? 😢',
            'I\'ll Give You Snacks If You Click Yes! 🍩'
        ];

        let noPressCount = 0;
        let selectedFood = null;
        let selectedDateType = null;
        let selectedRequest = null;

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

        // Section references
        const sections = Array.from(document.querySelectorAll('.section'));
        let currentSection = 0;

        // Helper functions
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

        // Celebrate animation
        function celebrate() {
            const celebration = document.getElementById('celebration');
            for (let i = 0; i < 30; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = -10 + 'px';
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

        // Yes button
        yesBtn.addEventListener('click', () => {
            celebrate();
            setTimeout(() => {
                showNextSection();
            }, 300);
        });

        // No button
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            noBtn.classList.add('evade');

            // Change text
            if (noPressCount < noPhrases.length) {
                noBtn.textContent = noPhrases[noPressCount];
            }
            noPressCount++;

            // Increase yes button
            const currentSize = parseFloat(yesBtn.style.fontSize) || 16;
            yesBtn.style.fontSize = (currentSize + 8) + 'px';
            yesBtn.style.padding = (18 + noPressCount * 8) + 'px ' + (64 + noPressCount * 12) + 'px';

            // Evade animation
            const randomX = (Math.random() - 0.5) * 300;
            const randomY = (Math.random() - 0.5) * 300;

            noBtn.style.position = 'relative';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';

            setTimeout(() => {
                noBtn.classList.remove('evade');
            }, 500);
        });

        // Date input validation
        dateInput.addEventListener('change', () => {
            const date = new Date(dateInput.value);
            if (dateInput.value) {
                const day = date.getDate();
                if (day === 14) {
                    unavailableMsg.classList.add('show');
                    state.date = '';
                    dateInput.value = '';
                } else {
                    unavailableMsg.classList.remove('show');
                    state.date = dateInput.value;
                }
            }
        });

        // Time input
        timeInput.addEventListener('change', () => {
            state.time = timeInput.value;
        });

        // Food selection
        document.querySelectorAll('[data-food]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-food]').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.food = btn.dataset.food;
                selectedFood = btn.dataset.food;
            });
        });

        // Date type selection
        document.querySelectorAll('[data-datetype]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-datetype]').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.dateType = btn.dataset.datetype;
                selectedDateType = btn.dataset.datetype;
            });
        });

        // Request selection
        document.querySelectorAll('[data-request]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-request]').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.request = btn.dataset.request;
                selectedRequest = btn.dataset.request;
            });
        });

        // Next buttons
        nextBtns[0].addEventListener('click', () => {
            if (state.date && state.time) {
                showNextSection();
            } else {
                alert('Please select both date and time!');
            }
        });

        nextBtns[1].addEventListener('click', () => {
            if (state.food) {
                showNextSection();
            } else {
                alert('Please select a food option!');
            }
        });

        nextBtns[2].addEventListener('click', () => {
            if (state.dateType) {
                showNextSection();
            } else {
                alert('Please select a date type!');
            }
        });

        nextBtns[3].addEventListener('click', () => {
            showNextSection();
            displayAgenda();
            celebrate();
        });

        // Back buttons
        backBtns[0].addEventListener('click', showPrevSection);
        backBtns[1].addEventListener('click', showPrevSection);
        backBtns[2].addEventListener('click', showPrevSection);
        backBtns[3].addEventListener('click', showPrevSection);
        backBtns[4].addEventListener('click', () => {
            state.date = '';
            state.time = '';
            state.food = '';
            state.dateType = '';
            state.request = '';
            noPressCount = 0;
            noBtn.textContent = 'No';
            yesBtn.style.fontSize = '16px';
            yesBtn.style.padding = '16px 36px';
            dateInput.value = '';
            timeInput.value = '';
            selectedFood = null;
            selectedDateType = null;
            selectedRequest = null;
            document.querySelectorAll('[data-food], [data-datetype], [data-request]').forEach(b => {
                b.classList.remove('selected');
            });
            showSection(0);
        });

        // Display agenda
        function displayAgenda() {
            const dateObj = new Date(state.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            });

            const time24 = state.time;
            const [hours, minutes] = time24.split(':');
            let hours12 = parseInt(hours);
            const ampm = hours12 >= 12 ? 'PM' : 'AM';
            hours12 = hours12 % 12 || 12;
            const formattedTime = `${hours12}:${minutes} ${ampm}`;

            document.getElementById('agendaDate').textContent = formattedDate;
            document.getElementById('agendaTime').textContent = formattedTime;
            document.getElementById('agendaFood').textContent = state.food;
            document.getElementById('agendaActivity').textContent = state.dateType;
            document.getElementById('agendaRequest').textContent = state.request || 'Surprise me! 🎁';
        }
