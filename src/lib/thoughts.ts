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

// Hiljentymiset: lyhyt kutsu pysähtyä ennen aikomusta.
export const PRACTICES: L[] = [
  { fi: "Jos haluat, hengitä kolme kertaa hitaasti ja anna uloshengityksen olla vähän sisäänhengitystä pidempi.", en: "If you like, take three slow breaths and let each out-breath be a little longer than the in-breath." },
  { fi: "Voit tunnustella jalkapohjiasi lattiaa vasten. Paino lepää niillä ilman, että teet mitään.", en: "You can feel the soles of your feet against the floor. Your weight rests on them without your doing anything." },
  { fi: "Kuuntele hetki kauimmaista ääntä, jonka erotat. Sitten lähintä.", en: "Listen for a moment to the farthest sound you can make out. Then the nearest." },
  { fi: "Voit laskea hartiat alas korvista ja antaa leuan pehmetä.", en: "You can let your shoulders drop away from your ears and let your jaw soften." },
  { fi: "Katso ympärillesi ja nimeä mielessäsi kolme asiaa, jotka näet juuri nyt.", en: "Look around and silently name three things you can see right now." },
  { fi: "Jos se tuntuu hyvältä, laske käsi rinnalle ja tunne sen lämpö hetken ajan.", en: "If it feels right, lay a hand on your chest and feel its warmth for a moment." },
  { fi: "Voit seurata yhtä hengitystä alusta loppuun, kuin kuuntelisit aallon tulevan rantaan ja vetäytyvän.", en: "You can follow one breath from beginning to end, as if listening to a wave come ashore and draw back." },
  { fi: "Tunnustele käsiäsi sisältä päin. Onko niissä lämpöä, kihelmöintiä, painoa?", en: "Feel your hands from the inside. Is there warmth, tingling, weight?" },
  { fi: "Voit kysyä itseltäsi hiljaa: mitä tunnen juuri nyt? Vastausta ei tarvitse korjata.", en: "You can quietly ask yourself: what am I feeling right now? The answer needs no fixing." },
  { fi: "Juo seuraava kulaus vettä tai kahvia niin hitaasti, että maistat sen kokonaan.", en: "Take your next sip of water or coffee slowly enough to taste it completely." },
  { fi: "Jos mieleesi nousee huoli, voit sanoa sille: näen sinut. Ja palata hengitykseen.", en: "If a worry comes up, you can say to it: I see you. And return to the breath." },
  { fi: "Voit venyttää käsiä kohti kattoa ja antaa niiden laskeutua hitaasti uloshengityksellä.", en: "You can stretch your arms toward the ceiling and let them come down slowly on the out-breath." },
  { fi: "Katso hetki ikkunasta ulos. Mitä valo tekee juuri nyt?", en: "Look out of a window for a moment. What is the light doing right now?" },
  { fi: "Tunnustele, missä kohtaa kehoa hengitys tuntuu selvimmin: sieraimissa, rinnassa vai vatsalla.", en: "Notice where in the body the breath is felt most clearly: the nostrils, the chest or the belly." },
  { fi: "Voit istua minuutin tekemättä mitään. Se ei ole hukkaan heitettyä aikaa.", en: "You can sit for a minute doing nothing. It is not wasted time." },
  { fi: "Jos jokin kohta kehossa on kireä, voit hengittää sitä kohti ja antaa sen olla.", en: "If some place in your body is tight, you can breathe toward it and let it be." },
  { fi: "Ajattele hetki yhtä ihmistä, jolle toivot hyvää. Anna toiveen lähteä hänen luokseen.", en: "Think for a moment of one person you wish well. Let the wish travel to them." },
  { fi: "Voit kävellä seuraavat kymmenen askelta niin, että tunnet jokaisen niistä.", en: "You can walk your next ten steps so that you feel each one." },
  { fi: "Sulje silmät hetkeksi, jos haluat, ja huomaa, että olet tässä, vaikka et näe mitään.", en: "Close your eyes for a moment, if you like, and notice that you are here even when you see nothing." },
  { fi: "Voit sanoa itsellesi hiljaa oman nimesi ja sen perään: olen tässä.", en: "You can quietly say your own name to yourself and after it: I am here." },
  { fi: "Tunnustele vaatteen kosketusta ihollasi. Se on ollut siinä koko ajan.", en: "Feel the touch of your clothing on your skin. It has been there all along." },
  { fi: "Jos ajatus vie mukanaan, voit huomata sen ja palata. Palaaminen on itse harjoitus.", en: "If a thought carries you off, you can notice it and return. The returning is the practice itself." },
  { fi: "Voit hengittää sisään laskien neljään ja ulos laskien kuuteen, muutaman kerran.", en: "You can breathe in to a count of four and out to a count of six, a few times." },
  { fi: "Katso käsiäsi hetki. Ne ovat kantaneet sinua läpi kaiken tähän asti.", en: "Look at your hands for a moment. They have carried you through everything so far." },
  { fi: "Voit kiittää hiljaa yhdestä asiasta, joka on hyvin juuri nyt, vaikka se olisi pieni.", en: "You can quietly give thanks for one thing that is well right now, however small." },
];

