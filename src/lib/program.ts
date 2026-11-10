// Matkan sisältö. Kaikki teksti on kirjoitettu omin sanoin kahdentoista askeleen
// perinteen, läsnäolon opetusten ja joogaperinteen periaatteiden pohjalta.
// Alkuperäisteoksia ei lainata.

export type L = { fi: string; en: string };
export type Task = { title: L; prompt: L };
export type Step = { n: number; title: L; theme: L; intro: L; tasks: Task[] };

export const TASKS_PER_STEP = 7;

export const STEP_TITLES: L[] = [
  { fi: "Rehellisyys", en: "Honesty" },
  { fi: "Toivo", en: "Hope" },
  { fi: "Luottamus", en: "Trust" },
  { fi: "Elämäntarina", en: "Life story" },
  { fi: "Ääneen kertominen", en: "Saying it aloud" },
  { fi: "Toistuvat mallit", en: "Recurring patterns" },
  { fi: "Nöyryys", en: "Humility" },
  { fi: "Ihmiset matkan varrella", en: "People along the way" },
  { fi: "Hyvittäminen", en: "Making amends" },
  { fi: "Päivittäinen katsaus", en: "Daily review" },
  { fi: "Hiljentyminen", en: "Stillness" },
  { fi: "Eteenpäin antaminen", en: "Passing it on" },
];

