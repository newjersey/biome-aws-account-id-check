import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAbout from "@/content/en-US/about.json";
import enCommon from "@/content/en-US/common.json";
import enHome from "@/content/en-US/home.json";
import enNotFound from "@/content/en-US/notfound.json";
import enPages from "@/content/en-US/pages.json";
import esAbout from "@/content/es-US/about.json";
import esCommon from "@/content/es-US/common.json";
import esHome from "@/content/es-US/home.json";
import esNotFound from "@/content/es-US/notfound.json";
import esPages from "@/content/es-US/pages.json";

await i18n.use(initReactI18next).init({
  resources: {
    "en-US": {
      about: enAbout,
      common: enCommon,
      home: enHome,
      notfound: enNotFound,
      pages: enPages,
    },
    "es-US": {
      about: esAbout,
      common: esCommon,
      home: esHome,
      notfound: esNotFound,
      pages: esPages,
    },
  },
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
