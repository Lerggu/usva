import type { L } from "./program";

// Päivän ajatukset. Teemat ovat tuttuja läheisten toipumisen perinteestä (irti
// päästäminen, rajat), läsnäolon opetuksista (ajatusten havainnointi, keho
// ankkurina) ja kahdentoista askeleen hoitoperinteestä (päivä kerrallaan,
// vertaistuki). Jokainen teksti on kirjoitettu Usvaa varten omin sanoin.
export type Thought = { theme: L; text: L };

const LETTING_GO: Thought[] = [
  {
    theme: { fi: "Irti päästäminen", en: "Letting go" },
    text: {
      fi: "Irti päästäminen ei tarkoita, että lakkaisit välittämästä. Se tarkoittaa, että lakkaat kantamasta sitä, mikä ei ole sinun kannettavaasi.",
      en: "Letting go does not mean you stop caring. It means you stop carrying what was never yours to carry.",
    },
  },
  {
    theme: { fi: "Toisen elämä", en: "Another's life" },
    text: {
      fi: "Et voi elää toisen ihmisen elämää hänen puolestaan, vaikka rakastaisit häntä kuinka paljon. Voit elää omaasi, ja se riittää.",
      en: "You cannot live another person's life for them, however much you love them. You can live your own, and that is enough.",
    },
  },
  {
    theme: { fi: "Rajat", en: "Boundaries" },
    text: {
      fi: "Raja ei ole muuri toista vastaan. Se on tapa kertoa, missä sinä alat ja mihin asti jaksat.",
      en: "A boundary is not a wall against someone. It is a way of saying where you begin and how far your strength reaches.",
    },
  },
  {
    theme: { fi: "Ei", en: "No" },
    text: {
      fi: "Saat sanoa ei ilman pitkää selitystä. Ystävällinen ei on rehellisempi lahja kuin väsynyt kyllä.",
      en: "You may say no without a long explanation. A kind no is a more honest gift than a weary yes.",
    },
  },
  {
    theme: { fi: "Tunteet", en: "Feelings" },
    text: {
      fi: "Tunne on vieras, joka tulee käymään. Sinun ei tarvitse totella sitä eikä ajaa sitä pois. Voit antaa sen istua hetken.",
      en: "A feeling is a visitor passing through. You need neither obey it nor drive it away. You can let it sit for a while.",
    },
  },
  {
    theme: { fi: "Itsestä huolehtiminen", en: "Caring for yourself" },
    text: {
      fi: "Itsestäsi huolehtiminen ei ole itsekkyyttä. Tyhjästä astiasta ei voi kaataa kenellekään.",
      en: "Looking after yourself is not selfishness. Nothing can be poured for anyone from an empty vessel.",
    },
  },
  {
    theme: { fi: "Päivä kerrallaan", en: "One day at a time" },
    text: {
      fi: "Koko elämää ei tarvitse jaksaa tänään. Tänään tarvitsee jaksaa vain tämä päivä, ja sekin hetki kerrallaan.",
      en: "You do not need the strength for a whole life today. Today asks only for today, and even that one moment at a time.",
    },
  },
  {
    theme: { fi: "Hallinta", en: "Control" },
    text: {
      fi: "Kun huomaat yrittäväsi ohjata toisen valintoja, voit kysyä hiljaa: mitä minä itse juuri nyt tarvitsen?",
      en: "When you notice yourself trying to steer another's choices, you can quietly ask: what do I need right now?",
    },
  },
  {
    theme: { fi: "Hyväksyminen", en: "Acceptance" },
    text: {
      fi: "Hyväksyminen ei ole sama asia kuin pitäminen. Se on vain sen myöntämistä, että asia on juuri nyt näin.",
      en: "Acceptance is not the same as approval. It is only admitting that, right now, this is how things are.",
    },
  },
  {
    theme: { fi: "Syyllisyys", en: "Guilt" },
    text: {
      fi: "Et aiheuttanut toisen ongelmaa, et voi hallita sitä etkä parantaa sitä. Tämä ei ole tappio. Se on vapautus.",
      en: "You did not cause another's trouble, you cannot control it and you cannot cure it. This is not a defeat. It is a release.",
    },
  },
  {
    theme: { fi: "Odotukset", en: "Expectations" },
    text: {
      fi: "Moni pettymys on odotus, jota ei koskaan sanottu ääneen. Mitä odotat tänään, ja keneltä?",
      en: "Many a disappointment is an expectation that was never spoken aloud. What do you expect today, and from whom?",
    },
  },
  {
    theme: { fi: "Avun pyytäminen", en: "Asking for help" },
    text: {
      fi: "Avun pyytäminen ei ole heikkoutta. Se on luottamusta siihen, ettei sinun tarvitse selvitä yksin.",
      en: "Asking for help is not weakness. It is trusting that you do not have to manage alone.",
    },
  },
  {
    theme: { fi: "Lepo", en: "Rest" },
    text: {
      fi: "Lepoa ei tarvitse ansaita. Keho ja mieli saavat levätä jo ennen kuin kaikki on valmista.",
      en: "Rest does not have to be earned. Body and mind may rest before everything is finished.",
    },
  },
  {
    theme: { fi: "Anteeksianto", en: "Forgiveness" },
    text: {
      fi: "Anteeksianto ei tee tapahtuneesta oikeaa. Se vain laskee sinut irti siitä, mikä on jo ohi.",
      en: "Forgiving does not make what happened right. It only sets you loose from what is already over.",
    },
  },
  {
    theme: { fi: "Oma arvo", en: "Your worth" },
    text: {
      fi: "Arvosi ei riipu siitä, kuinka paljon olet tänään hyödyksi muille. Se oli sinulla jo ennen ensimmäistäkään tekoa.",
      en: "Your worth does not depend on how useful you are to others today. You had it before you ever did a single thing.",
    },
  },
  {
    theme: { fi: "Pelko", en: "Fear" },
    text: {
      fi: "Pelko puhuu melkein aina huomisesta. Tässä hetkessä, juuri nyt, sinulla on usein kaikki tarvittava.",
      en: "Fear nearly always speaks of tomorrow. In this moment, right now, you often have all you need.",
    },
  },
  {
    theme: { fi: "Reagoiminen", en: "Reacting" },
    text: {
      fi: "Ärsykkeen ja vastauksen välissä on pieni tila. Yksi hengitys riittää tekemään siitä vähän suuremman.",
      en: "Between what happens and how you answer there is a small space. One breath is enough to make it a little wider.",
    },
  },
  {
    theme: { fi: "Rehellisyys", en: "Honesty" },
    text: {
      fi: "Rehellisyys alkaa siitä, että lakkaat sanomasta itsellesi kaiken olevan hyvin silloin, kun ei ole.",
      en: "Honesty begins when you stop telling yourself that everything is fine when it is not.",
    },
  },
  {
    theme: { fi: "Kiitollisuus", en: "Gratitude" },
    text: {
      fi: "Kiitollisuus ei kiellä sitä, mikä on vaikeaa. Se vain muistuttaa, että vaikean rinnalla on muutakin.",
      en: "Gratitude does not deny what is hard. It only reminds you that something else stands beside the hard.",
    },
  },
  {
    theme: { fi: "Pelastaminen", en: "Rescuing" },
    text: {
      fi: "Kun pelastat toisen seurauksilta, viet häneltä samalla mahdollisuuden oppia. Vierellä kulkeminen on eri asia kuin kantaminen.",
      en: "When you rescue someone from consequences, you also take away their chance to learn. Walking beside is different from carrying.",
    },
  },
  {
    theme: { fi: "Keskeneräisyys", en: "Being unfinished" },
    text: {
      fi: "Sinun ei tarvitse olla valmis ollaksesi hyvä. Keskeneräinen ihminen on aivan tavallinen ihminen.",
      en: "You do not need to be finished to be good. An unfinished person is a perfectly ordinary person.",
    },
  },
  {
    theme: { fi: "Suru", en: "Grief" },
    text: {
      fi: "Suru on rakkautta, jolla ei ole juuri nyt paikkaa mihin mennä. Sitä ei tarvitse kiirehtiä.",
      en: "Grief is love that has, for now, nowhere to go. It does not need to be hurried.",
    },
  },
  {
    theme: { fi: "Luottamus", en: "Trust" },
    text: {
      fi: "Et näe koko tietä, etkä tarvitsekaan. Seuraava askel riittää, ja se on yleensä näkyvissä.",
      en: "You cannot see the whole road, and you do not need to. The next step is enough, and it is usually in sight.",
    },
  },
  {
    theme: { fi: "Oma osuus", en: "Your own part" },
    text: {
      fi: "Oman osuuden näkeminen ei ole itsensä syyttämistä. Se on sen löytämistä, mihin voit itse vaikuttaa.",
      en: "Seeing your own part is not blaming yourself. It is finding the place where you yourself can make a difference.",
    },
  },
  {
    theme: { fi: "Ilo", en: "Joy" },
    text: {
      fi: "Saat iloita, vaikka jollakulla läheiselläsi olisi vaikeaa. Sinun ilosi ei vie häneltä mitään.",
      en: "You may feel joy even when someone close to you is struggling. Your joy takes nothing from them.",
    },
  },
  {
    theme: { fi: "Kiire", en: "Hurry" },
    text: {
      fi: "Kiire on usein tapa olla tuntematta. Mitä tapahtuisi, jos hidastaisit yhden asian verran?",
      en: "Hurry is often a way of not feeling. What would happen if you slowed down by just one thing?",
    },
  },
  {
    theme: { fi: "Vertailu", en: "Comparison" },
    text: {
      fi: "Näet toisista ulkopuolen ja itsestäsi sisäpuolen. Vertailu ei ole koskaan reilu sinua kohtaan.",
      en: "You see others from the outside and yourself from the inside. Comparison is never fair to you.",
    },
  },
  {
    theme: { fi: "Tämä hetki", en: "This moment" },
    text: {
      fi: "Mennyt on muisto ja tuleva on ajatus. Elämä tapahtuu vain tässä, missä hengityksesi juuri nyt kulkee.",
      en: "The past is a memory and the future is a thought. Life happens only here, where your breath is moving right now.",
    },
  },
];

