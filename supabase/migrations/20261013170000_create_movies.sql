
-- Movie Picker: pradinė duomenų bazės migracija

-- 1. Sukuriame filmų lentelę
CREATE TABLE public.movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL
        CHECK (length(trim(title)) > 0),

    genre TEXT NOT NULL
        CHECK (genre IN (
            'Komedija',
            'Drama',
            'Veiksmo',
            'Romantinis',
            'Mokslinė fantastika'
        )),

    mood TEXT NOT NULL
        CHECK (mood IN (
            'Linksma',
            'Romantiška',
            'Rimta',
            'Įtempta'
        )),

    description TEXT NOT NULL
        CHECK (length(trim(description)) > 0),

    release_year INTEGER NOT NULL
        CHECK (release_year BETWEEN 1888 AND 2100),

    rating NUMERIC(3,1) NOT NULL
        CHECK (rating BETWEEN 0 AND 10),

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT now()
);

-- 2. Įjungiame RLS saugumą
ALTER TABLE public.movies
ENABLE ROW LEVEL SECURITY;

-- 3. Leidžiame viešai skaityti filmus
CREATE POLICY "Public can read movies"
ON public.movies
FOR SELECT
TO anon, authenticated
USING (true);
