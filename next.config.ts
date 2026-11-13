import type { NextConfig } from "next";

// "standalone" tuottaa pienen, itsenäisen palvelinpaketin julkaisua varten
// (ks. .github/workflows/main_usva.yml).
const config: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Julkaistun version tunniste näkyy asetuksissa, jotta voi tarkistaa, mikä
  // versio selaimessa on auki.
  env: { NEXT_PUBLIC_BUILD: process.env.GITHUB_SHA?.slice(0, 7) ?? "dev" },
  // Sivut tarkistetaan palvelimelta joka latauksella, jotta selain ei jää
  // näyttämään vanhaa versiota julkaisun jälkeen. Versioidut tiedostot
  // (/_next/static) saavat yhä pitkän välimuistin.
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image).*)",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
    ];
  },
};

export default config;
