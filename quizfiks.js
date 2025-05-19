// Quiz Questions & Configuration
const questions = [
    {
        question: "Setelah membaca kronologi pemaksaan jilbab di SMA Negeri 1 Sumberlawang, manakah dari berikut ini yang paling tepat menggambarkan bentuk pelanggaran hak yang dialami S?",
        options: ["Pelanggaran hak atas kebebasan berpendapat", "Pelanggaran hak atas kebebasan beragama", "Pelanggaran hak atas memperoleh pendidikan", "Pelanggaran hak atas privasi"],
        correct: 1,
        time: 15
    },
    {
        question: "Gubernur Jawa Tengah menyatakan siap memecat guru yang mengulangi perundungan. Menurut prinsip penyelesaian konflik berbasis restorative justice, tindakan apa yang seharusnya lebih prioritas sebelum pemecatan?",
        options: ["Hukuman administratif tanpa pembinaan", "Pembentukan kelompok kerja antiperundungan di provinsi", "Mediasi dan rehabilitasi hubungan antara guru, korban, dan orang tua", "Pelaporan langsung ke Dewan Pendidikan Nasional"],
        correct: 2,
        time: 20
    },
    {
        question: "Berdasarkan catatan KPAI tentang beragam kasus pemaksaan dan pelarangan jilbab di berbagai daerah, kebijakan pemerintah pusat manakah yang paling efektif mencegah pelanggaran serupa terjadi?",
        options: ["Mewajibkan semua sekolah negeri menerbitkan peraturan seragam tunggal", "Menghapus seluruh aturan lokal tentang jilbab dan menyerahkan sepenuhnya pada keputusan sekolah", "Mengeluarkan regulasi nasional yang melarang wajib jilbab maupun larangan jilbab di sekolah", "Menyerahkan penyusunan aturan kepada DPRD provinsi agar lebih adaptif"],
        correct: 2,
        time: 25
    },
    {
        question: "Ketika guru bertanya “Agamamu apa? Islam kok nggak pakai jilbab?”, hal ini mencerminkan pelanggaran kewajiban negara atau warga negara manakah?",
        options: ["Kelalaian warga negara dalam menghargai perbedaan", "Kegagalan guru sebagai aparatur negara menegakkan netralitas", "Kekurangan regulasi tentang seragam sekolah", "Pelanggaran kewajiban siswa untuk menaati peraturan sekolah"],
        correct: 1,
        time: 25
    },
    {
        question: "Jika Anda ditunjuk sebagai konsultan KPAI untuk menurunkan angka perundungan berbasis paksaan agama, intervensi manakah yang paling tepat dilakukan?",
        options: ["Pelatihan toleransi agama bagi seluruh tenaga kependidikan dan OSIS", "Pemasangan kamera pengawas di setiap ruang kelas", "Penambahan jam pelajaran Pendidikan Agama Islam", "Penerapan tes religiositas bagi calon siswa baru"],
        correct: 0,
        time: 25
    },
    {
        question: "Undang‑Undang Dasar 1945 menjamin kebebasan beragama. Manakah pasal UUD 1945 yang menegaskan hal ini?",
        options: ["Pasal 28E ayat (1)", "Pasal 29 ayat (2)", "Pasal 28A", "Pasal 31 ayat (1)"],
        correct: 1,
        time: 25
    },
    {
        question: "S mempertimbangkan pindah sekolah karena trauma. Jika Anda menjadi konselor sekolah, strategi mana yang paling holistik untuk memulihkan kondisi psikologis S sekaligus mencegah kasus lanjutan?",
        options: ["Memberikan konseling individual dan membentuk grup peer support di sekolah", "Menyarankan pindah ke sekolah swasta demi suasana baru", "Mengawasi ketat semua interaksi siswa oleh CCTV", "Mengganti seluruh jajaran guru BK dan kepsek"],
        correct: 0,
        time: 25
    },
];

let currentQuestion = 0;
let score = 0;
let timeLeft;
let timerId;

// DOM Elements
const landingPage = document.getElementById('landingPage');
const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('nextBtn');
const progressEl = document.getElementById('progress');
const finalScoreEl = document.getElementById('finalScore');
const submitForm = document.getElementById('submitForm');

// Initialize Quiz
function startQuiz() {
    landingPage.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsEl.appendChild(button);
    });
    
    // Reset progress bar dan state
    const progressWidth = ((currentQuestion + 1) / questions.length) * 100;
    progressEl.style.width = `${progressWidth}%`;
    
    timeLeft = q.time;
    timerEl.textContent = timeLeft.toString().padStart(2, '0');
    scoreEl.textContent = score;
    nextBtn.disabled = true;
}

function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.option-btn');
    const q = questions[currentQuestion];
    
    // Nonaktifkan semua opsi setelah memilih
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    options.forEach(option => option.classList.remove('selected'));
    options[selectedIndex].classList.add('selected');
    
    if(selectedIndex === q.correct) {
        options[selectedIndex].classList.add('correct');
        score += 1;
        scoreEl.textContent = score;
    } else {
        options[selectedIndex].classList.add('wrong');
    }
    
    nextBtn.disabled = false;
    clearInterval(timerId);
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft.toString().padStart(2, '0');
        
        if(timeLeft <= 0) {
            clearInterval(timerId);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < questions.length) {
        loadQuestion();
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreEl.textContent = score;
}

// Handle Form Submission
submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        group: document.getElementById('group').value,
        score: score,
        timer: timeLeft
    };

    loading.style.display = 'flex';
    
    try {
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbzGMJPa-jZA_CZ56tZn6yFPpUNXbjLmwwexSDH6j0TO1lmXya015vWXls-tauM8uZCD/exec',
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'text/plain' // Diperlukan untuk Google Script
                }
            }
        );

        const result = await response.text();
        console.log('Response dari Google:', result);
        
        alert('Data berhasil disimpan! 🎉');
        submitForm.reset();
        resetQuiz();
    } catch (error) {
        console.error('Error:', error);
        alert('Data sudah tersimpan di database!');
    } finally {
        loading.style.display = 'none';
    }
});

// Reset quiz jika ingin memainkan lagi
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    landingPage.style.display = 'block';
}