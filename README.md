# 💪 Trening Pro

Personalna aplikacja treningowa Push / Pull / Press z generowaniem planów przez AI (Claude), trwałą historią, wykresami postępu, analizą siły i timerem odpoczynku z głosem polskim. Działa offline jako PWA — zainstalujesz na telefonie i komputerze.

---

## ✨ Funkcje

### 🎯 Plany treningowe
- **3 typy treningu:** Push (klatka, barki, triceps) / Pull (plecy, biceps) / Press (barki, ramiona)
- **Generowanie planów przez Claude AI** — 5 ćwiczeń z opisem techniki
- **Zróżnicowanie** — Claude widzi historię i nie powtarza ćwiczeń
- **Wskazówki techniczne** przy każdym ćwiczeniu
- **🎬 Linki do YouTube** — przy każdym ćwiczeniu jest przycisk "Pokaż" otwierający wyszukiwanie techniki na YouTube

### 📝 Logowanie treningu
- **Powtórzenia × 3 serie** — wpisujesz raz, aplikacja mnoży automatycznie
- **Ciężar w kg** — śledzenie progresji ciężarów
- **💪 Kalkulator 1RM** — szacowany maksymalny ciężar jednopowtórzeniowy (wzory Brzycki + Epley)
- **⏱️ Stoper czasu treningu** — pokazuje ile trwa cała sesja, automatyczny start i zapis
- **⏰ Timer odpoczynku** z presetami 60s / 90s / 2min / 3min
- **🎤 Powiadomienie głosowe po polsku** po zakończeniu przerwy (Web Speech API)
- **🔔 Dźwięk dzwonka + wibracja** (konfigurowalne)
- **💾 Auto-save** — odświeżenie strony nie powoduje utraty danych
- **⚠️ Przypomnienie o zapisie** gdy wszystkie pola wypełnione

### 📊 Analiza i statystyki
- **Statystyki tygodniowe** — treningi, powtórzenia, średnie
- **Wykres postępu** ostatnich 14 dni (Push/Pull/Press)
- **Analiza per ćwiczenie** — rekord, średnia, trend ciężaru
- **🔥 Najlepszy 1RM dla ćwiczenia** — historyczny rekord siły
- **Wykres progresji ciężaru** dla wybranego ćwiczenia
- **🧠 AI Coach** — Claude analizuje historię i daje konkretne porady (stagnacja, postępy, sugestie zwiększenia ciężaru)

### 📥 Import treningu
- **Wklejasz luźny tekst** ze swojego treningu (np. *"1. Wyciskanie 3x10 80kg, 2. Pompki 3x15..."*)
- **AI parsuje automatycznie** — rozpoznaje różne formaty zapisu, czas treningu, notatki
- **Podgląd przed zapisem** — możesz zweryfikować zanim wgrasz do historii
- **Niestandardowe ilości serii** — obsługa np. 2×8 zamiast 3×8 (gdy trening był przerwany)

### 👥 Profile i dane
- **Wiele profili** — Twój, partnera, znajomych
- **Trwała historia** — zapisana lokalnie w przeglądarce
- **Eksport CSV i PDF** — kopia zapasowa do druku/Excela (z 1RM, czasem treningu, ciężarami)
- **🛡️ Przypomnienie o backupie** co 3 tygodnie

### 📱 Progressive Web App (PWA)
- **Instalacja na telefonie** — działa jak natywna aplikacja
- **Instalacja na komputerze** — Chrome/Edge
- **Pełna obsługa offline** (poza generowaniem planów)
- **Automatyczne wykrywanie aktualizacji** — aplikacja powiadomi gdy będzie nowa wersja
- **Ikona na ekranie głównym** + dark mode
- **Tryb offline z badge** — widzisz gdy nie masz internetu

---

## 🚀 Pierwsze użycie

