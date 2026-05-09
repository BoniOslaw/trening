// ============================================================================
// TRENING PRO - Baza danych: plany offline + słownik głów mięśniowych
// ============================================================================
// Plik ładowany jako window.TPDB = { plans, muscles }
// Dodaj do sw.js w STATIC_ASSETS żeby działał offline.
// ============================================================================

(function() {
  'use strict';

  // ==========================================================================
  // GŁOWY MIĘŚNIOWE - słownik nazw
  // ==========================================================================
  // Każde ćwiczenie ma jedną GŁÓWNĄ głowę mięśniową, która jest najbardziej
  // angażowana podczas wykonywania.
  // ==========================================================================

  const MUSCLE_NAMES = {
    // KLATKA PIERSIOWA
    'chest_upper':   'Klatka górna',
    'chest_middle':  'Klatka środkowa',
    'chest_lower':   'Klatka dolna',
    // BARKI
    'shoulder_front': 'Barki przednie',
    'shoulder_side':  'Barki boczne',
    'shoulder_rear':  'Barki tylne',
    // PLECY
    'back_upper':    'Plecy górne (kapturowy)',
    'back_lats':     'Plecy szerokie (najszersze)',
    'back_middle':   'Plecy środkowe (równoległoboczne)',
    'back_lower':    'Plecy dolne (prostowniki)',
    // RAMIONA
    'biceps_long':   'Biceps - głowa długa',
    'biceps_short':  'Biceps - głowa krótka',
    'biceps_brach':  'Ramienny (brachialis)',
    'triceps_long':  'Triceps - głowa długa',
    'triceps_lat':   'Triceps - głowa boczna',
    'triceps_med':   'Triceps - głowa przyśrodkowa',
    'forearms':      'Przedramię',
    // NOGI
    'quads':         'Czworogłowy uda',
    'hamstrings':    'Dwugłowy uda (hamstring)',
    'glutes':        'Pośladki',
    'calves':        'Łydki',
    'adductors':     'Przywodziciele',
    // BRZUCH
    'abs':           'Brzuch (proste)',
    'obliques':      'Brzuch skośne',
    'core':          'Core (głębokie stabilizatory)'
  };

  // ==========================================================================
  // SŁOWNIK ĆWICZENIE → GŁÓWNA GŁOWA MIĘŚNIOWA
  // ==========================================================================
  // Klucze są małymi literami, dopasowanie odbywa się po fragmencie nazwy.
  // Najdłuższe frazy najpierw - zapewnia trafne dopasowanie.
  // ==========================================================================

  const EXERCISE_TO_MUSCLE = {
    // === KLATKA - GÓRNA ===
    'wyciskanie sztangi na ławce skośnej dodatniej': 'chest_upper',
    'wyciskanie sztangi na ławce skośnej':           'chest_upper',
    'wyciskanie sztangi skośnej':                    'chest_upper',
    'wyciskanie sztangi na skosie':                  'chest_upper',
    'wyciskanie hantli na skosie':                   'chest_upper',
    'wyciskanie hantli na ławce skośnej':            'chest_upper',
    'rozpiętki na skosie':                           'chest_upper',
    'rozpiętki na ławce skośnej':                    'chest_upper',
    'wyciskanie na skosie':                          'chest_upper',

    // === KLATKA - DOLNA ===
    'wyciskanie na ławce ujemnej':                   'chest_lower',
    'wyciskanie na skosie ujemnym':                  'chest_lower',
    'pompki na poręczach':                           'chest_lower',
    'dipy':                                          'chest_lower',
    'pompki bułgarskie':                             'chest_lower',

    // === KLATKA - ŚRODKOWA ===
    'wyciskanie sztangi na ławce poziomej':          'chest_middle',
    'wyciskanie sztangi na ławce płaskiej':          'chest_middle',
    'wyciskanie sztangi':                            'chest_middle',
    'wyciskanie hantli na ławce poziomej':           'chest_middle',
    'wyciskanie hantli na ławce płaskiej':           'chest_middle',
    'wyciskanie hantli':                             'chest_middle',
    'rozpiętki na ławce poziomej':                   'chest_middle',
    'rozpiętki na ławce płaskiej':                   'chest_middle',
    'rozpiętki':                                     'chest_middle',
    'rozpiętki na maszynie':                         'chest_middle',
    'butterfly':                                     'chest_middle',
    'pompki klasyczne':                              'chest_middle',
    'pompki':                                        'chest_middle',
    'wyciskanie na maszynie':                        'chest_middle',
    'krzyżowanie linek':                             'chest_middle',

    // === BARKI - PRZEDNIE ===
    'wyciskanie żołnierskie':                        'shoulder_front',
    'wyciskanie sztangi nad głowę':                  'shoulder_front',
    'wyciskanie hantli nad głowę':                   'shoulder_front',
    'wyciskanie hantli siedząc':                     'shoulder_front',
    'wyciskanie arnolda':                            'shoulder_front',
    'arnold press':                                  'shoulder_front',
    'overhead press':                                'shoulder_front',
    'wznosy hantli przodem':                         'shoulder_front',
    'wznosy sztangi przodem':                        'shoulder_front',
    'front raise':                                   'shoulder_front',

    // === BARKI - BOCZNE ===
    'wznosy hantli bokiem':                          'shoulder_side',
    'wznosy bokiem':                                 'shoulder_side',
    'lateral raise':                                 'shoulder_side',
    'wznosy hantli bokiem siedząc':                  'shoulder_side',
    'wznosy hantli bokiem stojąc':                   'shoulder_side',
    'wznosy bokiem na wyciągu':                      'shoulder_side',

    // === BARKI - TYLNE ===
    'odwrotne rozpiętki':                            'shoulder_rear',
    'face pull':                                     'shoulder_rear',
    'face pulls':                                    'shoulder_rear',
    'wznosy hantli w opadzie':                       'shoulder_rear',
    'rear delt fly':                                 'shoulder_rear',
    'reverse fly':                                   'shoulder_rear',
    'wiosłowanie szerokim chwytem':                  'shoulder_rear',

    // === PLECY - SZEROKIE (NAJSZERSZE) ===
    'podciąganie szerokim chwytem':                  'back_lats',
    'podciąganie nachwytem':                         'back_lats',
    'podciąganie':                                   'back_lats',
    'pull up':                                       'back_lats',
    'pull-up':                                       'back_lats',
    'ściąganie drążka wyciągu górnego':              'back_lats',
    'ściąganie drążka':                              'back_lats',
    'lat pulldown':                                  'back_lats',
    'wyciąg górny':                                  'back_lats',
    'pullover':                                      'back_lats',
    'pulower':                                       'back_lats',

    // === PLECY - ŚRODKOWE ===
    'wiosłowanie sztangą w opadzie':                 'back_middle',
    'wiosłowanie sztangą':                           'back_middle',
    'wiosłowanie sztangi':                           'back_middle',
    'wiosłowanie pendlay':                           'back_middle',
    'wiosłowanie hantlą jednorącz':                  'back_middle',
    'wiosłowanie hantlą':                            'back_middle',
    'wiosłowanie hantli':                            'back_middle',
    'wiosłowanie t-bar':                             'back_middle',
    'wiosłowanie wąskim chwytem':                    'back_middle',
    'wiosłowanie na wyciągu':                        'back_middle',
    'seated row':                                    'back_middle',
    'wiosło dolne':                                  'back_middle',
    'wyciąg dolny':                                  'back_middle',

    // === PLECY - GÓRNE (KAPTUROWY) ===
    'wzruszenia barków':                             'back_upper',
    'shrugs':                                        'back_upper',
    'wzruszenia hantli':                             'back_upper',
    'wzruszenia sztangi':                            'back_upper',
    'farmer walk':                                   'back_upper',
    'spacer farmera':                                'back_upper',

    // === PLECY - DOLNE / PROSTOWNIKI ===
    'martwy ciąg klasyczny':                         'back_lower',
    'martwy ciąg':                                   'back_lower',
    'deadlift':                                      'back_lower',
    'martwy ciąg sumo':                              'back_lower',
    'good morning':                                  'back_lower',
    'hyperextension':                                'back_lower',
    'wyprosty pleców':                               'back_lower',
    'wyprosty na ławce rzymskiej':                   'back_lower',

    // === BICEPS - DŁUGA GŁOWA (uchwyt wąski / supinacja) ===
    'uginanie ramion ze sztangą wąskim chwytem':     'biceps_long',
    'uginanie hantli na modlitewniku':               'biceps_long',
    'uginanie ramion na modlitewniku':               'biceps_long',
    'preacher curl':                                 'biceps_long',
    'incline dumbbell curl':                         'biceps_long',
    'uginanie hantli na ławce skośnej':              'biceps_long',
    'uginanie na drążku':                            'biceps_long',
    'spider curl':                                   'biceps_long',

    // === BICEPS - KRÓTKA GŁOWA (uchwyt szeroki) ===
    'uginanie ramion ze sztangą':                    'biceps_short',
    'uginanie ramion ze sztangą ez':                 'biceps_short',
    'uginanie sztangi':                              'biceps_short',
    'uginanie ramion z hantlami stojąc':             'biceps_short',
    'uginanie ramion z hantlami':                    'biceps_short',
    'uginanie hantli':                               'biceps_short',
    'biceps curl':                                   'biceps_short',
    'uginanie na wyciągu':                           'biceps_short',
    'cable curl':                                    'biceps_short',

    // === RAMIENNY (BRACHIALIS) - chwyt młotkowy ===
    'uginanie hantli młotkowo':                      'biceps_brach',
    'uginanie młotkowe':                             'biceps_brach',
    'hammer curl':                                   'biceps_brach',
    'uginanie z liną młotkowo':                      'biceps_brach',
    'uginanie zottmana':                             'biceps_brach',

    // === TRICEPS - DŁUGA GŁOWA (rozciąganie nad głową) ===
    'francuskie wyciskanie sztangi':                 'triceps_long',
    'francuskie wyciskanie':                         'triceps_long',
    'francuski wyciskanie':                          'triceps_long',
    'french press':                                  'triceps_long',
    'overhead triceps extension':                    'triceps_long',
    'wyprosty triceps nad głowę':                    'triceps_long',
    'skull crusher':                                 'triceps_long',
    'skullcrusher':                                  'triceps_long',
    'wyprosty hantla nad głowę':                     'triceps_long',

    // === TRICEPS - BOCZNA GŁOWA (wyprosty w dół) ===
    'wyprosty triceps na wyciągu':                   'triceps_lat',
    'wyprosty na wyciągu':                           'triceps_lat',
    'triceps wyciąg':                                'triceps_lat',
    'pushdown':                                      'triceps_lat',
    'pushdown z liną':                               'triceps_lat',
    'triceps z liną':                                'triceps_lat',
    'triceps na wyciągu':                            'triceps_lat',
    'wyprosty triceps z liną':                       'triceps_lat',

    // === TRICEPS - PRZYŚRODKOWA (wąskie wyciskanie) ===
    'wyciskanie wąskim chwytem':                     'triceps_med',
    'close grip bench press':                        'triceps_med',
    'pompki diamentowe':                             'triceps_med',
    'wyciskanie diamentowe':                         'triceps_med',
    'kickback':                                      'triceps_med',
    'wyprosty hantla w opadzie':                     'triceps_med',

    // === PRZEDRAMIĘ ===
    'uginanie nadgarstków':                          'forearms',
    'wrist curl':                                    'forearms',
    'farmer carry':                                  'forearms',
    'wieszanie na drążku':                           'forearms',

    // === NOGI - CZWOROGŁOWY ===
    'przysiad ze sztangą':                           'quads',
    'przysiad':                                      'quads',
    'back squat':                                    'quads',
    'front squat':                                   'quads',
    'przysiad przedni':                              'quads',
    'leg press':                                     'quads',
    'wyciskanie nogami':                             'quads',
    'wyprosty nóg':                                  'quads',
    'leg extension':                                 'quads',
    'hack squat':                                    'quads',
    'przysiad bułgarski':                            'quads',
    'bulgarian split squat':                         'quads',
    'wykroki':                                       'quads',
    'lunges':                                        'quads',
    'wykroki ze sztangą':                            'quads',
    'wykroki z hantlami':                            'quads',
    'goblet squat':                                  'quads',
    'sissy squat':                                   'quads',

    // === NOGI - DWUGŁOWY (HAMSTRING) ===
    'martwy ciąg rumuński':                          'hamstrings',
    'rdl':                                           'hamstrings',
    'romanian deadlift':                             'hamstrings',
    'martwy ciąg na prostych nogach':                'hamstrings',
    'uginanie nóg leżąc':                            'hamstrings',
    'uginanie nóg':                                  'hamstrings',
    'leg curl':                                      'hamstrings',
    'nordic curl':                                   'hamstrings',
    'glute ham raise':                               'hamstrings',

    // === POŚLADKI ===
    'hip thrust':                                    'glutes',
    'hip thrusty':                                   'glutes',
    'wypychanie bioder':                             'glutes',
    'wypychanie biodrami':                           'glutes',
    'glute bridge':                                  'glutes',
    'most biodrowy':                                 'glutes',
    'odwodzenia nóg':                                'glutes',
    'cable kickback':                                'glutes',

    // === ŁYDKI ===
    'wspięcia na palce stojąc':                      'calves',
    'wspięcia na palce':                             'calves',
    'standing calf raise':                           'calves',
    'wspięcia na palce siedząc':                     'calves',
    'seated calf raise':                             'calves',
    'donkey calf raise':                             'calves',

    // === BRZUCH ===
    'plank':                                         'core',
    'deska':                                         'core',
    'rollout':                                       'core',
    'ab wheel':                                      'core',
    'kółeczko':                                      'core',
    'brzuszki':                                      'abs',
    'crunch':                                        'abs',
    'crunche':                                       'abs',
    'unoszenie nóg':                                 'abs',
    'leg raise':                                     'abs',
    'hanging leg raise':                             'abs',
    'wciąganie kolan':                               'abs',
    'russian twist':                                 'obliques',
    'skłony boczne':                                 'obliques',
    'side bend':                                     'obliques'
  };

  // Funkcja dopasowania nazwy ćwiczenia do głowy mięśniowej
  function detectMuscle(exerciseName) {
    if (!exerciseName) return null;
    const name = exerciseName.toLowerCase().trim();

    // Posortuj klucze od najdłuższych - najpierw dopasuj specyficzne
    const keys = Object.keys(EXERCISE_TO_MUSCLE).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      if (name.includes(key)) return EXERCISE_TO_MUSCLE[key];
    }
    return null;
  }

  // ==========================================================================
  // PLANY OFFLINE - Push / Pull / Legs
  // ==========================================================================
  // Każdy plan: 5 ćwiczeń ze wskazówkami i zakresem powtórzeń.
  // Każdy typ ma 8-10 wariantów - aplikacja losuje za każdym razem.
  // ==========================================================================

  const PLANS = {
    push: [
      {
        name: 'Klasyczny Push - klatka i barki',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '8-10', tip: 'Łopatki ściągnięte, sztanga na klatkę' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '8-10', tip: 'Skos 30°, kontroluj ekscentryk' },
          { name: 'Wyciskanie żołnierskie', sets: 3, reps: '8-10', tip: 'Stabilny tułów, łokcie pod sztangą' },
          { name: 'Rozpiętki na maszynie', sets: 3, reps: '12-15', tip: 'Skupienie na klatce, lekko uginaj łokcie' },
          { name: 'Wyprosty triceps na wyciągu', sets: 3, reps: '12-15', tip: 'Łokcie przy tułowiu' }
        ]
      },
      {
        name: 'Push z naciskiem na klatkę górną',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce skośnej', sets: 3, reps: '6-10', tip: 'Skos 30-45°, mostek w górę' },
          { name: 'Wyciskanie hantli na ławce poziomej', sets: 3, reps: '8-10', tip: 'Pełen zakres ruchu' },
          { name: 'Pompki na poręczach', sets: 3, reps: '8-12', tip: 'Pochyl tułów do przodu - więcej klatki' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Lekko ugięte łokcie, do poziomu' },
          { name: 'Francuskie wyciskanie sztangi', sets: 3, reps: '10-12', tip: 'Łokcie nieruchome, kontroluj' }
        ]
      },
      {
        name: 'Push - akcent na siłę',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 4, reps: '5-6', tip: 'Ciężar progresywny, eksplozja w górę' },
          { name: 'Wyciskanie żołnierskie', sets: 4, reps: '5-6', tip: 'Tułów napięty, sztanga w linii' },
          { name: 'Wyciskanie wąskim chwytem', sets: 3, reps: '6-8', tip: 'Łokcie blisko ciała' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '10-12', tip: 'Płynny ruch, bez bujania' },
          { name: 'Pompki diamentowe', sets: 3, reps: 'max', tip: 'Dłonie blisko siebie, łokcie w dół' }
        ]
      },
      {
        name: 'Push - duży nacisk na barki',
        exercises: [
          { name: 'Wyciskanie hantli nad głowę', sets: 3, reps: '8-10', tip: 'Siedząc, plecy o oparcie' },
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '8-10', tip: 'Klasyczne wyciskanie' },
          { name: 'Wznosy hantli bokiem', sets: 4, reps: '12-15', tip: 'Powtarzaj kontrolowanie' },
          { name: 'Wznosy hantli przodem', sets: 3, reps: '10-12', tip: 'Naprzemiennie, do wysokości oczu' },
          { name: 'Pushdown z liną', sets: 3, reps: '12-15', tip: 'Rozszerz linę na końcu ruchu' }
        ]
      },
      {
        name: 'Push z hantlami (gdy sztanga zajęta)',
        exercises: [
          { name: 'Wyciskanie hantli na ławce poziomej', sets: 3, reps: '8-10', tip: 'Pełna ścieżka, kontroluj na dole' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '8-10', tip: 'Skos 30°' },
          { name: 'Wyciskanie hantli nad głowę', sets: 3, reps: '8-10', tip: 'Siedząc lub stojąc' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Do poziomu barków' },
          { name: 'Francuskie wyciskanie hantla', sets: 3, reps: '10-12', tip: 'Oburącz, za głowę' }
        ]
      },
      {
        name: 'Push z superseriami - krótszy czas',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '8-10', tip: 'Superseria z wznosami bokiem' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Po wyciskaniu, bez przerwy' },
          { name: 'Wyciskanie żołnierskie hantlami', sets: 3, reps: '8-10', tip: 'Superseria z rozpiętkami' },
          { name: 'Rozpiętki na maszynie', sets: 3, reps: '12-15', tip: 'Po wyciskaniu, bez przerwy' },
          { name: 'Wyprosty triceps na wyciągu', sets: 3, reps: '12-15', tip: 'Wykończenie' }
        ]
      },
      {
        name: 'Push - na rzeźbę z wysokimi powtórzeniami',
        exercises: [
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '12-15', tip: 'Lekkie ciężary, perfekcyjna technika' },
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '12-15', tip: 'Tempo 2-1-2' },
          { name: 'Wznosy hantli bokiem', sets: 4, reps: '15-20', tip: 'Skupienie na barkach bocznych' },
          { name: 'Krzyżowanie linek', sets: 3, reps: '15-20', tip: 'Ścisk na końcu, szczyt napięcia' },
          { name: 'Pushdown z liną', sets: 3, reps: '15-20', tip: 'Wykończ triceps wysokimi powtórzeniami' }
        ]
      },
      {
        name: 'Push - bez sztangi (tylko hantle i maszyny)',
        exercises: [
          { name: 'Wyciskanie hantli na ławce poziomej', sets: 3, reps: '8-10', tip: 'Pełen zakres' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '8-10', tip: 'Skos 30°' },
          { name: 'Wyciskanie na maszynie', sets: 3, reps: '10-12', tip: 'Stabilna pozycja, ścisk klatki' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Łokcie lekko ugięte' },
          { name: 'Pushdown z liną', sets: 3, reps: '12-15', tip: 'Triceps wykończenie' }
        ]
      }
    ],

    pull: [
      {
        name: 'Klasyczny Pull - plecy i biceps',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: 3, reps: '5-6', tip: 'Plecy proste, sztanga blisko ciała' },
          { name: 'Podciąganie szerokim chwytem', sets: 3, reps: '6-10', tip: 'Ściągnij łopatki w dół' },
          { name: 'Wiosłowanie sztangą w opadzie', sets: 3, reps: '8-10', tip: 'Tułów stabilny, ciągnij do brzucha' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Pełen zakres, łokieć blisko ciała' },
          { name: 'Uginanie ramion ze sztangą EZ', sets: 3, reps: '10-12', tip: 'Bez bujania, kontrolowany ruch' }
        ]
      },
      {
        name: 'Pull - bez martwego ciągu',
        exercises: [
          { name: 'Podciąganie nachwytem', sets: 4, reps: '6-10', tip: 'Pełen zakres, broda nad drążek' },
          { name: 'Wiosłowanie sztangą', sets: 3, reps: '8-10', tip: 'Pochyl się 45°' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Uchwyt szeroki, ciągnij do klatki' },
          { name: 'Face pull', sets: 3, reps: '12-15', tip: 'Ciągnij do twarzy, łopatki ściągnięte' },
          { name: 'Uginanie hantli', sets: 3, reps: '10-12', tip: 'Naprzemiennie, supinacja na końcu' }
        ]
      },
      {
        name: 'Pull - akcent na grubość pleców',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: 3, reps: '5-6', tip: 'Maksymalne ciężary, technika!' },
          { name: 'Wiosłowanie sztangą Pendlay', sets: 4, reps: '6-8', tip: 'Każde powtórzenie z ziemi' },
          { name: 'Wiosłowanie T-bar', sets: 3, reps: '8-10', tip: 'Ciężar do dolnych żeber' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Skupienie na ściskaniu' },
          { name: 'Uginanie ramion ze sztangą', sets: 3, reps: '8-10', tip: 'Cięższe ciężary' }
        ]
      },
      {
        name: 'Pull - akcent na szerokość pleców',
        exercises: [
          { name: 'Podciąganie szerokim chwytem', sets: 4, reps: '6-10', tip: 'Najszersze najbardziej' },
          { name: 'Ściąganie drążka wyciągu górnego szerokim chwytem', sets: 3, reps: '10-12', tip: 'Powolny ekscentryk' },
          { name: 'Pullover', sets: 3, reps: '10-12', tip: 'Rozciągnij najszersze' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Łokieć szeroko' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Brachialis - zwiększa objętość' }
        ]
      },
      {
        name: 'Pull - z naciskiem na biceps',
        exercises: [
          { name: 'Podciąganie podchwytem', sets: 3, reps: '8-10', tip: 'Wąski chwyt, biceps mocno pracuje' },
          { name: 'Wiosłowanie sztangą wąskim chwytem', sets: 3, reps: '8-10', tip: 'Podchwyt' },
          { name: 'Uginanie ramion ze sztangą', sets: 4, reps: '8-10', tip: 'Sztanga prosta lub EZ' },
          { name: 'Uginanie hantli na modlitewniku', sets: 3, reps: '10-12', tip: 'Izolacja bicepsa' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Brachialis i ramienny' }
        ]
      },
      {
        name: 'Pull - na siłę (mało powtórzeń, dużo serii)',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: 5, reps: '3-5', tip: 'Maksymalne ciężary' },
          { name: 'Podciąganie z obciążeniem', sets: 4, reps: '4-6', tip: 'Pas z talerzem' },
          { name: 'Wiosłowanie sztangą', sets: 4, reps: '5-6', tip: 'Cięższe ciężary' },
          { name: 'Wzruszenia barków', sets: 3, reps: '8-10', tip: 'Sztanga lub hantle' },
          { name: 'Uginanie ramion ze sztangą', sets: 3, reps: '6-8', tip: 'Cięższe ciężary' }
        ]
      },
      {
        name: 'Pull - bez sztangi (hantle i wyciągi)',
        exercises: [
          { name: 'Podciąganie szerokim chwytem', sets: 3, reps: '8-10', tip: 'Najlepszy ćwiczenie na plecy' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Naprzemiennie, kontroluj' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Szerokim chwytem do klatki' },
          { name: 'Wiosłowanie na wyciągu siedząc', sets: 3, reps: '10-12', tip: 'Tułów prosty, ciągnij do brzucha' },
          { name: 'Uginanie hantli', sets: 3, reps: '10-12', tip: 'Naprzemiennie, supinacja' }
        ]
      },
      {
        name: 'Pull - z superseriami (krótki czas)',
        exercises: [
          { name: 'Podciąganie szerokim chwytem', sets: 3, reps: '6-10', tip: 'Superseria z wiosłowaniem' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Bez przerwy po podciąganiu' },
          { name: 'Wiosłowanie sztangą', sets: 3, reps: '8-10', tip: 'Superseria z bicepsem' },
          { name: 'Uginanie hantli', sets: 3, reps: '10-12', tip: 'Bez przerwy po wiosłowaniu' },
          { name: 'Face pull', sets: 3, reps: '15-20', tip: 'Wykończenie, plecy tylne barki' }
        ]
      }
    ],

    legs: [
      {
        name: 'Klasyczne Legs - przysiad i martwy rumuński',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: 4, reps: '6-8', tip: 'Sztanga na grzbiecie, biodra w dół' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '8-10', tip: 'Lekko ugięte kolana, biodra do tyłu' },
          { name: 'Wykroki ze sztangą', sets: 3, reps: '10-12', tip: 'Naprzemiennie, kolano nie wystaje za stopę' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '10-12', tip: 'Pełen zakres, kontrola' },
          { name: 'Wspięcia na palce stojąc', sets: 4, reps: '12-15', tip: 'Pełna amplituda' }
        ]
      },
      {
        name: 'Legs z naciskiem na czworogłowy',
        exercises: [
          { name: 'Przysiad przedni', sets: 4, reps: '6-8', tip: 'Sztanga na barkach z przodu' },
          { name: 'Leg press', sets: 3, reps: '10-12', tip: 'Stopy nisko - więcej czworogłowego' },
          { name: 'Wyprosty nóg', sets: 3, reps: '12-15', tip: 'Pełen wyprost, ścisk na górze' },
          { name: 'Bulgarian split squat', sets: 3, reps: '8-10 na nogę', tip: 'Tylna noga na ławce' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '12-15', tip: 'Wykończenie łydek' }
        ]
      },
      {
        name: 'Legs z naciskiem na hamstring i pośladki',
        exercises: [
          { name: 'Martwy ciąg rumuński', sets: 4, reps: '6-8', tip: 'Bardzo dobre na hamstring' },
          { name: 'Hip thrust', sets: 3, reps: '8-10', tip: 'Pchaj biodrami, ścisk na górze' },
          { name: 'Uginanie nóg leżąc', sets: 4, reps: '10-12', tip: 'Izolacja hamstring' },
          { name: 'Przysiad ze sztangą', sets: 3, reps: '8-10', tip: 'Klasyczny przysiad' },
          { name: 'Wspięcia na palce siedząc', sets: 3, reps: '15-20', tip: 'Łydki płaszczkowate' }
        ]
      },
      {
        name: 'Legs - akcent na siłę',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: 5, reps: '3-5', tip: 'Maksymalne ciężary, perfekcyjna technika' },
          { name: 'Martwy ciąg rumuński', sets: 4, reps: '5-6', tip: 'Cięższe ciężary' },
          { name: 'Leg press', sets: 3, reps: '6-8', tip: 'Bardzo ciężki' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '8-10', tip: 'Kontroluj' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '8-10', tip: 'Z dużym ciężarem' }
        ]
      },
      {
        name: 'Legs bez przysiadu (po kontuzji lub problemach z plecami)',
        exercises: [
          { name: 'Leg press', sets: 4, reps: '8-12', tip: 'Bezpieczna alternatywa przysiadu' },
          { name: 'Bulgarian split squat', sets: 3, reps: '10-12 na nogę', tip: 'Praca jednonożna' },
          { name: 'Wyprosty nóg', sets: 3, reps: '12-15', tip: 'Izolacja czworogłowego' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '12-15', tip: 'Izolacja hamstring' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '12-15', tip: 'Łydki' }
        ]
      },
      {
        name: 'Legs - na rzeźbę z wysokimi powtórzeniami',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: 3, reps: '12-15', tip: 'Lżejsze ciężary, więcej powtórzeń' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '12-15', tip: 'Tempo 2-1-2' },
          { name: 'Wykroki', sets: 3, reps: '15-20 na nogę', tip: 'Z hantlami w rękach' },
          { name: 'Wyprosty nóg', sets: 3, reps: '15-20', tip: 'Lekkie ciężary, ścisk' },
          { name: 'Wspięcia na palce stojąc', sets: 4, reps: '20-25', tip: 'Łydki - wysokie powtórzenia' }
        ]
      },
      {
        name: 'Legs z hip thrustem (akcent na pośladki)',
        exercises: [
          { name: 'Hip thrust', sets: 4, reps: '8-10', tip: 'Główne ćwiczenie sesji' },
          { name: 'Przysiad ze sztangą', sets: 3, reps: '8-10', tip: 'Klasyczny przysiad' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '10-12', tip: 'Hamstring i pośladki' },
          { name: 'Bulgarian split squat', sets: 3, reps: '10-12 na nogę', tip: 'Pochyl tułów - więcej pośladków' },
          { name: 'Cable kickback', sets: 3, reps: '12-15', tip: 'Izolacja pośladków' }
        ]
      },
      {
        name: 'Legs - kondycyjny (krótkie przerwy)',
        exercises: [
          { name: 'Goblet squat', sets: 3, reps: '12-15', tip: 'Hantel pod brodą, dynamicznie' },
          { name: 'Wykroki', sets: 3, reps: '15-20', tip: 'Naprzemiennie, bez przerwy między nogami' },
          { name: 'Leg press', sets: 3, reps: '15-20', tip: 'Średni ciężar, tempo' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '15-20', tip: 'Wykończenie hamstring' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '20-30', tip: 'Łydki - kondycja' }
        ]
      }
    ]
  };

  // ==========================================================================
  // EXPORT
  // ==========================================================================
  window.TPDB = {
    plans: PLANS,
    muscles: MUSCLE_NAMES,
    exerciseToMuscle: EXERCISE_TO_MUSCLE,
    detectMuscle: detectMuscle,

    // Pomocnicze funkcje
    getRandomPlan(type) {
      const list = PLANS[type];
      if (!list || !list.length) return null;
      return list[Math.floor(Math.random() * list.length)];
    },

    getMuscleName(key) {
      return MUSCLE_NAMES[key] || key;
    }
  };
})();
