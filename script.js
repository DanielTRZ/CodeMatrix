// ====================================================================
//                       MATRIX ACADEMY PRO - JAVASCRIPT
// ====================================================================

// ---- MATRIX RAIN ----
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

let matrixActive = false;
let matrixInterval;

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i] = (drops[i] * fontSize > canvas.height && Math.random() > 0.975) ? 0 : drops[i] + 1;
  }
}

function startMatrix() {
  if (!matrixActive) {
    matrixActive = true;
    matrixInterval = setInterval(drawMatrix, 50);
  }
}

function stopMatrix() {
    if (matrixActive) {
        matrixActive = false;
        clearInterval(matrixInterval);
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    drops.length = 0; 
    for (let i = 0; i < newColumns; i++) {
        drops.push(1);
    }
});


// ---- TERMINAL ELEMENTS ----
const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('input');
const autocompleteDiv = document.getElementById('autocomplete'); 
const footerStatus = document.getElementById('footer-status'); 

const pillChoice = document.getElementById('pill-choice');
const redPill = document.getElementById('red-pill');
const bluePill = document.getElementById('blue-pill');

const langPrompt = document.getElementById('lang-prompt');
const switchPL = document.getElementById('switch-pl');
const switchEN = document.getElementById('switch-en');


// ---- ZMIENNE GLOBALNE I SYSTEM OCEN ----
let lang = localStorage.getItem('lang') || 'EN'; 
let trainingUnlocked = false;
let currentLesson = 0;

let commandHistory = [];      
let historyIndex = -1;        
let lessonErrorCount = 0;      
const MAX_ERRORS_FOR_HINT = 2; 

let lessonStartTime = null;      
let totalTimeSeconds = 0;        
let totalMistakes = 0;           
let hintUsed = false; 
let achieved = JSON.parse(localStorage.getItem('achievements')) || {}; 

// Lista wszystkich możliwych komend do autouzupełniania
const ALL_COMMANDS = ['help', 'whoami', 'status', 'reality', 'clear', 'training', 'hint', 'podpowiedz', 'trinity', 'morpheus', 'agent', 'smith', 'kung_fu', 'kungfu', 'followthewhiterabbit', 'achievements'];


// ---- HELPER FUNCTIONS ----
function updateTerminalLanguage() {
    input.placeholder = languagePack[lang].inputPlaceholder;
    langPrompt.textContent = languagePack[lang].chooseLang; 
    updateFooter(); 
}