const PRESENCE: Thought[] = [
  {
    theme: { fi: "Ajatusten katsoja", en: "The watcher of thoughts" },
    text: {
      fi: "Sinä et ole ajatuksesi. Olet se, joka huomaa ne. Jo huomaaminen tuo vähän tilaa.",
      en: "You are not your thoughts. You are the one who notices them. Noticing alone already brings a little space.",
    },
  },
  {
    theme: { fi: "Kellon aika ja mielen aika", en: "Clock time and mind time" },
    text: {
      fi: "Kelloa tarvitaan sovittuihin menoihin. Murehtimiseen ja katumiseen sitä ei tarvita. Kumpaa aikaa elät juuri nyt?",
      en: "A clock is needed for appointments. It is not needed for worrying or regretting. Which kind of time are you living in right now?",
    },
  },
  {
    theme: { fi: "Keho ankkurina", en: "The body as an anchor" },
    text: {
      fi: "Kun mieli karkaa, keho on yhä tässä. Tunnustele hetki käsiäsi sisältä päin.",
      en: "When the mind runs off, the body is still here. For a moment, feel your hands from the inside.",
    },
  },
  {
    theme: { fi: "Vanha kipu", en: "Old pain" },
    text: {
      fi: "Joskus tunne on suurempi kuin tilanne. Silloin vanha kipu on herännyt. Sitä voi katsoa lempeästi, eikä sen mukaan tarvitse toimia.",
      en: "Sometimes the feeling is larger than the situation. Then old pain has woken. It can be watched kindly, and need not be acted on.",
    },
  },
  {
    theme: { fi: "Vastustus", en: "Resistance" },
    text: {
      fi: "Suuri osa kärsimyksestä on sen vastustamista, mikä jo on. Mitä tapahtuu, jos annat tämän hetken olla sellainen kuin se on?",
      en: "Much suffering is resistance to what already is. What happens if you let this moment be as it is?",
    },
  },
  {
    theme: { fi: "Odottaminen", en: "Waiting" },
    text: {
      fi: "Jonossa, ruuhkassa, odotushuoneessa: jokainen odotus on kutsu palata hengitykseen.",
      en: "In a queue, in traffic, in a waiting room: every wait is an invitation to return to the breath.",
    },
  },
  {
    theme: { fi: "Hiljaisuus", en: "Silence" },
    text: {
      fi: "Äänten alla on hiljaisuus, josta ne nousevat. Kuuntele sitä hetki. Se on sinussakin.",
      en: "Beneath the sounds is the silence they rise from. Listen to it for a moment. It is in you too.",
    },
  },
  {
    theme: { fi: "Yksi asia kerrallaan", en: "One thing at a time" },
    text: {
      fi: "Anna yhdelle arkiselle teolle tänään koko huomiosi: käsien pesulle, portaille, kahvikupille.",
      en: "Give one ordinary act your whole attention today: washing your hands, the stairs, a cup of coffee.",
    },
  },
  {
    theme: { fi: "Ongelma vai tilanne", en: "A problem or a situation" },
    text: {
      fi: "Juuri tässä hetkessä on harvoin ongelmaa. On tilanne, johon joko toimit nyt tai annat sen olla.",
      en: "In this very moment there is seldom a problem. There is a situation you either act on now or let be.",
    },
  },
  {
    theme: { fi: "Tarina itsestä", en: "The story of me" },
    text: {
      fi: "Mieli kertoo sinusta tarinaa, joka on tehty menneestä. Sinä olet enemmän kuin tarinasi.",
      en: "The mind tells a story about you made out of the past. You are more than your story.",
    },
  },
  {
    theme: { fi: "Antautuminen", en: "Surrender" },
    text: {
      fi: "Antautuminen ei ole alistumista. Se on kyllän sanomista tälle hetkelle, jotta voit toimia siitä käsin selkeästi.",
      en: "Surrender is not giving in. It is saying yes to this moment so that you can act from it clearly.",
    },
  },
  {
    theme: { fi: "Kuunteleminen", en: "Listening" },
    text: {
      fi: "Kun kuuntelet toista ilman, että valmistelet vastaustasi, annat hänelle harvinaisen lahjan.",
      en: "When you listen to someone without preparing your reply, you give them a rare gift.",
    },
  },
  {
    theme: { fi: "Luonto", en: "Nature" },
    text: {
      fi: "Puu ei murehdi eilistä eikä kukka kiirehdi huomiseen. Katso tänään hetki jotakin elävää.",
      en: "A tree does not fret over yesterday, nor does a flower hurry toward tomorrow. Look at something living for a moment today.",
    },
  },
  {
    theme: { fi: "Hengitys", en: "The breath" },
    text: {
      fi: "Yksi tietoinen hengitys on jo hetki läsnäoloa. Niitä mahtuu päivään enemmän kuin arvaat.",
      en: "One conscious breath is already a moment of presence. A day has room for more of them than you would guess.",
    },
  },
];

