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

## Julkaisu Azureen (App Service)

Sovellus on tavallinen Next.js-palvelin, joten se sopii Azure App Serviceen (Linux, Node 22 tai uudempi).

1. Luo Web App: julkaisutapa Code, ajoympäristö Node 22 LTS, käyttöjärjestelmä Linux.
2. Yhdistä Deployment Centerissä GitHub-repo `Lerggu/usva`, haara `main`. Azure luo julkaisun, joka ajaa `npm install` ja `npm run build`.
3. Lisää ympäristömuuttujiin `ANTHROPIC_API_KEY`. Avainta ei tallenneta repoon.
4. Käynnistyskomento on `npm start`. Next.js kuuntelee Azuren antamaa `PORT`-muuttujaa.

Oppaan pyyntörajoitin on muistinvarainen, joten aja aluksi yhtä instanssia.

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