export const STEPS: Step[] = [
  {
    n: 1,
    title: STEP_TITLES[0],
    theme: { fi: "Mikä elämässäni ei juuri nyt toimi?", en: "What in my life is not working right now?" },
    intro: {
      fi: "Kaikki alkaa siitä, että saat katsoa tilannettasi sellaisena kuin se on. Mitään ei tarvitse korjata vielä. Riittää, että näet.",
      en: "Everything begins with being allowed to see your situation as it is. Nothing needs fixing yet. Seeing is enough.",
    },
    tasks: [
      {
        title: { fi: "Missä olen nyt", en: "Where I am now" },
        prompt: {
          fi: "Jos haluat, kuvaile muutamalla lauseella, miltä elämäsi tuntuu juuri tänään. Ei eilen, ei huomenna.",
          en: "If you like, describe in a few sentences how your life feels today. Not yesterday, not tomorrow.",
        },
      },
      {
        title: { fi: "Mikä vie voimani", en: "What takes my strength" },
        prompt: {
          fi: "Onko jokin asia, tapa tai ajatus, joka vie sinulta enemmän kuin antaa? Voit nimetä sen lempeästi.",
          en: "Is there a thing, habit or thought that takes more from you than it gives? You may name it gently.",
        },
      },
      {
        title: { fi: "Mitä olen yrittänyt", en: "What I have tried" },
        prompt: {
          fi: "Millä tavoin olet yrittänyt hallita tätä asiaa omin voimin? Mikä on auttanut hetken, mikä ei ollenkaan?",
          en: "In what ways have you tried to manage this on your own? What helped for a while, what not at all?",
        },
      },
      {
        title: { fi: "Mitä se on maksanut", en: "What it has cost" },
        prompt: {
          fi: "Mitä tämä on vienyt sinulta: aikaa, ihmissuhteita, rauhaa, terveyttä? Kirjoita vain se, mikä tuntuu todelta.",
          en: "What has this taken from you: time, relationships, peace, health? Write only what feels true.",
        },
      },
      {
        title: { fi: "Menneen ja tulevan paino", en: "The weight of past and future" },
        prompt: {
          fi: "Huomaa tänään yksi hetki, jolloin mielesi on menneessä tai tulevassa. Mihin se karkasi, ja miltä se tuntui kehossa?",
          en: "Notice one moment today when your mind is in the past or the future. Where did it go, and how did it feel in your body?",
        },
      },
      {
        title: { fi: "Mihin en voi vaikuttaa", en: "What I cannot change" },
        prompt: {
          fi: "Mitkä asiat tilanteessasi eivät ole sinun käsissäsi? Entä yksi asia, joka on?",
          en: "Which things in your situation are not in your hands? And one thing that is?",
        },
      },
      {
        title: { fi: "Myönnän itselleni", en: "I admit to myself" },
        prompt: {
          fi: "Jos saisit sanoa yhden rehellisen lauseen itsellesi ilman häpeää, mikä se olisi?",
          en: "If you could say one honest sentence to yourself without shame, what would it be?",
        },
      },
    ],
  },
  {
    n: 2,
    title: STEP_TITLES[1],
    theme: { fi: "Voisiko jokin minua suurempi kantaa?", en: "Could something greater than me carry this?" },
    intro: {
      fi: "Sinun ei tarvitse uskoa mihinkään tiettyyn. Riittää pieni avoimuus sille, ettet ole yksin ja että muutos on mahdollinen.",
      en: "You do not need to believe in anything in particular. A small openness is enough: that you are not alone, and that change is possible.",
    },
    tasks: [
      {
        title: { fi: "Hetki, jolloin oli hyvä", en: "A moment that was good" },
        prompt: {
          fi: "Muistatko hetken, jolloin kaikki oli hetken hyvin, ilman syytä? Missä olit, ja mitä siinä oli?",
          en: "Do you remember a moment when everything was simply all right, for no reason? Where were you, and what was there?",
        },
      },
      {
        title: { fi: "Mikä on minua suurempaa", en: "What is greater than me" },
        prompt: {
          fi: "Mikä sinulle on itseäsi suurempaa: luonto, hiljaisuus, toiset ihmiset, elämä itse? Valitse se, mikä tuntuu omalta.",
          en: "What is greater than you, for you: nature, silence, other people, life itself? Choose what feels like yours.",
        },
      },
      {
        title: { fi: "Kuka on kulkenut tämän", en: "Who has walked this" },
        prompt: {
          fi: "Tunnetko tai tiedätkö jonkun, joka on päässyt samankaltaisen yli? Mitä hänen tarinansa kertoo sinulle?",
          en: "Do you know, or know of, someone who came through something similar? What does their story tell you?",
        },
      },
      {
        title: { fi: "Hengitys kantaa", en: "The breath carries" },
        prompt: {
          fi: "Hengitä viisi kertaa rauhassa ja huomaa: keho hengittää, vaikka et tee mitään. Miltä tuntuu, kun jokin kantaa sinua?",
          en: "Breathe calmly five times and notice: the body breathes without your doing anything. How does it feel to be carried?",
        },
      },
      {
        title: { fi: "Vanha uskomus", en: "An old belief" },
        prompt: {
          fi: "Onko sinulla ajatus itsestäsi, jonka olet uskonut pitkään, mutta joka ei ehkä olekaan totta?",
          en: "Is there a thought about yourself that you have long believed, but that may not be true after all?",
        },
      },
      {
        title: { fi: "Pieni merkki", en: "A small sign" },
        prompt: {
          fi: "Huomaa tänään yksi pieni asia, joka meni hyvin ilman, että ponnistelit. Mikä se oli?",
          en: "Notice one small thing today that went well without effort from you. What was it?",
        },
      },
      {
        title: { fi: "Mitä toivon", en: "What I hope for" },
        prompt: {
          fi: "Jos toivo saisi puhua, mitä se sanoisi sinulle tänään?",
          en: "If hope could speak, what would it say to you today?",
        },
      },
    ],
  },
  {
    n: 3,
    title: STEP_TITLES[2],
    theme: { fi: "Mistä saisin päästää irti?", en: "What might I let go of?" },
    intro: {
      fi: "Irti päästäminen ei ole luovuttamista. Se on sitä, että lakkaat kantamasta yksin sitä, mikä ei ole yksin kannettavissa.",
      en: "Letting go is not giving up. It is no longer carrying alone what was never meant to be carried alone.",
    },
    tasks: [
      {
        title: { fi: "Mitä puristan", en: "What I am gripping" },
        prompt: {
          fi: "Mitä asiaa yrität juuri nyt hallita kaikin voimin? Miltä puristaminen tuntuu kehossasi?",
          en: "What are you trying to control with all your strength right now? How does the gripping feel in your body?",
        },
      },
      {
        title: { fi: "Vain tämä päivä", en: "Only this day" },
        prompt: {
          fi: "Mitä jos sinun ei tarvitsisi ratkaista koko elämää, vain tämä päivä? Mikä tänään riittäisi?",
          en: "What if you did not have to solve your whole life, only this day? What would be enough today?",
        },
      },
      {
        title: { fi: "Kyky vastata", en: "The ability to respond" },
        prompt: {
          fi: "Vastuu on kykyä vastata siihen, mikä on. Mihin yhteen asiaan voisit tänään vastata tietoisesti reagoimisen sijaan?",
          en: "Responsibility is the ability to respond to what is. What one thing could you respond to consciously today, instead of reacting?",
        },
      },
      {
        title: { fi: "Annan olla", en: "I let it be" },
        prompt: {
          fi: "Valitse yksi pieni asia, jonka annat tänään olla juuri sellaisena kuin se on. Mikä se on?",
          en: "Choose one small thing that you let be exactly as it is today. What is it?",
        },
      },
      {
        title: { fi: "Ajatus ei ole minä", en: "A thought is not me" },
        prompt: {
          fi: "Katso yhtä ajatusta kuin pilveä taivaalla. Kuka on se, joka katsoo? Kirjoita, mitä huomasit.",
          en: "Watch one thought as you would a cloud in the sky. Who is the one watching? Write what you noticed.",
        },
      },
      {
        title: { fi: "Kenelle voisin kertoa", en: "Whom I could tell" },
        prompt: {
          fi: "Onko elämässäsi ihminen tai ryhmä, jolle voisit kertoa, missä olet menossa? Mikä tekisi siitä helpompaa?",
          en: "Is there a person or a group in your life you could tell where you are? What would make it easier?",
        },
      },
      {
        title: { fi: "Päätökseni", en: "My decision" },
        prompt: {
          fi: "Jos haluat, kirjoita omin sanoin, mihin haluat luottaa tästä eteenpäin.",
          en: "If you like, write in your own words what you want to trust from here on.",
        },
      },
    ],
  },
  {
    n: 4,
    title: STEP_TITLES[3],
    theme: { fi: "Mitä minulle on tapahtunut, ja mikä oli oma osuuteni?", en: "What happened to me, and what was my part?" },
    intro: {
      fi: "Nyt alat kertoa tarinaasi, yksi pala kerrallaan. Ei tuomittavaksi, vaan nähtäväksi. Voit pysähtyä milloin tahansa.",
      en: "Now you begin to tell your story, one piece at a time. Not to be judged, but to be seen. You can pause at any time.",
    },
    tasks: [
      {
        title: { fi: "Lapsuuden maisema", en: "The landscape of childhood" },
        prompt: {
          fi: "Millainen oli se koti ja ne ihmiset, joiden keskellä kasvoit? Kerro sen verran kuin tänään tuntuu hyvältä.",
          en: "What were the home and the people you grew up among like? Tell as much as feels right today.",
        },
      },
      {
        title: { fi: "Yksi kauna", en: "One resentment" },
        prompt: {
          fi: "Ketä tai mitä kohtaan kannat vielä kaunaa? Mitä tapahtui, ja mihin se sinussa osui: turvaan, arvoon, rakkauteen?",
          en: "Whom or what do you still resent? What happened, and what did it touch in you: safety, worth, love?",
        },
      },
      {
        title: { fi: "Oma osuuteni", en: "My part" },
        prompt: {
          fi: "Palaa eiliseen kaunaan. Oliko siinä jotain, mitä itse teit, jätit tekemättä tai odotit? Katso sitä ystävällisesti.",
          en: "Return to yesterday's resentment. Was there something you did, left undone, or expected? Look at it kindly.",
        },
      },
      {
        title: { fi: "Yksi pelko", en: "One fear" },
        prompt: {
          fi: "Mitä pelkäät eniten? Mistä luulet pelon saaneen alkunsa, ja miten se ohjaa valintojasi?",
          en: "What do you fear most? Where do you think the fear began, and how does it steer your choices?",
        },
      },
      {
        title: { fi: "Ihmissuhde, joka painaa", en: "A relationship that weighs" },
        prompt: {
          fi: "Onko jokin ihmissuhde, jossa toimit tavalla, jota et olisi halunnut? Mitä siitä seurasi sinulle ja toiselle?",
          en: "Is there a relationship in which you acted in a way you did not want to? What followed, for you and for the other?",
        },
      },
      {
        title: { fi: "Häpeän paikka", en: "A place of shame" },
        prompt: {
          fi: "Onko jotain, mitä et ole kertonut kenellekään? Sinun ei tarvitse kertoa sitä vielä. Voit kirjoittaa vain, että se on olemassa.",
          en: "Is there something you have told no one? You need not tell it yet. You may simply write that it exists.",
        },
      },
      {
        title: { fi: "Mikä minussa on hyvää", en: "What is good in me" },
        prompt: {
          fi: "Inventaarioon kuuluu myös valo. Mitkä kolme asiaa sinussa ovat säilyneet kaiken läpi?",
          en: "An inventory includes the light as well. Which three things in you have endured through everything?",
        },
      },
    ],
  },
];
