# Movie Picker

Movie Picker – internetinė filmų pasirinkimo aplikacija, skirta greitai rasti filmą vakarui. Vartotojas peržiūri katalogą, filtruoja pagal žanrą ir nuotaiką, gauna atsitiktinę rekomendaciją ir išsaugo mėgstamus filmus. Administratorius gali prisijungti ir tvarkyti katalogą.

## Tikslas ir MVP būklė

| Funkcija | Būsena ir įgyvendinimas |
|---|---|
| Filmų katalogas | Įgyvendinta: filmai skaitomi iš `public.movies` Supabase lentelės. |
| Filtravimas pagal žanrą ir nuotaiką | Įgyvendinta: filtrai gali būti taikomi kartu. |
| Atsitiktinė rekomendacija | Įgyvendinta: parenkama iš filtrus atitinkančių filmų; kai įmanoma, nekartojamas paskutinis pasirinkimas. |
| Mėgstamiausi filmai | Įgyvendinta: galima pridėti ir pašalinti; įrašai saugomi naršyklės `localStorage`. |
| Administratoriaus prisijungimas / atsijungimas | Įgyvendinta per Supabase Auth; administratoriaus sąsają rodo tik sesijai su `app_metadata.role === 'admin'`. |
| Filmų CRUD | Aplikacijoje įgyvendintas filmų pridėjimas, redagavimas ir trynimas; faktines teises nustato Supabase RLS. |
| Įvesties validacija | Įgyvendinta formoje ir duomenų bazės migracijos apribojimuose: būtini laukai, metai 1888–2100, įvertinimas 0–10. |

> Administratoriaus CRUD RLS politikos nėra versijuotoje migracijoje. Iš repozitorijaus negalima patikrinti, ar jos nustatytos Supabase Dashboard aplinkoje. Prieš administravimą jas reikia išbandyti ir suteikti tik būtiną prieigą.

## Techniniai sprendimai

- **React** naudojamas komponentais paremtai vartotojo sąsajai ir jos būsenai valdyti.
- **Vite** teikia vietinį kūrimo serverį ir gamybinį surinkimą.
- **CSS** apibrėžia aplikacijos išvaizdą.
- **Supabase** teikia PostgreSQL duomenų bazę ir Auth prisijungimą. Naršyklės kodas naudoja tik viešą publishable raktą; prieigą prie duomenų turi riboti RLS.
- **Git ir GitHub** naudojami kodo versijoms, šakoms ir bendram projekto darbui.
- Administratoriaus sąsajos matomumas paremtas Supabase sesijos `app_metadata.role` reikšme. Tai nėra duomenų bazės apsauga: kiekvieną rašymo operaciją turi serverio pusėje apriboti Supabase RLS politika.
- Katalogo ir CRUD klaidos pateikiamos vartotojui, o tinklo atmetimai apdorojami operacijų klaidomis. Įvestis tikrinama prieš siuntimą ir dar kartą apribojama duomenų bazėje.

## Technologijos

- React
- Vite
- CSS
- Supabase (PostgreSQL ir Auth)
- Git ir GitHub

## Paleidimas vietoje

Reikalingi Node.js ir npm.

1. Įdiekite priklausomybes:

   ```bash
   npm install
   ```

2. Nukopijuokite `.env.example` į `.env` ir įrašykite savo Supabase projekto URL bei viešą publishable raktą.
3. Paleiskite kūrimo serverį:

   ```bash
   npm run dev
   ```

4. Atidarykite terminale nurodytą adresą, įprastai `http://localhost:5173`.

Be Supabase konfigūracijos aplikacija nepateiks filmų katalogo. `src/data/demoMovies.js` yra pavyzdiniai duomenys, tačiau aplikacija jų automatiškai nenaudoja kaip atsarginio katalogo.

## Aplinkos kintamieji ir paslaptys

`.env.example` pateikti tik kintamųjų pavadinimai ir netikros pavyzdinės reikšmės:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Niekada nedėkite slaptažodžio, `service_role` rakto ar kitos slaptos reikšmės į `VITE_` kintamąjį, naršyklės kodą arba GitHub. `.env` ignoruojamas per `.gitignore`; į repozitorijų įtraukite tik saugų `.env.example`.

## Supabase duomenų bazė ir saugumas

Versijuota migracija `supabase/migrations/20261013170000_create_movies.sql` sukuria `public.movies` lentelę, apribojimus ir įjungia RLS. Joje sukurta politika **Public can read movies**, leidžianti `SELECT` vaidmenims `anon` ir `authenticated`. Migracijoje nėra `INSERT`, `UPDATE` ar `DELETE` RLS politikų.

Aplikacijos admin sąsaja siunčia filmų kūrimo, redagavimo ir trynimo užklausas, tačiau jos sėkmingos tik tada, jei Supabase aplinkoje šios operacijos tinkamai autorizuotos. Admin CRUD politikų buvimo ar teisingumo Supabase Dashboard’e iš šio repozitorijaus patikrinti negalima. Prieš naudojant administravimą, patikrinkite jas atskiroje testinėje aplinkoje ir suteikite prieigą tik administratoriui. Niekada neišjunkite RLS vien tam, kad CRUD veiktų.

## Testavimas ir kokybės patikros

```bash
npm test
npm run lint
npm run build
```

`npm test` vykdo Node.js automatinius filmų API testus su imituotu klientu; jie nepasiekia gyvos Supabase duomenų bazės. Lint tikrina kodo stilių ir dažnas klaidas, o build sukuria gamybinį aplikacijos variantą. Šios komandos nepakeičia rankinio naršyklės testavimo ar gyvų RLS teisių patikrinimo.

## Duomenų modelis ir papildoma dokumentacija

- [Duomenų modelis, apribojimai, ryšiai ir ER diagrama](docs/data-model.md)
- [MVP planas](docs/mvp.md)
- [Projekto idėja](docs/idea.md)

Duomenų bazėje saugomi tik filmai. Mėgstamiausi filmų įrašai saugomi vietinėje naršyklės saugykloje ir nėra sinchronizuojami tarp įrenginių.
