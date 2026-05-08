# 💪 Trening Pro

Personalna aplikacja treningowa Push / Pull / Press z generowaniem planów przez AI (Claude), trwałą historią, wykresami postępu i analizą siły. Działa offline jako PWA — możesz zainstalować na telefonie i komputerze.

---

## ✨ Funkcje

### Plany treningowe
- 🎯 **3 typy treningu:** Push (klatka, barki, triceps) / Pull (plecy, biceps) / Press (barki, ramiona)
- 🤖 **Generowanie planów przez Claude AI** — 5 ćwiczeń z opisem techniki
- 🔄 **Zróżnicowanie** — Claude widzi historię i nie powtarza tych samych ćwiczeń
- 💡 **Wskazówki techniczne** przy każdym ćwiczeniu

### Logowanie treningu
- 📝 **Powtórzenia × 3 serie** — wpisujesz raz, aplikacja mnoży automatycznie
- 🏋️ **Ciężar w kg** — śledzenie progresji ciężarów
- ⏱️ **Timer odpoczynku** z presetami 60s / 90s / 2min / 3min
- 🎤 **Powiadomienie głosowe po polsku** po zakończeniu przerwy
- 🔔 **Dźwięk dzwonka + wibracja** (konfigurowalne)
- ⚠️ **Auto-save** — odświeżenie strony nie powoduje utraty danych
- 💾 **Przypomnienie o zapisie** gdy wszystkie pola wypełnione

### Analiza i statystyki
- 📊 **Statystyki tygodniowe** — treningi, powtórzenia, średnie
- 📈 **Wykres postępu** ostatnich 14 dni (Push/Pull/Press)
- 🎯 **Analiza per ćwiczenie** — rekord, średnia, trend ciężaru
- 📉 **Wykres progresji ciężaru** dla wybranego ćwiczenia
- 🧠 **AI Coach** — Claude analizuje historię i daje konkretne porady (stagnacja, postępy, sugestie)

### Profile i dane
- 👥 **Wiele profili** — Twój, partnera, znajomych
- 💾 **Trwała historia** — zapisana lokalnie w przeglądarce
- 📤 **Eksport CSV i PDF** — kopia zapasowa do druku/Excela
- 🛡️ **Przypomnienie o backupie** co 3 tygodnie

### Progressive Web App (PWA)
- 📱 **Instalacja na telefonie** — działa jak natywna aplikacja
- 💻 **Instalacja na komputerze** — Chrome/Edge
- 🌐 **Pełna obsługa offline** (poza generowaniem planów)
- 🎨 **Ikona na ekranie głównym** + dark mode

---

## 🚀 Pierwsze użycie

1. Wejdź na `https://[twoja-nazwa].github.io/trening/`
2. Kliknij ikonę profilu (litera w kółku w prawym górnym rogu)
3. Wklej klucz API Anthropic (zaczyna się od `sk-ant-...`)
   - Pobierz na [console.anthropic.com](https://console.anthropic.com) → Settings → API Keys
   - Wymaga doładowania konta minimum 5 USD
4. Wybierz typ treningu (Push / Pull / Press)
5. Kliknij **Generuj plan** — 5 ćwiczeń pojawi się w 2-3 sekundy
6. Trenuj — wpisuj powtórzenia i kg, używaj timera
7. **Zapisz trening** — dane zostaną w historii

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
- 💵 **Anthropic API:** ~$0.005-0.01 za wygenerowany plan (2-4 grosze)
- 💵 **Minimum doładowania:** $5 USD = setki/tysiące planów

---

## 🛠️ Stack technologiczny

- HTML5 + CSS3 + Vanilla JavaScript
- [Chart.js 4.4](https://www.chartjs.org/) — wykresy
- [jsPDF 2.5](https://github.com/parallax/jsPDF) — eksport PDF
- [Tabler Icons](https://tabler-icons.io/) — ikonografia
- [Claude API](https://www.anthropic.com/) — generowanie planów (Sonnet 4.6)
- Web Audio API — dźwięk dzwonka
- Web Speech API — komunikat głosowy po polsku
- localStorage — trwała pamięć
- Service Worker — offline + PWA

---

## 📁 Struktura plików

```
trening/
├── index.html                  # Główny plik aplikacji
├── manifest.json               # Konfiguracja PWA
├── sw.js                       # Service Worker (offline)
├── icon-192.png                # Ikona aplikacji 192×192
├── icon-512.png                # Ikona aplikacji 512×512
├── icon-maskable-512.png       # Ikona maskable Android
└── README.md                   # Ten plik
```

---

## 🔒 Prywatność

- 🔐 **Klucz API** przechowywany lokalnie w localStorage przeglądarki
- 📦 **Historia treningów** zapisywana lokalnie — nigdzie nie wychodzi
- 🚫 **Brak rejestracji, brak konta, brak trackingu**
- 📡 Internetu używa **wyłącznie** do komunikacji z Claude API (generowanie planów + AI Coach)

---

## ⚠️ Ważne uwagi

- Dane są przypisane do **konkretnej przeglądarki na konkretnym urządzeniu**
- Wyczyszczenie cache przeglądarki = utrata danych
- **Rób backup co 3 tygodnie** — aplikacja przypomni
- Limit historii: 200 ostatnich treningów na profil (starsze są automatycznie usuwane)

---

## 📜 Licencja

Projekt prywatny, do użytku własnego.
