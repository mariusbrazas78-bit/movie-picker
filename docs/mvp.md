# Movie Picker – MVP planas

## 1. Projekto tikslas

Sukurti paprastą internetinę aplikaciją, kuri padėtų vartotojui greitai išsirinkti filmą pagal žanrą ir nuotaiką.

## 2. Pagrindinės MVP funkcijos

| Nr. | Funkcija | Prioritetas |
|---|---|---|
| 1 | Filmų sąrašo atvaizdavimas | Aukštas |
| 2 | Filmų filtravimas pagal žanrą | Aukštas |
| 3 | Filmų filtravimas pagal nuotaiką | Aukštas |
| 4 | Atsitiktinė filmo rekomendacija | Aukštas |
| 5 | Mėgstamiausių filmų išsaugojimas | Vidutinis |

## 3. Funkcijų aprašymas

**1. Filmų sąrašas**

Vartotojas mato filmų katalogą su pavadinimais, žanrais, aprašymais ir įvertinimais. Duomenys gaunami iš Supabase.

**2. Žanro pasirinkimas**

Vartotojas gali pasirinkti filmo žanrą, pavyzdžiui, komediją, dramą ar veiksmo filmą.

**3. Nuotaikos pasirinkimas**

Vartotojas gali pasirinkti nuotaiką, pavyzdžiui, linksma, romantiška arba rimta.

**4. Atsitiktinė rekomendacija**

Paspaudus mygtuką „Pasiūlyk filmą“, atsitiktinai parenkamas filmas iš pasirinktus filtrus atitinkančių filmų.

**5. Mėgstamiausi filmai**

Vartotojas gali išsaugoti patikusį filmą mėgstamiausių sąraše ir vėliau jį pašalinti. Šie pasirinkimai saugomi naršyklės localStorage.

## 4. Priėmimo kriterijai (Acceptance Criteria)

- Filmų sąrašas sėkmingai įkeliamas iš Supabase.
- Pasirinkus žanrą, rodomi tik jį atitinkantys filmai.
- Pasirinkus nuotaiką, rodomi tik ją atitinkantys filmai.
- Pasirinkus abu filtrus, taikomi abu kriterijai.
- Paspaudus „Pasiūlyk filmą“, pateikiamas atsitiktinis tinkamas filmas.
- Jei tinkamų filmų nėra, rodomas aiškus pranešimas.
- Filmą galima pridėti prie mėgstamiausių ir pašalinti iš jų.
- Mėgstamiausi filmai išlieka atnaujinus puslapį toje pačioje naršyklėje.
- Įkeliant duomenis rodomas krovimo indikatorius.
- Nepavykus gauti duomenų iš Supabase, rodomas klaidos pranešimas.
- Puslapis tinkamai veikia kompiuteryje ir telefone.

## 5. Duomenys

- Naudosime 20–30 iš anksto pasirinktų filmų.
- Filmų katalogas saugomas Supabase.
- Mėgstamiausių filmų ID saugomi localStorage.
- Išorinio filmų API nenaudosime.

## 6. MVP apribojimai

Pirmojoje versijoje nebus:
- Vartotojų registracijos ir prisijungimo.
- Filmų įkėlimo ar redagavimo per aplikaciją.
- Mokamų funkcijų.
- AI rekomendavimo algoritmo.

## 7. Technologijos

- React – vartotojo sąsaja.
- Vite – projekto kūrimo ir paleidimo įrankis.
- JavaScript – programavimo kalba.
- CSS – aplikacijos dizainas.
- Supabase – filmų duomenų bazė.
- GitHub – projekto versijų valdymas.

## 8. MVP sėkmės kriterijus

Vartotojas gali atsidaryti Movie Picker, pasirinkti žanrą ir nuotaiką, gauti filmo rekomendaciją ir išsaugoti patikusį filmą.