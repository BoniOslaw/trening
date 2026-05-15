# 💪 Trening Pro

Osobista aplikacja treningowa Push / Pull / Legs z generowaniem planów przez AI (Claude), historią treningów, wykresami postępu i analizą siły. Działa offline jako PWA — możesz zainstalować ją na telefonie i komputerze.

Plany treningowe generuje **Claude** — model AI wytrenowany na obszernej literaturze naukowej z dziedziny fizjologii sportu, treningu siłowego i periodyzacji. Dobór ćwiczeń, liczba powtórzeń, serie i kolejność ruchów są zgodne z aktualną wiedzą naukową dotyczącą treningu siłowego. Dodatkowo Claude uwzględnia Twoją indywidualną historię — nie powtarza tych samych ćwiczeń i dostosowuje plan do Twojego poziomu zaawansowania.

---

## ✨ Funkcje

### 🎯 Plany treningowe
- **3 typy treningu:** Push (klatka, barki, triceps) / Pull (plecy, biceps) / Legs (nogi, dolny odcinek pleców)
- **Generowanie planu przez Claude AI** — 7 ćwiczeń, pogrupowanych klasterowo wg partii mięśniowych, z opisem techniki wykonania
- **Nawigacja po partiach mięśniowych** — ćwiczenia podzielone na grupy (np. klatka → barki → triceps), przechodź przez nie kolejno przyciskami
- **Spersonalizowane plany** — Claude analizuje Twoją historię treningów i dobiera ćwiczenia pod Twój poziom zaawansowania
- **Zróżnicowanie ćwiczeń** — aplikacja nie powtarza tych samych ćwiczeń przy kolejnych sesjach tego samego typu
- **Wskazówki techniczne** przy każdym ćwiczeniu
- **🎬 Linki do YouTube** — przycisk „Pokaż" przy każdym ćwiczeniu otwiera wyszukiwanie techniki na YouTube
- **🎯 Wybór celu treningowego** — Redukcja / Masa / Siła / Rzeźba / Kondycja (wpływa na liczbę serii, powtórzeń i czas przerw)
- **📦 Plan offline** — 30 gotowych planów (10 × Push, 10 × Pull, 10 × Legs) bez internetu i bez kosztów API, inteligentny wybór uzupełniający brakujące partie

### 📝 Rejestrowanie treningu
- **Powtórzenia × serie** — wpisujesz liczbę powtórzeń, aplikacja liczy łączną sumę automatycznie
- **Ciężar w kg** — śledzenie postępu obciążeń
- **🏷️ Hint ostatniego ciężaru** — pod polem ciężaru wyświetla się szary tekst z ostatnio używanym obciążeniem (np. `🏋️ ostatnio: 80 kg`), a przy pierwszym użyciu ćwiczenia — sugerowany ciężar startowy. Typ sprzętu (sztanga / hantle / maszyna / drążek) wykrywany automatycznie z nazwy ćwiczenia
- **💪 Kalkulator 1RM** — szacowany maksymalny ciężar jednopowtórzeniowy (wzory Brzycki i Epley)
- **⏱️ Stoper czasu treningu** — mierzy czas całej sesji od wygenerowania planu do zapisu
- **📅 Wybór daty treningu** — możliwość wpisania treningu z poprzedniego dnia gdy zapomnisz uruchomić aplikację na siłowni
- **⏰ Timer odpoczynku (FAB)** z presetami 60 s / 90 s / 120 s (domyślny preset dostosowany do wybranego celu), SVG pierścień wizualizujący upływający czas
- **🖐️ Przeciągany timer** — timer można swobodnie przesuwać palcem po ekranie, pozycja zapamiętywana między sesjami
- **🎤 Komunikat głosowy po polsku** — informuje o końcu przerwy (Web Speech API)
- **🔔 Dźwięk dzwonka i wibracja** — konfigurowalne niezależnie
- **💾 Automatyczny zapis roboczy** — odświeżenie strony przywraca poprzedni trening automatycznie
- **⚠️ Przypomnienie o zapisaniu** — pojawia się gdy wszystkie pola są wypełnione
- **📊 Pasek postępu ćwiczeń** — pokazuje ile ćwiczeń zostało wypełnionych (np. 3/7)
- **🚫 Zakończ bez zapisywania** — czerwony przycisk obok „Zapisz trening", czyści plan bez wpisu do historii
- **📝 Notatka do treningu** — pole tekstowe po sesji z feedbackiem (np. „za dużo ćwiczeń", „bolało kolano"); Claude uwzględnia ją przy kolejnym planie tego samego typu

