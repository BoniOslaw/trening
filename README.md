# 💪 Trening Pro

Osobista aplikacja treningowa Push / Pull / Legs z generowaniem planów przez AI (Claude), historią treningów, wykresami postępu i analizą siły. Działa offline jako PWA — możesz zainstalować ją na telefonie i komputerze.

Plany treningowe generuje **Claude** — model AI wytrenowany na obszernej literaturze naukowej z dziedziny fizjologii sportu, treningu siłowego i periodyzacji. Dobór ćwiczeń, liczba powtórzeń, serie i kolejność ruchów są zgodne z aktualną wiedzą naukową dotyczącą treningu siłowego. Dodatkowo Claude uwzględnia Twoją indywidualną historię — nie powtarza tych samych ćwiczeń i dostosowuje plan do Twojego poziomu zaawansowania.

---

## ✨ Funkcje

### 🎯 Plany treningowe
- **3 typy treningu:** Push (klatka, barki, triceps) / Pull (plecy, biceps) / Legs (nogi, dolny odcinek pleców)
- **Generowanie planu przez Claude AI** — 5 ćwiczeń dobranych zgodnie z wiedzą naukową o treningu siłowym, z opisem techniki wykonania
- **Spersonalizowane plany** — Claude analizuje Twoją historię treningów i dobiera ćwiczenia pod Twój poziom zaawansowania
- **Zróżnicowanie ćwiczeń** — aplikacja nie powtarza tych samych ćwiczeń przy kolejnych sesjach tego samego typu
- **Wskazówki techniczne** przy każdym ćwiczeniu
- **🎬 Linki do YouTube** — przycisk „Pokaż" przy każdym ćwiczeniu otwiera wyszukiwanie techniki na YouTube

### 📝 Rejestrowanie treningu
- **Powtórzenia × 3 serie** — wpisujesz liczbę powtórzeń, aplikacja liczy łączną sumę automatycznie
- **Ciężar w kg** — śledzenie postępu obciążeń
- **💪 Kalkulator 1RM** — szacowany maksymalny ciężar jednopowtórzeniowy (wzory Brzycki i Epley)
- **⏱️ Stoper czasu treningu** — mierzy czas całej sesji od wygenerowania planu do zapisu
- **⏰ Timer odpoczynku** z ustawieniami 60 s / 90 s / 2 min / 3 min
- **🎤 Komunikat głosowy po polsku** — informuje o końcu przerwy (Web Speech API)
- **🔔 Dźwięk dzwonka i wibracja** — konfigurowalne niezależnie
- **💾 Automatyczny zapis roboczy** — odświeżenie strony nie powoduje utraty danych
- **⚠️ Przypomnienie o zapisaniu** — pojawia się gdy wszystkie pola są wypełnione

### 📊 Analiza i statystyki
- **Statystyki tygodniowe** — liczba treningów, powtórzeń, wartości średnie
- **Wykres ostatnich 14 dni** — podział na Push / Pull / Legs
- **Analiza wybranego ćwiczenia** — rekord, średnia, trend ciężaru
- **🔥 Najlepszy 1RM** — historyczny rekord siły dla każdego ćwiczenia
- **Wykres progresji ciężaru** dla wybranego ćwiczenia
- **🧠 AI Coach** — Claude analizuje historię treningów i wskazuje stagnację, postępy oraz sugestie zwiększenia obciążenia

### 📥 Import treningu
- **Import z tekstu (AI)** — wklej opis treningu w dowolnym formacie, np. *„1. Wyciskanie 3×10 80 kg, 2. Pompki 3×15"*, a Claude rozpozna wszystkie dane
- **Import z pliku CSV** — wczytaj wcześniej wyeksportowany plik CSV bez użycia API (bezpłatnie)
- **Podgląd przed zapisem** — sprawdź poprawność danych zanim trafią do historii
- **Obsługa niestandardowej liczby serii** — np. 2×8 zamiast 3×8, gdy trening był przerwany
- **Wykrywanie duplikatów** — treningi już obecne w historii nie zostaną dodane ponownie

### 👥 Profile i dane
- **Wiele profili** — osobne profile dla Ciebie, partnera lub znajomych
- **Trwała historia** — dane przechowywane lokalnie w przeglądarce
- **Eksport do CSV i PDF** — kopia zapasowa z pełnymi danymi (1RM, czas treningu, ciężary)
- **🛡️ Przypomnienie o kopii zapasowej** co 3 tygodnie

### 📱 Progresywna Aplikacja Webowa (PWA)
- **Instalacja na telefonie** — działa jak natywna aplikacja
- **Instalacja na komputerze** — Chrome i Edge
- **Pełna obsługa trybu offline** (z wyjątkiem generowania planów i AI Coach)
- **Automatyczne wykrywanie aktualizacji** — aplikacja wyświetli powiadomienie o nowej wersji
- **Ikona na ekranie głównym** i ciemny motyw (dark mode)
- **Wskaźnik trybu offline** — widoczna informacja o braku połączenia z internetem

---

## 🚀 Pierwsze uruchomienie

