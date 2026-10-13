# Movie Picker – MVP ir funkcionalumų planas

## 1. Projekto tikslas

Movie Picker – internetinė aplikacija, padedanti vartotojui greitai ir paprastai išsirinkti filmą pagal žanrą ir nuotaiką.

Pagrindinis tikslas – sumažinti laiką, kurį vartotojas praleidžia ieškodamas tinkamo filmo.

## 2. Tikslinė auditorija

Filmų mėgėjai, kurie nori greitai gauti filmo rekomendaciją, neperžiūrėdami daugybės skirtingų filmų platformų.

## 3. MVP apibrėžimas

MVP (Minimum Viable Product – minimalus gyvybingas produktas) – paprasčiausia veikianti aplikacijos versija, turinti tik svarbiausias funkcijas.

Pirmojoje Movie Picker versijoje vartotojas galės:

- Peržiūrėti filmų sąrašą.
- Pasirinkti filmo žanrą.
- Pasirinkti nuotaiką.
- Gauti atsitiktinę filmo rekomendaciją.
- Išsaugoti patikusius filmus.

## 4. Funkcionalumai ir prioritetai

| Nr. | Funkcionalumas | Prioritetas | Reikšmė |
|---|---|---|---|
| 1 | Filmų sąrašo atvaizdavimas | P0 | Būtina MVP |
| 2 | Filmų filtravimas pagal žanrą | P0 | Būtina MVP |
| 3 | Filmų filtravimas pagal nuotaiką | P0 | Būtina MVP |
| 4 | Atsitiktinė filmo rekomendacija | P0 | Būtina MVP |
| 5 | Mėgstamiausių filmų išsaugojimas | P0 | Būtina MVP |
| 6 | Filmų paieška pagal pavadinimą | P1 | Svarbu, jei lieka laiko |
| 7 | Filmų anonsų peržiūra | P2 | Ateities idėja |

**Prioritetų paaiškinimas:**

- P0 – būtinos funkcijos, be kurių MVP nelaikomas užbaigtu.
- P1 – papildomos funkcijos, jei lieka laiko.
- P2 – ateities funkcijos, neįtrauktos į pirmąją versiją.

## 5. Funkcionalumų aprašymas ir priėmimo kriterijai (Acceptance Criteria)

### 5.1. Filmų sąrašo atvaizdavimas (P0)

**Funkcionalumas:** vartotojas gali matyti filmų katalogą.

Priėmimo kriterijai:
- Filmų sąrašas gaunamas iš Supabase duomenų bazės.
- Kiekvienam filmui rodomas pavadinimas, žanras, nuotaika, trumpas aprašymas, išleidimo metai ir įvertinimas.
- Duomenų įkėlimo metu rodomas pranešimas „Kraunami filmai...“.
- Jei duomenų bazėje nėra filmų, rodomas pranešimas „Filmų sąrašas tuščias“.
- Jei nepavyksta prisijungti prie duomenų bazės, rodomas klaidos pranešimas.

### 5.2. Filmų filtravimas pagal žanrą (P0)

**Funkcionalumas:** vartotojas gali pasirinkti norimą filmo žanrą.

Priėmimo kriterijai:
- Vartotojas gali pasirinkti žanrą iš pateikto sąrašo.
- Pasirinkus žanrą, rodomi tik jį atitinkantys filmai.
- Pasirinkus „Visi žanrai“, rodomi visi filmai, jei netaikomas nuotaikos filtras.
- Jei pasirinkto žanro filmų nėra, rodomas aiškus pranešimas.

### 5.3. Filmų filtravimas pagal nuotaiką (P0)

**Funkcionalumas:** vartotojas gali pasirinkti filmą pagal nuotaiką.

Priėmimo kriterijai:
- Vartotojas gali pasirinkti nuotaiką: linksma, romantiška, rimta arba įtempta.
- Pasirinkus nuotaiką, rodomi tik ją atitinkantys filmai.
- Žanro ir nuotaikos filtrai gali veikti kartu.
- Pasirinkus „Visos nuotaikos“, nuotaikos filtras panaikinamas.
- Jei pagal pasirinktus filtrus filmų nėra, rodomas pranešimas „Filmų nerasta“.

### 5.4. Atsitiktinė filmo rekomendacija (P0)

**Funkcionalumas:** aplikacija atsitiktinai pasiūlo filmą.

