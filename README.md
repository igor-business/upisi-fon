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

## Slanje prijava (Mailgun)

Forma za prijavu šalje podatke funkciji `api/order.ts` (Vercel Function), koja ih ponovo proverava, sama računa cenu iz `src/constants/products.ts` i šalje mejl timu preko Mailgun HTTP API-ja. Odgovor na mejl (Reply-To) ide prvom polazniku.

Promenljive su opisane u `.env.example`:

- **Vercel**: Project → Settings → Environment Variables (`MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_REGION`, `ORDER_EMAIL_TO`, opciono `ORDER_EMAIL_FROM`).
- **Lokalno**: kopiraj `.env.example` u `.env.local`. `npm run dev` pokreće i funkcije iz `api/` (plugin u `vite.config.ts`); bez `MAILGUN_API_KEY` mejl se samo ispiše u terminalu.

Mailgun sandbox domen šalje samo na unapred odobrene adrese – za produkciju treba verifikovati pravi domen (npr. `mg.upisifon.rs`).

Zaštita od spama: skriveno polje koje popunjavaju samo botovi i najviše 5 prijava sa jedne IP adrese u 10 minuta.

`vercel.json` preusmerava sve adrese osim `/api/*` na `index.html`, pa direktno otvaranje ili osvežavanje podstranica radi.

## Struktura

```text
api/                    # Vercel Functions (order.ts – slanje prijava preko Mailgun-a)
design/                 # Referentni dizajn (nije deo builda)
public/                 # Statički fajlovi (logo, favicon, images/*.webp)
src/
├── assets/fonts/       # Outfit variable font
├── components/         # Deljene komponente: Layout, Header, Footer, Section, Title, Description,
│                       # PageHeader, LessonList, OrderDialog (prijava), ScrollToTop, icons
├── config/localization/# i18n podešavanje, tipovi ključeva i prevodi (language/sr/common.json)
├── constants/          # Rute, sekcije, proizvodi i cene, lekcije, slike, kontakt, footer linkovi
├── hooks/              # useGoToSection, useActiveSection, useIsHomePage
├── pages/              # Stranice; sekcije landing stranice su u pages/landing-page/sections
├── services/           # Slanje prijave na /api/order
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
