import type { Task } from "../program";

// Vaiheen 3 jatkotehtävät. Omin sanoin kirjoitettu; alkuperäisteoksia ei lainata.
export const tasks: Task[] = [
  {
    title: { fi: "Aamun lause", en: "A sentence for the morning" },
    prompt: {
      fi: "Kokeile tänä aamuna sanoa itsellesi: tänään en kanna kaikkea yksin. Miltä se tuntui päivän mittaan?",
      en: "Try saying to yourself this morning: today I do not carry everything alone. How did it feel through the day?",
    },
  },
  {
    title: { fi: "Hallinnan lista", en: "A list of control" },
    prompt: {
      fi: "Kirjoita asiat, joita yrität hallita. Mitkä niistä eivät oikeasti ole sinun käsissäsi?",
      en: "Write down the things you try to control. Which of them are not really in your hands?",
    },
  },
  {
    title: { fi: "Toisten valinnat", en: "Other people's choices" },
    prompt: {
      fi: "Kenen valintoja yrität ohjata? Mitä tapahtuisi, jos antaisit hänen päättää itse?",
      en: "Whose choices do you try to steer? What would happen if you let them decide for themselves?",
    },
  },
  {
    title: { fi: "Lopputulos saa olla auki", en: "The outcome may stay open" },
    prompt: {
      fi: "Valitse yksi asia, jossa teet oman osasi ja jätät lopputuloksen auki. Mikä se voisi olla tänään?",
      en: "Choose one thing in which you do your part and leave the outcome open. What could it be today?",
    },
  },
  {
    title: { fi: "Kädet auki", en: "Open hands" },
    prompt: {
      fi: "Purista kädet nyrkkiin, pidä hetki ja avaa ne hitaasti. Mistä asiasta voisit hellittää otteen samalla tavalla?",
      en: "Clench your hands into fists, hold a moment and open them slowly. What could you loosen your grip on in the same way?",
    },
  },
  {
    title: { fi: "Huoli huomisesta", en: "Worry about tomorrow" },
    prompt: {
      fi: "Mikä huominen asia vie tämän päivän voimia? Mitä sille voi tehdä tänään, ja mikä jää huomiselle?",
      en: "What matter of tomorrow is taking today's strength? What can be done about it today, and what is left for tomorrow?",
    },
  },
  {
    title: { fi: "Kysyn hiljaa", en: "I ask quietly" },
    prompt: {
      fi: "Ennen yhtä päätöstä tänään pysähdy ja kysy hiljaa: mikä olisi tässä hyvä seuraava askel? Mitä nousi?",
      en: "Before one decision today, pause and ask quietly: what would be a good next step here? What arose?",
    },
  },
  {
    title: { fi: "Luottamuksen kokeilu", en: "An experiment in trust" },
    prompt: {
      fi: "Tee tänään yksi pieni asia luottaen, varmistelematta. Miten kävi?",
      en: "Do one small thing today trusting, without double-checking. How did it go?",
    },
  },
  {
    title: { fi: "En tiedä vielä", en: "I do not know yet" },
    prompt: {
      fi: "Missä asiassa voisit sanoa: en tiedä vielä, ja se saa olla niin?",
      en: "In what matter could you say: I do not know yet, and that is all right?",
    },
  },
  {
    title: { fi: "Kun olin varma", en: "When I was sure" },
    prompt: {
      fi: "Milloin oma tahtosi on vienyt sinut harhaan, vaikka olit varma asiastasi?",
      en: "When has your own will led you astray although you were sure of yourself?",
    },
  },
  {
    title: { fi: "Hiljaisempi ääni", en: "A quieter voice" },
    prompt: {
      fi: "Milloin olet seurannut jotain hiljaisempaa ääntä sisälläsi, ja se osoittautui oikeaksi?",
      en: "When have you followed some quieter voice inside you, and it proved right?",
    },
  },
  {
    title: { fi: "Kiire ja luottamus", en: "Hurry and trust" },
    prompt: {
      fi: "Kiire on usein epäluottamusta. Missä kohdassa päivää voisit hidastaa luottaen, että ehdit?",
      en: "Hurry is often distrust. At what point in the day could you slow down, trusting that there is time?",
    },
  },
  {
    title: { fi: "Vastaanottaminen", en: "Receiving" },
    prompt: {
      fi: "Onko sinun helpompi antaa kuin ottaa vastaan? Mitä voisit tänään ottaa vastaan kiittäen?",
      en: "Is it easier for you to give than to receive? What could you receive today with thanks?",
    },
  },
  {
    title: { fi: "Kun ei mene niin kuin halusin", en: "When it does not go my way" },
    prompt: {
      fi: "Kun jokin ei mene niin kuin halusit, mitä teet ensimmäiseksi? Mitä muuta voisit tehdä?",
      en: "When something does not go as you wanted, what do you do first? What else could you do?",
    },
  },
  {
    title: { fi: "Juuri nyt turvassa", en: "Safe right now" },
    prompt: {
      fi: "Katso ympärillesi. Onko juuri tässä hetkessä jokin hätänä? Mitä tapahtuu, kun huomaat, ettei ole?",
      en: "Look around you. Is anything actually wrong in this very moment? What happens when you notice that nothing is?",
    },
  },
  {
    title: { fi: "Sitoumukseni tänään", en: "My commitment today" },
    prompt: {
      fi: "Mihin yhteen pieneen asiaan sitoudut tänään oman toipumisesi hyväksi?",
      en: "What one small thing do you commit to today for the sake of your own recovery?",
    },
  },
  {
    title: { fi: "Miten teen päätökseni", en: "How I make my decisions" },
    prompt: {
      fi: "Miten olet tähän asti tehnyt isot päätöksesi: yksin, kiireessä, pelosta? Miten haluaisit tehdä ne?",
      en: "How have you made your big decisions until now: alone, in haste, out of fear? How would you like to make them?",
    },
  },
  {
    title: { fi: "Kysyn toisen näkemystä", en: "I ask for another view" },
    prompt: {
      fi: "Keneltä voisit kysyä näkemystä yhteen mieltäsi painavaan asiaan?",
      en: "Whom could you ask for a view on one matter weighing on you?",
    },
  },
  {
    title: { fi: "Luovuttaminen ja irti päästäminen", en: "Giving up and letting go" },
    prompt: {
      fi: "Mikä ero on luovuttamisella ja irti päästämisellä sinun elämässäsi? Anna yksi esimerkki.",
      en: "What is the difference between giving up and letting go in your life? Give one example.",
    },
  },
  {
    title: { fi: "Päivä kolmessa osassa", en: "The day in three parts" },
    prompt: {
      fi: "Jaa tämä päivä kolmeen osaan ja elä niistä vain meneillään olevaa. Miten se muutti päivää?",
      en: "Divide this day into three parts and live only the one in progress. How did that change the day?",
    },
  },
  {
    title: { fi: "Kun alan taas puristaa", en: "When I begin to grip again" },
    prompt: {
      fi: "Huomaa hetki, jolloin alat taas puristaa. Mistä tunnistat sen? Mikä auttaa hellittämään?",
      en: "Notice the moment you begin to grip again. How do you recognise it? What helps you ease off?",
    },
  },
  {
    title: { fi: "Luottamuksen lause", en: "A sentence of trust" },
    prompt: {
      fi: "Kirjoita yksi lause, jonka voit sanoa itsellesi silloin, kun tarvitset luottamusta.",
      en: "Write one sentence you can say to yourself when you need trust.",
    },
  },
  {
    title: { fi: "Valmis katsomaan", en: "Ready to look" },
    prompt: {
      fi: "Seuraavaksi alat kertoa tarinaasi. Mitä tarvitset, jotta se tuntuu turvalliselta?",
      en: "Next you begin to tell your story. What do you need for that to feel safe?",
    },
  },
];