// Päivän lauseet: yksi lause, jonka voi kantaa mukanaan.
export const SENTENCES: L[] = [
  { fi: "Tänään minun ei tarvitse olla valmis.", en: "Today I do not have to be finished." },
  { fi: "Tänään teen yhden asian kerrallaan.", en: "Today I do one thing at a time." },
  { fi: "Tänään saan pyytää apua.", en: "Today I may ask for help." },
  { fi: "Tänään annan toisten elää omaa elämäänsä.", en: "Today I let others live their own lives." },
  { fi: "Tänään olen itselleni ystävä.", en: "Today I am a friend to myself." },
  { fi: "Tänään riittää, että olen rehellinen.", en: "Today it is enough that I am honest." },
  { fi: "Tänään palaan hengitykseen niin monta kertaa kuin tarvitsen.", en: "Today I return to the breath as many times as I need." },
  { fi: "Tänään saan sanoa ei.", en: "Today I may say no." },
  { fi: "Tänään annan tunteen tulla ja mennä.", en: "Today I let a feeling come and go." },
  { fi: "Tänään en kanna huomista.", en: "Today I do not carry tomorrow." },
  { fi: "Tänään lasken irti yhdestä asiasta, jota en voi muuttaa.", en: "Today I let go of one thing I cannot change." },
  { fi: "Tänään huolehdin kehostani lempeästi.", en: "Today I look after my body gently." },
  { fi: "Tänään kuuntelen ennen kuin vastaan.", en: "Today I listen before I answer." },
  { fi: "Tänään saan levätä.", en: "Today I may rest." },
  { fi: "Tänään luotan seuraavaan askeleeseen.", en: "Today I trust the next step." },
  { fi: "Tänään huomaan yhden hyvän asian.", en: "Today I notice one good thing." },
  { fi: "Tänään en vertaa itseäni muihin.", en: "Today I do not compare myself with others." },
  { fi: "Tänään olen tässä, missä jalkani ovat.", en: "Today I am here, where my feet are." },
  { fi: "Tänään annan itselleni anteeksi yhden asian.", en: "Today I forgive myself one thing." },
  { fi: "Tänään kerron jollekulle, miten oikeasti voin.", en: "Today I tell someone how I really am." },
  { fi: "Tänään minun ei tarvitse hallita kaikkea.", en: "Today I do not have to control everything." },
  { fi: "Tänään pieni askel on kokonainen askel.", en: "Today a small step is a whole step." },
  { fi: "Tänään otan vastaan sen, mitä päivä tuo.", en: "Today I receive what the day brings." },
  { fi: "Tänään hidastan yhden asian verran.", en: "Today I slow down by one thing." },
  { fi: "Tänään saan iloita.", en: "Today I may feel joy." },
  { fi: "Tänään olen kiitollinen siitä, että olen tässä.", en: "Today I am grateful to be here." },
  { fi: "Tänään aloitan alusta niin monta kertaa kuin tarvitsen.", en: "Today I begin again as many times as I need." },
];

// Lainaukset ovat ainoat tekstit, joita ei ole kirjoitettu Usvaa varten. Jokainen
// on tarkistettu sanatarkasti Project Gutenbergin laitoksesta, ja sekä tekijän että
// englanninkielisen kääntäjän kuolemasta on yli 70 vuotta. Suomennokset ovat omia.
// Lähteet ja kääntäjät: docs/OHJELMARUNKO.md.
export type Quote = { text: L; author: string; work: L };

