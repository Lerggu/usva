# CLAUDE.md — Usva

Usva on toipumisen ja läsnäolon sovellus. Lue `docs/OHJELMARUNKO.md` ennen muutoksia sisältöön tai oppaaseen.

## Sitovat periaatteet

1. **Äänensävy:** kaikki käyttäjälle näkyvä teksti on lempeää, rakastavaa ja hyväksyvää, myös virheilmoitukset. Kutsu ja tarjoa, älä käske.
2. **Ennen tilausta ei käsketä mitään.** Alkukeskustelu tarjoaa vaihtoehtoja, ja "palaan myöhemmin" on aina yhtä arvokas valinta.
3. **Rehellinen myynti:** kokonaishinta ja peruutusehdot näkyvät aina hinnan yhteydessä. Ei keksittyä kiirettä eikä lupauksia paranemisesta.
4. **Hätä ohittaa kaiken:** kriisin merkeistä näytetään tukikortti, eikä tilausta tarjota. Älä heikennä `src/lib/safety.ts`:n tunnistusta.
5. **Opas, ei terapeutti:** sovellus ei diagnosoi eikä korvaa hoitoa tai vertaistukea.
6. **Ei rangaistuksia:** valo ei koskaan vähene, putkia ei nollata, ja paluusta palkitaan.
7. **Tekijänoikeus:** sisältö kirjoitetaan omin sanoin, eikä yhteisöjen nimiä käytetä tuotteessa. Suora lainaus on sallittu vain teoksesta, jonka tekijän ja kääntäjän kuolemasta on yli 70 vuotta. Lainaus tarkistetaan sanatarkasti lähteestä, tekijä mainitaan, ja lähde kirjataan `docs/OHJELMARUNKO.md`:hen. Ei lainauksia suojatusta toipumiskirjallisuudesta, nykykirjoista tai elävien opettajien teksteistä.
8. **Tietosuoja:** kirjoitukset ovat erityisen arkaluonteisia. Niitä ei kirjata lokeihin eikä tallenneta palvelimelle ilman erillistä päätöstä.
9. **Sitoutumattomuus:** Usva ei ole sitoutunut mihinkään uskonnolliseen, hengelliseen, ideologiseen tai psykologiseen suuntaukseen. Sisältö ja opas eivät saarnaa eivätkä oleta käyttäjältä mitään vakaumusta.
10. **Yksilöllisyys:** Usva oppii käyttäjästään ja mukauttaa ohjausta hänelle. Käyttäjälle luvataan vain se, mikä on toteutettu.
11. **Kielet:** suomi on oletus, englanti rinnalla. Ei kovakoodattuja käyttöliittymätekstejä; kaikki `src/lib/i18n.ts`:n kautta.
12. **Mobiili ensin:** suuret kosketusalueet, vähän kirjoittamista.

## Rakenne

- `src/lib/program.ts` – matkan sisältö (vaiheet ja tehtävät)
- `src/lib/progress.ts` – tila, valopisteet, tehtävän valinta, merkit
- `src/lib/guide.ts` – oppaan järjestelmäkehote ja pyynnön tarkistus
- `src/lib/safety.ts` – kriisin tunnistus
- `src/app/api/guide/route.ts` – ainoa palvelinreitti (Claude API)
- `src/components/Mist.tsx` – usvahahmo

API-avaimet tulevat vain ympäristöstä, eivät koskaan tiedostoihin tai commiteihin.

Aja `npm run typecheck`, `npm test` ja `npm run build` ennen jokaista commitia.
