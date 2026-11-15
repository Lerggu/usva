import type { Task } from "../program";

// Vaiheen 9 jatkotehtävät. Omin sanoin kirjoitettu; alkuperäisteoksia ei lainata.
export const tasks: Task[] = [
  {
    title: { fi: "Toinen ihminen", en: "A second person" },
    prompt: {
      fi: "Kuka on seuraava, jonka kohdalla olisit valmis? Mikä hänen kohdallaan on erilaista?",
      en: "Who is the next person with whom you would be ready? What is different in their case?",
    },
  },
  {
    title: { fi: "Miksi haluan hyvittää", en: "Why I want to make amends" },
    prompt: {
      fi: "Miksi haluat hyvittää: toisen vuoksi vai saadaksesi itse helpotusta? Molemmat saavat olla totta.",
      en: "Why do you want to make amends: for the other's sake or for your own relief? Both may be true.",
    },
  },
  {
    title: { fi: "Oikea hetki", en: "The right time" },
    prompt: {
      fi: "Milloin ja missä hyvitys olisi toiselle helpoin ottaa vastaan?",
      en: "When and where would the amend be easiest for the other to receive?",
    },
  },
  {
    title: { fi: "Kysyn ensin", en: "I ask first" },
    prompt: {
      fi: "Voisitko kysyä ensin, sopiiko hänelle puhua asiasta? Miltä kysyminen tuntuisi?",
      en: "Could you first ask whether they are willing to talk about it? How would asking feel?",
    },
  },
  {
    title: { fi: "Ilman muttaa", en: "Without a but" },
    prompt: {
      fi: "Kokeile kirjoittaa pahoittelu, jossa ei ole sanaa mutta. Miltä se näyttää?",
      en: "Try writing an apology that has no but in it. What does it look like?",
    },
  },
  {
    title: { fi: "Kuuntelen vastauksen", en: "I listen to the answer" },
    prompt: {
      fi: "Hyvitykseen kuuluu kuunnella, mitä toinen haluaa sanoa. Mitä sinun on vaikein kuulla?",
      en: "Part of an amend is listening to what the other wants to say. What is hardest for you to hear?",
    },
  },
  {
    title: { fi: "Velan maksaminen", en: "Paying a debt" },
    prompt: {
      fi: "Jos olet velkaa rahaa, mikä olisi realistinen ensimmäinen askel sen maksamiseksi?",
      en: "If you owe money, what would be a realistic first step toward paying it?",
    },
  },
  {
    title: { fi: "Kirje, jota ei lähetetä", en: "A letter not sent" },
    prompt: {
      fi: "Kirjoita kirje jollekulle, jota et voi tavoittaa tai jota ei ole turvallista tavoittaa. Sitä ei lähetetä.",
      en: "Write a letter to someone you cannot reach or whom it would not be safe to reach. It is not sent.",
    },
  },
  {
    title: { fi: "Jo poissa olevalle", en: "To one who is gone" },
    prompt: {
      fi: "Jos joku on jo kuollut, miten voisit hyvittää hänelle: sanoilla hänen muistolleen tai teolla hänen nimissään?",
      en: "If someone has died, how could you make amends to them: words to their memory or an act in their name?",
    },
  },
  {
    title: { fi: "Arjen pieni hyvitys", en: "A small everyday amend" },
    prompt: {
      fi: "Mikä pieni teko tänään korjaisi jotain arjessa: tiskit, puhelu, ajoissa oleminen?",
      en: "What small act today would mend something in daily life: the dishes, a call, being on time?",
    },
  },
  {
    title: { fi: "Läsnäolo hyvityksenä", en: "Presence as an amend" },
    prompt: {
      fi: "Kenelle paras hyvitys olisi se, että olet tästä eteenpäin oikeasti paikalla?",
      en: "For whom would the best amend be that from now on you are truly there?",
    },
  },
  {
    title: { fi: "Luottamus palaa teoilla", en: "Trust returns through deeds" },
    prompt: {
      fi: "Luottamus palaa teoilla ja ajalla, ei sanoilla. Mitä voit tehdä toistuvasti ja pienesti?",
      en: "Trust returns through deeds and time, not words. What can you do repeatedly, in a small way?",
    },
  },
  {
    title: { fi: "Kun toinen ei halua yhteyttä", en: "When the other wants no contact" },
    prompt: {
      fi: "Jos joku ei halua yhteyttä, sen kunnioittaminen on myös hyvitys. Miten voit hyväksyä sen?",
      en: "If someone does not want contact, respecting that is also an amend. How can you accept it?",
    },
  },
  {
    title: { fi: "Toisen viha", en: "Another's anger" },
    prompt: {
      fi: "Miten voisit ottaa vastaan toisen vihan puolustautumatta ja silti pitää huolta itsestäsi?",
      en: "How could you receive another's anger without defending yourself and still take care of yourself?",
    },
  },
  {
    title: { fi: "Mitä ei voi korjata", en: "What cannot be mended" },
    prompt: {
      fi: "Onko jotain, mitä ei voi enää korjata? Mitä sille voi tehdä silloin, kun korjata ei voi?",
      en: "Is there something that can no longer be mended? What can be done about it when mending is not possible?",
    },
  },
  {
    title: { fi: "Anteeksi itselleni", en: "Forgiving myself" },
    prompt: {
      fi: "Minkä yhden asian voisit tänään antaa itsellesi anteeksi, edes osittain?",
      en: "What one thing could you forgive yourself for today, even partly?",
    },
  },
  {
    title: { fi: "Hyvitys keholleni", en: "An amend to my body" },
    prompt: {
      fi: "Mitä hyvää voisit tehdä keholle, jota olet kohdellut kovin: unta, ruokaa, liikettä, lepoa?",
      en: "What good could you do for a body you have treated harshly: sleep, food, movement, rest?",
    },
  },
  {
    title: { fi: "Raja on myös hyvitys", en: "A boundary is also an amend" },
    prompt: {
      fi: "Onko suhde, jossa paras teko on asettaa raja eikä pyytää anteeksi?",
      en: "Is there a relationship in which the best act is to set a boundary and not to apologise?",
    },
  },
  {
    title: { fi: "Salainen toiveeni", en: "My secret hope" },
    prompt: {
      fi: "Mitä toivot salaa saavasi vastineeksi hyvityksestä? Voitko tehdä sen ilman sitä?",
      en: "What do you secretly hope to get in return for the amend? Can you do it without that?",
    },
  },
  {
    title: { fi: "Tuki vaikeaan hetkeen", en: "Support for a hard moment" },
    prompt: {
      fi: "Kenen kanssa voisit puhua ennen vaikeaa hyvitystä ja sen jälkeen?",
      en: "With whom could you talk before a difficult amend and after it?",
    },
  },
  {
    title: { fi: "Tehty hyvitys", en: "An amend made" },
    prompt: {
      fi: "Jos olet tehnyt hyvityksen, kerro miten se meni. Mitä opit?",
      en: "If you have made an amend, tell me how it went. What did you learn?",
    },
  },
  {
    title: { fi: "Vielä odottavat", en: "Those still waiting" },
    prompt: {
      fi: "Mitkä hyvitykset odottavat vielä aikaansa? Niillä saa olla oma aikansa.",
      en: "Which amends are still waiting for their time? They may have their own time.",
    },
  },
  {
    title: { fi: "Vapaampi", en: "Freer" },
    prompt: {
      fi: "Mistä olet nyt vapaampi kuin ennen tätä vaihetta?",
      en: "What are you freer from now than before this step?",
    },
  },
];