export const QUOTES: Quote[] = [
  { text: { fi: "Pysy nykyhetkessä.", en: "Confine thyself to the present." }, author: "Marcus Aurelius", work: { fi: "Itsetutkiskeluja", en: "Meditations" } },
  { text: { fi: "On sinun vallassasi vetäytyä itseesi milloin vain tahdot.", en: "It is in thy power whenever thou shalt choose to retire into thyself." }, author: "Marcus Aurelius", work: { fi: "Itsetutkiskeluja", en: "Meditations" } },
  { text: { fi: "Älä järkytä itseäsi ajattelemalla koko elämääsi kerralla.", en: "Do not disturb thyself by thinking of the whole of thy life." }, author: "Marcus Aurelius", work: { fi: "Itsetutkiskeluja", en: "Meditations" } },
  { text: { fi: "Millaisia ovat tavanomaiset ajatuksesi, sellainen on mielesi luonne, sillä ajatukset värjäävät sielun.", en: "Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts." }, author: "Marcus Aurelius", work: { fi: "Itsetutkiskeluja", en: "Meditations" } },
  { text: { fi: "On asioita, jotka ovat vallassamme, ja asioita, jotka eivät ole vallassamme.", en: "There are things which are within our power, and there are things which are beyond our power." }, author: "Epiktetos", work: { fi: "Käsikirja", en: "The Enchiridion" } },
  { text: { fi: "Älä vaadi, että asiat tapahtuvat niin kuin toivot, vaan toivo niiden tapahtuvan niin kuin ne tapahtuvat, niin elämäsi sujuu hyvin.", en: "Demand not that events should happen as you wish; but wish them to happen as they do happen, and you will go on well." }, author: "Epiktetos", work: { fi: "Käsikirja", en: "The Enchiridion" } },
  { text: { fi: "Tuhannen virstan matka alkoi yhdestä askeleesta.", en: "The journey of a thousand li commenced with a single step." }, author: "Laotse", work: { fi: "Tao Te Ching", en: "Tao Te Ching" } },
  { text: { fi: "Joka tuntee toiset, on tarkkanäköinen; joka tuntee itsensä, on viisas.", en: "He who knows other men is discerning; he who knows himself is intelligent." }, author: "Laotse", work: { fi: "Tao Te Ching", en: "Tao Te Ching" } },
  { text: { fi: "Maailman pehmein voittaa kovimman.", en: "The softest thing in the world dashes against and overcomes the hardest." }, author: "Laotse", work: { fi: "Tao Te Ching", en: "Tao Te Ching" } },
  { text: { fi: "Viha ei milloinkaan lopu vihalla; viha loppuu rakkaudella. Tämä on ikivanha sääntö.", en: "Hatred does not cease by hatred at any time: hatred ceases by love, this is an old rule." }, author: "Dhammapada", work: { fi: "", en: "" } },
  { text: { fi: "Jos yksi voittaa taistelussa tuhat kertaa tuhat miestä ja toinen voittaa itsensä, on jälkimmäinen voittajista suurin.", en: "If one man conquer in battle a thousand times thousand men, and if another conquer himself, he is the greatest of conquerors." }, author: "Dhammapada", work: { fi: "", en: "" } },
  { text: { fi: "Menin metsään, koska halusin elää harkiten ja kohdata vain elämän olennaiset tosiasiat.", en: "I went to the woods because I wished to live deliberately, to front only the essential facts of life." }, author: "Henry David Thoreau", work: { fi: "Walden", en: "Walden" } },
  { text: { fi: "Mikään ei voi tuoda sinulle rauhaa paitsi sinä itse.", en: "Nothing can bring you peace but yourself." }, author: "Ralph Waldo Emerson", work: { fi: "Luota itseesi", en: "Self-Reliance" } },
];

export type Opening = { thought: Thought; practice: L; quote: Quote; sentence: L };

function pick<T>(items: T[], days: number): T {
  return items[((days % items.length) + items.length) % items.length];
}

// Päivänavaus. Neljän listan pituuksilla (56, 25, 13, 27) ei ole yhteisiä
// tekijöitä, joten sama yhdistelmä ei toistu vuosikymmeniin.
export function openingFor(dayKey: string): Opening {
  const days = Math.floor(Date.parse(`${dayKey}T00:00:00Z`) / 86_400_000);
  return {
    thought: pick(THOUGHTS, days),
    practice: pick(PRACTICES, days),
    quote: pick(QUOTES, days),
    sentence: pick(SENTENCES, days),
  };
}
