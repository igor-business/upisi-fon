# UpišiFON

Prezentacioni sajt firme koja priprema buduće studente za prijemni ispit iz matematike na Fakultetu organizacionih nauka (FON) u Beogradu. Sajt predstavlja čime se firma bavi i kako pomaže studentima da savladaju gradivo.

## Tehnologije

- React 19 + TypeScript
- Vite
- Mantine (UI komponente)
- react-router-dom (rutiranje)
- i18next / react-i18next (svi tekstovi su u JSON fajlu)
- CSS moduli + dizajn tokeni u `src/styles/global.css`
- Outfit font (hostovan lokalno u `src/assets/fonts`)

## Pokretanje

```bash
npm install
npm run dev      # razvojni server
npm run build    # provera tipova + produkcioni build u dist/
npm run preview  # pregled produkcionog builda
npm run lint     # oxlint
```

## Struktura

```text
design/            # Referentni dizajn (nije deo builda)
public/            # Statički fajlovi (logo, favicon, images/*.webp)
src/
├── assets/fonts/  # Outfit variable font
├── components/    # Layout (header + meni), Footer, Hero i sekcije landing stranice
├── config/localization/  # i18n podešavanje i prevodi (language/sr/common.json)
├── constants/     # Rute, slike, sekcije landing stranice, footer linkovi
├── pages/         # LandingPage, AppPage
├── styles/        # Globalni stilovi i dizajn tokeni
├── types/         # Zajednički TypeScript tipovi
└── utils/         # Pomoćne funkcije (npr. scrollToSection)
```

Path aliasi: `@`, `@components`, `@config`, `@constants`, `@pages`, `@styles`, `@types`, `@assets`.

## Konvencije

- Svi tekstovi dolaze iz `src/config/localization/language/sr/common.json` preko `t()` / `<Trans>`; u komponentama nema hardkodovanih tekstova.
- Slike se koriste u WebP formatu i uvek imaju `alt` iz prevoda.
- Sekcije landing stranice su zasebne komponente u `components/` i sklapaju se u `pages/landing-page`. Stavke navigacije su u `constants/app.ts` (`NAV_ITEMS`), a nazivi pod ključevima `landing.nav.N`.
- Originalne (PNG) slike čuvaj u `assets-src/` (ignorisano u Git-u).
