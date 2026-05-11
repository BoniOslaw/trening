// ============================================================================
// TRENING PRO - Baza danych: plany offline + słownik głów mięśniowych
// ============================================================================

(function() {
  'use strict';

  const MUSCLE_NAMES = {
    'chest_upper':    'Klatka górna',
    'chest_middle':   'Klatka środkowa',
    'chest_lower':    'Klatka dolna',
    'shoulder_front': 'Barki przednie',
    'shoulder_side':  'Barki boczne',
    'shoulder_rear':  'Barki tylne',
    'back_upper':     'Plecy górne (kapturowy)',
    'back_lats':      'Plecy szerokie (najszersze)',
    'back_middle':    'Plecy środkowe (równoległoboczne)',
    'back_lower':     'Plecy dolne (prostowniki)',
    'biceps_long':    'Biceps - głowa długa',
    'biceps_short':   'Biceps - głowa krótka',
    'biceps_brach':   'Ramienny (brachialis)',
    'triceps_long':   'Triceps - głowa długa',
    'triceps_lat':    'Triceps - głowa boczna',
    'triceps_med':    'Triceps - głowa przyśrodkowa',
    'forearms':       'Przedramię',
    'quads':          'Czworogłowy uda',
    'hamstrings':     'Dwugłowy uda (hamstring)',
    'glutes':         'Pośladki',
    'calves':         'Łydki',
    'adductors':      'Przywodziciele',
    'abs':            'Brzuch (proste)',
    'obliques':       'Brzuch skośne',
    'core':           'Core (głębokie stabilizatory)'
  };

  const EXERCISE_TO_MUSCLE = {
    // KLATKA - GÓRNA
    'wyciskanie sztangi na ławce skośnej dodatniej': 'chest_upper',
    'wyciskanie sztangi na ławce skośnej':           'chest_upper',
    'wyciskanie sztangi skośnej':                    'chest_upper',
    'wyciskanie sztangi na skosie':                  'chest_upper',
    'wyciskanie hantli na skosie':                   'chest_upper',
    'wyciskanie hantli na ławce skośnej':            'chest_upper',
    'rozpiętki na skosie':                           'chest_upper',
    'rozpiętki na ławce skośnej':                    'chest_upper',
    'wyciskanie na skosie':                          'chest_upper',
    'wyciskanie sztangi wąskim chwytem na skosie':   'chest_upper',
    'pompki z nogami uniesionymi':                   'chest_upper',
    'cable crossover górny':                         'chest_upper',
    'krzyżowanie linek górne':                       'chest_upper',
    'wyciskanie hantli na ławce skośnej 45':         'chest_upper',
    // KLATKA - DOLNA
    'wyciskanie na ławce ujemnej':                   'chest_lower',
    'wyciskanie na skosie ujemnym':                  'chest_lower',
    'pompki na poręczach':                           'chest_lower',
    'dipy':                                          'chest_lower',
    'pompki bułgarskie':                             'chest_lower',
    'krzyżowanie linek dolne':                       'chest_lower',
    'cable crossover dolny':                         'chest_lower',
    'wyciskanie na suwnicy skos ujemny':             'chest_lower',
    // KLATKA - ŚRODKOWA
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
    'cable crossover':                               'chest_middle',
    'krzyżowanie linek poziome':                     'chest_middle',
    'chest press na maszynie':                       'chest_middle',
    'wyciskanie na suwnicy':                         'chest_middle',
    'pompki z obciążeniem':                          'chest_middle',
    'pompki z kółkami':                              'chest_middle',
    'dips na maszynie':                              'chest_middle',
    // BARKI - PRZEDNIE
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
    'wyciskanie sztangi z klatki':                   'shoulder_front',
    'upright row':                                   'shoulder_front',
    'wiosłowanie sztangi pod brodę':                 'shoulder_front',
    'wiosłowanie hantli pod brodę':                  'shoulder_front',
    // BARKI - BOCZNE
    'wznosy hantli bokiem':                          'shoulder_side',
    'wznosy bokiem':                                 'shoulder_side',
    'lateral raise':                                 'shoulder_side',
    'wznosy hantli bokiem siedząc':                  'shoulder_side',
    'wznosy hantli bokiem stojąc':                   'shoulder_side',
    'wznosy bokiem na wyciągu':                      'shoulder_side',
    'lateral raise na maszynie':                     'shoulder_side',
    'wznosy bokiem na maszynie':                     'shoulder_side',
    'wznosy hantli bokiem w opadzie':                'shoulder_side',
    'cable lateral raise':                           'shoulder_side',
    'wznosy bokiem z liną':                          'shoulder_side',
    // BARKI - TYLNE
    'odwrotne rozpiętki':                            'shoulder_rear',
    'face pull':                                     'shoulder_rear',
    'face pulls':                                    'shoulder_rear',
    'wznosy hantli w opadzie':                       'shoulder_rear',
    'rear delt fly':                                 'shoulder_rear',
    'reverse fly':                                   'shoulder_rear',
    'wiosłowanie szerokim chwytem':                  'shoulder_rear',
    'reverse pec deck':                              'shoulder_rear',
    'odwrotne rozpiętki na maszynie':                'shoulder_rear',
    'wznosy w opadzie z liną':                       'shoulder_rear',
    'cable face pull':                               'shoulder_rear',
    // PLECY - SZEROKIE
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
    'podciąganie podchwytem wąskim':                 'back_lats',
    'chin up':                                       'back_lats',
    'chin-up':                                       'back_lats',
    'ściąganie drążka podchwytem':                   'back_lats',
    'wyciąg górny podchwytem':                       'back_lats',
    'straight arm pulldown':                         'back_lats',
    'wyprosty ramion na wyciągu':                    'back_lats',
    // PLECY - ŚRODKOWE
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
    'seal row':                                      'back_middle',
    'chest supported row':                           'back_middle',
    'wiosłowanie z podparciem klatki':               'back_middle',
    'wiosłowanie maszyna':                           'back_middle',
    'wiosłowanie na maszynie':                       'back_middle',
    'wiosłowanie izolowane':                         'back_middle',
    // PLECY - GÓRNE
    'wzruszenia barków':                             'back_upper',
    'shrugs':                                        'back_upper',
    'wzruszenia hantli':                             'back_upper',
    'wzruszenia sztangi':                            'back_upper',
    'farmer walk':                                   'back_upper',
    'spacer farmera':                                'back_upper',
    // PLECY - DOLNE
    'martwy ciąg klasyczny':                         'back_lower',
    'martwy ciąg':                                   'back_lower',
    'deadlift':                                      'back_lower',
    'martwy ciąg sumo':                              'back_lower',
    'good morning':                                  'back_lower',
    'hyperextension':                                'back_lower',
    'wyprosty pleców':                               'back_lower',
    'wyprosty na ławce rzymskiej':                   'back_lower',
    // BICEPS - DŁUGA GŁOWA
    'uginanie ramion ze sztangą wąskim chwytem':     'biceps_long',
    'uginanie hantli na modlitewniku':               'biceps_long',
    'uginanie ramion na modlitewniku':               'biceps_long',
    'preacher curl':                                 'biceps_long',
    'incline dumbbell curl':                         'biceps_long',
    'uginanie hantli na ławce skośnej':              'biceps_long',
    'uginanie na drążku':                            'biceps_long',
    'spider curl':                                   'biceps_long',
    'concentration curl':                            'biceps_long',
    'uginanie koncentryczne':                        'biceps_long',
    'scott curl':                                    'biceps_long',
    // BICEPS - KRÓTKA GŁOWA
    'uginanie ramion ze sztangą':                    'biceps_short',
    'uginanie ramion ze sztangą ez':                 'biceps_short',
    'uginanie sztangi':                              'biceps_short',
    'uginanie ramion z hantlami stojąc':             'biceps_short',
    'uginanie ramion z hantlami':                    'biceps_short',
    'uginanie hantli':                               'biceps_short',
    'biceps curl':                                   'biceps_short',
    'uginanie na wyciągu':                           'biceps_short',
    'cable curl':                                    'biceps_short',
    'uginanie ramion ze sztangą stojąc':             'biceps_short',
    'uginanie ze sztangą ez stojąc':                 'biceps_short',
    'uginanie cable':                                'biceps_short',
    'uginanie z liną':                               'biceps_short',
    // RAMIENNY
    'uginanie hantli młotkowo':                      'biceps_brach',
    'uginanie młotkowe':                             'biceps_brach',
    'hammer curl':                                   'biceps_brach',
    'uginanie z liną młotkowo':                      'biceps_brach',
    'uginanie zottmana':                             'biceps_brach',
    // TRICEPS - DŁUGA GŁOWA
    'francuskie wyciskanie sztangi':                 'triceps_long',
    'francuskie wyciskanie':                         'triceps_long',
    'french press':                                  'triceps_long',
    'overhead triceps extension':                    'triceps_long',
    'wyprosty triceps nad głowę':                    'triceps_long',
    'skull crusher':                                 'triceps_long',
    'skullcrusher':                                  'triceps_long',
    'wyprosty hantla nad głowę':                     'triceps_long',
    'overhead cable triceps extension':              'triceps_long',
    'wyprosty triceps nad głowę z liną':             'triceps_long',
    'rolling extension':                             'triceps_long',
    'JM press':                                      'triceps_long',
    'overhead triceps extension hantlem':            'triceps_long',
    // TRICEPS - BOCZNA GŁOWA
    'wyprosty triceps na wyciągu':                   'triceps_lat',
    'wyprosty na wyciągu':                           'triceps_lat',
    'triceps wyciąg':                                'triceps_lat',
    'pushdown':                                      'triceps_lat',
    'pushdown z liną':                               'triceps_lat',
    'triceps z liną':                                'triceps_lat',
    'triceps na wyciągu':                            'triceps_lat',
    'wyprosty triceps z liną':                       'triceps_lat',
    'cable triceps pushdown':                        'triceps_lat',
    'single arm pushdown':                           'triceps_lat',
    'wyprosty jednorącz na wyciągu':                 'triceps_lat',
    // TRICEPS - PRZYŚRODKOWA
    'wyciskanie wąskim chwytem':                     'triceps_med',
    'close grip bench press':                        'triceps_med',
    'pompki diamentowe':                             'triceps_med',
    'wyciskanie diamentowe':                         'triceps_med',
    'kickback':                                      'triceps_med',
    'wyprosty hantla w opadzie':                     'triceps_med',
    // PRZEDRAMIĘ
    'uginanie nadgarstków':                          'forearms',
    'wrist curl':                                    'forearms',
    'farmer carry':                                  'forearms',
    'wieszanie na drążku':                           'forearms',
    // NOGI - CZWOROGŁOWY
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
    'sumo squat':                                    'quads',
    'przysiad sumo':                                 'quads',
    'wall sit':                                      'quads',
    'step up':                                       'quads',
    'step-up':                                       'quads',
    'wchodzenie na skrzynię':                        'quads',
    'split squat':                                   'quads',
    'przysiad z hantlem':                            'quads',
    'przysiad ze sztangą high bar':                  'quads',
    'przysiad ze sztangą low bar':                   'quads',
    // NOGI - HAMSTRING
    'martwy ciąg rumuński':                          'hamstrings',
    'rdl':                                           'hamstrings',
    'romanian deadlift':                             'hamstrings',
    'martwy ciąg na prostych nogach':                'hamstrings',
    'uginanie nóg leżąc':                            'hamstrings',
    'uginanie nóg':                                  'hamstrings',
    'leg curl':                                      'hamstrings',
    'nordic curl':                                   'hamstrings',
    'glute ham raise':                               'hamstrings',
    'single leg rdl':                                'hamstrings',
    'martwy ciąg jednonóż':                          'hamstrings',
    'uginanie nóg stojąc':                           'hamstrings',
    'uginanie nogi stojąc':                          'hamstrings',
    // POŚLADKI
    'hip thrust':                                    'glutes',
    'hip thrusty':                                   'glutes',
    'wypychanie bioder':                             'glutes',
    'wypychanie biodrami':                           'glutes',
    'glute bridge':                                  'glutes',
    'most biodrowy':                                 'glutes',
    'odwodzenia nóg':                                'glutes',
    'cable kickback':                                'glutes',
    'hip abduction':                                 'glutes',
    'odwodzenie nóg na maszynie':                    'glutes',
    'odwodzenie nogi na wyciągu':                    'glutes',
    'sumo deadlift':                                 'glutes',
    'single leg hip thrust':                         'glutes',
    'hip thrust jednonóż':                           'glutes',
    'donkey kick':                                   'glutes',
    // ŁYDKI
    'wspięcia na palce stojąc':                      'calves',
    'wspięcia na palce':                             'calves',
    'standing calf raise':                           'calves',
    'wspięcia na palce siedząc':                     'calves',
    'seated calf raise':                             'calves',
    'donkey calf raise':                             'calves',
    'wspięcia na palce na suwnicy':                  'calves',
    'wspięcia jednonóż':                             'calves',
    'wspięcia na palce jednonóż':                    'calves',
    'wspięcia na palce ze sztangą':                  'calves',
    'tibia raise':                                   'calves',
    // BRZUCH
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

  function detectMuscle(exerciseName) {
    if (!exerciseName) return null;
    const name = exerciseName.toLowerCase().trim();
    const keys = Object.keys(EXERCISE_TO_MUSCLE).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      if (name.includes(key)) return EXERCISE_TO_MUSCLE[key];
    }
    return null;
  }

  // ==========================================================================
  // PLANY OFFLINE - 7-8 ćwiczeń Push/Pull, 8-9 ćwiczeń Legs
  // ==========================================================================

  const PLANS = {
    push: [
      {
        name: 'Klasyczny Push - pełne pokrycie',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '8-10', tip: 'Łopatki ściągnięte, mostek w górę' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '8-10', tip: 'Skos 30°, kontroluj ekscentryk' },
          { name: 'Wyciskanie żołnierskie', sets: 3, reps: '8-10', tip: 'Stabilny tułów, łokcie pod sztangą' },
          { name: 'Rozpiętki na maszynie', sets: 3, reps: '12-15', tip: 'Ścisk klatki na końcu ruchu' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Do poziomu barków, łokcie lekko ugięte' },
          { name: 'Wznosy hantli przodem', sets: 3, reps: '12-15', tip: 'Naprzemiennie, do wysokości oczu' },
          { name: 'Wyprosty triceps na wyciągu', sets: 3, reps: '12-15', tip: 'Łokcie przy tułowiu przez cały ruch' }
        ]
      },
      {
        name: 'Push z naciskiem na klatkę górną',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce skośnej', sets: 4, reps: '6-8', tip: 'Skos 30-45°, mostek w górę' },
          { name: 'Wyciskanie hantli na ławce poziomej', sets: 3, reps: '8-10', tip: 'Pełen zakres ruchu' },
          { name: 'Rozpiętki na ławce skośnej', sets: 3, reps: '10-12', tip: 'Klatka górna — czuj rozciąganie' },
          { name: 'Pompki na poręczach', sets: 3, reps: '8-12', tip: 'Pochyl tułów — więcej klatki dolnej' },
          { name: 'Wyciskanie arnolda', sets: 3, reps: '10-12', tip: 'Rotacja dłoni podczas ruchu' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Barki boczne — do poziomu' },
          { name: 'Francuskie wyciskanie sztangi', sets: 3, reps: '10-12', tip: 'Łokcie nieruchome, kontroluj' },
          { name: 'Pushdown z liną', sets: 3, reps: '12-15', tip: 'Rozszerz linę na końcu ruchu' }
        ]
      },
      {
        name: 'Push siłowy - duże ciężary',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 5, reps: '4-6', tip: 'Eksplozja w górę, kontrola w dół' },
          { name: 'Wyciskanie żołnierskie', sets: 4, reps: '4-6', tip: 'Tułów napięty, sztanga w linii' },
          { name: 'Wyciskanie wąskim chwytem', sets: 3, reps: '6-8', tip: 'Łokcie blisko ciała' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '6-8', tip: 'Ciężkie hantle, pełen zakres' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '10-12', tip: 'Płynny ruch, bez bujania' },
          { name: 'Wznosy hantli przodem', sets: 3, reps: '10-12', tip: 'Przednie barki' },
          { name: 'Pompki diamentowe', sets: 3, reps: 'max', tip: 'Dłonie blisko siebie, łokcie w dół' }
        ]
      },
      {
        name: 'Push na rzeźbę - wysokie powtórzenia',
        exercises: [
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '12-15', tip: 'Lekkie ciężary, perfekcyjna technika' },
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '12-15', tip: 'Tempo 2-1-2' },
          { name: 'Rozpiętki na maszynie', sets: 3, reps: '15-20', tip: 'Ścisk na końcu, maksymalne napięcie' },
          { name: 'Cable crossover', sets: 3, reps: '15-20', tip: 'Krzyżuj dłonie na końcu' },
          { name: 'Wznosy hantli bokiem', sets: 4, reps: '15-20', tip: 'Barki boczne — bez ciężarów osiowych' },
          { name: 'Lateral raise na maszynie', sets: 3, reps: '15-20', tip: 'Izolacja, kontrolowany ruch' },
          { name: 'Pushdown z liną', sets: 3, reps: '15-20', tip: 'Wykończ triceps' }
        ]
      },
      {
        name: 'Push z hantlami i maszynami',
        exercises: [
          { name: 'Wyciskanie hantli na ławce poziomej', sets: 3, reps: '8-10', tip: 'Pełna ścieżka, kontroluj na dole' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '8-10', tip: 'Skos 30°' },
          { name: 'Chest press na maszynie', sets: 3, reps: '10-12', tip: 'Stabilna pozycja, ścisk klatki' },
          { name: 'Wyciskanie hantli nad głowę', sets: 3, reps: '8-10', tip: 'Siedząc lub stojąc' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Do poziomu barków' },
          { name: 'Cable face pull', sets: 3, reps: '15-20', tip: 'Zdrowe barki — nie pomijaj' },
          { name: 'Overhead triceps extension hantlem', sets: 3, reps: '10-12', tip: 'Oburącz za głowę, łokcie nieruchome' }
        ]
      },
      {
        name: 'Push z superseriami',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '8-10', tip: 'Superseria z rozpiętkami' },
          { name: 'Rozpiętki na maszynie', sets: 3, reps: '12-15', tip: 'Bez przerwy po wyciskaniu' },
          { name: 'Wyciskanie żołnierskie hantlami', sets: 3, reps: '8-10', tip: 'Superseria z wznosami bokiem' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Bez przerwy po wyciskaniu' },
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '10-12', tip: 'Superseria z cable crossover' },
          { name: 'Cable crossover', sets: 3, reps: '15-20', tip: 'Bez przerwy po wyciskaniu' },
          { name: 'Pushdown z liną', sets: 3, reps: '12-15', tip: 'Wykończenie tricepsa' }
        ]
      },
      {
        name: 'Push pełna klatka i barki',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce skośnej', sets: 3, reps: '8-10', tip: 'Klatka górna — główne ćwiczenie' },
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 3, reps: '8-10', tip: 'Klatka środkowa' },
          { name: 'Pompki na poręczach', sets: 3, reps: '10-15', tip: 'Klatka dolna — pochyl tułów' },
          { name: 'Wyciskanie żołnierskie', sets: 3, reps: '8-10', tip: 'Barki przednie' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Barki boczne' },
          { name: 'Wznosy hantli w opadzie', sets: 3, reps: '12-15', tip: 'Barki tylne — zginaj w biodrach' },
          { name: 'Francuskie wyciskanie sztangi', sets: 3, reps: '10-12', tip: 'Triceps — długa głowa' },
          { name: 'Wyprosty triceps na wyciągu', sets: 3, reps: '12-15', tip: 'Triceps — boczna głowa' }
        ]
      },
      {
        name: 'Push cable i maszyny (pełna izolacja)',
        exercises: [
          { name: 'Cable crossover', sets: 3, reps: '12-15', tip: 'Ścisk klatki, skrzyżuj dłonie' },
          { name: 'Chest press na maszynie', sets: 3, reps: '10-12', tip: 'Stabilna pozycja' },
          { name: 'Wyciskanie na suwnicy', sets: 3, reps: '10-12', tip: 'Kontrolowana trajektoria' },
          { name: 'Lateral raise na maszynie', sets: 4, reps: '12-15', tip: 'Barki boczne bez kompensacji' },
          { name: 'Cable face pull', sets: 3, reps: '15-20', tip: 'Ciągnij do twarzy, łokcie wysoko' },
          { name: 'Cable triceps pushdown', sets: 3, reps: '12-15', tip: 'Łokcie przy tułowiu, pełen wyprost' },
          { name: 'Single arm pushdown', sets: 3, reps: '12-15', tip: 'Jednorącz — lepsza izolacja' }
        ]
      },
      {
        name: 'Push na masę - objętość',
        exercises: [
          { name: 'Wyciskanie sztangi na ławce poziomej', sets: 4, reps: '8-10', tip: 'Główne ćwiczenie — duży ciężar' },
          { name: 'Wyciskanie sztangi na ławce skośnej', sets: 4, reps: '8-10', tip: 'Klatka górna' },
          { name: 'Rozpiętki na maszynie', sets: 3, reps: '10-12', tip: 'Izolacja klatki' },
          { name: 'Wyciskanie żołnierskie', sets: 4, reps: '8-10', tip: 'Barki — kompletna partia' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Barki boczne' },
          { name: 'Wyciskanie wąskim chwytem', sets: 3, reps: '8-10', tip: 'Triceps siłowo' },
          { name: 'Overhead triceps extension hantlem', sets: 3, reps: '10-12', tip: 'Długa głowa tricepsa' },
          { name: 'Pushdown z liną', sets: 3, reps: '12-15', tip: 'Wykończenie tricepsa' }
        ]
      },
      {
        name: 'Push dolna i górna klatka + barki',
        exercises: [
          { name: 'Wyciskanie hantli na ławce skośnej', sets: 3, reps: '8-10', tip: 'Klatka górna — skos 30°' },
          { name: 'Wyciskanie na suwnicy', sets: 3, reps: '10-12', tip: 'Stabilna trajektoria, ścisk klatki' },
          { name: 'Pompki na poręczach', sets: 3, reps: '10-15', tip: 'Pochyl tułów — klatka dolna' },
          { name: 'Krzyżowanie linek dolne', sets: 3, reps: '12-15', tip: 'Klatka dolna — wyciąg dolny' },
          { name: 'Wznosy hantli bokiem', sets: 3, reps: '12-15', tip: 'Barki boczne do poziomu' },
          { name: 'Wznosy hantli przodem', sets: 3, reps: '12-15', tip: 'Barki przednie naprzemiennie' },
          { name: 'Overhead triceps extension hantlem', sets: 3, reps: '10-12', tip: 'Oburącz za głowę' }
        ]
      }
    ],

    pull: [
      {
        name: 'Klasyczny Pull - pełne pokrycie',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: 3, reps: '5-6', tip: 'Plecy proste, sztanga blisko ciała' },
          { name: 'Podciąganie szerokim chwytem', sets: 3, reps: '6-10', tip: 'Ściągnij łopatki w dół i tyłu' },
          { name: 'Wiosłowanie sztangą w opadzie', sets: 3, reps: '8-10', tip: 'Tułów stabilny, ciągnij do brzucha' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Pełen zakres, łokieć blisko ciała' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Szerokim chwytem do klatki' },
          { name: 'Face pull', sets: 3, reps: '15-20', tip: 'Łokcie wysoko, ściągaj do twarzy' },
          { name: 'Uginanie ramion ze sztangą EZ', sets: 3, reps: '10-12', tip: 'Bez bujania, kontrolowany ruch' }
        ]
      },
      {
        name: 'Pull bez martwego ciągu',
        exercises: [
          { name: 'Podciąganie nachwytem', sets: 4, reps: '6-10', tip: 'Pełen zakres, broda nad drążek' },
          { name: 'Wiosłowanie sztangą', sets: 3, reps: '8-10', tip: 'Pochyl się 45°, ciągnij do brzucha' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Szerokim chwytem' },
          { name: 'Wiosłowanie na wyciągu siedząc', sets: 3, reps: '10-12', tip: 'Tułów prosty, ścisk pleców' },
          { name: 'Face pull', sets: 3, reps: '15-20', tip: 'Tylne barki i rotatory' },
          { name: 'Uginanie hantli', sets: 3, reps: '10-12', tip: 'Naprzemiennie, supinacja na końcu' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Brachialis — pełna objętość ramion' }
        ]
      },
      {
        name: 'Pull grubość pleców',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: 4, reps: '4-6', tip: 'Maksymalne ciężary, technika!' },
          { name: 'Wiosłowanie sztangą Pendlay', sets: 4, reps: '6-8', tip: 'Każde powtórzenie z ziemi' },
          { name: 'Wiosłowanie T-bar', sets: 3, reps: '8-10', tip: 'Ciężar do dolnych żeber' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Skupienie na ściskaniu' },
          { name: 'Wiosłowanie na maszynie', sets: 3, reps: '10-12', tip: 'Izolacja środkowych pleców' },
          { name: 'Wzruszenia barków', sets: 3, reps: '10-12', tip: 'Pełen zakres — góra i dół' },
          { name: 'Uginanie ramion ze sztangą', sets: 3, reps: '8-10', tip: 'Cięższe ciężary' }
        ]
      },
      {
        name: 'Pull szerokość pleców',
        exercises: [
          { name: 'Podciąganie szerokim chwytem', sets: 4, reps: '6-10', tip: 'Najszersze — główne ćwiczenie' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Powolny ekscentryk' },
          { name: 'Wyciąg górny podchwytem', sets: 3, reps: '10-12', tip: 'Podchwyt — więcej bicepsa i dołu' },
          { name: 'Pullover', sets: 3, reps: '10-12', tip: 'Rozciągnij najszersze na końcu' },
          { name: 'Straight arm pulldown', sets: 3, reps: '12-15', tip: 'Proste ramiona, angażuje najszersze' },
          { name: 'Face pull', sets: 3, reps: '15-20', tip: 'Zdrowe barki' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Brachialis — zwiększa objętość' }
        ]
      },
      {
        name: 'Pull z naciskiem na biceps',
        exercises: [
          { name: 'Podciąganie podchwytem wąskim', sets: 3, reps: '8-10', tip: 'Wąski chwyt — mocno biceps' },
          { name: 'Wiosłowanie sztangą wąskim chwytem', sets: 3, reps: '8-10', tip: 'Podchwyt, łokcie przy tułowiu' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Plecy szerokie' },
          { name: 'Uginanie ramion ze sztangą stojąc', sets: 4, reps: '8-10', tip: 'Klasyczne, bez bujania' },
          { name: 'Uginanie hantli na modlitewniku', sets: 3, reps: '10-12', tip: 'Izolacja bicepsa' },
          { name: 'Concentration curl', sets: 3, reps: '10-12', tip: 'Łokieć na udzie — pełna izolacja' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Brachialis i ramienny' }
        ]
      },
      {
        name: 'Pull siłowy',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: 5, reps: '3-5', tip: 'Maksymalne ciężary' },
          { name: 'Podciąganie z obciążeniem', sets: 4, reps: '4-6', tip: 'Pas z talerzem' },
          { name: 'Wiosłowanie sztangą', sets: 4, reps: '5-6', tip: 'Cięższe ciężary' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '8-10', tip: 'Ciężar, powolny ekscentryk' },
          { name: 'Wzruszenia barków', sets: 3, reps: '8-10', tip: 'Sztanga — ciężko' },
          { name: 'Uginanie ramion ze sztangą', sets: 3, reps: '6-8', tip: 'Cięższe ciężary' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '8-10', tip: 'Siłowo' }
        ]
      },
      {
        name: 'Pull cable i wyciągi',
        exercises: [
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Szerokim chwytem do klatki' },
          { name: 'Wyciąg górny podchwytem', sets: 3, reps: '10-12', tip: 'Podchwyt — więcej bicepsa' },
          { name: 'Wiosłowanie na wyciągu siedząc', sets: 3, reps: '10-12', tip: 'Tułów prosty, ciągnij do brzucha' },
          { name: 'Straight arm pulldown', sets: 3, reps: '12-15', tip: 'Proste ramiona — najszersze' },
          { name: 'Cable face pull', sets: 3, reps: '15-20', tip: 'Zdrowe barki — nie pomijaj' },
          { name: 'Uginanie z liną', sets: 3, reps: '12-15', tip: 'Biceps przez wyciąg' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Wykończenie brachialis' }
        ]
      },
      {
        name: 'Pull z superseriami',
        exercises: [
          { name: 'Podciąganie szerokim chwytem', sets: 3, reps: '6-10', tip: 'Superseria z wiosłowaniem' },
          { name: 'Wiosłowanie hantlą jednorącz', sets: 3, reps: '10-12', tip: 'Bez przerwy po podciąganiu' },
          { name: 'Wiosłowanie sztangą', sets: 3, reps: '8-10', tip: 'Superseria z bicepsem' },
          { name: 'Uginanie hantli', sets: 3, reps: '10-12', tip: 'Bez przerwy po wiosłowaniu' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Superseria z face pull' },
          { name: 'Face pull', sets: 3, reps: '15-20', tip: 'Bez przerwy po ściąganiu' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Wykończenie' }
        ]
      },
      {
        name: 'Pull izolacja bicepsa',
        exercises: [
          { name: 'Podciąganie szerokim chwytem', sets: 3, reps: '6-10', tip: 'Plecy — rozgrzewka główna' },
          { name: 'Wiosłowanie na maszynie', sets: 3, reps: '10-12', tip: 'Stabilna pozycja, ścisk pleców' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Szerokość pleców' },
          { name: 'Uginanie ramion ze sztangą stojąc', sets: 3, reps: '8-10', tip: 'Klasyczne bez bujania' },
          { name: 'Concentration curl', sets: 3, reps: '10-12', tip: 'Łokieć na udzie — pełna izolacja' },
          { name: 'Uginanie hantli na modlitewniku', sets: 3, reps: '10-12', tip: 'Długa głowa bicepsa' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Brachialis — pełna objętość' }
        ]
      },
      {
        name: 'Pull pełne plecy i ramiona',
        exercises: [
          { name: 'Martwy ciąg klasyczny', sets: 3, reps: '5-6', tip: 'Plecy dolne — główne' },
          { name: 'Podciąganie szerokim chwytem', sets: 3, reps: '6-10', tip: 'Plecy szerokie' },
          { name: 'Wiosłowanie sztangą w opadzie', sets: 3, reps: '8-10', tip: 'Plecy środkowe' },
          { name: 'Ściąganie drążka wyciągu górnego', sets: 3, reps: '10-12', tip: 'Szerokość i głębokość' },
          { name: 'Face pull', sets: 3, reps: '15-20', tip: 'Tylne barki i zdrowie rotatorów' },
          { name: 'Uginanie ze sztangą ez stojąc', sets: 3, reps: '8-10', tip: 'Biceps — główne' },
          { name: 'Uginanie hantli', sets: 3, reps: '10-12', tip: 'Naprzemiennie, supinacja' },
          { name: 'Uginanie hantli młotkowo', sets: 3, reps: '10-12', tip: 'Brachialis' }
        ]
      }
    ],

    legs: [
      {
        name: 'Klasyczne Legs - pełne pokrycie',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: 4, reps: '6-8', tip: 'Sztanga na grzbiecie, biodra w dół' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '8-10', tip: 'Biodra do tyłu, plecy proste' },
          { name: 'Wykroki ze sztangą', sets: 3, reps: '10-12', tip: 'Kolano nie wystaje za stopę' },
          { name: 'Leg press', sets: 3, reps: '10-12', tip: 'Stopy na środku platformy' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '10-12', tip: 'Pełen zakres, nie szarp' },
          { name: 'Hip thrust', sets: 3, reps: '10-12', tip: 'Ścisk pośladka na górze' },
          { name: 'Wspięcia na palce stojąc', sets: 4, reps: '12-15', tip: 'Pełna amplituda' },
          { name: 'Plank', sets: 3, reps: '45s', tip: 'Brzuch napięty, nie uginaj bioder' },
          { name: 'Wspięcia na palce siedząc', sets: 3, reps: '15-20', tip: 'Płaszczkowaty — nie pomijaj' }
        ]
      },
      {
        name: 'Legs z naciskiem na czworogłowy',
        exercises: [
          { name: 'Przysiad przedni', sets: 4, reps: '6-8', tip: 'Sztanga na barkach z przodu' },
          { name: 'Leg press', sets: 3, reps: '10-12', tip: 'Stopy nisko — więcej czworogłowego' },
          { name: 'Wyprosty nóg', sets: 3, reps: '12-15', tip: 'Pełen wyprost, ścisk na górze' },
          { name: 'Bulgarian split squat', sets: 3, reps: '8-10 na nogę', tip: 'Tylna noga na ławce' },
          { name: 'Hack squat', sets: 3, reps: '10-12', tip: 'Stopy blisko — akcentuje czworogłowy' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '10-12', tip: 'Hamstring — nie zapomnij' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '12-15', tip: 'Łydki' },
          { name: 'Unoszenie nóg', sets: 3, reps: '15-20', tip: 'Brzuch prosty' },
          { name: 'Wspięcia na palce siedząc', sets: 3, reps: '15-20', tip: 'Płaszczkowaty' }
        ]
      },
      {
        name: 'Legs z naciskiem na hamstring i pośladki',
        exercises: [
          { name: 'Martwy ciąg rumuński', sets: 4, reps: '6-8', tip: 'Hamstring — główne ćwiczenie' },
          { name: 'Hip thrust', sets: 4, reps: '8-10', tip: 'Pośladki — ścisk na górze' },
          { name: 'Uginanie nóg leżąc', sets: 4, reps: '10-12', tip: 'Izolacja hamstring' },
          { name: 'Przysiad ze sztangą', sets: 3, reps: '8-10', tip: 'Klasyczny przysiad' },
          { name: 'Single leg hip thrust', sets: 3, reps: '10-12 na nogę', tip: 'Jednonóż — silniejsza izolacja' },
          { name: 'Glute bridge', sets: 3, reps: '12-15', tip: 'Most biodrowy z piętami' },
          { name: 'Wspięcia na palce siedząc', sets: 3, reps: '15-20', tip: 'Płaszczkowaty' },
          { name: 'Unoszenie nóg', sets: 3, reps: '15-20', tip: 'Core i brzuch' },
          { name: 'Russian twist', sets: 3, reps: '20 na stronę', tip: 'Skośne brzucha — rotacja tułowia' }
        ]
      },
      {
        name: 'Legs siłowy',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: 5, reps: '3-5', tip: 'Maksymalne ciężary, technika!' },
          { name: 'Martwy ciąg rumuński', sets: 4, reps: '5-6', tip: 'Cięższe ciężary' },
          { name: 'Leg press', sets: 3, reps: '6-8', tip: 'Bardzo ciężki' },
          { name: 'Hack squat', sets: 3, reps: '6-8', tip: 'Ciężki' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '8-10', tip: 'Kontroluj' },
          { name: 'Hip thrust', sets: 3, reps: '8-10', tip: 'Z dużym ciężarem' },
          { name: 'Wspięcia na palce ze sztangą', sets: 3, reps: '8-10', tip: 'Łydki siłowo' },
          { name: 'Plank', sets: 3, reps: '60s', tip: 'Stabilizacja core' }
        ]
      },
      {
        name: 'Legs bez przysiadu',
        exercises: [
          { name: 'Leg press', sets: 4, reps: '8-12', tip: 'Bezpieczna alternatywa przysiadu' },
          { name: 'Bulgarian split squat', sets: 3, reps: '10-12 na nogę', tip: 'Praca jednonożna' },
          { name: 'Wyprosty nóg', sets: 3, reps: '12-15', tip: 'Izolacja czworogłowego' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '12-15', tip: 'Izolacja hamstring' },
          { name: 'Hip thrust', sets: 3, reps: '10-12', tip: 'Pośladki bez obciążenia kręgosłupa' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '10-12', tip: 'Hamstring i pośladki' },
          { name: 'Hip abduction', sets: 3, reps: '12-15', tip: 'Przywodziciele i pośladki' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '12-15', tip: 'Łydki' }
        ]
      },
      {
        name: 'Legs na rzeźbę',
        exercises: [
          { name: 'Przysiad ze sztangą', sets: 3, reps: '12-15', tip: 'Lżejsze, więcej powtórzeń' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '12-15', tip: 'Tempo 2-1-2' },
          { name: 'Wykroki', sets: 3, reps: '15-20', tip: 'Z hantlami w rękach' },
          { name: 'Wyprosty nóg', sets: 3, reps: '15-20', tip: 'Lekkie ciężary, ścisk' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '15-20', tip: 'Hamstring - wysokie powt.' },
          { name: 'Hip thrust', sets: 3, reps: '15-20', tip: 'Pośladki — rzeźba' },
          { name: 'Wspięcia na palce stojąc', sets: 4, reps: '20-25', tip: 'Łydki — wysokie powt.' },
          { name: 'Plank', sets: 3, reps: '45s', tip: 'Core — wykończenie' },
          { name: 'Russian twist', sets: 3, reps: '20 na stronę', tip: 'Rotacja tułowia' }
        ]
      },
      {
        name: 'Legs z hip thrustem',
        exercises: [
          { name: 'Hip thrust', sets: 4, reps: '8-10', tip: 'Główne ćwiczenie sesji' },
          { name: 'Przysiad ze sztangą', sets: 3, reps: '8-10', tip: 'Klasyczny przysiad' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '10-12', tip: 'Hamstring i pośladki' },
          { name: 'Bulgarian split squat', sets: 3, reps: '10-12 na nogę', tip: 'Pochyl — więcej pośladków' },
          { name: 'Cable kickback', sets: 3, reps: '12-15', tip: 'Izolacja pośladków' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '12-15', tip: 'Hamstring' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '15-20', tip: 'Łydki' },
          { name: 'Unoszenie nóg', sets: 3, reps: '15-20', tip: 'Core' }
        ]
      },
      {
        name: 'Legs kondycyjny',
        exercises: [
          { name: 'Goblet squat', sets: 3, reps: '12-15', tip: 'Hantel pod brodą, dynamicznie' },
          { name: 'Wykroki', sets: 3, reps: '15-20', tip: 'Naprzemiennie, bez przerwy' },
          { name: 'Leg press', sets: 3, reps: '15-20', tip: 'Średni ciężar, tempo' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '15-20', tip: 'Hamstring' },
          { name: 'Hip thrust', sets: 3, reps: '15-20', tip: 'Pośladki dynamicznie' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '20-30', tip: 'Łydki — kondycja' },
          { name: 'Plank', sets: 3, reps: '45s', tip: 'Core' },
          { name: 'Unoszenie nóg', sets: 3, reps: '15-20', tip: 'Brzuch — wykończenie' }
        ]
      },
      {
        name: 'Legs sumo i przywodziciele',
        exercises: [
          { name: 'Przysiad sumo', sets: 4, reps: '8-10', tip: 'Stopy szeroko, kolana śledzą stopy' },
          { name: 'Hip abduction', sets: 3, reps: '12-15', tip: 'Maszyna — przywodziciele i pośladki' },
          { name: 'Martwy ciąg rumuński', sets: 3, reps: '10-12', tip: 'Hamstring i pośladki' },
          { name: 'Leg press', sets: 3, reps: '10-12', tip: 'Stopy szeroko — więcej przywodzicieli' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '12-15', tip: 'Izolacja hamstring' },
          { name: 'Glute bridge', sets: 3, reps: '15-20', tip: 'Most biodrowy z piętami' },
          { name: 'Wspięcia na palce stojąc', sets: 3, reps: '15-20', tip: 'Łydki' },
          { name: 'Plank', sets: 3, reps: '45s', tip: 'Core stabilizacja' }
        ]
      },
      {
        name: 'Legs jednonóż',
        exercises: [
          { name: 'Bulgarian split squat', sets: 4, reps: '8-10 na nogę', tip: 'Tylna noga na ławce' },
          { name: 'Single leg rdl', sets: 3, reps: '10-12 na nogę', tip: 'Balans na jednej nodze' },
          { name: 'Step-up', sets: 3, reps: '10-12 na nogę', tip: 'Wchodź na ławkę, pchaj piętą' },
          { name: 'Single leg hip thrust', sets: 3, reps: '10-12 na nogę', tip: 'Ścisk pośladka na górze' },
          { name: 'Uginanie nóg leżąc', sets: 3, reps: '12-15', tip: 'Hamstring — izolacja' },
          { name: 'Wykroki z hantlami', sets: 3, reps: '12-15', tip: 'Naprzemiennie w ruchu' },
          { name: 'Wspięcia jednonóż', sets: 3, reps: '12-15 na nogę', tip: 'Pełen zakres łydki' },
          { name: 'Plank', sets: 3, reps: '45s', tip: 'Stabilizacja core' }
        ]
      }
    ]
  };

  function detectMuscleLocal(exerciseName) {
    return detectMuscle(exerciseName);
  }

  window.TPDB = {
    plans: PLANS,
    muscles: MUSCLE_NAMES,
    exerciseToMuscle: EXERCISE_TO_MUSCLE,
    detectMuscle: detectMuscle,

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
