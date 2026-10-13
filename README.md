# Movie Picker

Movie Picker – mokomoji filmų rekomendavimo žiniatinklio aplikacija. Ji leidžia peržiūrėti filmų katalogą, filtruoti filmus pagal žanrą ir nuotaiką, atsitiktinai pasirinkti rekomendaciją bei išsaugoti mėgstamiausius.

## Pagrindinės funkcijos

- Filmų katalogas įkeliamas iš Supabase duomenų bazės.
- Katalogą galima filtruoti pagal žanrą ir nuotaiką.
- Rekomendacija atsitiktinai parenkama iš filtrus atitinkančių filmų. Kai yra keli tinkami filmai, rekomendacija nekartoja ką tik parodyto filmo.
- Filmus galima pridėti prie mėgstamiausių ir pašalinti iš jų. Sąrašas saugomas naršyklės `localStorage`, todėl lieka po puslapio perkrovimo tame pačiame įrenginyje ir naršyklėje.
- Įkeliant katalogą rodoma laukimo būsena; tuščias katalogas ir duomenų įkėlimo klaida pateikiami atskirais pranešimais.

## Naudojamos technologijos

- **React** – vartotojo sąsajai ir jos būsenai.
- **Vite** – vietiniam kūrimo serveriui ir projekto surinkimui.
- **Supabase** – filmų duomenų bazei ir duomenų nuskaitymui.
- **CSS** – puslapio išvaizdai.
- **Git** – kodo versijoms valdyti; **GitHub** gali būti naudojamas saugyklai ir bendram darbui.

## Projekto struktūra

```text
src/
  components/MovieCard.jsx   # filmo kortelė
  data/demoMovies.js         # demonstraciniai duomenys
  lib/movies.js              # filmų gavimas iš Supabase
  lib/supabase.js            # Supabase kliento konfigūracija
  App.jsx                    # puslapio logika ir pagrindinis vaizdas
  App.css                    # aplikacijos stiliai
  index.css                  # bendrieji stiliai
supabase/migrations/         # duomenų bazės pakeitimų SQL failai
docs/                        # MVP, idėjos ir duomenų modelio dokumentai
```

`src/data/demoMovies.js` faile yra pavyzdinių filmų įrašai. Aplikacijos katalogas įkeliamas iš Supabase.

## Diegimas ir paleidimas

Reikalinga įdiegta „Node.js“ ir npm.

1. Atsidarykite terminalą projekto kataloge.
2. Įdiekite priklausomybes:

   ```bash
   npm install
   ```

3. Nukopijuokite `.env.example` į `.env` ir įrašykite savo Supabase projekto reikšmes (žr. kitą skyrių).
4. Paleiskite kūrimo serverį:

   ```bash
   npm run dev
   ```

5. Terminale parodytą vietinį adresą, dažniausiai `http://localhost:5173`, atidarykite naršyklėje.

## Supabase konfigūracija ir saugumas

Supabase nustatymų šablonas yra `.env.example`. Nukopijavę jį į `.env`, užpildykite šiuos kintamuosius:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Reikšmes rasite savo Supabase projekto API nustatymuose. Aplikacija naudoja viešą „publishable“ raktą ir skaito filmus iš `public.movies` lentelės. Viešas raktas nėra slaptažodis: duomenų bazės prieigą būtina riboti Supabase Row Level Security (RLS) taisyklėmis.

Niekada nedėkite `service_role` rakto ar kitų slaptų prisijungimo duomenų į naršyklės kodą, `README.md` ar viešą saugyklą. `.env` yra įtrauktas į `.gitignore`; tikrą `.env` laikykite savo kompiuteryje ir neskelbkite. `.env.example` skirtas tik kintamųjų pavadinimams ir saugiems pavyzdžiams.

Mėgstamiausi filmai išsaugomi lokaliai naršyklėje po `movie-picker-favorites` raktu. Jie nėra sinchronizuojami su Supabase ar tarp skirtingų įrenginių ir naršyklių.

## Patikros

ESLint analizės paleidimas:

```bash
npm run lint
```

Gamybinės versijos surinkimas:

```bash
npm run build
```

## Žinomi apribojimai

- Aplikacijoje nėra vartotojų registracijos ar prisijungimo.
- Katalogas priklauso nuo pasiekiamos Supabase duomenų bazės ir joje esančių filmų; demonstraciniai duomenys automatiškai nepakeičia katalogo.
- Mėgstamiausi filmai saugomi tik vietinėje naršyklės saugykloje.
- `package.json` nėra atskiro automatinių testų rinkinio; pagrindinės kodo patikros yra `npm run lint` ir `npm run build`.
