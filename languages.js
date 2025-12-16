const languagePack = {
  PL: {
    trainingUnlocked: "Tryb szkoleniowy odblokowany.",
    welcome: "Witaj w Matrixie.",
    chooseLang: "Zmień język:",
    bluePill: "Wybrałeś Niebieską Pigułkę. Historia się kończy.",
    redPill: "Wybrałeś Czerwoną Pigułkę. Witaj w prawdziwym świecie.",
    inputPlaceholder: "Wpisz komendę...",
    lessonComplete: "Lekcja ukończona!",
    trainingComplete: "Kurs zakończony. Jesteś gotowy.",
    incorrect: "Niepoprawna odpowiedź. Spróbuj ponownie.",
    systemLocked: "System zablokowany. Wybierz Czerwoną Pigułkę, aby odblokować komendy terminala.",
    typeAnswerPrompt: "Wpisz poprawną odpowiedź w konsoli.",
    achievementUnlocked: "Osiągnięcie odblokowane:",
    lessons: [
      { 
          title: "HTML Basics", 
          desc: "Struktura rzeczywistości (Tag nagłówka pierwszego stopnia)", 
          answer: "h1", 
          hint: "Tagi HTML są otoczone nawiasami ostrymi. To musi być jedynka." 
      },
      { 
          title: "HTML Semantics", 
          desc: "Znaczenie ma sens (Tag nawigacji)", 
          answer: "nav", 
          hint: "Ten tag ułatwia poruszanie się po stronie. Pomyśl o nawigacji." 
      },
      { 
          title: "CSS Basics", 
          desc: "Zasady symulacji (Właściwość koloru tekstu na zielony z ;)", 
          answer: "color: green;", 
          hint: "Pamiętaj o dwukropku, wartości i obowiązkowym średniku na końcu." 
      },
      { 
          title: "CSS Effects", 
          desc: "Naginanie rzeczywistości (Właściwość powiększenia o 1.5 z ;)", 
          answer: "transform: scale(1.5);", 
          hint: "Właściwość to transform, funkcja to scale. Potrzebujesz współczynnika powiększenia." 
      },
      { 
          title: "JS Basics", 
          desc: "Przyczyna i skutek (Funkcja wyskakującego okienka z tekstem 'Wake up';)", 
          answer: "alert('Wake up');", 
          hint: "To prosta funkcja, która wyświetla wiadomość. Użyj cudzysłowów i średnika." 
      },
      { 
          title: "JS Events", 
          desc: "Reakcje systemu (Nazwa zdarzenia kliknięcia)", 
          answer: "click", 
          hint: "To jest najpopularniejsze zdarzenie, kiedy aktywujesz przycisk." 
      },
      { 
          title: "Logic IF/ELSE", 
          desc: "Wybór ma konsekwencje (Funkcja wejścia do prawdziwego świata z ;)", 
          answer: "enterRealWorld();", 
          hint: "To wywołanie prostej funkcji bez argumentów, ale musi być zakończone średnikiem." 
      },
        
      // --- PYTHON (8-10) ---
      { 
          title: "Python: Podstawy", 
          desc: "Obserwacja środowiska (Komenda wypisująca 'Hello World')", 
          answer: "print('Hello World')", 
          hint: "Komenda jest prosta i oznacza drukowanie. Użyj pojedynczych cudzysłówek." 
      },
      { 
          title: "Python: Zmienne", 
          desc: "Zapamiętywanie danych (Zmienna 'x' równa 10)", 
          answer: "x = 10", 
          hint: "Po prostu przypisz wartość 10 do zmiennej x. Bez średników." 
      },
      { 
          title: "Python: Pętle", 
          desc: "Cykle w Symulacji (Słowo kluczowe do nieskończonej pętli)", 
          answer: "while True:", 
          hint: "Użyj 'while' i logicznego prawdy, zakończonego dwukropkiem." 
      },
        
      // --- SQL PODSTAWY (11-13) ---
      { 
          title: "SQL: Wyszukiwanie Danych", 
          desc: "Lokalizacja celów (Komenda pobierająca wszystkie kolumny)", 
          answer: "SELECT *", 
          hint: "Użyj komendy SELECT i symbolu oznaczającego wszystko." 
      },
      { 
          title: "SQL: Tabela", 
          desc: "Wybór Ścieżki (Słowo kluczowe po 'SELECT *' wybierające tabelę 'users')", 
          answer: "FROM users", 
          hint: "Słowo kluczowe to 'FROM'." 
      },
      { 
          title: "SQL: Warunki", 
          desc: "Filtrowanie rzeczywistości (Słowo kluczowe ograniczające wyniki do 'name' równego 'Neo')", 
          answer: "WHERE name = 'Neo'", 
          hint: "Słowo kluczowe to WHERE, a 'Neo' musi być w cudzysłowie/apostrofie." 
      },
      
      // --- JS ZAAWANSOWANY (14-16) ---
      { 
          title: "JS: Funkcje", 
          desc: "Definicja Algorytmu (Deklaracja funkcji strzałkowej przyjmującej 'x' i zwracającej 'x*2')", 
          answer: "const double = x => x * 2", 
          hint: "Użyj `const` i funkcji strzałkowej (`=>`). Pamiętaj o ciele funkcji." 
      },
      { 
          title: "JS: Obiekty", 
          desc: "Struktura Danych (Jak odwołać się do pola 'model' w obiekcie 'car'?)", 
          answer: "car.model", 
          hint: "Użyj notacji kropkowej, aby uzyskać dostęp do właściwości obiektu." 
      },
      { 
          title: "JS: DOM", 
          desc: "Manipulacja Światem (Komenda pobierająca element HTML o ID 'redpill')", 
          answer: "document.getElementById('redpill')", 
          hint: "Użyj globalnego obiektu 'document' i funkcji do pobierania elementu po jego identyfikatorze." 
      },
      
      // --- SQL ZAAWANSOWANY (17-20) ---
      { 
          title: "SQL: Łączenie Danych", 
          desc: "Korelacja Modułów (Słowo kluczowe do połączenia tabel)", 
          answer: "JOIN", 
          hint: "Użyj słowa kluczowego do łączenia rekordów z dwóch tabel w oparciu o powiązaną kolumnę." 
      },
      { 
          title: "SQL: Grupuj", 
          desc: "Agregacja Wzorców (Słowo kluczowe do grupowania wyników z funkcją agregującą)", 
          answer: "GROUP BY", 
          hint: "Używane razem z funkcjami COUNT(), MAX(), MIN(), SUM() lub AVG()." 
      },
      { 
          title: "SQL: Wstawianie", 
          desc: "Tworzenie Nowej Entycji (Komenda do dodania nowego rekordu)", 
          answer: "INSERT INTO", 
          hint: "Musisz użyć słów kluczowych do wstawienia danych do tabeli." 
      },
      { 
          title: "SQL: Aktualizacja", 
          desc: "Zmiana Atrybutów (Komenda do modyfikacji istniejących rekordów)", 
          answer: "UPDATE", 
          hint: "Użyj słowa kluczowego do zmiany danych w tabeli." 
      }
    ],
    achievements: { 
        'lesson_5': "Ścieżka JS: Ukończono 5 lekcji.",
        'lesson_10': "Początek Cyklu: Ukończono 10 lekcji.",
        'lesson_20': "Ostatni Program: Ukończono cały kurs.",
        'no_hint': "Samowystarczalny: Nie użyto komendy PODPOWIEDZ.",
        'low_error_5': "Prawdziwy Wybraniec: Mniej niż 5 błędów w całym kursie."
    }
  },
  EN: {
    trainingUnlocked: "Training mode unlocked.",
    welcome: "Welcome to the Matrix.",
    chooseLang: "Change Language:",
    bluePill: "You chose the Blue Pill. The story ends.",
    redPill: "You chose the Red Pill. Welcome to the real world.",
    inputPlaceholder: "Type command...",
    lessonComplete: "Lesson completed!",
    trainingComplete: "Training complete. You are ready.",
    incorrect: "Incorrect. Try again.",
    systemLocked: "System locked. Choose the Red Pill to unlock terminal commands.",
    typeAnswerPrompt: "Type the correct answer in the console.",
    achievementUnlocked: "Achievement Unlocked:",
    lessons: [
      { 
          title: "HTML Basics", 
          desc: "Structure of Reality (First level heading tag)", 
          answer: "h1", 
          hint: "HTML tags are enclosed in angle brackets. This must be the number one." 
      },
      { 
          title: "HTML Semantics", 
          desc: "Meaning Matters (Navigation tag)", 
          answer: "nav", 
          hint: "This tag facilitates page movement. Think about navigation." 
      },
      { 
          title: "CSS Basics", 
          desc: "Rules of the Simulation (Text color property set to green with ;)", 
          answer: "color: green;", 
          hint: "Remember the colon, value, and the mandatory semicolon at the end." 
      },
      { 
          title: "CSS Effects", 
          desc: "Bending Reality (Scale property set to 1.5 with ;)", 
          answer: "transform: scale(1.5);", 
          hint: "The property is transform, the function is scale. You need a scaling factor." 
      },
      { 
          title: "JS Basics", 
          desc: "Cause and Effect (Alert function with text 'Wake up';)", 
          answer: "alert('Wake up');", 
          hint: "It's a simple function that displays a message. Use quotes and a semicolon." 
      },
      { 
          title: "JS Events", 
          desc: "System Reactions (Click event name)", 
          answer: "click", 
          hint: "This is the most common event when you activate a button." 
      },
      { 
          title: "Logic IF/ELSE", 
          desc: "Choice Has Consequences (Function to enter the real world with ;)", 
          answer: "enterRealWorld();", 
          hint: "This is a simple function call with no arguments, but it must end with a semicolon." 
      },
        
      // --- PYTHON (8-10) ---
      { 
          title: "Python: Basics", 
          desc: "Environment Observation (Command to print 'Hello World')", 
          answer: "print('Hello World')", 
          hint: "The command is simple and means printing. Use single quotes." 
      },
      { 
          title: "Python: Variables", 
          desc: "Data Retention (Variable 'x' equals 10)", 
          answer: "x = 10", 
          hint: "Simply assign the value 10 to the variable x. No semicolons." 
      },
      { 
          title: "Python: Loops", 
          desc: "Cycles in the Simulation (Keyword for an infinite loop)", 
          answer: "while True:", 
          hint: "Use 'while' and the logical true, ending with a colon." 
      },
        
      // --- SQL BASICS (11-13) ---
      { 
          title: "SQL: Data Retrieval", 
          desc: "Target Localization (Command to retrieve all columns)", 
          answer: "SELECT *", 
          hint: "Use the SELECT command and the symbol for everything." 
      },
      { 
          title: "SQL: Tabela Selection", 
          desc: "Choosing the Path (Keyword after 'SELECT *' choosing table 'users')", 
          answer: "FROM users", 
          hint: "The keyword is 'FROM'." 
      },
      { 
          title: "SQL: Conditions", 
          desc: "Reality Filtering (Keyword limiting results to 'name' equal to 'Neo')", 
          answer: "WHERE name = 'Neo'", 
          hint: "The keyword is WHERE, and 'Neo' must be in quotes/apostrophes." 
      },
      
      // --- ADVANCED JS (14-16) ---
      { 
          title: "JS: Functions", 
          desc: "Algorithm Definition (Declare arrow function taking 'x' and returning 'x*2')", 
          answer: "const double = x => x * 2", 
          hint: "Use `const` and the arrow function syntax (`=>`). Remember the function body." 
      },
      { 
          title: "JS: Objects", 
          desc: "Data Structure (How to reference the 'model' field in the 'car' object?)", 
          answer: "car.model", 
          hint: "Use dot notation to access an object's property." 
      },
      { 
          title: "JS: DOM", 
          desc: "World Manipulation (Command to get the HTML element with ID 'redpill')", 
          answer: "document.getElementById('redpill')", 
          hint: "Use the global 'document' object and the function to retrieve an element by its ID." 
      },
      
      // --- ADVANCED SQL (17-20) ---
      { 
          title: "SQL: Joining Data", 
          desc: "Module Correlation (Keyword to combine tables)", 
          answer: "JOIN", 
          hint: "Use the keyword for combining records from two tables based on a related column." 
      },
      { 
          title: "SQL: Grouping", 
          desc: "Pattern Aggregation (Keyword for grouping results with an aggregate function)", 
          answer: "GROUP BY", 
          hint: "Used in conjunction with COUNT(), MAX(), MIN(), SUM(), or AVG() functions." 
      },
      { 
          title: "SQL: Inserting", 
          desc: "Creating New Entity (Command to add a new record)", 
          answer: "INSERT INTO", 
          hint: "You must use the keywords to insert data into a table." 
      },
      { 
          title: "SQL: Updating", 
          desc: "Changing Attributes (Command to modify existing records)", 
          answer: "UPDATE", 
          hint: "Use the keyword to change data within a table." 
      }
    ],
    achievements: { 
        'lesson_5': "JS Path: Completed 5 lessons.",
        'lesson_10': "Cycle Start: Completed 10 lessons.",
        'lesson_20': "The Final Program: Completed the entire course.",
        'no_hint': "Self-Sufficient: Did not use the HINT command.",
        'low_error_5': "The True Chosen One: Fewer than 5 total mistakes in the course."
    }
  }
};