// @ts-check
import { defineConfig } from 'astro/config';
import clerk from "@clerk/astro";
import tailwindcss from '@tailwindcss/vite';
import { esMX } from '@clerk/localizations';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [clerk({
    domain: "somnolab.com.mx",
    isSatellite: false,
    appearance: {
      signIn: { 
        variables: { 
          colorPrimary: '#60BDC3', 
          colorForeground: '#60BDC3', 
          colorInputForeground: '#3E8CB1' 
        } 
      },
    },
    signInForceRedirectUrl: "/citas",
    localization: esMX
  })],
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),
  output: "server",
});