// Zrefaktoryzowana funkcja log z klasą stylu
function log(text, glitch=false, styleClass=null) { 
  const line = document.createElement('div');
  if(glitch) line.classList.add('glitch');
  if(styleClass) line.classList.add(styleClass); 
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function showPillChoice() {
  pillChoice.classList.remove('hidden');
}


// ---- NOWA FUNKCJA AKTUALIZUJĄCA STOPKĘ (Z KONSTRUKTEM) ----
function updateFooter() {
    const totalLessons = languagePack[lang].lessons.length;
    let statusText;
    let trainingStatusText;

    if (lang === 'PL') {
        trainingStatusText = "KONSTRUKT: Wczytywanie umiejętności...";
    } else {
        trainingStatusText = "CONSTRUCT: Skills Loading...";
    }
    
    if (currentLesson >= totalLessons) {
        statusText = lang === 'PL' ? "KURSU UKOŃCZONY" : "TRAINING COMPLETE";
    } else if (trainingUnlocked) {
        const lessonDisplay = currentLesson + 1;
        
  const dynamicStats = lang === 'PL' ?
    `Lekcja: ${lessonDisplay}/${totalLessons} | Błędy: ${totalMistakes}` :
    `Lesson: ${lessonDisplay}/${totalLessons} | Mistakes: ${totalMistakes}`;
            
        statusText = `${trainingStatusText} | ${dynamicStats}`;

    } else {
        statusText = lang === 'PL' ? "Symulacja: V3.01b" : "Simulation: V3.01b";
    }

    footerStatus.textContent = statusText;
}


// ---- SYSTEM OSIĄGNIĘĆ ----

function displayAchievements() {
    log("--- Osiągnięcia Matrix Academy PRO ---", false, 'color-system');
    
    const achievementsList = languagePack[lang].achievements;
    let unlockedCount = 0;
    
    for (const key in achievementsList) {
        const status = achieved[key] ? " [ODBLOKOWANE] " : " [ZABLOKOWANE] ";
        const style = achieved[key] ? 'color-achievement' : null;
        log(status + achievementsList[key], false, style);
        if (achieved[key]) unlockedCount++;
    }
    log(`Postęp: ${unlockedCount}/${Object.keys(achievementsList).length}`);
}

function unlockAchievement(key) {
    if (!achieved[key]) {
        achieved[key] = true;
        localStorage.setItem('achievements', JSON.stringify(achieved));
        
        const message = `${languagePack[lang].achievementUnlocked} "${languagePack[lang].achievements[key]}"`;
        log(message, true, 'color-achievement');
    }
}

function checkAchievements() {
    const totalLessons = languagePack[lang].lessons.length;
    
    if (currentLesson >= 5) unlockAchievement('lesson_5');
    if (currentLesson >= 10) unlockAchievement('lesson_10');
    if (currentLesson >= 20) unlockAchievement('lesson_20');

    if (currentLesson >= totalLessons && !hintUsed) {
        unlockAchievement('no_hint');
    }
    
    if (currentLesson >= totalLessons && totalMistakes < 5) {
        unlockAchievement('low_error_5');
    }
}


// ---- INICJALIZACJA ----
function initTerminal() {
    updateTerminalLanguage(); 
    achieved = JSON.parse(localStorage.getItem('achievements')) || {}; 
    
    log(languagePack[lang].welcome); 
    setTimeout(showPillChoice, 1000); 
    updateFooter(); 
}


// ---- PILL EVENTS ----
redPill.addEventListener('click', () => {
  pillChoice.classList.add('hidden');
  log(languagePack[lang].redPill, true);
  startMatrix();
  input.classList.remove('hidden');
  input.focus();

  setTimeout(() => {
    trainingUnlocked = true;
    log(languagePack[lang].trainingUnlocked, true, 'color-system');
    startLesson(currentLesson);
    updateFooter(); 
  }, 1500);
});

bluePill.addEventListener('click', () => {
  pillChoice.classList.add('hidden');
  log(languagePack[lang].bluePill, true);
  stopMatrix();
  input.classList.add('hidden');
  trainingUnlocked = false;

  setTimeout(() => {
    output.innerHTML = '';
    initTerminal();
    updateFooter();
  }, 3000);
});


// ---- OBSŁUGA JĘZYKA ----
function handleLanguageSwitch(newLang) {
    localStorage.setItem('lang', newLang);
    log(languagePack[newLang].chooseLang + ` ${newLang}. Reloading...`);
    
    setTimeout(() => {
        window.location.reload(); 
    }, 500);
}

switchPL.addEventListener('click', () => handleLanguageSwitch('PL'));
switchEN.addEventListener('click', () => handleLanguageSwitch('EN'));


// ---- LESSON SYSTEM I OCENA ----

function showFinalReport() {
    stopMatrix(); 
    checkAchievements(); 
    updateFooter(); 
    
    const totalLessons = languagePack[lang].lessons.length;
    const minutes = Math.floor(totalTimeSeconds / 60);
    const seconds = totalTimeSeconds % 60;

    const maxScore = totalLessons * 10;
    const currentScore = Math.max(0, maxScore - totalMistakes);
    const performanceScore = currentScore / maxScore;

    let grade;

    if (performanceScore >= 0.9) {
        grade = lang === 'PL' ? "ARCHITEKT SYSTEMU" : "SYSTEM ARCHITECT";
    } else if (performanceScore >= 0.7) {
        grade = lang === 'PL' ? "OPERATOR" : "OPERATOR";
    } else if (performanceScore >= 0.5) {
        grade = lang === 'PL' ? "ZAAWANSOWANY REKRUT" : "ADVANCED RECRUIT";
    } else {
        grade = lang === 'PL' ? "REKRUT" : "RECRUIT";
    }

    if (lang === 'PL') {
        log("--- RAPORT SZKOLENIOWY UZYSKANY ---", true, 'color-system');
        log("SYMULACJA ZAKOŃCZONA.", true);
        log("");
        log(`Całkowity czas: ${minutes}m ${seconds}s`);
        log(`Całkowita liczba błędów: ${totalMistakes}`);
        log(`Wydajność kodowania: ${Math.round(performanceScore * 100)}%`);
        log(`Poziom zaawansowania: ${grade}`, true, 'color-success');
        log("");
        log("Jesteś gotowy. Witaj w Załodze Nabuchodonozora.");
    } else {
        log("--- TRAINING REPORT ACQUIRED ---", true, 'color-system');
        log("SIMULATION COMPLETE.", true);
        log("");
        log(`Total Time: ${minutes}m ${seconds}s`);
        log(`Total Mistakes: ${totalMistakes}`);
        log(`Coding Efficiency: ${Math.round(performanceScore * 100)}%`);
        log(`Proficiency Level: ${grade}`, true, 'color-success');
        log("");
        log("You are ready. Welcome to the Nebuchadnezzar Crew.");
    }
    
    log("\n");
    displayAchievements();
}

function startLesson(index) {
  if (index >= languagePack[lang].lessons.length) {
    showFinalReport(); 
    return;
  }
    
    lessonErrorCount = 0; 
    lessonStartTime = Date.now(); 

  const lesson = languagePack[lang].lessons[index];
  log(`Lesson ${index+1}/${languagePack[lang].lessons.length}: ${lesson.title} - ${lesson.desc}`, false, 'color-system');
  log(languagePack[lang].typeAnswerPrompt); 
    updateFooter(); 
}

function checkLessonAnswer(answer) {
  const lesson = languagePack[lang].lessons[currentLesson];
  
  if(answer.toLowerCase().trim() === lesson.answer.toLowerCase().trim()) {
    // Sukces
    if (lessonStartTime) {
        const lessonDuration = Math.round((Date.now() - lessonStartTime) / 1000);
        totalTimeSeconds += lessonDuration;
        const timeMsg = lang === 'PL' ? `Ukończono w ${lessonDuration} sekund.` : `Completed in ${lessonDuration} seconds.`;
        log(timeMsg); 
    }

    terminal.classList.add('glitch');
    setTimeout(() => {
        terminal.classList.remove('glitch');
    }, 500);
    
    log(languagePack[lang].lessonComplete, true, 'color-success');
    currentLesson++;
    lessonErrorCount = 0; 
    
    checkAchievements(); 
    
    setTimeout(() => startLesson(currentLesson), 1000);
  } else {
    // Błąd
    lessonErrorCount++;
    totalMistakes++; 
    updateFooter(); 

    log(languagePack[lang].incorrect, false, 'color-system');
    
    terminal.classList.add('terminal-shake');
    setTimeout(() => {
        terminal.classList.remove('terminal-shake');
    }, 500);
    
    if (lessonErrorCount >= MAX_ERRORS_FOR_HINT) {
        if (lang === 'PL') {
            log("Potrzebujesz pomocy? Wpisz: HINT lub PODPOWIEDZ", false, 'color-system');
        } else {
            log("Need assistance? Type: HINT", false, 'color-system');
        }
    }
  }
}


// ---- AUTOUZUPEŁNIANIE ----

function updateAutocomplete() {
    const text = input.value.trim().toLowerCase();
    autocompleteDiv.textContent = ''; 

    if (!text) return;

    let suggestion = ALL_COMMANDS.find(cmd => cmd.startsWith(text));

    if (!suggestion && trainingUnlocked && currentLesson < languagePack[lang].lessons.length) {
        const lessonAnswer = languagePack[lang].lessons[currentLesson].answer.toLowerCase().trim();
        if (lessonAnswer.startsWith(text)) {
             suggestion = lessonAnswer;
        }
    }

    if (suggestion) {
        const completion = suggestion.substring(text.length);
        autocompleteDiv.textContent = text + completion;
    }
}


// ---- TERMINAL COMMANDS I HISTORIA ----
input.addEventListener('input', updateAutocomplete); 

input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        input.value = '';
        autocompleteDiv.textContent = ''; 
        log("> " + cmd);
        handleCommand(cmd);
        
    } else if (e.key === 'Tab') { 
        e.preventDefault(); 
        const suggestedText = autocompleteDiv.textContent.trim();
        if (suggestedText) {
            input.value = suggestedText;
            input.selectionStart = input.selectionEnd = input.value.length; 
            autocompleteDiv.textContent = ''; 
        }

    } else if (e.key === 'ArrowUp') {
        e.preventDefault(); 
        if (commandHistory.length === 0) return;

        historyIndex = Math.max(0, historyIndex - 1);
        input.value = commandHistory[historyIndex];
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (commandHistory.length === 0) return;

        historyIndex = Math.min(commandHistory.length, historyIndex + 1);

        if (historyIndex === commandHistory.length) {
            input.value = ''; 
        } else {
            input.value = commandHistory[historyIndex];
        }
    }
});

