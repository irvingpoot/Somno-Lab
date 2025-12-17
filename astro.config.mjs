// @ts-check
import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import tailwindcss from '@tailwindcss/vite';
import { dark } from '@clerk/themes';
import { esMX } from '@clerk/localizations';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk({
    appearance: { 
        baseTheme: ['simple'],
        signIn: { variables: { colorPrimary: '#60BDC3', colorForeground: '#60BDC3', colorInputForeground: '#3E8CB1' } },
      },
    signInForceRedirectUrl: "/citas",
    localization: esMX}
  )],
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({ mode: "standalone" }),
  output: "server",
});