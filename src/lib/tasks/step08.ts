import type { Task } from "../program";

// Vaiheen 8 jatkotehtävät. Omin sanoin kirjoitettu; alkuperäisteoksia ei lainata.
export const tasks: Task[] = [
  {
    title: { fi: "Toinen nimi", en: "A second name" },
    prompt: {
      fi: "Kuka tulee mieleen seuraavaksi? Mitä tapahtui, yhdellä tai kahdella lauseella?",
      en: "Who comes to mind next? What happened, in one or two sentences?",
    },
  },
  {
    title: { fi: "Sanat, jotka sanoin", en: "Words I said" },
    prompt: {
      fi: "Onko sanoja, jotka sanoit jollekulle ja jotka toivoisit voivasi ottaa takaisin?",
      en: "Are there words you said to someone that you wish you could take back?",
    },
  },
  {
    title: { fi: "Sanat, jotka jäivät sanomatta", en: "Words left unsaid" },
    prompt: {
      fi: "Kenelle jäi sanomatta jotain tärkeää: kiitos, anteeksi, välitän sinusta?",
      en: "To whom did something important go unsaid: thank you, I am sorry, I care about you?",
    },
  },
  {
    title: { fi: "Paikalla mutta poissa", en: "There but absent" },
    prompt: {
      fi: "Kuka on kärsinyt siitä, että et ollut läsnä, vaikka olit samassa huoneessa?",
      en: "Who has suffered from your not being present, even though you were in the same room?",
    },
  },
  {
    title: { fi: "Pitämättä jääneet lupaukset", en: "Promises left unkept" },
    prompt: {
      fi: "Mitä lupauksia olet jättänyt pitämättä, ja kenelle?",
      en: "What promises have you left unkept, and to whom?",
    },
  },
  {
    title: { fi: "Velat", en: "Debts" },
    prompt: {
      fi: "Oletko jollekulle velkaa rahaa tai jotain muuta konkreettista?",
      en: "Do you owe someone money or something else concrete?",
    },
  },
  {
    title: { fi: "Lapset", en: "Children" },
    prompt: {
      fi: "Jos elämässäsi on lapsia, miltä tilanteesi on näyttänyt heidän silmissään? Katso sitä rauhassa.",
      en: "If there are children in your life, how has your situation looked in their eyes? Look at it calmly.",
    },
  },
  {
    title: { fi: "Vanhemmat ja sisarukset", en: "Parents and siblings" },
    prompt: {
      fi: "Mitä vanhempasi tai sisaruksesi ovat joutuneet kantamaan? Entä mitä sinä olet kantanut heidän vuokseen?",
      en: "What have your parents or siblings had to carry? And what have you carried because of them?",
    },
  },
  {
    title: { fi: "Työtoverit", en: "People at work" },
    prompt: {
      fi: "Onko työssä tai opinnoissa joku, jota toimintasi on kuormittanut?",
      en: "Is there someone at work or in your studies whom your actions have burdened?",
    },
  },
  {
    title: { fi: "Entinen kumppani", en: "A former partner" },
    prompt: {
      fi: "Onko entinen kumppani, jota kohtaan toimit tavalla, joka painaa? Mitä hän joutui kokemaan?",
      en: "Is there a former partner toward whom you acted in a way that weighs on you? What did they have to go through?",
    },
  },
  {
    title: { fi: "Ne, jotka eivät enää ole täällä", en: "Those no longer here" },
    prompt: {
      fi: "Onko joku kuollut tai kadonnut elämästäsi niin, että jotain jäi kesken?",
      en: "Has someone died or gone from your life leaving something unfinished?",
    },
  },
  {
    title: { fi: "Tuntemattomat", en: "Strangers" },
    prompt: {
      fi: "Onko tuntemattomia, joita toimintasi on voinut satuttaa tai vaarantaa?",
      en: "Are there strangers your actions may have hurt or put at risk?",
    },
  },
  {
    title: { fi: "Mitä vein", en: "What I took" },
    prompt: {
      fi: "Mitä olet vienyt toiselta: aikaa, luottamusta, mielenrauhaa?",
      en: "What have you taken from another: time, trust, peace of mind?",
    },
  },
  {
    title: { fi: "Selitys sivuun", en: "Setting the explanation aside" },
    prompt: {
      fi: "Kun ajattelet jotakuta listallasi, mitä selitystä mielesi tarjoaa ensimmäisenä? Laita se hetkeksi sivuun.",
      en: "When you think of someone on your list, what explanation does your mind offer first? Set it aside for a moment.",
    },
  },
  {
    title: { fi: "Hänen kipunsa", en: "Their pain" },
    prompt: {
      fi: "Valitse yksi ihminen ja anna itsesi tuntea hetken, miltä hänestä tuntui. Palaa sitten hengitykseen.",
      en: "Choose one person and let yourself feel for a moment how it felt for them. Then return to the breath.",
    },
  },
  {
    title: { fi: "Syyllisyys ja häpeä", en: "Guilt and shame" },
    prompt: {
      fi: "Syyllisyys sanoo: tein väärin. Häpeä sanoo: olen vääränlainen. Kumpi ääni on sinussa nyt kovempi?",
      en: "Guilt says: I did wrong. Shame says: I am wrong. Which voice is louder in you now?",
    },
  },
  {
    title: { fi: "Katkeruudesta huolimatta", en: "In spite of bitterness" },
    prompt: {
      fi: "Onko listallasi joku, jota kohtaan olet yhä katkera? Voiko hän olla listalla siitä huolimatta?",
      en: "Is there someone on your list toward whom you are still bitter? Can they be on the list all the same?",
    },
  },
  {
    title: { fi: "Hyvän toivominen", en: "Wishing well" },
    prompt: {
      fi: "Kokeile toivoa yhdelle listasi ihmiselle hiljaa hyvää. Jos se ei onnistu vielä, sekin on tietoa.",
      en: "Try quietly wishing one person on your list well. If it does not work yet, that too is information.",
    },
  },
  {
    title: { fi: "Miten puhun itselleni", en: "How I speak to myself" },
    prompt: {
      fi: "Miten puhut itsellesi, kun teet virheen? Puhuisitko niin kenellekään muulle?",
      en: "How do you speak to yourself when you make a mistake? Would you speak so to anyone else?",
    },
  },
  {
    title: { fi: "Kehoni", en: "My body" },
    prompt: {
      fi: "Miten olet kohdellut kehoasi? Mitä se on joutunut kestämään?",
      en: "How have you treated your body? What has it had to endure?",
    },
  },
  {
    title: { fi: "Haaveeni", en: "My dreams" },
    prompt: {
      fi: "Mistä omasta haaveestasi olet luopunut? Kuuluuko sekin listalle?",
      en: "Which dream of your own have you given up? Does that belong on the list too?",
    },
  },
  {
    title: { fi: "Lista kokonaisena", en: "The list as a whole" },
    prompt: {
      fi: "Lue listasi läpi. Mitä tunnet, kun näet sen kokonaisena?",
      en: "Read your list through. What do you feel when you see it whole?",
    },
  },
  {
    title: { fi: "Halu korjata", en: "The wish to put right" },
    prompt: {
      fi: "Mikä sinussa haluaa korjata asioita? Anna sen äänen puhua hetki.",
      en: "What in you wants to put things right? Let that voice speak for a moment.",
    },
  },
];
