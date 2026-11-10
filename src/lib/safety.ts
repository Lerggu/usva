// Kriisin tunnistus. Tarkoituksella herkkä: väärä hälytys näyttää vain tukikortin,
// mutta huomaamatta jäänyt hätä on paljon pahempi virhe.
const PATTERNS: RegExp[] = [
  /itsemurh/i,
  /itsetuho/i,
  /tap(an|paa|paisin|paminen)\s+itse/i,
  /itse(ni|äni)\s+tap/i,
  /en\s+(halua|jaksa)\s+(enää\s+)?elää/i,
  /haluan\s+kuolla/i,
  /lopet(an|taa)\s+(elämäni|kaiken)/i,
  /päät(än|tää)\s+päiväni/i,
  /vahingoit(an|taa)\s+itse/i,
  /suicid/i,
  /kill\s+myself/i,
  /end\s+(my\s+life|it\s+all)/i,
  /(want|wish)\s+to\s+die/i,
  /don'?t\s+want\s+to\s+(live|be\s+alive)/i,
  /hurt(ing)?\s+myself/i,
  /self[-\s]?harm/i,
  /overdos/i,
  /yliannost/i,
];

export function detectCrisis(text: string): boolean {
  return PATTERNS.some((p) => p.test(text));
}