const RECOVERY: Thought[] = [
  {
    theme: { fi: "Sairaus, ei häpeä", en: "An illness, not a disgrace" },
    text: {
      fi: "Riippuvuus on sairaus, ei luonteen heikkoutta. Sairaudesta toipumista ei tarvitse hävetä.",
      en: "Addiction is an illness, not a weakness of character. Recovering from an illness is nothing to be ashamed of.",
    },
  },
  {
    theme: { fi: "Vain tänään", en: "Just today" },
    text: {
      fi: "Loppuelämää ei tarvitse luvata. Tänään riittää, että tämä päivä menee toisin.",
      en: "You need not promise the rest of your life. For today it is enough that this day goes differently.",
    },
  },
  {
    theme: { fi: "Mieliteko menee ohi", en: "A craving passes" },
    text: {
      fi: "Mieliteko nousee kuin aalto ja myös laskee. Sinun ei tarvitse tehdä sille mitään, vain odottaa sen yli.",
      en: "A craving rises like a wave and also falls. You need not do anything about it, only wait it out.",
    },
  },
  {
    theme: { fi: "Et ole ainoa", en: "You are not the only one" },
    text: {
      fi: "Joku on ollut täsmälleen tässä ja löytänyt tien eteenpäin. Hänen kokemuksensa on sinunkin käytettävissäsi.",
      en: "Someone has been exactly here and found a way forward. Their experience is there for you to use.",
    },
  },
  {
    theme: { fi: "Yhdessä", en: "Together" },
    text: {
      fi: "Yksin jääminen on toipumisen suurin este. Yksi puhelu tai yksi kohtaaminen tänään voi muuttaa päivän suunnan.",
      en: "Being left alone is the greatest obstacle to recovery. One call or one meeting today can change the day's direction.",
    },
  },
  {
    theme: { fi: "Nälkä, väsymys, yksinäisyys", en: "Hungry, tired, lonely" },
    text: {
      fi: "Moni vaikea hetki on oikeasti nälkää, väsymystä, kiukkua tai yksinäisyyttä. Mitä kehosi tarvitsee juuri nyt?",
      en: "Many a hard moment is really hunger, tiredness, anger or loneliness. What does your body need right now?",
    },
  },
  {
    theme: { fi: "Salaisuudet", en: "Secrets" },
    text: {
      fi: "Se, mitä kannat salassa, painaa eniten. Ääneen sanottu asia kevenee jo sanomisesta.",
      en: "What you carry in secret weighs the most. A thing said aloud grows lighter in the saying.",
    },
  },
  {
    theme: { fi: "Arjen rytmi", en: "The rhythm of the day" },
    text: {
      fi: "Säännöllinen uni, ruoka ja liike eivät ole pieniä asioita. Ne ovat maa, jonka päällä muu toipuminen seisoo.",
      en: "Regular sleep, food and movement are not small things. They are the ground the rest of recovery stands on.",
    },
  },
  {
    theme: { fi: "Kompastuminen", en: "Stumbling" },
    text: {
      fi: "Kompastuminen ei pyyhi pois yhtään kuljettua päivää. Tärkeintä on, mitä teet seuraavaksi, ja kenelle kerrot.",
      en: "A stumble does not erase a single day you have walked. What matters is what you do next, and whom you tell.",
    },
  },
  {
    theme: { fi: "Nöyryys", en: "Humility" },
    text: {
      fi: "Nöyryys ei ole itsensä vähättelyä. Se on sen myöntämistä, että tarvitset muita, niin kuin kaikki tarvitsevat.",
      en: "Humility is not thinking little of yourself. It is admitting that you need others, as everyone does.",
    },
  },
  {
    theme: { fi: "Läheiset", en: "Those close to you" },
    text: {
      fi: "Sairaus koskettaa myös niitä, jotka rakastavat sinua. Heidänkin on lupa toipua omaan tahtiinsa.",
      en: "The illness also touches those who love you. They too are allowed to recover at their own pace.",
    },
  },
  {
    theme: { fi: "Vanhat paikat", en: "Old places" },
    text: {
      fi: "Jotkin paikat, ihmiset ja tavat vetävät takaisin vanhaan. Niistä saa pysyä poissa ilman selityksiä.",
      en: "Some places, people and habits pull you back toward the old. You may stay away from them without explaining.",
    },
  },
  {
    theme: { fi: "Toisen auttaminen", en: "Helping another" },
    text: {
      fi: "Kun kuuntelet toista, joka kamppailee, autat samalla itseäsi. Saatu kasvaa, kun sitä antaa eteenpäin.",
      en: "When you listen to someone who is struggling, you help yourself as well. What you have received grows when you pass it on.",
    },
  },
  {
    theme: { fi: "Pieni edistys", en: "Small progress" },
    text: {
      fi: "Toipuminen on suunta, ei suoritus. Pienikin askel oikeaan suuntaan on tänään kokonainen askel.",
      en: "Recovery is a direction, not a performance. Even a small step the right way is a whole step today.",
    },
  },
];

// Kolme teemaa vuorottelevat, jotta peräkkäiset päivät ovat erilaisia: irti
// päästäminen, läsnäolo, irti päästäminen, toipuminen.
export const THOUGHTS: Thought[] = LETTING_GO.flatMap((thought, i) => [
  thought,
  i % 2 === 0 ? PRESENCE[i / 2] : RECOVERY[(i - 1) / 2],
]);

// Sama päivä antaa aina saman ajatuksen, ja ajatukset kiertävät järjestyksessä.
export function thoughtFor(dayKey: string): Thought {
  const days = Math.floor(Date.parse(`${dayKey}T00:00:00Z`) / 86_400_000);
  return THOUGHTS[((days % THOUGHTS.length) + THOUGHTS.length) % THOUGHTS.length];
}
