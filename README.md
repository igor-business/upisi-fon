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
design/                 # Referentni dizajn (nije deo builda)
public/                 # Statički fajlovi (logo, favicon, images/*.webp)
src/
├── assets/fonts/       # Outfit variable font
├── components/         # Deljene komponente: Layout, Header, Footer, Section, Title, Description,
│                       # PageHeader, LessonList, OrderDialog (prijava), ScrollToTop, icons
├── config/localization/# i18n podešavanje, tipovi ključeva i prevodi (language/sr/common.json)
├── constants/          # Rute, sekcije, proizvodi i cene, lekcije, slike, kontakt, footer linkovi
├── hooks/              # useGoToSection, useGoHome, useActiveSection, ...
├── pages/              # Stranice; sekcije landing stranice su u pages/landing-page/sections
├── services/           # Slanje prijave (za sada simulirano)
├── styles/             # theme.ts (Mantine tema i paleta), global.css (dizajn tokeni), layers.css
├── types/              # Zajednički domenski tipovi (proizvodi, prijava, navigacija, lekcije)
└── utils/              # Pomoćne funkcije (cene, skrolovanje, validacija, YouTube)
```

Path aliasi: `@/*`, `@components`, `@config/*`, `@constants`, `@pages`, `@styles/*`, `@assets/*`.

## Konvencije

- **Tekstovi**: svi su u `src/config/localization/language/sr/common.json` i koriste se preko `t()` / `<Trans>`. Ključevi su tipizirani (`i18next.d.ts`), pa pogrešan ključ prijavljuje TypeScript. Liste (FAQ, utisci, stavke kartica) su nizovi u JSON-u – za novo pitanje dovoljno je dodati stavku u JSON.
- **Boje i razmaci**: koriste se isključivo dizajn tokeni iz `src/styles/global.css` (`--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`). Roze nijanse dolaze iz palete u `src/styles/theme.ts` (jedan izvor za Mantine i CSS).
- **Mantine i CSS**: Mantine stilovi su u CSS sloju (`@layer mantine`), pa stilovi iz CSS modula uvek imaju prednost bez `!important`. Dugmad dobijaju boju iz teme – ne postavljati im `background-color` ručno.
- **Breakpointi**: u CSS-u se koriste Mantine mixini (`@mixin smaller-than $mantine-breakpoint-sm { ... }`), u TS-u `theme.breakpoints`.
- **Sekcije**: svaka sekcija koristi `<Section tone="light | tinted | dark">`, koji daje pozadinu, širinu sadržaja i vertikalni razmak. Sekcija sama čita svoje tekstove i konstante; landing stranica ih samo ređa.
- **Komponente**: jedna komponenta po folderu (`index.tsx` + `index.module.css`), imenovani exporti, props tipovi su uz komponentu. Ikonice su u `components/icons`.
- **Slike** su u WebP formatu, uvek imaju `width`/`height` i `alt` iz prevoda. Originalne (PNG) slike čuvaj u `assets-src/` (ignorisano u Git-u).
