import type { Lang } from "./progress";

const D = {
  appTagline: { fi: "vuosi tähän hetkeen", en: "a year into the present" },
  navHome: { fi: "Koti", en: "Home" },
  navPath: { fi: "Polku", en: "Path" },
  navGuide: { fi: "Opas", en: "Guide" },
  navHelp: { fi: "Tuki", en: "Support" },
  settings: { fi: "Asetukset", en: "Settings" },
  back: { fi: "Takaisin", en: "Back" },
  continue: { fi: "Jatka", en: "Continue" },
  save: { fi: "Tallenna", en: "Save" },
  skip: { fi: "Ohitan tämän tänään", en: "I'll skip this today" },
  orWrite: { fi: "Tai kerro omin sanoin", en: "Or say it in your own words" },
  thanks: { fi: "Kiitos, että kerroit tämän.", en: "Thank you for telling me this." },

  // Alku
  obHello: {
    fi: "Hei. Olen tässä, eikä minulla ole kiire mihinkään. Mikä toi sinut tänne tänään?",
    en: "Hello. I am here, and I am in no hurry. What brought you here today?",
  },
  obR1: { fi: "Mieli on levoton", en: "My mind is restless" },
  obR2: { fi: "Menneisyys painaa", en: "The past weighs on me" },
  obR3: { fi: "Jokin riippuvuus tai tapa", en: "An addiction or a habit" },
  obR5: { fi: "Läheiseni tilanne kuormittaa", en: "A loved one's situation weighs on me" },
  obR4: { fi: "Haluan vain katsella", en: "I just want to look around" },
  obDone: {
    fi: "Kiitos, että kerroit. Mitä olet ajatellut tehdä asialle?",
    en: "Thank you for telling me. What have you thought of doing about it?",
  },
  obD1: { fi: "En vielä tiedä", en: "I don't know yet" },
  obD2: { fi: "Olen yrittänyt yksin", en: "I have tried on my own" },
  obD3: { fi: "Olen hakenut apua", en: "I have sought help" },
  obYear: {
    fi: "Ymmärrän. Jos mikään ei muutu, miltä tämä näyttää vuoden päästä?",
    en: "I understand. If nothing changes, what does this look like a year from now?",
  },
  obY1: { fi: "Luultavasti samalta", en: "Probably the same" },
  obY2: { fi: "Raskaammalta", en: "Heavier" },
  obY3: { fi: "En osaa sanoa", en: "I can't say" },
  obAsk: {
    fi: "Se on rehellinen vastaus. Saanko kertoa yhden mahdollisen tien?",
    en: "That is an honest answer. May I tell you about one possible way?",
  },
  obAskYes: { fi: "Kerro vain", en: "Please do" },
  obAskLater: { fi: "Hengitän ensin hetken", en: "I'd like to breathe first" },
  obOffer: {
    fi: "Tie on vuoden mittainen matka, jonka kuljemme yhdessä. Joka päivä kolme pientä hetkeä: aamu, yksi tehtävä ja ilta. Askel kerrallaan kerrot tarinasi, ja opit palaamaan tähän hetkeen.",
    en: "The way is a year-long journey we walk together. Three small moments each day: a morning, one task and an evening. Step by step you tell your story and learn to return to this moment.",
  },
  obPrice: { fi: "1 € päivässä · 365 € vuodessa", en: "€1 a day · €365 a year" },
  obTerms: {
    fi: "Ensimmäiset 7 päivää ovat maksuttomat. Tilauksella on 14 päivän peruutusoikeus. Usva on opas, ei terapeutti, eikä se korvaa hoitoa tai vertaistukea. Matka ei lupaa tiettyä lopputulosta.",
    en: "The first 7 days are free. The subscription has a 14-day right of withdrawal. Usva is a guide, not a therapist, and does not replace care or peer support. The journey does not promise a particular outcome.",
  },
  principle: {
    fi: "Usva ei ole sitoutunut mihinkään uskonnolliseen, hengelliseen, ideologiseen tai psykologiseen suuntaukseen. Se soveltaa työkaluja ja ohjausta, jotka ovat ajan saatossa osoittautuneet monille toimiviksi. Opas oppii sinusta joka päivä lisää ja sovittaa kysymyksensä siihen, mitä kerrot.",
    en: "Usva is not committed to any religious, spiritual, ideological or psychological school. It applies tools and guidance that have, over time, proved helpful to many. The guide learns more about you each day and shapes its questions around what you tell it.",
  },
  aboutTitle: { fi: "Usvasta", en: "About Usva" },
  version: { fi: "Versio", en: "Version" },
  obPayNote: {
    fi: "Maksaminen ei ole vielä käytössä tässä versiossa. Sinulta ei veloiteta mitään.",
    en: "Payment is not yet enabled in this version. You will not be charged anything.",
  },
  obInvite: {
    fi: "Voit aloittaa jo tänään, niin tämäkin päivä on osa matkaasi.",
    en: "You can begin today, so that this day too is part of your journey.",
  },
  obStart: { fi: "Aloitan tänään", en: "I'll begin today" },
  obNotNow: { fi: "Palaan myöhemmin", en: "I'll come back later" },
  obLaterMsg: {
    fi: "Se sopii hyvin. Olen täällä, kun palaat.",
    en: "That is perfectly fine. I will be here when you return.",
  },
  obHaveAccount: { fi: "Minulla on jo tili", en: "I already have an account" },
  accEmailQ: {
    fi: "Mihin sähköpostiosoitteeseen saan lähettää kirjautumiskoodin?",
    en: "Which email address may I send your sign-in code to?",
  },
  accEmailSub: {
    fi: "Salasanaa ei tarvita. Osoitetta käytetään vain kirjautumiseen ja tilauksen hoitamiseen.",
    en: "No password is needed. The address is used only for signing in and for managing your subscription.",
  },
  accEmailPh: { fi: "nimi@esimerkki.fi", en: "name@example.com" },
  accSend: { fi: "Lähetä koodi", en: "Send the code" },
  accCodeQ: {
    fi: "Lähetin kuusinumeroisen koodin sähköpostiisi. Voit kirjoittaa sen tähän.",
    en: "I sent a six-digit code to your email. You can enter it here.",
  },
  accResend: { fi: "Lähetä uusi koodi", en: "Send a new code" },
  accChange: { fi: "Vaihda osoite", en: "Change the address" },
  accBadEmail: { fi: "Osoite ei näytä vielä aivan valmiilta.", en: "The address does not look quite complete yet." },
  accWrong: { fi: "Koodi ei aivan täsmännyt. Voit kokeilla uudelleen.", en: "The code did not quite match. You can try again." },
  accExpired: {
    fi: "Koodi on ehtinyt vanhentua. Lähetän mielelläni uuden.",
    en: "The code has expired. I will gladly send a new one.",
  },
  accWait: {
    fi: "Lähetin koodin juuri äsken. Kokeillaan hetken päästä uudelleen.",
    en: "I sent a code just a moment ago. Let's try again shortly.",
  },
  accFail: {
    fi: "Yhteys ei juuri nyt onnistunut. Kokeillaan hetken päästä uudelleen.",
    en: "The connection did not work just now. Let's try again shortly.",
  },
  accReturnNote: {
    fi: "Tervetuloa takaisin. Kirjoituksesi ovat tallessa vain sillä laitteella, jolla ne kirjoitit, joten tällä laitteella jatkamme puhtaalta sivulta.",
    en: "Welcome back. Your writing is kept only on the device where you wrote it, so on this device we continue from a clean page.",
  },
  obUserName: { fi: "Millä nimellä saan kutsua sinua?", en: "What name may I call you by?" },
  obUserNameSub: { fi: "Voit jättää tämän myös tyhjäksi.", en: "You may also leave this empty." },
  accountTitle: { fi: "Tilisi", en: "Your account" },
  accTrial: { fi: "Maksuton kokeilu päättyy", en: "Your free trial ends on" },
  accActive: { fi: "Tilauksesi on voimassa", en: "Your subscription is valid until" },
  accExpiredInfo: {
    fi: "Kokeilujaksosi on päättynyt. Tilaaminen tulee pian mahdolliseksi; siihen asti Usva on käytössäsi kuten ennenkin.",
    en: "Your trial has ended. Subscribing will be possible soon; until then Usva remains available to you as before.",
  },
  logout: { fi: "Kirjaudu ulos", en: "Sign out" },
  userNameLabel: { fi: "Nimesi", en: "Your name" },
  tutLink: { fi: "Miten Usva toimii", en: "How Usva works" },
  tut1: {
    fi: "Joka päivä on kolme pientä hetkeä: aamu, päivän tehtävä ja ilta. Koti näyttää aina, mikä niistä on seuraavaksi.",
    en: "Each day has three small moments: a morning, the day's task and an evening. Home always shows which comes next.",
  },
  tut2: {
    fi: "Voit puhua minulle aina, kun et halua kirjoittaa. Jokaisen kentän vieressä on mikrofoni, ja Opas-näkymässä voimme keskustella ääneen.",
    en: "You can speak to me whenever you would rather not write. Every field has a microphone beside it, and in the Guide view we can talk aloud.",
  },
  tut3: {
    fi: "Kuljemme kaksitoista vaihetta, yksi kerrallaan. Minä kysyn, jotta tarinasi pääsee esiin, ja sinä päätät tahdin.",
    en: "We walk twelve steps, one at a time. I ask, so that your story can come out, and you set the pace.",
  },
  tut4: {
    fi: "Jokaisesta hetkestä syttyy valo. Jos jokin päivä jää väliin, mikään ei katoa. Ja jos olo käy raskaaksi, Tuki on aina alavalikossa.",
    en: "Every moment lights a light. If a day is missed, nothing is lost. And if things grow heavy, Support is always in the menu below.",
  },
  tutStart: { fi: "Aloitetaan", en: "Let's begin" },
  guideLead: { fi: "Tänään kysyisin sinulta tätä:", en: "Today I would like to ask you this:" },
  guideLeadDone: {
    fi: "Kiitos tämän päivän tehtävästä. Haluaisitko kertoa siitä vähän lisää, vai onko mielessäsi jotain muuta?",
    en: "Thank you for today's task. Would you like to tell me a little more about it, or is something else on your mind?",
  },
  obName: { fi: "Miksi haluaisit kutsua minua?", en: "What would you like to call me?" },
  obCrisis: {
    fi: "Kuulen, että sinulla on nyt todella raskasta. Tärkeintä on, ettet jää tämän kanssa yksin. Matka ehtii odottaa.",
    en: "I hear that things are very heavy for you right now. What matters most is that you are not alone with this. The journey can wait.",
  },

  // Koti
  greetMorning: { fi: "Hyvää huomenta", en: "Good morning" },
  greetDay: { fi: "Hyvää päivää", en: "Good day" },
  greetEvening: { fi: "Hyvää iltaa", en: "Good evening" },
  welcomeBack: { fi: "Ihana, että tulit takaisin.", en: "It is lovely that you came back." },
  lights: { fi: "valoa", en: "lights" },
  today: { fi: "Tänään", en: "Today" },
  nextUp: { fi: "Seuraavaksi", en: "Next" },
  momentMorning: { fi: "Aamu", en: "Morning" },
  momentTask: { fi: "Päivän tehtävä", en: "Today's task" },
  momentEvening: { fi: "Ilta", en: "Evening" },
  momentMorningSub: { fi: "Aikomus vain tälle päivälle", en: "An intention for this day only" },
  momentEveningSub: { fi: "Lempeä katsaus päivään", en: "A gentle look at the day" },
  done: { fi: "Tehty", en: "Done" },
  presentBtn: { fi: "Tämä hetki", en: "This moment" },
  presentSub: { fi: "Hengitä hetki kanssani", en: "Breathe with me for a moment" },
  enoughToday: { fi: "Tämä riittää tälle päivälle.", en: "This is enough for today." },

  // Hetki
  breatheIn: { fi: "Hengitä sisään", en: "Breathe in" },
  breatheOut: { fi: "Hengitä ulos", en: "Breathe out" },
  breatheIntro: {
    fi: "Anna hengityksen kulkea omaan tahtiinsa. Seuraa usvaa, jos se tuntuu hyvältä.",
    en: "Let the breath move at its own pace. Follow the mist if that feels good.",
  },
  breatheStart: { fi: "Aloitetaan", en: "Let's begin" },
  drumOn: { fi: "Rummun syke: päällä", en: "Drum beat: on" },
  drumOff: { fi: "Rummun syke: pois", en: "Drum beat: off" },
  eveNext: { fi: "Jatka", en: "Continue" },
  eveSkip: { fi: "Ohitan tämän kysymyksen", en: "I'll skip this question" },
  breatheEnd: { fi: "Olet tässä. Juuri nyt kaikki, mitä tarvitset, on tässä.", en: "You are here. Right now, all you need is here." },

  // Hetket
  morningQ: {
    fi: "Mikä saisi olla tämän päivän aikomuksesi? Vain tälle päivälle.",
    en: "What might your intention for today be? For this day only.",
  },
  openingTitle: { fi: "Päivänavaus", en: "Opening the day" },
  thoughtTitle: { fi: "Päivän ajatus", en: "Thought for today" },
  practiceTitle: { fi: "Hiljentyminen", en: "A quiet moment" },
  quoteTitle: { fi: "Sanottua", en: "Words from long ago" },
  sentenceTitle: { fi: "Päivän lause", en: "Sentence for today" },
  morningPh: { fi: "Tänään haluaisin…", en: "Today I would like to…" },
  taskPh: { fi: "Kirjoita vapaasti. Tämä jää vain sinun laitteellesi.", en: "Write freely. This stays on your device only." },
  taskTalk: { fi: "Haluaisin puhua tästä oppaan kanssa", en: "I'd like to talk about this with the guide" },
  eveHeavy: { fi: "Painoiko jokin tänään mieltäsi?", en: "Did something weigh on your mind today?" },
  evePart: { fi: "Oliko siinä jotain omaa osuuttasi?", en: "Was any part of it yours?" },
  eveGrateful: { fi: "Mistä olet tänään kiitollinen?", en: "What are you grateful for today?" },
  savedMorning: { fi: "Kaunis aikomus. Kanna sitä kevyesti.", en: "A beautiful intention. Carry it lightly." },
  savedTask: { fi: "Kiitos rehellisyydestäsi. Usvaasi syttyi valoa.", en: "Thank you for your honesty. New light appeared in your mist." },
  savedEvening: { fi: "Päivä on nyt katsottu. Saat levätä.", en: "The day has been seen. You may rest." },
  openTask: {
    fi: "Olet kulkenut tämän version tehtävät loppuun. Seuraavat vaiheet ovat tulossa. Sillä välin voit kirjoittaa vapaasti siitä, mikä on mielessäsi.",
    en: "You have walked through the tasks in this version. The next steps are on their way. Meanwhile, you can write freely about what is on your mind.",
  },
  stepLabel: { fi: "Vaihe", en: "Step" },

  // Opas
  guideHello: {
    fi: "Olen tässä. Voit kertoa mistä tahansa, omaan tahtiisi.",
    en: "I am here. You can tell me about anything, at your own pace.",
  },
  guidePh: { fi: "Kirjoita tähän…", en: "Write here…" },
  send: { fi: "Lähetä", en: "Send" },
  guideResting: {
    fi: "En juuri nyt saa yhteyttä. Päivän hetket ja hengitys ovat silti tässä sinua varten.",
    en: "I cannot connect right now. The day's moments and the breath are still here for you.",
  },
  guideBusy: {
    fi: "Hengitetään hetki ennen kuin jatketaan. Kokeile pian uudelleen.",
    en: "Let's breathe for a moment before we go on. Please try again shortly.",
  },
  guideLong: {
    fi: "Tämä keskustelu on kasvanut pitkäksi. Voit halutessasi aloittaa uuden, puhtaalta pöydältä.",
    en: "This conversation has grown long. If you like, you can begin a new one with a clean slate.",
  },
  guideNew: { fi: "Aloita uusi keskustelu", en: "Begin a new conversation" },
  voiceMode: { fi: "Puhu Usvan kanssa", en: "Talk with Usva" },
  voiceModeSub: {
    fi: "Puhu vapaasti, vastaan kun pidät tauon",
    en: "Speak freely, I will answer when you pause",
  },
  liveStart: { fi: "Napauta usvaa, kun haluat puhua.", en: "Tap the mist when you would like to speak." },
  liveListening: { fi: "Kuuntelen", en: "I am listening" },
  liveThinking: { fi: "Hetki…", en: "One moment…" },
  liveSpeaking: { fi: "Voit keskeyttää napauttamalla usvaa", en: "You can interrupt by tapping the mist" },
  liveEnd: { fi: "Palaa kirjoittamaan", en: "Back to writing" },
  liveMist: { fi: "Usva. Napauta puhuaksesi tai keskeyttääksesi.", en: "The mist. Tap to speak or to interrupt." },
  micStart: { fi: "Puhu", en: "Speak" },
  micStop: { fi: "Kuuntelen. Napauta, kun olet valmis.", en: "I am listening. Tap when you are done." },
  micUnsupported: {
    fi: "En pysty vielä kuuntelemaan puhetta tässä selaimessa. Voit silti kirjoittaa minulle.",
    en: "I cannot yet listen to speech in this browser. You can still write to me.",
  },
  micDenied: {
    fi: "En saa käyttää mikrofonia. Jos haluat puhua, voit sallia mikrofonin selaimen osoiterivin asetuksista.",
    en: "I am not allowed to use the microphone. If you would like to speak, you can allow it in the browser's address bar settings.",
  },
  micNoSpeech: {
    fi: "En kuullut vielä mitään. Voit kokeilla uudelleen, kun olet valmis.",
    en: "I did not hear anything yet. You can try again when you are ready.",
  },
  micFailed: {
    fi: "Kuunteleminen ei juuri nyt onnistunut. Voit kokeilla uudelleen tai kirjoittaa.",
    en: "Listening did not work just now. You can try again or write.",
  },
  noVoice: {
    fi: "Tässä laitteessa ei ole suomenkielistä puheääntä, joten en voi vielä puhua ääneen. Vastaukseni näkyy tekstinä.",
    en: "This device has no voice for this language, so I cannot speak aloud yet. My reply is shown as text.",
  },
  listen: { fi: "Kuuntele", en: "Listen" },
  stopListening: { fi: "Hiljennä", en: "Quiet" },
  guideNote: {
    fi: "Opas on tekoäly, ei terapeutti. Keskustelu tallentuu vain laitteellesi.",
    en: "The guide is an AI, not a therapist. The conversation is stored on your device only.",
  },

  // Polku
  pathTitle: { fi: "Polkusi", en: "Your path" },
  week: { fi: "Viikkosi", en: "Your week" },
  presenceDays: { fi: "läsnäolon päivää", en: "days of presence" },
  badgesTitle: { fi: "Merkit", en: "Marks" },
  noBadges: { fi: "Ensimmäinen merkkisi odottaa ensimmäistä hetkeäsi.", en: "Your first mark awaits your first moment." },
  b_firstLight: { fi: "Ensimmäinen valo", en: "First light" },
  b_week: { fi: "Seitsemän päivää", en: "Seven days" },
  b_month: { fi: "Kolmekymmentä päivää", en: "Thirty days" },
  b_return: { fi: "Paluu", en: "Return" },
  b_step1: { fi: "Rehellisyys", en: "Honesty" },
  b_step2: { fi: "Toivo", en: "Hope" },
  b_step3: { fi: "Luottamus", en: "Trust" },
  b_step4: { fi: "Rohkeus", en: "Courage" },
  stepNow: { fi: "Olet tässä", en: "You are here" },
  stepLater: { fi: "Avautuu myöhemmin", en: "Opens later" },

  // Tuki
  helpTitle: { fi: "Et ole yksin", en: "You are not alone" },
  helpIntro: {
    fi: "Jos olosi on sietämätön tai ajattelet vahingoittaa itseäsi, ota yhteyttä ihmiseen heti. Se on rohkea ja oikea teko.",
    en: "If things feel unbearable or you are thinking of harming yourself, please reach a person right away. It is a brave and right thing to do.",
  },
  helpEmergency: { fi: "Hätänumero 112", en: "Emergency number 112" },
  helpEmergencySub: { fi: "Kun henki tai terveys on välittömässä vaarassa", en: "When life or health is in immediate danger" },
  helpCrisis: { fi: "MIELI ry:n Kriisipuhelin 09 2525 0111", en: "MIELI Crisis Helpline 09 2525 0111" },
  helpCrisisSub: { fi: "Keskusteluapua kriisissä oleville, suomeksi", en: "Conversational support in a crisis, in Finnish (Finland)" },
  helpAbroad: {
    fi: "Suomen ulkopuolella: soita maasi hätänumeroon tai paikalliseen kriisipuhelimeen.",
    en: "Outside Finland: call your local emergency number or a local crisis line.",
  },
  helpPeer: {
    fi: "Vertaisryhmät, lääkäri ja terapeutti ovat tämän matkan ystäviä. Usva kulkee niiden rinnalla, ei niiden tilalla.",
    en: "Peer groups, a doctor and a therapist are friends of this journey. Usva walks beside them, not in their place.",
  },

  // Asetukset
  language: { fi: "Kieli", en: "Language" },
  mistNameLabel: { fi: "Oppaan nimi", en: "Guide's name" },
  dataTitle: { fi: "Tietosi", en: "Your data" },
  dataInfo: {
    fi: "Kirjoituksesi tallentuvat vain tälle laitteelle. Kun keskustelet oppaan kanssa, keskustelu ja viimeisimmät kirjoituksesi lähetetään tekoälylle vastausta varten, jotta opas voi tuntea sinut. Niitä ei tallenneta Usvan palvelimelle. Jos luot tilin, palvelimelle tallentuvat vain sähköpostiosoitteesi, nimesi, usvan nimi ja tilauksesi tila. Jos puhut oppaalle, puheesi muutetaan tekstiksi selaimesi omassa palvelussa tai puhepalvelussa, ja oppaan vastaus muutetaan ääneksi puhepalvelussa. Äänitystä ei tallenneta.",
    en: "Your writing is stored on this device only. When you talk with the guide, the conversation and your most recent writing are sent to the AI to produce a reply, so that the guide can know you. They are not stored on Usva's server. If you create an account, the server keeps only your email address, your name, the mist's name and your subscription status. If you speak to the guide, your speech is turned into text by your browser's own service or by a speech service, and the guide's reply is turned into sound by a speech service. The recording is not stored.",
  },
  exportData: { fi: "Lataa tietoni", en: "Download my data" },
  deleteData: { fi: "Poista kaikki tietoni", en: "Delete all my data" },
  deleteConfirm: {
    fi: "Tämä poistaa kaiken tältä laitteelta, eikä sitä voi perua. Haluatko varmasti jatkaa?",
    en: "This removes everything from this device and cannot be undone. Are you sure you want to continue?",
  },
} as const;

export type Key = keyof typeof D;

export function t(lang: Lang, key: Key): string {
  return D[key][lang];
}
