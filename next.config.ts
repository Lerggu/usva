import type { NextConfig } from "next";

// "standalone" tuottaa pienen, itsenäisen palvelinpaketin julkaisua varten
// (ks. .github/workflows/main_usva.yml).
const config: NextConfig = { reactStrictMode: true, output: "standalone" };

export default config;
