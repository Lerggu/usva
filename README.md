# Usva – vuosi tähän hetkeen

Lempeä, ohjattu matka tähän hetkeen. Usva vie käyttäjän askel kerrallaan läpi vuoden mittaisen ohjelman: joka päivä aamu, yksi tehtävä ja ilta, ja rinnalla tekoälyopas, joka näkyy violettina usvana.

Ohjelman runko ja periaatteet: [`docs/OHJELMARUNKO.md`](docs/OHJELMARUNKO.md).

## Mitä tässä versiossa on

- Alkukeskustelu usvan kanssa ennen tilausta (vaihtoehtoja, ei käskyjä).
- Vaiheet 1–4: 28 päivän tehtävät suomeksi ja englanniksi.
- Päivän kolme hetkeä, Tämä hetki -hengitys, valopisteet, viikkonäkymä ja merkit.
- Tekoälyopas (Claude API) ja kriisiohjaus.
- Tietojen lataus ja poisto. Kirjoitukset tallentuvat vain käyttäjän laitteelle.

Ei vielä mukana: maksaminen, käyttäjätilit ja vaiheet 5–12.

## Käynnistys

```bash
npm install
```

```bash
cp .env.example .env.local
```

Lisää `.env.local`-tiedostoon `ANTHROPIC_API_KEY`. Ilman avainta sovellus toimii muuten, mutta opas ei vastaa.

```bash
npm run dev
```

## Tarkistukset

```bash
npm run typecheck
```

```bash
npm test
```

```bash
npm run build
```