### 📊 Analiza i statystyki
- **Statystyki tygodniowe** — liczba treningów, powtórzeń, wartości średnie
- **Wykres ostatnich 45 dni** — podział na Push / Pull / Legs
- **Analiza wybranego ćwiczenia** — rekord, średnia, trend ciężaru
- **🔥 Najlepszy 1RM** — historyczny rekord siły dla każdego ćwiczenia
- **Wykres progresji ciężaru** dla wybranego ćwiczenia
- **🧠 AI Coach** — Claude analizuje historię treningów i wskazuje stagnację, postępy oraz sugestie zwiększenia obciążenia
- **💪 Statystyki partii mięśniowych** — podział na klatka górna/środkowa/dolna, biceps długa/krótka głowa, plecy szerokie/środkowe, czworogłowy, hamstring i inne (ostatnie 45 dni)

### 📥 Import treningu
- **Import z tekstu (AI)** — wklej opis treningu w dowolnym formacie, a Claude rozpozna wszystkie dane
- **Import z pliku CSV** — wczytaj wcześniej wyeksportowany plik CSV bez użycia API (bezpłatnie)
- **Podgląd przed zapisem** — sprawdź poprawność danych zanim trafią do historii
- **Obsługa niestandardowej liczby serii** — np. 2×8 zamiast 3×8, gdy trening był przerwany
- **Wykrywanie duplikatów** — treningi już obecne w historii nie zostaną dodane ponownie

### 👥 Profile i dane
- **Wiele profili** — osobne profile dla Ciebie, partnera lub znajomych
- **Trwała historia** — dane przechowywane lokalnie w przeglądarce
- **Czytelna data w historii** — format DD.MM.YYYY · HH:MM z oznaczeniem „dziś" i „wczoraj"
- **Eksport do CSV i PDF** — kopia zapasowa z pełnymi danymi (1RM, czas treningu, ciężary)
- **🛡️ Przypomnienie o kopii zapasowej** co 3 tygodnie

### 📱 Progresywna Aplikacja Webowa (PWA)
- **Instalacja na telefonie** — działa jak natywna aplikacja
- **Instalacja na komputerze** — Chrome i Edge
- **Pełna obsługa trybu offline** (z wyjątkiem generowania planów przez AI i AI Coach)
- **Automatyczne wykrywanie aktualizacji** — aplikacja wyświetli powiadomienie o nowej wersji
- **Ekran startowy** z logo i animacją przy uruchomieniu
- **Ikona na ekranie głównym** i ciemny motyw (dark mode)
- **Wskaźnik trybu offline** — widoczna informacja o braku połączenia z internetem

---

## 🎯 Cele treningowe

Przed wygenerowaniem planu wybierasz cel — Claude dostosowuje plan do Twojego priorytetu:

| Cel | Powtórzenia | Serie | Przerwy |
|---|---|---|---|
| **Redukcja** | 12–15 | 3 | 45–60 s |
| **Rzeźba** | 12–15 | 3–4 | 45–60 s |
| **Masa** | 8–12 | 3–4 | 60–90 s |
| **Siła** | 3–5 | 4–5 | 3–5 min |
| **Kondycja** | 15–20 | 3 | 30–45 s |

Cel jest zapisany w profilu. Aplikacja przypomni o jego weryfikacji co 4 tygodnie.

---

## 🚀 Pierwsze uruchomienie

