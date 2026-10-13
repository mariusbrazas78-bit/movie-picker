/**
 * Demonstraciniai filmai tik puslapio dizainui patikrinti.
 * Tikri katalogo duomenys vėliau bus gaunami iš Supabase.
 */
export const DEMO_MOVIES = [
  {
    id: 'demo-1',
    title: 'Amelija iš Monmartro',
    genre: 'Romantinis',
    mood: 'Romantiška',
    description:
      'Svajinga Paryžiaus kavinės padavėja ima slapta gerinti aplinkinių gyvenimą ir netikėtai randa meilę.',
    release_year: 2001,
    rating: 8.3,
  },
  {
    id: 'demo-2',
    title: 'Tamsusis riteris',
    genre: 'Veiksmo',
    mood: 'Įtempta',
    description:
      'Betmenas stoja prieš chaosą sėjantį Džokerį, kai Gotamo miestą ištinka moralinis išbandymas.',
    release_year: 2008,
    rating: 9.0,
  },
  {
    id: 'demo-3',
    title: 'Atvykimas',
    genre: 'Mokslinė fantastika',
    mood: 'Rimta',
    description:
      'Kalbininkė bando perprasti ateivių kalbą ir kartu keičia savo pačios laiko suvokimą.',
    release_year: 2016,
    rating: 7.9,
  },
  {
    id: 'demo-4',
    title: 'Grand Budapest Hotel',
    genre: 'Komedija',
    mood: 'Linksma',
    description:
      'Elegantiško viešbučio durininkas ir jo mokinys įsivelia į paveldėjimo, meno ir nuotykių istoriją.',
    release_year: 2014,
    rating: 8.1,
  },
  {
    id: 'demo-5',
    title: 'Parazitai',
    genre: 'Drama',
    mood: 'Rimta',
    description:
      'Neturtinga šeima pamažu įsiskverbia į turtingųjų namus, kol kasdienybė virsta aštriu konfliktu.',
    release_year: 2019,
    rating: 8.5,
  },
]

export const DEMO_GENRES = [
  'Komedija',
  'Drama',
  'Veiksmo',
  'Romantinis',
  'Mokslinė fantastika',
]

export const DEMO_MOODS = ['Linksma', 'Romantiška', 'Rimta', 'Įtempta']
