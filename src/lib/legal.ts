import type { L } from "./program";

// Tietosuojaseloste ja käyttöehdot. LUONNOS: juristin on luettava nämä ennen
// kuin palvelua myydään. Tekstin pitää vastata sitä, mitä sovellus oikeasti
// tekee: kun tietojen käsittely muuttuu koodissa, päivitä myös tämä tiedosto.

export const LEGAL_UPDATED = "2026-11-15";

// Rekisterinpitäjän tiedot. Täytä ennen myynnin aloittamista; tyhjinä sivulla
// kerrotaan, että tiedot täydentyvät.
export const CONTROLLER = {
  name: "",
  businessId: "",
  address: "",
  email: "",
};

export type Section = { title: L; body: L[] };

export const PRIVACY: Section[] = [
  {
    title: { fi: "Lyhyesti", en: "In short" },
    body: [
      {
        fi: "Usva on tehty niin, että se, mitä kirjoitat, pysyy sinun laitteellasi. Palvelimelle tallennetaan vain se, mitä kirjautuminen ja tilaus tarvitsevat. Kun keskustelet oppaan kanssa tai puhut Usvalle, tekstisi tai puheesi käy vastausta varten tekoäly- ja puhepalvelussa, mutta Usva ei tallenna sitä palvelimelleen. Tämä tapahtuu vain suostumuksellasi.",
        en: "Usva is built so that what you write stays on your device. The server stores only what signing in and the subscription require. When you talk with the guide or speak to Usva, your text or speech passes through an AI and a speech service to produce a reply, but Usva does not store it on its server. This happens only with your consent.",
      },
    ],
  },
  {
    title: { fi: "Mitä tietoja käsitellään ja missä", en: "What data is processed, and where" },
    body: [
      {
        fi: "Laitteellasi (selaimen muistissa): aamun aikomukset, päivän tehtävien vastaukset, iltakatsaukset, keskustelut oppaan kanssa, edistymisesi, nimesi ja usvan nimi sekä asetuksesi. Näitä ei lähetetä Usvan palvelimelle tallennettavaksi.",
        en: "On your device (in the browser's storage): morning intentions, answers to the day's tasks, evening reviews, conversations with the guide, your progress, your name and the mist's name, and your settings. These are not sent to Usva's server for storage.",
      },
      {
        fi: "Tililläsi palvelimella, jos rekisteröidyt: sähköpostiosoite, nimi jolla usva kutsuu sinua, usvan nimi, kieli, tilin luontiaika, kokeilun päättymisaika, tilauksen voimassaolo ja maksupalvelun asiakastunniste. Kirjautumiskoodista tallennetaan vain tiiviste kymmeneksi minuutiksi.",
        en: "On your account on the server, if you register: email address, the name the mist calls you, the mist's name, language, account creation time, trial end time, subscription validity and the payment provider's customer identifier. Only a hash of the sign-in code is stored, for ten minutes.",
      },
      {
        fi: "Oppaan kanssa keskustellessa: keskustelu, nimesi, päivän tehtävä ja viimeisimpien päivien kirjoituksesi lähetetään tekoälypalveluun vastauksen tuottamista varten. Usva ei tallenna näitä palvelimelleen eikä kirjaa niitä lokeihin.",
        en: "When talking with the guide: the conversation, your name, the day's task and your writing from the most recent days are sent to an AI service to produce the reply. Usva does not store these on its server or write them to logs.",
      },
      {
        fi: "Puhuessasi: puheesi muutetaan tekstiksi joko selaimesi omassa palvelussa tai puhepalvelussa, ja oppaan vastaus muutetaan ääneksi puhepalvelussa. Usva ei tallenna äänitystä.",
        en: "When you speak: your speech is turned into text either by your browser's own service or by a speech service, and the guide's reply is turned into sound by a speech service. Usva does not store the recording.",
      },
      {
        fi: "Tekniset tiedot: palvelin käsittelee IP-osoitettasi hetkellisesti pyyntöjen rajoittamiseksi väärinkäytön estämiseksi, ja palvelun ylläpito kerää tavanomaisia teknisiä lokeja. Niihin ei kirjata kirjoitustesi sisältöä.",
        en: "Technical data: the server processes your IP address momentarily to limit requests and prevent misuse, and the hosting keeps ordinary technical logs. The content of your writing is not written to them.",
      },
    ],
  },
  {
    title: { fi: "Arkaluonteiset tiedot ja suostumus", en: "Sensitive data and consent" },
    body: [
      {
        fi: "Se, mitä kerrot Usvalle, voi koskea terveyttäsi, kuten riippuvuutta tai mielen hyvinvointia. Tällaiset tiedot ovat lain erityisesti suojaamia. Niitä käsitellään oppaassa ja puheessa vain nimenomaisella suostumuksellasi, jota Usva kysyy ennen ensimmäistä käyttökertaa.",
        en: "What you tell Usva may concern your health, such as addiction or mental wellbeing. Such data is specially protected by law. It is processed in the guide and in speech only with your explicit consent, which Usva asks for before the first use.",
      },
      {
        fi: "Voit perua suostumuksen milloin tahansa asetuksista. Ilman suostumusta päivän hetket, polku, hengitys ja tuki toimivat kirjoittamalla, mutta opas ja puhe eivät ole käytössä.",
        en: "You can withdraw consent at any time in settings. Without consent the daily moments, the path, breathing and support work by writing, but the guide and speech are not in use.",
      },
    ],
  },
  {
    title: { fi: "Miksi tietoja käsitellään", en: "Why the data is processed" },
    body: [
      {
        fi: "Tilin tietoja käsitellään sopimuksen täyttämiseksi: kirjautumiseen, kokeilun ja tilauksen hoitamiseen sekä palvelua koskeviin välttämättömiin viesteihin. Oppaan ja puheen käsittely perustuu suostumukseesi. Väärinkäytön estäminen ja palvelun turvaaminen perustuvat oikeutettuun etuun. Maksutietojen säilyttäminen perustuu kirjanpitoa koskevaan lakiin.",
        en: "Account data is processed to perform the contract: signing in, managing the trial and the subscription, and necessary messages about the service. Processing in the guide and in speech is based on your consent. Preventing misuse and securing the service are based on legitimate interest. Keeping payment records is based on accounting law.",
      },
      {
        fi: "Tietojasi ei käytetä mainontaan, niitä ei myydä eikä niitä luovuteta markkinointiin. Usva ei käytä seurantaevästeitä eikä analytiikkaa.",
        en: "Your data is not used for advertising, is not sold and is not disclosed for marketing. Usva uses no tracking cookies and no analytics.",
      },
    ],
  },
  {
    title: { fi: "Palveluntarjoajat, joita Usva käyttää", en: "Service providers Usva uses" },
    body: [
      {
        fi: "Microsoft Azure: sovelluksen palvelin, tilien tallennus, kirjautumiskoodien sähköposti sekä puheen tunnistus ja oppaan ääni.",
        en: "Microsoft Azure: the application server, account storage, sign-in code email, and speech recognition and the guide's voice.",
      },
      {
        fi: "Anthropic: tekoäly, joka tuottaa oppaan vastaukset.",
        en: "Anthropic: the AI that produces the guide's replies.",
      },
      {
        fi: "Stripe: maksujen käsittely. Korttitietosi annetaan suoraan Stripelle, eivätkä ne kulje Usvan kautta.",
        en: "Stripe: payment processing. Your card details are given directly to Stripe and never pass through Usva.",
      },
      {
        fi: "Jos käytät selaimesi omaa puheentunnistusta, puheesi käsittelee selaimesi valmistaja, esimerkiksi Google tai Apple, omien ehtojensa mukaan.",
        en: "If you use your browser's own speech recognition, your speech is processed by the maker of your browser, for example Google or Apple, under their own terms.",
      },
      {
        fi: "Osa näistä palveluista voi käsitellä tietoja Euroopan talousalueen ulkopuolella, erityisesti Yhdysvalloissa. Silloin siirto perustuu tietosuoja-asetuksen sallimiin suojatoimiin, kuten Euroopan komission vakiosopimuslausekkeisiin tai komission päätökseen riittävästä tietosuojan tasosta.",
        en: "Some of these services may process data outside the European Economic Area, in particular in the United States. In that case the transfer relies on safeguards permitted by the GDPR, such as the European Commission's standard contractual clauses or a Commission adequacy decision.",
      },
    ],
  },
  {
    title: { fi: "Evästeet", en: "Cookies" },
    body: [
      {
        fi: "Usva käyttää yhtä välttämätöntä evästettä, joka pitää sinut kirjautuneena enintään 180 päivää. Lisäksi sovellus tallentaa sisältösi selaimen paikalliseen muistiin, jotta se pysyy laitteellasi.",
        en: "Usva uses one essential cookie that keeps you signed in for at most 180 days. The app also saves your content in the browser's local storage so that it stays on your device.",
      },
    ],
  },
  {
    title: { fi: "Säilytysajat", en: "How long data is kept" },
    body: [
      {
        fi: "Laitteellasi olevat tiedot säilyvät, kunnes poistat ne asetuksista tai tyhjennät selaimen tiedot. Tilin tiedot säilyvät, kunnes poistat tilisi. Kirjautumiskoodin tiiviste poistuu, kun koodi on käytetty tai vanhentunut. Maksutapahtumien tiedot säilyvät maksupalvelussa kirjanpitolain edellyttämän ajan.",
        en: "Data on your device stays until you delete it in settings or clear the browser's data. Account data stays until you delete your account. The hash of a sign-in code is removed when the code has been used or has expired. Payment records stay with the payment provider for as long as accounting law requires.",
      },
    ],
  },
  {
    title: { fi: "Sinun oikeutesi", en: "Your rights" },
    body: [
      {
        fi: "Sinulla on oikeus saada tietää, mitä tietoja sinusta käsitellään, saada ne itsellesi, oikaista ne, poistaa ne, rajoittaa niiden käsittelyä ja perua antamasi suostumus.",
        en: "You have the right to know what data about you is processed, to receive it, to have it corrected, to have it erased, to restrict its processing and to withdraw the consent you have given.",
      },
      {
        fi: "Suurimman osan voit tehdä itse asetuksista: ladata laitteellasi olevat tiedot, poistaa ne, muuttaa nimeäsi, perua suostumuksen ja poistaa tilisi. Tilin poistaminen poistaa tilin tiedot palvelimelta ja päättää mahdollisen tilauksen.",
        en: "Most of this you can do yourself in settings: download the data on your device, delete it, change your name, withdraw consent and delete your account. Deleting the account removes the account data from the server and ends any subscription.",
      },
      {
        fi: "Jos koet, että tietojasi käsitellään lain vastaisesti, voit tehdä valituksen tietosuojavaltuutetun toimistoon (tietosuoja.fi).",
        en: "If you feel your data is processed unlawfully, you can lodge a complaint with the Office of the Data Protection Ombudsman in Finland (tietosuoja.fi).",
      },
    ],
  },
  {
    title: { fi: "Ikäraja", en: "Age limit" },
    body: [
      {
        fi: "Usva on tarkoitettu 18 vuotta täyttäneille.",
        en: "Usva is intended for people aged 18 or over.",
      },
    ],
  },
  {
    title: { fi: "Muutokset", en: "Changes" },
    body: [
      {
        fi: "Jos tietojen käsittely muuttuu olennaisesti, päivitämme tämän selosteen ja kerromme muutoksesta sovelluksessa ennen kuin se tulee voimaan.",
        en: "If the processing of data changes materially, we will update this notice and tell you about the change in the app before it takes effect.",
      },
    ],
  },
];

