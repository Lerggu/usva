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
  {
    n: 5,
    title: STEP_TITLES[4],
    theme: { fi: "Mitä en ole vielä sanonut ääneen?", en: "What have I not yet said aloud?" },
    intro: {
      fi: "Se, mitä kannat yksin, painaa eniten. Tässä vaiheessa saat sanoa asioita ääneen: ensin minulle ja sitten, jos haluat, yhdelle luotetulle ihmiselle.",
      en: "What you carry alone weighs the most. In this step you may say things aloud: first to me and then, if you wish, to one person you trust.",
    },
    tasks: [
      {
        title: { fi: "Kenelle voisin puhua", en: "Whom I could talk to" },
        prompt: {
          fi: "Kuka elämässäsi on ihminen, jolle voisit kertoa jotain todellista itsestäsi? Mikä hänessä tekee hänestä turvallisen?",
          en: "Who in your life is someone you could tell something real about yourself? What is it about them that makes them safe?",
        },
      },
      {
        title: { fi: "Ensimmäinen lause", en: "The first sentence" },
        prompt: {
          fi: "Valitse tarinastasi yksi asia, joka tuntuu pieneltä. Jos haluat, sano se nyt ääneen tai kirjoita se tähän. Miltä se tuntui?",
          en: "Choose one thing from your story that feels small. If you like, say it aloud now or write it here. How did that feel?",
        },
      },
      {
        title: { fi: "Se, mitä olen lykännyt", en: "What I have put off" },
        prompt: {
          fi: "Onko jotain, minkä kertomista olet lykännyt? Yksityiskohtia ei tarvita. Voit kuvata vain, mitä pelkäät tapahtuvan, jos joku tietäisi.",
          en: "Is there something you have put off telling? No details are needed. You can simply describe what you fear would happen if someone knew.",
        },
      },
      {
        title: { fi: "Tarina, joka toistuu", en: "The story that repeats" },
        prompt: {
          fi: "Kun katsot kaikkea tähän asti kertomaasi, mikä siinä toistuu? Mitä huomaat itsestäsi?",
          en: "When you look at everything you have told so far, what repeats in it? What do you notice about yourself?",
        },
      },
      {
        title: { fi: "Mitä kehoni sanoi", en: "What my body said" },
        prompt: {
          fi: "Kun olet sanonut jotain vaikeaa ääneen, pysähdy hetkeksi. Mitä kehossasi tapahtui: keveni, kiristyi vai jotain muuta?",
          en: "After you have said something difficult aloud, pause for a moment. What happened in your body: did it lighten, tighten, or something else?",
        },
      },
      {
        title: { fi: "Jaettu taakka", en: "A shared burden" },
        prompt: {
          fi: "Jos kerroit tällä viikolla jotain toiselle ihmiselle tai minulle, miltä jälkeenpäin tuntui? Jos et vielä, mikä auttaisi ottamaan yhden pienen askeleen?",
          en: "If you told another person or me something this week, how did it feel afterwards? If not yet, what would help you take one small step?",
        },
      },
      {
        title: { fi: "Olen tullut nähdyksi", en: "I have been seen" },
        prompt: {
          fi: "Mikä osa sinusta on nyt tullut näkyviin, joka ennen oli piilossa? Miltä tuntuu olla nähty?",
          en: "Which part of you has now come into view that was hidden before? How does it feel to be seen?",
        },
      },
    ],
  },
  {
    n: 6,
    title: STEP_TITLES[5],
    theme: { fi: "Mitkä tavat toistuvat elämässäni?", en: "Which ways of acting repeat in my life?" },
    intro: {
      fi: "Tarinastasi alkaa erottua tapoja, joilla olet suojannut itseäsi. Ne ovat joskus auttaneet sinua. Nyt saat katsoa rauhassa, palvelevatko ne sinua enää.",
      en: "Ways in which you have protected yourself begin to show in your story. They once helped you. Now you may look calmly at whether they still serve you.",
    },
    tasks: [
      {
        title: { fi: "Tapa, joka toistuu", en: "A way that repeats" },
        prompt: {
          fi: "Nimeä yksi tapa toimia, joka toistuu elämässäsi ja josta seuraa harmia. Kuvaa se niin kuin kuvaisit ystävää, tuomitsematta.",
          en: "Name one way of acting that repeats in your life and brings harm. Describe it as you would describe a friend, without judging.",
        },
      },
      {
        title: { fi: "Mistä se alkoi", en: "Where it began" },
        prompt: {
          fi: "Milloin tarvitsit tätä tapaa ensimmäisen kerran? Miltä se silloin suojasi sinua?",
          en: "When did you first need this way of acting? What did it protect you from then?",
        },
      },
      {
        title: { fi: "Mitä se antaa", en: "What it gives" },
        prompt: {
          fi: "Mitä saat tästä tavasta vielä tänään: turvaa, helpotusta, hallinnan tunnetta? Ole rehellinen, hyödyssä ei ole hävettävää.",
          en: "What do you still get from it today: safety, relief, a sense of control? Be honest; there is no shame in the benefit.",
        },
      },
      {
        title: { fi: "Mitä se maksaa", en: "What it costs" },
        prompt: {
          fi: "Mitä tämä tapa maksaa sinulle ja läheisillesi? Ajattele yhtä tuoretta tilannetta.",
          en: "What does this way of acting cost you and those close to you? Think of one recent situation.",
        },
      },
      {
        title: { fi: "Hetki ennen", en: "The moment before" },
        prompt: {
          fi: "Huomaa tänään hetki juuri ennen kuin tapa käynnistyy. Mikä kehossa tai mielessä kertoo, että se on tulossa?",
          en: "Notice today the moment just before it starts. What in your body or mind tells you it is coming?",
        },
      },
      {
        title: { fi: "Ilman sitä", en: "Without it" },
        prompt: {
          fi: "Kuvittele päivä ilman tätä tapaa. Mikä siinä pelottaa, ja mikä houkuttaa?",
          en: "Imagine a day without it. What about that frightens you, and what draws you?",
        },
      },
      {
        title: { fi: "Olenko valmis", en: "Am I ready" },
        prompt: {
          fi: "Kuinka valmis olet päästämään tästä tavasta irti? Jos et vielä kokonaan, se on hyvä vastaus. Mikä lisäisi valmiutta hieman?",
          en: "How ready are you to let this go? If not entirely yet, that is a good answer. What would add a little readiness?",
        },
      },
    ],
  },
  {
    n: 7,
    title: STEP_TITLES[6],
    theme: { fi: "Missä tarvitsen apua muuttuakseni?", en: "Where do I need help in order to change?" },
    intro: {
      fi: "Nöyryys ei ole itsensä vähättelyä. Se on sen myöntämistä, ettei kaikkea voi eikä tarvitse muuttaa omin voimin, ja että apua saa pyytää.",
      en: "Humility is not thinking little of yourself. It is admitting that not everything can or needs to be changed by your own strength, and that you may ask for help.",
    },
    tasks: [
      {
        title: { fi: "Pyydän apua", en: "I ask for help" },
        prompt: {
          fi: "Missä yhdessä asiassa voisit tänään pyytää apua, ja keneltä? Pienikin pyyntö käy.",
          en: "In what one thing could you ask for help today, and from whom? Even a small request will do.",
        },
      },
      {
        title: { fi: "Yksi hengitys väliin", en: "One breath in between" },
        prompt: {
          fi: "Valitse yksi toistuva tapasi. Kun se tänään nousee, kokeile pysähtyä yhden hengityksen ajaksi ennen kuin toimit. Kerro, mitä tapahtui.",
          en: "Choose one of your recurring ways. When it rises today, try pausing for one breath before you act. Tell me what happened.",
        },
      },
      {
        title: { fi: "Pieni teko toisin", en: "One small act done differently" },
        prompt: {
          fi: "Mikä olisi pienin mahdollinen teko, jonka voisit tänään tehdä toisin kuin ennen?",
          en: "What would be the smallest possible thing you could do differently today?",
        },
      },
      {
        title: { fi: "Kun kompastun", en: "When I stumble" },
        prompt: {
          fi: "Vanha tapa palaa välillä, ja se kuuluu asiaan. Mitä sanoisit ystävälle, jolle kävi niin? Voitko sanoa saman itsellesi?",
          en: "The old way returns now and then, and that is part of it. What would you say to a friend to whom that happened? Can you say the same to yourself?",
        },
      },
      {
        title: { fi: "Mihin nojaan", en: "What I lean on" },
        prompt: {
          fi: "Mihin itseäsi suurempaan voit nojata silloin, kun omat voimat eivät riitä: ihmisiin, luontoon, hiljaisuuteen, johonkin muuhun?",
          en: "What greater than yourself can you lean on when your own strength is not enough: people, nature, silence, something else?",
        },
      },
      {
        title: { fi: "Vahvuus tavan sisällä", en: "The strength inside the habit" },
        prompt: {
          fi: "Jokaisessa hankalassa tavassa on sisällä jokin hyvä: hallinnassa huolenpito, vetäytymisessä herkkyys. Mikä hyvä sinun tavassasi on?",
          en: "Inside every difficult way of acting there is something good: care within control, sensitivity within withdrawal. What good is inside yours?",
        },
      },
      {
        title: { fi: "Kevyempi ote", en: "A lighter grip" },
        prompt: {
          fi: "Mikä on tämän vaiheen aikana hellittänyt edes vähän? Mistä sen huomaat?",
          en: "What has loosened during this step, even a little? How do you notice it?",
        },
      },
    ],
  },
  {
    n: 8,
    title: STEP_TITLES[7],
    theme: { fi: "Keitä toimintani on satuttanut?", en: "Whom have my actions hurt?" },
    intro: {
      fi: "Nyt katse kääntyy ihmisiin, joita tekosi ovat koskettaneet. Tarkoitus ei ole syyttää itseä, vaan nähdä selvästi. Tässä vaiheessa vain katsotaan: mitään ei vielä tarvitse tehdä.",
      en: "Now the gaze turns to the people your actions have touched. The purpose is not to blame yourself but to see clearly. In this step we only look: nothing needs to be done yet.",
    },
    tasks: [
      {
        title: { fi: "Ensimmäinen nimi", en: "The first name" },
        prompt: {
          fi: "Kuka tulee ensimmäisenä mieleen, kun ajattelet ihmisiä, joita toimintasi on satuttanut? Kirjoita vain nimi ja yksi lause.",
          en: "Who comes to mind first when you think of people your actions have hurt? Write only a name and one sentence.",
        },
      },
      {
        title: { fi: "Hänen silmin", en: "Through their eyes" },
        prompt: {
          fi: "Valitse yksi ihminen. Miltä tapahtunut näytti ja tuntui hänen kannaltaan?",
          en: "Choose one person. How did what happened look and feel from their side?",
        },
      },
      {
        title: { fi: "Minä itse", en: "Myself" },
        prompt: {
          fi: "Sinäkin kuulut tähän joukkoon. Millä tavoin olet satuttanut itseäsi?",
          en: "You belong on this list as well. In what ways have you hurt yourself?",
        },
      },
      {
        title: { fi: "Lähimmät", en: "Those closest" },
        prompt: {
          fi: "Ajattele lähimpiäsi: perhettä, kumppania, ystäviä. Onko jotain, mitä he ovat joutuneet kantamaan sinun vuoksesi?",
          en: "Think of those closest to you: family, a partner, friends. Is there something they have had to carry because of you?",
        },
      },
      {
        title: { fi: "Ne, joita välttelen", en: "Those I avoid" },
        prompt: {
          fi: "Onko joku, jota välttelet sen vuoksi, mitä välillänne tapahtui? Mitä välttely kertoo?",
          en: "Is there someone you avoid because of what happened between you? What does the avoiding tell you?",
        },
      },
      {
        title: { fi: "Ne, jotka satuttivat minua", en: "Those who hurt me" },
        prompt: {
          fi: "Joskus samassa ihmisessä on sekä se, jota satutit, että se, joka satutti sinua. Voitko pitää molemmat totena yhtä aikaa? Anteeksi ei tarvitse antaa vielä.",
          en: "Sometimes the same person is both someone you hurt and someone who hurt you. Can you hold both as true at once? You do not need to forgive yet.",
        },
      },
      {
        title: { fi: "Valmiuteni", en: "My readiness" },
        prompt: {
          fi: "Käy mielessäsi olevat ihmiset läpi. Kenen kohdalla olisit valmis korjaamaan jotain, kenen kohdalla et vielä? Molemmat vastaukset ovat hyviä.",
          en: "Go through the people on your mind. With whom would you be ready to put something right, and with whom not yet? Both answers are good.",
        },
      },
    ],
  },
  {
    n: 9,
    title: STEP_TITLES[8],
    theme: { fi: "Miten voin korjata sen, minkä voin?", en: "How can I put right what I can?" },
    intro: {
      fi: "Hyvittäminen on tekoja, ei vain sanoja. Kaikkea ei voi eikä pidä korjata suoraan: hyvitys ei saa satuttaa toista uudelleen eikä vaarantaa sinua. Kuljemme tämän rauhassa, yksi ihminen kerrallaan.",
      en: "Making amends is deeds, not only words. Not everything can or should be put right directly: an amend must not hurt the other person again or put you at risk. We walk this calmly, one person at a time.",
    },
    tasks: [
      {
        title: { fi: "Mistä aloitan", en: "Where I begin" },
        prompt: {
          fi: "Valitse yksi ihminen, jonka kohdalla hyvittäminen tuntuu mahdolliselta. Mikä tekee siitä mahdollisen juuri hänen kanssaan?",
          en: "Choose one person with whom making amends feels possible. What makes it possible with them in particular?",
        },
      },
      {
        title: { fi: "Satuttaisiko se", en: "Would it hurt" },
        prompt: {
          fi: "Voisiko yhteydenottosi satuttaa häntä tai jotakuta muuta, tai olisiko se sinulle turvatonta? Jos voisi, suora yhteys ei ole oikea tapa, ja etsitään toinen.",
          en: "Could reaching out hurt them or someone else, or would it be unsafe for you? If so, direct contact is not the right way, and we look for another.",
        },
      },
      {
        title: { fi: "Mitä sanoisin", en: "What I would say" },
        prompt: {
          fi: "Kokeile kirjoittaa, mitä sanoisit: mitä teit, ilman selityksiä ja ilman pyyntöä saada anteeksi. Sitä ei tarvitse lähettää kenellekään.",
          en: "Try writing what you would say: what you did, without explanations and without asking to be forgiven. It does not have to be sent to anyone.",
        },
      },
      {
        title: { fi: "Hyvitys elämällä toisin", en: "Amends by living differently" },
        prompt: {
          fi: "Joskus paras hyvitys on muuttunut toiminta. Mitä tekisit tästä eteenpäin toisin, jotta sama ei toistuisi?",
          en: "Sometimes the best amend is changed behaviour. What would you do differently from now on, so that the same does not repeat?",
        },
      },
      {
        title: { fi: "Hyvitys itselleni", en: "Amends to myself" },
        prompt: {
          fi: "Mitä olet velkaa itsellesi? Mikä yksi teko tällä viikolla olisi hyvitys sinulle?",
          en: "What do you owe yourself? What one act this week would be an amend to you?",
        },
      },
      {
        title: { fi: "Kun vastaus on toinen kuin toivoin", en: "When the answer is not what I hoped" },
        prompt: {
          fi: "Toinen saa vastata miten haluaa, tai olla vastaamatta. Miten voisit pitää huolta itsestäsi, jos vastaus ei ole se, jota toivoit?",
          en: "The other person may answer as they wish, or not at all. How could you take care of yourself if the answer is not the one you hoped for?",
        },
      },
      {
        title: { fi: "Miltä nyt tuntuu", en: "How it feels now" },
        prompt: {
          fi: "Jos teit tällä viikolla yhdenkin hyvityksen, pienenkin, miltä jälkeenpäin tuntui? Jos et, mikä on seuraava pieni askel?",
          en: "If you made even one amend this week, however small, how did it feel afterwards? If not, what is the next small step?",
        },
      },
    ],
  },
  {
    n: 10,
    title: STEP_TITLES[9],
    theme: { fi: "Miten pidän mieleni kevyenä päivä kerrallaan?", en: "How do I keep my mind light one day at a time?" },
    intro: {
      fi: "Suuri työ on tehty. Nyt opetellaan pitämään huolta päivittäin: huomaamaan, kun jokin jää painamaan, ja korjaamaan se pian, ennen kuin se kasvaa.",
      en: "The great work is done. Now we learn daily care: noticing when something is left weighing on you, and putting it right soon, before it grows.",
    },
    tasks: [
      {
        title: { fi: "Tämän päivän paino", en: "Today's weight" },
        prompt: {
          fi: "Jäikö tältä päivältä jotain painamaan? Nimeä se. Usein jo nimeäminen keventää.",
          en: "Did something from today stay weighing on you? Name it. Often naming alone lightens it.",
        },
      },
      {
        title: { fi: "Nopea korjaus", en: "A quick repair" },
        prompt: {
          fi: "Onko tältä päivältä jotain, minkä voisit korjata jo tänään tai huomenna: sana, viesti, teko?",
          en: "Is there something from today you could put right today or tomorrow: a word, a message, an act?",
        },
      },
      {
        title: { fi: "Mikä meni hyvin", en: "What went well" },
        prompt: {
          fi: "Katsaus ei ole vain virheiden etsimistä. Missä toimit tänään niin kuin haluat toimia?",
          en: "A review is not only a search for mistakes. Where did you act today the way you want to act?",
        },
      },
      {
        title: { fi: "Kaunan alku", en: "The start of a resentment" },
        prompt: {
          fi: "Huomaa tänään pieni ärtymys heti, kun se syntyy. Mitä sen alla oli: pelkoa, väsymystä, pettynyt odotus?",
          en: "Notice a small irritation today the moment it arises. What was beneath it: fear, tiredness, a disappointed expectation?",
        },
      },
      {
        title: { fi: "Keskellä päivää", en: "In the middle of the day" },
        prompt: {
          fi: "Pysähdy kerran keskellä päivää ja kysy: missä olen juuri nyt, ja mitä tarvitsen? Kerro, mitä huomasit.",
          en: "Pause once in the middle of the day and ask: where am I right now, and what do I need? Tell me what you noticed.",
        },
      },
      {
        title: { fi: "Olin väärässä", en: "I was wrong" },
        prompt: {
          fi: "Kun huomaat olleesi väärässä, kokeile sanoa se pian ja lyhyesti. Miltä se tuntui verrattuna siihen, että olisit pitänyt asian sisälläsi?",
          en: "When you notice you were wrong, try saying so soon and briefly. How did that feel compared with keeping it inside?",
        },
      },
      {
        title: { fi: "Oma iltani", en: "My own evening" },
        prompt: {
          fi: "Millainen iltakatsaus sopii juuri sinulle: mihin aikaan, missä, mitkä kysymykset? Kuvaile oma tapasi.",
          en: "What kind of evening review suits you in particular: at what time, where, with which questions? Describe your own way.",
        },
      },
    ],
  },
  {
    n: 11,
    title: STEP_TITLES[10],
    theme: { fi: "Miten kuuntelen sitä, mikä on hiljaa?", en: "How do I listen to what is quiet?" },
    intro: {
      fi: "Hiljaisuus ei vaadi uskoa mihinkään. Se on tila, jossa kuulet itsesi ja sen, mikä on sinua suurempaa, millä nimellä sitä kutsutkin.",
      en: "Stillness does not require believing in anything. It is a space in which you hear yourself and what is greater than you, by whatever name you call it.",
    },
    tasks: [
      {
        title: { fi: "Viisi minuuttia", en: "Five minutes" },
        prompt: {
          fi: "Jos haluat, istu tänään viisi minuuttia tekemättä mitään. Mitä huomasit, kun mikään ei vaatinut sinua?",
          en: "If you like, sit for five minutes today doing nothing. What did you notice when nothing was asking anything of you?",
        },
      },
      {
        title: { fi: "Hengityksen laskeminen", en: "Counting the breath" },
        prompt: {
          fi: "Laske uloshengityksiä yhdestä kymmeneen. Kun ajatus vie mukanaan, aloita lempeästi alusta. Monestiko aloitit? Jokainen aloitus on harjoitus.",
          en: "Count your out-breaths from one to ten. When a thought carries you off, gently begin again. How many times did you begin? Every beginning is the practice.",
        },
      },
      {
        title: { fi: "Kysymys hiljaisuuteen", en: "A question into the silence" },
        prompt: {
          fi: "Esitä hiljaa mielessäsi yksi kysymys, joka on sinulle nyt tärkeä, äläkä vastaa siihen itse. Odota vain. Mitä nousi?",
          en: "Silently ask one question that matters to you now, and do not answer it yourself. Only wait. What arose?",
        },
      },
      {
        title: { fi: "Ulkona", en: "Outdoors" },
        prompt: {
          fi: "Vietä hetki ulkona ilman puhelinta. Mikä yksi asia siellä pysäytti sinut?",
          en: "Spend a moment outdoors without your phone. What one thing there made you stop?",
        },
      },
      {
        title: { fi: "Kehon läpi", en: "Through the body" },
        prompt: {
          fi: "Kulje huomiollasi kehon läpi päälaelta jalkapohjiin. Missä oli jännitystä, missä tilaa?",
          en: "Move your attention through the body from the crown of your head to the soles of your feet. Where was there tension, where was there space?",
        },
      },
      {
        title: { fi: "Hiljainen kiitos", en: "A quiet thanks" },
        prompt: {
          fi: "Kiitä hiljaa mielessäsi kolmesta asiasta. Kenelle tai mille kiitos tuntui menevän?",
          en: "Silently give thanks for three things. To whom or to what did the thanks seem to go?",
        },
      },
      {
        title: { fi: "Oma tapani hiljentyä", en: "My own way of being still" },
        prompt: {
          fi: "Mikä tämän vaiheen harjoituksista tuntui omalta? Miten se voisi kuulua tavalliseen päivääsi?",
          en: "Which of this step's practices felt like yours? How could it belong to your ordinary day?",
        },
      },
    ],
  },
  {
    n: 12,
    title: STEP_TITLES[11],
    theme: { fi: "Mitä olen saanut, ja miten annan sen eteenpäin?", en: "What have I received, and how do I pass it on?" },
    intro: {
      fi: "Olet kulkenut pitkän matkan. Se, mitä olet oppinut, pysyy elävänä, kun annat sitä eteenpäin: olemalla läsnä toiselle ja elämällä sitä todeksi arjessa.",
      en: "You have come a long way. What you have learned stays alive when you pass it on: by being present for another and by living it in your everyday life.",
    },
    tasks: [
      {
        title: { fi: "Mikä on muuttunut", en: "What has changed" },
        prompt: {
          fi: "Kun vertaat itseäsi siihen, joka aloitti tämän matkan, mikä on toisin? Pienetkin muutokset lasketaan.",
          en: "When you compare yourself with the one who began this journey, what is different? Small changes count too.",
        },
      },
      {
        title: { fi: "Tarinani kolmella lauseella", en: "My story in three sentences" },
        prompt: {
          fi: "Kokeile kertoa tarinasi kolmella lauseella: millaista oli, mitä tapahtui ja millaista on nyt.",
          en: "Try telling your story in three sentences: what it was like, what happened, and what it is like now.",
        },
      },
      {
        title: { fi: "Kenelle voin olla läsnä", en: "For whom I can be present" },
        prompt: {
          fi: "Onko elämässäsi joku, joka kamppailee jonkin kanssa? Miten voisit olla hänelle läsnä neuvomatta?",
          en: "Is there someone in your life who is struggling with something? How could you be present for them without advising?",
        },
      },
      {
        title: { fi: "Pieni palvelus", en: "A small service" },
        prompt: {
          fi: "Mikä pieni teko toisen hyväksi sopisi tähän päivään? Sen ei tarvitse näkyä kenellekään.",
          en: "What small act for someone else's good would fit this day? It does not need to be seen by anyone.",
        },
      },
      {
        title: { fi: "Arjen keskellä", en: "In the middle of everyday life" },
        prompt: {
          fi: "Missä arkisessa tilanteessa matkan opit ovat koetuksella: töissä, kotona, liikenteessä? Miten haluaisit toimia siinä?",
          en: "In which everyday situation are the lessons of the journey put to the test: at work, at home, in traffic? How would you like to act there?",
        },
      },
      {
        title: { fi: "Mitä kannan mukanani", en: "What I carry with me" },
        prompt: {
          fi: "Mitkä kolme työkalua tältä matkalta haluat pitää mukanasi? Miksi juuri ne?",
          en: "Which three tools from this journey do you want to keep with you? Why those?",
        },
      },
      {
        title: { fi: "Matka jatkuu", en: "The journey continues" },
        prompt: {
          fi: "Jos kirjoittaisit muutaman rivin itsellesi vuoden päähän, mitä haluaisit hänen muistavan?",
          en: "If you wrote a few lines to yourself a year from now, what would you want them to remember?",
        },
      },
    ],
  },
];
