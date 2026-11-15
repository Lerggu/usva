import type { Task } from "../program";

// Vaiheen 4 jatkotehtävät. Omin sanoin kirjoitettu; alkuperäisteoksia ei lainata.
export const tasks: Task[] = [
  {
    title: { fi: "Koulu ja nuoruus", en: "School and youth" },
    prompt: {
      fi: "Millainen olit kouluikäisenä ja nuorena? Mikä tapahtuma niiltä vuosilta on jäänyt mieleen?",
      en: "What were you like at school age and as a young person? Which event from those years has stayed with you?",
    },
  },
  {
    title: { fi: "Varhainen häpeä", en: "An early shame" },
    prompt: {
      fi: "Mikä on varhaisin muistosi siitä, että häpesit itseäsi? Mitä olisit silloin tarvinnut?",
      en: "What is your earliest memory of feeling ashamed of yourself? What would you have needed then?",
    },
  },
  {
    title: { fi: "Toinen kauna", en: "Another resentment" },
    prompt: {
      fi: "Valitse toinen ihminen tai asia, jota kohtaan kannat kaunaa. Mitä tapahtui, ja mihin se sinussa osui?",
      en: "Choose another person or thing you resent. What happened, and what did it touch in you?",
    },
  },
  {
    title: { fi: "Kaunan alla", en: "Beneath the resentment" },
    prompt: {
      fi: "Mitä kaunan alla on: surua, pelkoa, pettymystä? Anna sen tulla esiin hetkeksi.",
      en: "What lies beneath the resentment: sorrow, fear, disappointment? Let it come forward for a moment.",
    },
  },
  {
    title: { fi: "Mitä odotin", en: "What I expected" },
    prompt: {
      fi: "Mitä odotit siltä ihmiseltä tai tilanteelta, joka petti sinut? Sanoitko odotuksesi koskaan ääneen?",
      en: "What did you expect of the person or situation that let you down? Did you ever say the expectation aloud?",
    },
  },
  {
    title: { fi: "Kauna itseäni kohtaan", en: "Resentment toward myself" },
    prompt: {
      fi: "Mistä et ole antanut itsellesi anteeksi? Kerro se niin kuin kertoisit ystävän puolesta.",
      en: "What have you not forgiven yourself for? Tell it as you would on a friend's behalf.",
    },
  },
  {
    title: { fi: "Toinen pelko", en: "Another fear" },
    prompt: {
      fi: "Mitä muuta pelkäät: yksin jäämistä, epäonnistumista, paljastumista? Valitse yksi ja kuvaile sitä.",
      en: "What else do you fear: being left alone, failing, being found out? Choose one and describe it.",
    },
  },
  {
    title: { fi: "Pelosta tehty valinta", en: "A choice made from fear" },
    prompt: {
      fi: "Mikä valinta elämässäsi on tehty pelosta? Mitä olisit valinnut ilman sitä?",
      en: "Which choice in your life was made out of fear? What would you have chosen without it?",
    },
  },
  {
    title: { fi: "Raha ja turva", en: "Money and safety" },
    prompt: {
      fi: "Miten raha ja turvattomuus ovat ohjanneet toimintaasi? Onko siinä jotain, mikä painaa?",
      en: "How have money and insecurity steered your actions? Is there something in that which weighs on you?",
    },
  },
  {
    title: { fi: "Työ ja näyttämisen halu", en: "Work and the wish to prove myself" },
    prompt: {
      fi: "Onko halu pärjätä tai näyttää saanut sinut toimimaan tavalla, jota kadut?",
      en: "Has the wish to succeed or to prove yourself made you act in a way you regret?",
    },
  },
  {
    title: { fi: "Rakkaus ja läheisyys", en: "Love and closeness" },
    prompt: {
      fi: "Miten olet toiminut rakkaussuhteissa silloin, kun olet pelännyt? Mitä siitä seurasi?",
      en: "How have you acted in love when you were afraid? What followed from it?",
    },
  },
  {
    title: { fi: "Roolini perheessä", en: "My role in the family" },
    prompt: {
      fi: "Mikä rooli sinulla oli lapsuudenperheessäsi? Kannatko sitä roolia vielä?",
      en: "What role did you have in the family you grew up in? Do you still carry that role?",
    },
  },
  {
    title: { fi: "Päättynyt ystävyys", en: "A friendship that ended" },
    prompt: {
      fi: "Onko ystävyys, joka päättyi tavalla, joka jäi vaivaamaan? Mikä oli oma osuutesi?",
      en: "Is there a friendship that ended in a way that still troubles you? What was your part?",
    },
  },
  {
    title: { fi: "Kun minua satutettiin", en: "When I was hurt" },
    prompt: {
      fi: "Onko jotain, mitä sinulle tehtiin ja mikä ei ollut millään tavalla sinun syytäsi? Sen saa sanoa juuri niin.",
      en: "Is there something that was done to you and was in no way your fault? You may say it exactly so.",
    },
  },
  {
    title: { fi: "Epärehellisyys", en: "Dishonesty" },
    prompt: {
      fi: "Missä olet ollut epärehellinen: sanoissa, teoissa tai vaikenemalla? Valitse yksi tilanne.",
      en: "Where have you been dishonest: in words, in deeds or by keeping silent? Choose one situation.",
    },
  },
  {
    title: { fi: "Oman edun ajaminen", en: "Pursuing my own advantage" },
    prompt: {
      fi: "Milloin olet ajanut omaa etuasi toisen kustannuksella? Mitä silloin pelkäsit jääväsi ilman?",
      en: "When have you pursued your own advantage at another's expense? What did you fear going without?",
    },
  },
  {
    title: { fi: "Kateus", en: "Envy" },
    prompt: {
      fi: "Ketä tai mitä olet kadehtinut? Mitä kateus kertoo siitä, mitä itse kaipaat?",
      en: "Whom or what have you envied? What does the envy tell you about what you long for?",
    },
  },
  {
    title: { fi: "Kun vetäydyin", en: "When I withdrew" },
    prompt: {
      fi: "Milloin olet vetäytynyt, vaikka sinua olisi tarvittu? Mikä teki läsnäolosta vaikeaa?",
      en: "When have you withdrawn although you were needed? What made being present hard?",
    },
  },
  {
    title: { fi: "Sama kuvio", en: "The same pattern" },
    prompt: {
      fi: "Katso kaunojasi ja pelkojasi yhdessä. Toistuuko niissä sama kuvio?",
      en: "Look at your resentments and fears together. Does the same pattern repeat in them?",
    },
  },
  {
    title: { fi: "Mitä en vielä kerro", en: "What I am not telling yet" },
    prompt: {
      fi: "Onko jotain, minkä jätät vielä pois? Sen saa jättää. Kirjoita vain, että sellainen on.",
      en: "Is there something you are still leaving out? You may leave it. Just write that it exists.",
    },
  },
  {
    title: { fi: "Vahvuuteni", en: "My strengths" },
    prompt: {
      fi: "Mitkä ominaisuutesi ovat auttaneet sinua ja muita? Nimeä viisi, vaikka se tuntuisi vaikealta.",
      en: "Which of your qualities have helped you and others? Name five, even if it feels hard.",
    },
  },
  {
    title: { fi: "Hiljaiset hyvät teot", en: "Quiet good deeds" },
    prompt: {
      fi: "Mitä hyvää olet tehnyt toiselle ihmiselle, josta harva tietää?",
      en: "What good have you done for another person that few know about?",
    },
  },
  {
    title: { fi: "Koko kuva", en: "The whole picture" },
    prompt: {
      fi: "Kun katsot kaikkea kirjoittamaasi, millainen ihminen siitä piirtyy? Katso häntä lempeästi.",
      en: "When you look at everything you have written, what kind of person takes shape? Look at them gently.",
    },
  },
];
