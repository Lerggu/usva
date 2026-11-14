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
2. Yhdistä Deployment Centerissä GitHub-repo `Lerggu/usva`, haara `main`. Julkaisu on tiedostossa `.github/workflows/main_usva.yml`: se ajaa tarkistukset, kääntää sovelluksen ja vie valmiin paketin Azureen jokaisen `main`-haaran muutoksen jälkeen.
3. Lisää ympäristömuuttujiin `ANTHROPIC_API_KEY`. Avainta ei tallenneta repoon.
4. Käynnistyskomento on `npm start` (tai tyhjä). Palvelin kuuntelee Azuren antamaa `PORT`-muuttujaa.

Oppaan pyyntörajoitin on muistinvarainen, joten aja aluksi yhtä instanssia.

## Tilit

Käyttäjä rekisteröityy sähköpostiosoitteella ilman salasanaa: Usva lähettää kuusinumeroisen koodin, joka on voimassa kymmenen minuuttia. Tili luodaan ensimmäisellä kirjautumisella, ja 7 päivän maksuton kokeilu alkaa siitä.

Palvelimelle tallentuvat vain sähköpostiosoite, nimi jolla usva kutsuu käyttäjää, usvan nimi, kieli ja tilauksen tila. Käyttäjän kirjoitukset pysyvät hänen laitteellaan.

Tilit tulevat käyttöön, kun nämä ympäristömuuttujat on asetettu: `SESSION_SECRET`, `AZURE_STORAGE_CONNECTION_STRING`, `ACS_CONNECTION_STRING` ja `ACS_SENDER`. Ilman niitä alkukeskustelu ohittaa rekisteröitymisen ja sovellus toimii kuten ennen.

Paikallisessa kehityksessä `USVA_DEV_AUTH=1` pitää tilit muistissa ja tulostaa koodin palvelimen konsoliin.

## Maksaminen

Tilaus maksetaan Stripen maksusivulla; korttitiedot eivät kulje Usvan kautta. Kun kokeilu on päättynyt, päivän hetket, opas ja polku jatkuvat tilauksella. Koti, hengitys, Tuki, asetukset ja tilaussivu ovat aina auki. Oikeus tarkistetaan myös palvelimella oppaan ja äänen reiteissä.

Maksaminen tulee käyttöön, kun tilit ovat käytössä ja nämä on asetettu: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` ja vähintään toinen hinnoista `STRIPE_PRICE_YEARLY` tai `STRIPE_PRICE_MONTHLY`. Aseta myös `APP_URL`. Ilman näitä päättynyt kokeilu ei rajoita käyttöä.

Stripessä tarvitaan:

1. Tuote ja sille toistuva hinta (vuosi ja/tai kuukausi). Hinnan tunniste (`price_...`) ympäristömuuttujaan. Sovellus näyttää summan suoraan Stripestä.
2. Webhook osoitteeseen `<APP_URL>/api/billing/webhook` tapahtumille `invoice.paid` ja `charge.refunded`. Sen allekirjoitusavain muuttujaan `STRIPE_WEBHOOK_SECRET`.
3. Customer portal päälle, jotta käyttäjä voi perua tilauksen itse.

Onnistunut maksu asettaa tilille maksetun ajan laskutusjakson loppuun. Täysi palautus päättää sen heti.

## Oppaan ääni

Oppaan kanssa voi keskustella puhumalla (Opas-näkymän "Puhu Usvan kanssa"). Käyttäjä puhuu vapaasti, usva vastaa ääneen noin kahden sekunnin tauon jälkeen ja kuuntelee taas. Puhetta ei näytetä tekstinä, ja usva liikkuu äänen voimakkuuden mukaan. Kirjoitusnäkymässä puheen voi myös sanella tekstikenttään.

- **Puhe tekstiksi:** selaimen oma puheentunnistus, jos selaimessa on sellainen (Chrome ja Edge tietokoneella ja Androidissa, Safari). Muissa selaimissa, kuten iPhonen Chromessa ja Firefoxissa, puhe äänitetään ja tunnistetaan Azure AI Speech -palvelussa, kun alla olevat ympäristömuuttujat on asetettu. Ilman niitä puhuminen ei näissä selaimissa onnistu.
- **Teksti puheeksi:** Azure AI Speech -palvelun neuroääni, kun ympäristömuuttujat `AZURE_SPEECH_KEY` ja `AZURE_SPEECH_REGION` on asetettu. Muuten käytetään selaimen omaa ääntä.

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