1. Otwórz `https://bonioslaw.github.io/trening/`
2. Kliknij ikonę profilu (litera w kółku, prawy górny róg)
3. Wklej klucz API Anthropic (zaczyna się od `sk-ant-...`)
   - Utwórz klucz na [console.anthropic.com](https://console.anthropic.com) → Settings → API Keys
   - Wymagane doładowanie konta (minimum 5 USD)
4. Wybierz typ treningu (Push / Pull / Legs) i cel
5. Kliknij **Generuj plan** — plan pojawi się w ciągu 2–3 sekund
6. Ćwicz — przechodź przez partie mięśniowe, wpisuj powtórzenia i ciężary, korzystaj z timera odpoczynku
7. Po ostatniej partii kliknij **Zakończ trening** — dane trafią do historii wraz z datą i czasem trwania sesji

---

## 🏋️ Nawigacja po partiach mięśniowych

Po wygenerowaniu planu ćwiczenia są pogrupowane wg partii (np. klatka → barki → triceps dla Push). Aplikacja pokazuje je po jednej grupie na raz:

- Przycisk **Dalej** → przejdź do kolejnej partii (wartości wpisane w poprzedniej są zapamiętane)
- Przycisk **Poprzednia** → wróć i popraw
- Na ostatniej partii pojawia się przycisk **Zakończ trening** — zapisuje wyniki wszystkich partii

---

## ⏰ Timer odpoczynku

Timer wyświetla się jako pływający element (FAB) z wizualnym pierścieniem SVG. Możesz go **przesunąć palcem** w dowolne miejsce ekranu — pozycja jest zapamiętywana.

- **60 s / 90 s / 120 s** — szybkie presety
- **Start / Pauza** — kliknięcie pierścienia
- **Głos, dźwięk, wibracja** — konfigurowalne niezależnie
- Domyślny preset dobierany automatycznie wg wybranego celu treningowego

---

## 📅 Wpisywanie treningu z poprzedniego dnia

Jeśli zapomniałeś uruchomić aplikację na siłowni:

1. Wygeneruj plan normalnie (Push / Pull / Legs)
2. Tuż nad listą ćwiczeń znajdziesz pole **Data treningu**
3. Kliknij w datę i wybierz właściwy dzień
4. Pojawi się badge **„zmieniono"** — aplikacja wie że wpisujesz trening wsteczny
5. Wpisz wyniki i zapisz — trening trafi do historii z właściwą datą

---

## 📝 Notatka do treningu

Po wygenerowaniu planu nad przyciskiem „Zakończ trening" pojawia się pole notatki. Możesz wpisać dowolny komentarz po sesji — np.:

- *„za dużo ćwiczeń, byłem wykończony"* → Claude wygeneruje mniej ćwiczeń przy kolejnym planie
- *„za mało, miałem dużo energii"* → Claude doda więcej ćwiczeń
- *„bolało kolano przy martwym ciągu"* → Claude uniknie ćwiczeń obciążających kolana
- *„świetna sesja, dobry ciężar"* → Claude utrzyma podobną intensywność

Notatka jest zapisywana razem z treningiem i widoczna w historii. Claude czyta **ostatnią notatkę dla danego typu** (Push/Pull/Legs) przy każdym kolejnym generowaniu planu.

---

## 📦 Plan offline

Gdy nie masz dostępu do internetu lub nie chcesz korzystać z API:

1. Wybierz typ treningu (Push / Pull / Legs)
2. Kliknij przycisk **Plan offline** (obok „Generuj plan")
3. Aplikacja wybiera plan z wbudowanej bazy — **inteligentnie**, tzn. preferuje ćwiczenia i partie mięśniowe których nie robiłeś w ostatnich 7 dniach
4. Plan działa tak samo jak plan z AI — timer, zapis, statystyki

Baza zawiera **30 gotowych planów** (10 × Push, 10 × Pull, 10 × Legs) oraz **276 ćwiczeń** zmapowanych na 25 głów mięśniowych.

> Plan offline nie wymaga klucza API — działa całkowicie lokalnie, bez kosztów.

---

## 💪 Kalkulator 1RM — jak to działa

**1RM (One-Rep Max)** to szacowany maksymalny ciężar, który możesz podnieść w jednym powtórzeniu. Aplikacja oblicza go jako średnią z dwóch sprawdzonych wzorów:

```
Brzycki:  1RM = ciężar × (36 / (37 − powtórzenia))
Epley:    1RM = ciężar × (1 + powtórzenia / 30)
```

**Przykład:** Wyciskanie 80 kg × 8 powtórzeń → szacowany 1RM ≈ 99 kg

Kalkulator działa dla zakresu 2–12 powtórzeń. Wynik zaokrąglany do 0,5 kg.

---

## 📥 Import z pliku CSV

Jeśli wcześniej wykonałeś eksport historii do CSV, możesz go z powrotem wczytać:

1. Otwórz panel **Historia** → kliknij przycisk **Import**
2. Wybierz zakładkę **Plik CSV**
3. Kliknij strefę lub przeciągnij plik CSV bezpośrednio na nią
4. Aplikacja wyświetli podgląd — ile treningów zostanie dodanych, ile pominiętych
5. Kliknij **Importuj** — dane trafią do historii

> Import z CSV nie wymaga klucza API — działa całkowicie lokalnie, bez kosztów.

---

## 📲 Instalacja jako aplikacja

### Android (Chrome)
- Po wejściu na stronę pojawi się baner **„Zainstaluj jako aplikację"**
- Możesz też wejść w menu Chrome (trzy kropki) → „Zainstaluj aplikację"

### iPhone (Safari)
- Otwórz stronę w Safari
- Kliknij przycisk **Udostępnij** (kwadrat ze strzałką skierowaną w górę)
- Wybierz **Dodaj do ekranu głównego**

### Windows i macOS (Chrome / Edge)
- W pasku adresu kliknij ikonę instalacji (monitor ze strzałką)

---

## 💰 Koszty

| Co | Koszt |
|---|---|
| Hosting (GitHub Pages) | Bezpłatny |
| Aplikacja | Bezpłatna |
| Generowanie planu (AI) | ~0,005–0,01 USD (2–4 grosze) |
| AI Coach | ~0,01–0,02 USD (4–8 groszy) |
| Import z tekstu (AI) | ~0,005 USD (2 grosze) |
| Plan offline | Bezpłatny |
| Import z pliku CSV | Bezpłatny |
| Minimum doładowania API | 5 USD |

> 💡 AI Coach analizuje maksymalnie 50 ostatnich treningów, dzięki czemu koszt pojedynczej analizy pozostaje niski niezależnie od długości historii.

---

## 🛠️ Użyte technologie

- **HTML5, CSS3, Vanilla JavaScript** — bez zewnętrznych frameworków
- [Chart.js 4.4](https://www.chartjs.org/) — wykresy
- [jsPDF 2.5](https://github.com/parallax/jsPDF) — eksport do PDF
- [Tabler Icons](https://tabler-icons.io/) — ikony
- [canvas-confetti](https://github.com/catdad/canvas-confetti) — animacja po zapisaniu treningu
- [Claude API](https://www.anthropic.com/) — generowanie planów i analiza AI (model Sonnet 4.6)
- **Web Audio API** — dźwięk dzwonka generowany przez syntezator
- **Web Speech API** — komunikat głosowy po polsku (synteza mowy)
- **Vibration API** — wibracja telefonu po zakończeniu przerwy
- **localStorage** — trwałe przechowywanie danych lokalnie
- **Service Worker** — tryb offline, PWA i automatyczne aktualizacje

---

## 📁 Struktura repozytorium

```
trening/
├── index.html              # Główny plik aplikacji (~175 KB)
├── db.js                   # Baza planów offline + słownik głów mięśniowych
├── manifest.json           # Konfiguracja PWA
├── sw.js                   # Service Worker (offline i automatyczne aktualizacje)
├── icon-192.png            # Ikona aplikacji 192×192 px
├── icon-512.png            # Ikona aplikacji 512×512 px
├── icon-maskable-512.png   # Ikona z obszarem bezpiecznym dla Androida
└── README.md               # Ten plik
```

---

## 🔒 Prywatność i bezpieczeństwo

- 🔐 **Klucz API** przechowywany wyłącznie lokalnie w przeglądarce (localStorage)
- 📦 **Historia treningów** zapisywana lokalnie — nie jest nigdzie przesyłana
- 🚫 **Brak rejestracji, konta, śledzenia aktywności i reklam**
- 📡 Połączenie z internetem służy **wyłącznie** do komunikacji z Claude API
- 🛡️ **Walidacja danych** — uszkodzone wpisy w pamięci lokalnej są automatycznie filtrowane
- 🔍 **Ochrona przed XSS** — odpowiedzi z AI są bezpiecznie przetwarzane przed wyświetleniem

---

## ⚠️ Ważne informacje

- Dane są przypisane do **konkretnej przeglądarki na konkretnym urządzeniu**
- Wyczyszczenie danych przeglądarki spowoduje utratę historii — **rób regularne kopie zapasowe**
- Zainstalowana PWA ma **oddzielny cache** od przeglądarki — wyczyszczenie cache Chrome nie usuwa danych aplikacji
- Limit historii: 200 ostatnich treningów na profil
- Limit tekstu przy imporcie przez AI: 4000 znaków
- AI Coach analizuje maksymalnie 50 ostatnich treningów

---

## 🐛 Rozwiązywanie problemów

### Aplikacja nie aktualizuje się po wgraniu nowej wersji
1. Poczekaj chwilę — aplikacja sama wykryje aktualizację i wyświetli powiadomienie
2. Wymuś odświeżenie: **Ctrl+Shift+R** (komputer) lub wyczyść pamięć podręczną Chrome (telefon)
3. Odinstaluj aplikację PWA i zainstaluj ją ponownie

### Baner „Zainstaluj" nie pojawia się na Androidzie
- Upewnij się że używasz Chrome
- Sprawdź menu Chrome (trzy kropki) → „Zainstaluj aplikację"
- Baner pojawia się dopiero podczas drugiej wizyty, minimum 5 minut po pierwszej

### Baner „Zainstaluj" nie pojawia się na iPhonie
To zamierzone ograniczenie Apple — PWA na iOS instaluje się wyłącznie ręcznie:
Safari → Udostępnij → **Dodaj do ekranu głównego**

### Komunikat głosowy nie działa
- Sprawdź czy telefon ma zainstalowany polski głos: Ustawienia → Dostępność → Synteza mowy
- Na iPhonie dźwięk wymaga wcześniejszego dotknięcia ekranu (ograniczenie systemu iOS)

---

## 📜 Licencja

Projekt prywatny, do użytku własnego.