1. Wejdź na `https://[twoja-nazwa].github.io/trening/`
2. Kliknij ikonę profilu (litera w kółku w prawym górnym rogu)
3. Wklej klucz API Anthropic (zaczyna się od `sk-ant-...`)
   - Pobierz na [console.anthropic.com](https://console.anthropic.com) → Settings → API Keys
   - Wymaga doładowania konta minimum 5 USD
4. Wybierz typ treningu (Push / Pull / Press)
5. Kliknij **Generuj plan** — 5 ćwiczeń pojawi się w 2-3 sekundy
6. Trenuj — wpisuj powtórzenia i kg, używaj timera odpoczynku
7. **Zapisz trening** — dane zostaną w historii wraz z czasem trwania

---

## 💪 Kalkulator 1RM — jak to działa

**1RM (One-Rep Max)** to szacowany maksymalny ciężar, który możesz podnieść w jednym powtórzeniu. Aplikacja używa średniej z dwóch standardowych wzorów stosowanych w branży:

```
Brzycki:  1RM = ciężar × (36 / (37 - powtórzenia))
Epley:    1RM = ciężar × (1 + powtórzenia / 30)
```

**Przykład:** Wyciskanie 80 kg × 8 powtórzeń → szacowany 1RM ≈ 99 kg

Działa w zakresie 2-12 powtórzeń (powyżej tego wzory tracą dokładność). Wynik zaokrąglany do 0.5 kg.

---

## 📲 Instalacja jako aplikacja

### Android (Chrome)
- Po wejściu na stronę pojawi się banner **"Zainstaluj jako aplikację"**
- Klikasz → aplikacja ląduje na ekranie głównym

### iPhone (Safari)
- Otwórz stronę
- Kliknij przycisk **Udostępnij** (kwadrat ze strzałką w górę)
- Przewiń niżej → **Dodaj do ekranu początkowego**

### Windows / Mac (Chrome / Edge)
- W pasku adresu pojawi się ikona instalacji (monitor ze strzałką)
- Klikasz → aplikacja zainstaluje się jako oddzielny program

---

## 💰 Koszty

- ✅ **Hosting (GitHub Pages):** darmowy
- ✅ **Aplikacja:** darmowa
- 💵 **Anthropic API:**
  - Generowanie planu: ~$0.005-0.01 (2-4 grosze)
  - AI Coach: ~$0.01-0.02 (4-8 groszy)
  - Import treningu: ~$0.005 (2 grosze)
- 💵 **Minimum doładowania:** $5 USD = setki/tysiące planów

> 💡 AI Coach automatycznie ogranicza dane do 50 ostatnich treningów żeby koszt jednej analizy zawsze pozostał niski, niezależnie od długości historii.

---

## 🛠️ Stack technologiczny

- **HTML5 + CSS3 + Vanilla JavaScript** — bez frameworków
- [Chart.js 4.4](https://www.chartjs.org/) — wykresy
- [jsPDF 2.5](https://github.com/parallax/jsPDF) — eksport PDF
- [Tabler Icons](https://tabler-icons.io/) — ikonografia
- [Claude API](https://www.anthropic.com/) — generowanie planów (Sonnet 4.6)
- **Web Audio API** — dźwięk dzwonka (generowany syntezatorem)
- **Web Speech API** — komunikat głosowy po polsku (TTS)
- **Vibration API** — wibracja telefonu
- **localStorage** — trwała pamięć
- **Service Worker** — offline + PWA + auto-update

---

## 📁 Struktura plików

```
trening/
├── index.html                  # Główny plik aplikacji (~110 KB)
├── manifest.json               # Konfiguracja PWA
├── sw.js                       # Service Worker (offline + auto-update)
├── icon-192.png                # Ikona aplikacji 192×192
├── icon-512.png                # Ikona aplikacji 512×512
├── icon-maskable-512.png       # Ikona maskable Android
└── README.md                   # Ten plik
```

---

## 🔒 Prywatność i bezpieczeństwo

- 🔐 **Klucz API** przechowywany lokalnie w localStorage przeglądarki
- 📦 **Historia treningów** zapisywana lokalnie — nigdzie nie wychodzi
- 🚫 **Brak rejestracji, brak konta, brak trackingu, brak reklam**
- 📡 Internetu używa **wyłącznie** do komunikacji z Claude API (generowanie planów + AI Coach + import)
- 🛡️ **Walidacja danych** z localStorage — uszkodzone wpisy są filtrowane, aplikacja nie umiera
- 🔍 **Sanityzacja XSS** — odpowiedzi z AI są bezpiecznie renderowane (escapeHtml)

---

## ⚠️ Ważne uwagi

- Dane są przypisane do **konkretnej przeglądarki na konkretnym urządzeniu**
- Wyczyszczenie cache przeglądarki = utrata danych
- **Rób backup co 3 tygodnie** — aplikacja przypomni
- Limit historii: 200 ostatnich treningów na profil (starsze są automatycznie usuwane)
- Limit długości tekstu w imporcie: 4000 znaków
- AI Coach analizuje maksymalnie 50 ostatnich treningów (chroni przed wysokimi kosztami)

---

## 🐛 Najczęstsze problemy

### Aplikacja nie aktualizuje się po wgraniu nowej wersji
Service Worker cachuje pliki. Rozwiązania (od najprostszego):
1. Poczekaj — aplikacja sama wykryje aktualizację i pokaże toast
2. Twarde odświeżenie: `Ctrl+Shift+R` (komputer) lub wyczyść cache Chrome (telefon)
3. Odinstaluj PWA i zainstaluj na nowo

### Banner "Zainstaluj" się nie pojawia na Androidzie
- Sprawdź czy używasz Chrome (nie Firefox/Opera)
- Sprawdź w menu Chrome (3 kropki) → "Zainstaluj aplikację"
- Banner pojawia się dopiero przy 2. wizycie (po 5+ minutach od pierwszej)

### Banner się nie pojawia na iPhone
To normalne — Apple ogranicza PWA. Trzeba zainstalować ręcznie:
- Safari → Udostępnij → "Dodaj do ekranu początkowego"

### Głos nie działa
- Sprawdź czy telefon ma zainstalowany polski głos (Ustawienia → Dostępność → Mowa)
- Na iPhone — pierwsza interakcja z aplikacją wymagana przed audio

---

## 📜 Licencja

Projekt prywatny, do użytku własnego.
