import type { Task } from "../program";

// Vaiheen 10 jatkotehtävät. Omin sanoin kirjoitettu; alkuperäisteoksia ei lainata.
export const tasks: Task[] = [
  {
    title: { fi: "Aamun katsaus", en: "A morning look" },
    prompt: {
      fi: "Mitä tämä päivä todennäköisesti tuo? Missä kohdassa tarvitset eniten rauhaa?",
      en: "What is this day likely to bring? At what point will you most need calm?",
    },
  },
  {
    title: { fi: "Kehon ilta", en: "The body's evening" },
    prompt: {
      fi: "Käy illalla keho läpi. Mihin päivä jäi: hartioihin, vatsaan, leukaan?",
      en: "In the evening, go through your body. Where did the day settle: the shoulders, the stomach, the jaw?",
    },
  },
  {
    title: { fi: "Yksi kiitos, yksi korjaus", en: "One thanks, one repair" },
    prompt: {
      fi: "Nimeä tältä päivältä yksi asia, josta kiität, ja yksi, jonka korjaat.",
      en: "Name from today one thing you give thanks for and one you will put right.",
    },
  },
  {
    title: { fi: "Pelko tänään", en: "Fear today" },
    prompt: {
      fi: "Missä kohdassa päivää pelko ohjasi sinua? Mitä olisit tehnyt ilman sitä?",
      en: "At what point today did fear steer you? What would you have done without it?",
    },
  },
  {
    title: { fi: "Rehellisyys tänään", en: "Honesty today" },
    prompt: {
      fi: "Oliko tänään hetki, jolloin et ollut aivan rehellinen? Mitä se suojasi?",
      en: "Was there a moment today when you were not quite honest? What did it protect?",
    },
  },
  {
    title: { fi: "Minä ja muut tänään", en: "Myself and others today" },
    prompt: {
      fi: "Missä ajattelit tänään vain omaa etuasi? Entä missä ajattelit toista?",
      en: "Where did you think only of your own advantage today? And where did you think of another?",
    },
  },
  {
    title: { fi: "Lykätty korjaus", en: "A repair put off" },
    prompt: {
      fi: "Onko jokin pieni asia, jonka korjaamista olet lykännyt päiviä? Mikä olisi helpoin tapa hoitaa se?",
      en: "Is there some small thing whose repair you have put off for days? What would be the easiest way to deal with it?",
    },
  },
  {
    title: { fi: "Sanat, jotka valitsin", en: "The words I chose" },
    prompt: {
      fi: "Muistele yksi tämän päivän keskustelu. Mitä sanoit hyvin, ja mitä sanoisit nyt toisin?",
      en: "Recall one conversation from today. What did you say well, and what would you now say differently?",
    },
  },
  {
    title: { fi: "Ärtymyksen alla", en: "Beneath the irritation" },
    prompt: {
      fi: "Kun ärtymys nousee, kokeile kysyä: olenko nälkäinen, väsynyt, yksinäinen vai peloissani? Mikä niistä se oli?",
      en: "When irritation rises, try asking: am I hungry, tired, lonely or afraid? Which was it?",
    },
  },
  {
    title: { fi: "Hengitys ennen vastausta", en: "A breath before answering" },
    prompt: {
      fi: "Kokeile tänään odottaa yksi hengitys ennen kuin vastaat hankalaan viestiin tai sanaan. Mitä muuttui?",
      en: "Try waiting one breath today before you answer a difficult message or remark. What changed?",
    },
  },
  {
    title: { fi: "Viikon katsaus", en: "A look at the week" },
    prompt: {
      fi: "Katso kulunutta viikkoa. Mikä toistui? Mistä olet ylpeä?",
      en: "Look at the past week. What repeated? What are you proud of?",
    },
  },
  {
    title: { fi: "Kasaantuvat pienet asiat", en: "Small things piling up" },
    prompt: {
      fi: "Mitkä pienet hoitamattomat asiat kuormittavat mieltäsi? Valitse yksi ja hoida se tänään.",
      en: "Which small unattended things burden your mind? Choose one and deal with it today.",
    },
  },
  {
    title: { fi: "Hyvä, jonka tein", en: "The good I did" },
    prompt: {
      fi: "Mitä hyvää teit tänään jollekulle? Anna sen näkyä itsellesi.",
      en: "What good did you do for someone today? Let yourself see it.",
    },
  },
  {
    title: { fi: "Kun olin läsnä", en: "When I was present" },
    prompt: {
      fi: "Missä hetkessä olit tänään kokonaan paikalla? Mikä teki sen mahdolliseksi?",
      en: "In which moment were you wholly there today? What made it possible?",
    },
  },
  {
    title: { fi: "Kun mieli karkasi", en: "When the mind slipped away" },
    prompt: {
      fi: "Missä kohdassa mielesi karkasi menneeseen tai tulevaan? Mikä sen laukaisi?",
      en: "At what point did your mind slip into the past or the future? What set it off?",
    },
  },
  {
    title: { fi: "Vanha tapa vilahti", en: "A glimpse of the old way" },
    prompt: {
      fi: "Näkyikö jokin vanhoista tavoistasi tänään? Miten kohtasit sen?",
      en: "Did one of your old ways show itself today? How did you meet it?",
    },
  },
  {
    title: { fi: "Ystävällinen lause itselle", en: "A kind sentence to myself" },
    prompt: {
      fi: "Sano itsellesi yksi ystävällinen lause tästä päivästä. Mitä sanoit?",
      en: "Say one kind sentence to yourself about this day. What did you say?",
    },
  },
  {
    title: { fi: "Uni ja lepo", en: "Sleep and rest" },
    prompt: {
      fi: "Miten nukuit ja lepäsit tällä viikolla? Mitä uni kertoo siitä, mitä kannat?",
      en: "How did you sleep and rest this week? What does your sleep tell you about what you carry?",
    },
  },
  {
    title: { fi: "Ihmissuhteeni tänään", en: "My relationships today" },
    prompt: {
      fi: "Kenen kanssa välisi ovat tänään hyvät? Onko jonkun kanssa jotain ilmassa?",
      en: "With whom are things good today? Is something in the air with someone?",
    },
  },
  {
    title: { fi: "Raskaan päivän katsaus", en: "A review for a heavy day" },
    prompt: {
      fi: "Kun päivä on ollut raskas, mikä on lyhin mahdollinen katsaus, jonka jaksat tehdä?",
      en: "When the day has been heavy, what is the shortest possible review you can manage?",
    },
  },
  {
    title: { fi: "Hyvän päivän katsaus", en: "A review for a good day" },
    prompt: {
      fi: "Kun päivä on ollut hyvä, mitä siitä kannattaa panna merkille huomista varten?",
      en: "When the day has been good, what is worth noting for tomorrow?",
    },
  },
  {
    title: { fi: "Katsaus toisen kanssa", en: "A review with someone" },
    prompt: {
      fi: "Voisitko joskus käydä päivän läpi jonkun läheisen tai vertaisen kanssa? Kenen?",
      en: "Could you sometimes go through the day with someone close or a peer? With whom?",
    },
  },
  {
    title: { fi: "Tapa, joka pysyy", en: "A habit that stays" },
    prompt: {
      fi: "Mikä tekee päivittäisestä katsauksesta sinulle sellaisen, että haluat jatkaa sitä?",
      en: "What makes the daily review something you want to continue?",
    },
  },
];