1. Otwórz `https://bonioslaw.github.io/trening/`
2. Kliknij ikonę profilu (litera w kółku, prawy górny róg)
3. Wklej klucz API Anthropic (zaczyna się od `sk-ant-...`)
   - Utwórz klucz na [console.anthropic.com](https://console.anthropic.com) → Settings → API Keys
   - Wymagane doładowanie konta (minimum 5 USD)
4. Wybierz typ treningu (Push / Pull / Legs)
5. Kliknij **Generuj plan** — 5 ćwiczeń pojawi się w ciągu 2–3 sekund
6. Ćwicz — wpisuj powtórzenia i ciężary, korzystaj z timera odpoczynku
7. Kliknij **Zapisz trening** — dane trafią do historii wraz z czasem trwania sesji

---

## 💪 Kalkulator 1RM — jak to działa

**1RM (One-Rep Max)** to szacowany maksymalny ciężar, który możesz podnieść w jednym powtórzeniu. Aplikacja oblicza go jako średnią z dwóch sprawdzonych wzorów:

```
Brzycki:  1RM = ciężar × (36 / (37 − powtórzenia))
Epley:    1RM = ciężar × (1 + powtórzenia / 30)
```

**Przykład:** Wyciskanie 80 kg × 8 powtórzeń → szacowany 1RM ≈ 99 kg

Kalkulator działa dla zakresu 2–12 powtórzeń — powyżej tej granicy wzory tracą dokładność. Wynik jest zaokrąglany do 0,5 kg.

---

## 📥 Import z pliku CSV

Jeśli wcześniej wykonałeś eksport historii do CSV, możesz go z powrotem wczytać do aplikacji:

1. Otwórz panel **Historia** → kliknij przycisk **Import**
2. Wybierz zakładkę **Plik CSV**
3. Kliknij strefę przeciągania lub przeciągnij plik CSV bezpośrednio na nią
4. Aplikacja wyświetli podgląd — ile treningów zostanie dodanych, ile zostanie pominiętych jako duplikaty
5. Kliknij **Importuj** — dane trafią do historii

> Import z CSV nie wymaga klucza API — działa całkowicie lokalnie, bez kosztów.

---

## 📲 Instalacja jako aplikacja

### Android (Chrome)
- Po wejściu na stronę pojawi się baner **„Zainstaluj jako aplikację"**
- Kliknij baner — ikona aplikacji pojawi się na ekranie głównym

### iPhone (Safari)
- Otwórz stronę w Safari
- Kliknij przycisk **Udostępnij** (kwadrat ze strzałką skierowaną w górę)
- Przewiń listę w dół i wybierz **Dodaj do ekranu głównego**

### Windows i macOS (Chrome / Edge)
- W pasku adresu pojawi się ikona instalacji (monitor ze strzałką)
- Kliknij ikonę — aplikacja zainstaluje się jako oddzielny program

---

## 💰 Koszty

| Co | Koszt |
|---|---|
| Hosting (GitHub Pages) | Bezpłatny |
| Aplikacja | Bezpłatna |
| Generowanie planu (AI) | ~0,005–0,01 USD (2–4 grosze) |
| AI Coach | ~0,01–0,02 USD (4–8 groszy) |
| Import z tekstu (AI) | ~0,005 USD (2 grosze) |
| Import z pliku CSV | Bezpłatny |
| Minimum doładowania API | 5 USD |

> 💡 AI Coach analizuje maksymalnie 50 ostatnich treningów, dzięki czemu koszt pojedynczej analizy pozostaje niski niezależnie od długości historii.

---

## 🛠️ Użyte technologie

- **HTML5, CSS3, Vanilla JavaScript** — bez zewnętrznych frameworków
- [Chart.js 4.4](https://www.chartjs.org/) — wykresy
- [jsPDF 2.5](https://github.com/parallax/jsPDF) — eksport do PDF
- [Tabler Icons](https://tabler-icons.io/) — ikony
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
├── index.html              # Główny plik aplikacji (~123 KB)
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
- 📡 Połączenie z internetem służy **wyłącznie** do komunikacji z Claude API (generowanie planów, AI Coach, import z tekstu)
- 🛡️ **Walidacja danych** — uszkodzone lub niekompletne wpisy w pamięci lokalnej są automatycznie filtrowane
- 🔍 **Ochrona przed XSS** — odpowiedzi z AI są bezpiecznie przetwarzane przed wyświetleniem

---

## ⚠️ Ważne informacje

- Dane są przypisane do **konkretnej przeglądarki na konkretnym urządzeniu** — nie synchronizują się automatycznie
- Wyczyszczenie danych przeglądarki spowoduje utratę historii — **rób regularne kopie zapasowe** (aplikacja przypomni co 3 tygodnie)
- Limit historii: 200 ostatnich treningów na profil — starsze wpisy są usuwane automatycznie
- Limit tekstu przy imporcie przez AI: 4000 znaków
- AI Coach analizuje maksymalnie 50 ostatnich treningów

---

## 🐛 Rozwiązywanie problemów

### Aplikacja nie aktualizuje się po wgraniu nowej wersji

Service Worker przechowuje pliki w pamięci podręcznej. Wypróbuj kolejno:

1. Poczekaj chwilę — aplikacja sama wykryje aktualizację i wyświetli powiadomienie
2. Wymuś odświeżenie: **Ctrl+Shift+R** (komputer) lub wyczyść pamięć podręczną Chrome (telefon)
3. Odinstaluj aplikację PWA i zainstaluj ją ponownie

### Baner „Zainstaluj" nie pojawia się na Androidzie

- Upewnij się, że używasz Chrome (nie Firefoksa ani Opery)
- Sprawdź menu Chrome (trzy kropki) → „Zainstaluj aplikację"
- Baner pojawia się dopiero podczas drugiej wizyty, minimum 5 minut po pierwszej

### Baner „Zainstaluj" nie pojawia się na iPhonie

To zamierzone ograniczenie Apple — PWA na iOS instaluje się wyłącznie ręcznie:
Safari → Udostępnij → **Dodaj do ekranu głównego**

### Komunikat głosowy nie działa

- Sprawdź, czy telefon ma zainstalowany polski głos: Ustawienia → Dostępność → Synteza mowy
- Na iPhonie dźwięk wymaga wcześniejszego dotknięcia ekranu (ograniczenie systemu iOS)

---

## 📜 Licencja

Projekt prywatny, do użytku własnego.