function handleCommand(cmd) {
    const cmdLower = cmd.toLowerCase();

    if (cmd.trim() !== '' && cmdLower !== 'hint' && cmdLower !== 'podpowiedz' && cmdLower !== 'achievements') {
        commandHistory.push(cmd);
        historyIndex = commandHistory.length; 
    }
    
  if(!trainingUnlocked) {
    log(languagePack[lang].systemLocked);
    return;
  }

  switch(cmdLower) {
    case 'help':
      log("help, whoami, status, reality, clear, training, achievements", false, 'color-system');
      break;
    case 'whoami':
      log(lang === 'PL' ? "Neo, Deweloper" : "Neo, Developer");
      break;
    case 'status':
      log(`${lang === 'PL' ? "Rzeczywistość" : "Reality"}: stable | ${lang === 'PL' ? "Lekcja" : "Lesson"}: ${currentLesson+1}/${languagePack[lang].lessons.length}`, false, 'color-system');
      log(`${lang === 'PL' ? "Błędy ogółem" : "Total mistakes"}: ${totalMistakes} | ${lang === 'PL' ? "Łączny czas" : "Total time"}: ${totalTimeSeconds}s`);
      break;
    case 'achievements': 
        displayAchievements();
        break;
    case 'reality':
      log(lang === 'PL' ? "Symulacja: Konstrukt Matrixa" : "Simulation: Matrix Construct", false, 'color-system');
      break;
    case 'clear':
      output.innerHTML = '';
      if(trainingUnlocked) startLesson(currentLesson); 
      break;
    case 'language':
      log(lang === 'PL' ? "Przełącznik języka znajduje się w oknie wyboru Pigułek." : "Language switch is located under the Red/Blue Pill choice.");
      break;

    case 'training':
        if(lang === 'PL') {
            log("--- MODUŁY SZKOLENIOWE (20 Lekcji) ---", false, 'color-system');
            log("1-7: HTML, CSS, JavaScript (Podstawy)");
            log("8-10: Python (Skrypty)");
            log("11-13: SQL (Podstawy Bazy Danych)");
            log("14-16: JavaScript (Zaawansowane)");
            log("17-20: SQL (Zaawansowane Bazy Danych)");
            log("Obecna lekcja: " + (currentLesson + 1));
        } else {
            log("--- TRAINING MODULES (20 Lessons) ---", false, 'color-system');
            log("1-7: HTML, CSS, JavaScript (Core)");
            log("8-10: Python (Scripting)");
            log("11-13: SQL (Database Basics)");
            log("14-16: JavaScript (Advanced)");
            log("17-20: SQL (Advanced Databases)");
            log("Current Lesson: " + (currentLesson + 1));
        }
        break;
        
    // Logika HINT
    case 'hint':
    case 'podpowiedz':
        if (currentLesson >= languagePack[lang].lessons.length) {
            log(lang === 'PL' ? "Podpowiedzi dostępne są tylko w trakcie lekcji." : "Hints are only available during a lesson.", false, 'color-system');
            return;
        }
        hintUsed = true;
        const hint = languagePack[lang].lessons[currentLesson].hint;
        if (hint) {
            log(lang === 'PL' ? `Podpowiedź: ${hint}` : `Hint: ${hint}`, false, 'color-system');
            lessonErrorCount = 0; 
        } else {
            log(lang === 'PL' ? "Brak dodatkowej podpowiedzi dla tej lekcji." : "No additional hint available for this lesson.", false, 'color-system');
        }
        break;

    // Easter Eggs
    case 'trinity':
        log(lang === 'PL' ? "Ścieżka jest jasna. Wybór należy do ciebie." : "The path is clear. The choice is yours.", true, 'color-achievement');
        break;
    case 'morpheus':
        log(lang === 'PL' ? "Musisz uwolnić swój umysł, Neo." : "You have to free your mind, Neo.", true, 'color-achievement');
        break;
    case 'agent':
    case 'smith':
        log(lang === 'PL' ? "Pozdrawiam, Panie Anderson." : "Greetings, Mr. Anderson.", true, 'color-system');
        break;
    case 'kung_fu':
    case 'kungfu':
        log(lang === 'PL' ? "Znam Kung Fu." : "I know Kung Fu.", true, 'color-success');
        break;
    case 'followthewhiterabbit':
        log(lang === 'PL' ? "Pigułka została już połknięta. Nie ma powrotu." : "The pill has been swallowed. There is no turning back.", true, 'color-system');
        break;

    default:
      checkLessonAnswer(cmd);
  }
}

// ---- START TERMINAL ----
initTerminal();