Priėmimo kriterijai:
- Vartotojas gali paspausti mygtuką „Pasiūlyk filmą“.
- Aplikacija atsitiktinai parenka vieną filmą iš pasirinktus filtrus atitinkančių filmų.
- Ekrane rodomas rekomenduoto filmo pavadinimas, aprašymas ir įvertinimas.
- Jei tinkamų filmų nėra, vartotojas mato aiškų pranešimą.
- Pakartotinai paspaudus mygtuką, gali būti pasiūlytas kitas filmas, jei tinkamų filmų yra daugiau nei vienas.

### 5.5. Mėgstamiausių filmų išsaugojimas (P0)

**Funkcionalumas:** vartotojas gali išsaugoti patikusius filmus.

Priėmimo kriterijai:
- Prie kiekvieno filmo yra mygtukas „Pridėti prie mėgstamiausių“.
- Paspaudus mygtuką, filmas įtraukiamas į mėgstamiausių sąrašą.
- Tas pats filmas negali būti pridėtas du kartus.
- Vartotojas gali pašalinti filmą iš mėgstamiausių.
- Mėgstamiausių filmų sąrašas išlieka perkrovus puslapį.
- Jei mėgstamiausių filmų nėra, rodomas pranešimas „Mėgstamiausių filmų dar nėra“.
- Mėgstamiausių filmų ID saugomi naršyklės localStorage.

## 6. Papildomos funkcijos

### P1 – jei lieka laiko

Filmų paieška pagal pavadinimą:
- Vartotojas gali įvesti filmo pavadinimą.
- Sąrašas filtruojamas pagal įvestą tekstą.
- Jei filmas nerastas, rodomas atitinkamas pranešimas.

### P2 – ateities idėjos

Filmų anonsų peržiūra:
- Galimybė atidaryti filmo anonsą.
- Anonsų nuorodos galėtų būti saugomos duomenų bazėje.

Šios funkcijos nėra būtinos pirmajai MVP versijai.

## 7. Duomenys ir technologijos

**Filmų duomenys:**
- Naudosime 20–30 iš anksto pasirinktų filmų.
- Filmų katalogas bus saugomas Supabase.
- Mėgstamiausių filmų ID bus saugomi localStorage.
- Išorinio filmų API nenaudosime.

**Technologijos:**
- JavaScript – aplikacijos logika.
- React – vartotojo sąsaja.
- Vite – projekto kūrimo aplinka.
- CSS – dizainas.
- Supabase – filmų duomenų bazė.
- GitHub – versijų valdymas.

## 8. Klaidos ir išimtinės situacijos

Aplikacija turi tinkamai reaguoti į šias situacijas:

- Nepavyksta gauti filmų iš Supabase – rodomas klaidos pranešimas.
- Duomenų bazėje nėra filmų – rodomas tuščio sąrašo pranešimas.
- Pasirinkti filtrai neatitinka nė vieno filmo – rodomas pranešimas „Filmų nerasta“.
- Nėra mėgstamiausių filmų – rodomas atitinkamas pranešimas.
- Nepavyksta išsaugoti mėgstamiausių naršyklėje – rodomas klaidos pranešimas.
- Filmų duomenys nepilni – aplikacija neturi nustoti veikti.

## 9. Kas nebus kuriama pirmojoje versijoje

- Vartotojų registracija ir prisijungimas.
- Filmų pridėjimas ar redagavimas per aplikacijos sąsają.
- Mokamos funkcijos.
- Dirbtinio intelekto rekomendavimo algoritmas.
- Integracija su Netflix ar kitomis filmų platformomis.
- Sudėtinga rekomendavimo sistema.

## 10. MVP sėkmės kriterijai

Projektas laikomas sėkmingai įgyvendintu, jeigu:

1. Aplikacija sėkmingai paleidžiama naršyklėje.
2. Filmų duomenys gaunami iš Supabase.
3. Vartotojas gali filtruoti filmus pagal žanrą ir nuotaiką.
4. Veikia atsitiktinė filmo rekomendacija.
5. Veikia mėgstamiausių filmų išsaugojimas ir pašalinimas.
6. Aplikacija tinkamai apdoroja klaidas.
7. Puslapis patogiai naudojamas kompiuteryje ir telefone.
8. Projekto kodas ir dokumentacija išsaugoti GitHub.

## 11. Galutinis MVP rezultatas

Veikianti Movie Picker internetinė aplikacija, leidžianti vartotojui greitai pasirinkti filmą pagal žanrą ir nuotaiką, gauti atsitiktinę rekomendaciją bei išsaugoti mėgstamiausius filmus.