export const TERMS: Section[] = [
  {
    title: { fi: "Mikä Usva on", en: "What Usva is" },
    body: [
      {
        fi: "Usva on itsenäiseen käyttöön tarkoitettu sovellus, joka ohjaa toipumisen ja läsnäolon harjoittamisessa: päivittäiset hetket, kaksitoista vaihetta ja tekoälyopas, jonka kanssa voi kirjoittaa tai puhua.",
        en: "Usva is an app for independent use that guides the practice of recovery and presence: daily moments, twelve steps and an AI guide you can write or speak with.",
      },
      {
        fi: "Usva ei ole terveydenhuollon palvelu, hoitoa tai terapiaa, eikä opas ole terapeutti tai lääkäri. Usva ei tee diagnooseja eikä anna lääketieteellisiä neuvoja, eikä se korvaa ammattiapua tai vertaistukea. Matka ei lupaa tiettyä lopputulosta.",
        en: "Usva is not a healthcare service, treatment or therapy, and the guide is not a therapist or a doctor. Usva does not diagnose or give medical advice, and it does not replace professional help or peer support. The journey does not promise a particular outcome.",
      },
      {
        fi: "Jos olet välittömässä vaarassa tai ajattelet vahingoittaa itseäsi, soita hätänumeroon 112. Usva ei ole hätäpalvelu.",
        en: "If you are in immediate danger or are thinking of harming yourself, call the emergency number (112 in Finland). Usva is not an emergency service.",
      },
    ],
  },
  {
    title: { fi: "Kuka voi käyttää", en: "Who may use it" },
    body: [
      {
        fi: "Usva on tarkoitettu 18 vuotta täyttäneille. Tili on henkilökohtainen. Kirjaudut sähköpostiisi lähetettävällä koodilla, joten pidä sähköpostisi omassa hallinnassasi.",
        en: "Usva is intended for people aged 18 or over. The account is personal. You sign in with a code sent to your email, so keep your email under your own control.",
      },
    ],
  },
  {
    title: { fi: "Tekoälyopas", en: "The AI guide" },
    body: [
      {
        fi: "Oppaan vastaukset tuottaa tekoäly. Se voi erehtyä tai ymmärtää väärin. Vastaukset eivät ole ammattilaisen neuvoja, ja päätökset omasta elämästäsi teet sinä. Lääkitystä, vieroitusta ja terveyttä koskevat asiat kuuluvat aina terveydenhuollon ammattilaiselle.",
        en: "The guide's replies are produced by an AI. It can make mistakes or misunderstand. The replies are not professional advice, and the decisions about your life are yours. Matters of medication, withdrawal and health always belong with a healthcare professional.",
      },
    ],
  },
  {
    title: { fi: "Kokeilu, tilaus ja hinta", en: "Trial, subscription and price" },
    body: [
      {
        fi: "Uusi tili saa seitsemän päivän maksuttoman kokeilun, johon ei tarvita maksutietoja. Kokeilu ei muutu itsestään maksulliseksi.",
        en: "A new account gets a seven-day free trial that requires no payment details. The trial does not turn into a paid subscription by itself.",
      },
      {
        fi: "Kokeilun jälkeen päivän hetket, opas ja polku ovat käytössä tilauksella. Hinta ja laskutusjakso näytetään tilaussivulla ennen maksua, ja hinta sisältää arvonlisäveron. Tilaus uusiutuu jakson lopussa samalla jaksolla, kunnes perut sen.",
        en: "After the trial the daily moments, the guide and the path are available with a subscription. The price and billing period are shown on the subscription page before payment, and the price includes value added tax. The subscription renews at the end of each period for the same period until you cancel it.",
      },
      {
        fi: "Voit perua tilauksen milloin tahansa tilaussivulta. Peruttu tilaus on voimassa maksetun jakson loppuun. Hengitysharjoitus ja Tuki ovat aina käytössäsi myös ilman tilausta.",
        en: "You can cancel the subscription at any time on the subscription page. A cancelled subscription remains valid to the end of the paid period. The breathing exercise and Support are always available to you, also without a subscription.",
      },
      {
        fi: "Jos hinta muuttuu, kerromme siitä vähintään 30 päivää ennen seuraavaa uusiutumista, ja voit perua tilauksen ennen kuin uusi hinta tulee voimaan.",
        en: "If the price changes, we will tell you at least 30 days before the next renewal, and you can cancel before the new price takes effect.",
      },
    ],
  },
  {
    title: { fi: "Peruutusoikeus", en: "Right of withdrawal" },
    body: [
      {
        fi: "Kuluttajana sinulla on oikeus peruuttaa tilaus 14 päivän kuluessa sen tekemisestä syytä ilmoittamatta. Ilmoita peruutuksesta alla olevaan osoitteeseen tai peru tilaus tilaussivulta ja pyydä palautusta. Palautamme maksusi samalla maksutavalla viimeistään 14 päivän kuluessa ilmoituksestasi.",
        en: "As a consumer you have the right to withdraw from the subscription within 14 days of making it without giving a reason. Notify us at the address below, or cancel on the subscription page and ask for a refund. We will refund your payment by the same payment method no later than 14 days from your notice.",
      },
    ],
  },
  {
    title: { fi: "Sinun sisältösi ja Usvan sisältö", en: "Your content and Usva's content" },
    body: [
      {
        fi: "Kaikki, mitä kirjoitat tai puhut, on sinun. Se säilyy laitteellasi, ja voit ladata tai poistaa sen asetuksista. Koska sisältö on vain laitteellasi, se katoaa, jos tyhjennät selaimen tiedot tai vaihdat laitetta; huolehdi tarvittaessa omasta varmuuskopiostasi lataamalla tietosi.",
        en: "Everything you write or say is yours. It is kept on your device, and you can download or delete it in settings. Because the content is only on your device, it is lost if you clear the browser's data or change devices; if needed, keep your own backup by downloading your data.",
      },
      {
        fi: "Usvan tekstit, tehtävät, ulkoasu ja ohjelmisto kuuluvat palveluntarjoajalle. Saat käyttää niitä omaan henkilökohtaiseen käyttöösi.",
        en: "Usva's texts, tasks, appearance and software belong to the service provider. You may use them for your own personal use.",
      },
    ],
  },
  {
    title: { fi: "Hyvä käyttö", en: "Fair use" },
    body: [
      {
        fi: "Käytä Usvaa omaan toipumiseesi ja hyvinvointiisi. Palvelua ei saa käyttää lain vastaisesti, toisten vahingoittamiseen, palvelun häiritsemiseen tai tekoälyoppaan käyttämiseen muuhun kuin sen tarkoitukseen. Vakavassa väärinkäytössä voimme sulkea tilin.",
        en: "Use Usva for your own recovery and wellbeing. The service must not be used unlawfully, to harm others, to disrupt the service or to use the AI guide for other than its purpose. In case of serious misuse we may close the account.",
      },
    ],
  },
  {
    title: { fi: "Saatavuus ja vastuu", en: "Availability and liability" },
    body: [
      {
        fi: "Pyrimme pitämään Usvan käytettävissä, mutta emme voi luvata, että se toimii keskeytyksettä. Opas ja ääni riippuvat ulkopuolisista palveluista, joissa voi olla häiriöitä. Jos palvelu on tilauksesi aikana pitkään poissa käytöstä, sinulla on oikeus hinnanalennukseen tai tilauksen purkuun kuluttajansuojalain mukaisesti.",
        en: "We aim to keep Usva available, but we cannot promise that it works without interruption. The guide and the voice depend on outside services that may have disruptions. If the service is unavailable for a long time during your subscription, you are entitled to a price reduction or to end the subscription under consumer protection law.",
      },
      {
        fi: "Usva on tukiväline, ja vastuu omista valinnoista ja terveydestä on käyttäjällä. Emme vastaa välillisistä vahingoista siltä osin kuin laki sallii vastuun rajoittamisen. Mikään näissä ehdoissa ei rajoita oikeuksia, jotka sinulla on kuluttajana pakottavan lain nojalla.",
        en: "Usva is a support tool, and responsibility for one's own choices and health lies with the user. We are not liable for indirect damage to the extent the law permits limiting liability. Nothing in these terms limits the rights you have as a consumer under mandatory law.",
      },
    ],
  },
  {
    title: { fi: "Tilin päättäminen", en: "Ending the account" },
    body: [
      {
        fi: "Voit poistaa tilisi milloin tahansa asetuksista. Tilin poistaminen päättää tilauksen ja poistaa tilin tiedot palvelimelta. Laitteellasi olevat kirjoitukset poistat erikseen kohdasta Poista kaikki tietoni.",
        en: "You can delete your account at any time in settings. Deleting the account ends the subscription and removes the account data from the server. The writing on your device you delete separately under Delete all my data.",
      },
    ],
  },
  {
    title: { fi: "Ehtojen muutokset, sovellettava laki ja erimielisyydet", en: "Changes, governing law and disputes" },
    body: [
      {
        fi: "Voimme päivittää ehtoja palvelun kehittyessä. Olennaisista muutoksista kerromme sovelluksessa etukäteen, ja voit perua tilauksen, jos et hyväksy niitä.",
        en: "We may update the terms as the service develops. We will tell you in the app in advance about material changes, and you can cancel your subscription if you do not accept them.",
      },
      {
        fi: "Näihin ehtoihin sovelletaan Suomen lakia. Jos erimielisyyttä ei saada ratkaistua keskustelemalla, voit kuluttajana olla yhteydessä kuluttajaneuvontaan (kuluttajaneuvonta.fi) ja viedä asian kuluttajariitalautakuntaan (kuluttajariita.fi).",
        en: "These terms are governed by Finnish law. If a disagreement cannot be settled by talking, as a consumer you can contact the Finnish consumer advisory service (kuluttajaneuvonta.fi) and take the matter to the Consumer Disputes Board (kuluttajariita.fi).",
      },
    ],
  },
];
