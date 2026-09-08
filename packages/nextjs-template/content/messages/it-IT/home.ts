/**
 * Provides Italy Italian homepage messages.
 */

import type { HomeMessages } from "@/content/messages/types";

export const home = {
  metadataTitle: "New Jersey Digital Service Starter",
  metadataDescription:
    "Un modello Next.js accessibile realizzato con il sistema di progettazione Grove del New Jersey.",
  heroHeadingLead: "Una base del New Jersey",
  heading: "Crea servizi pubblici chiari e accessibili",
  introduction:
    "Inizia con Next.js, TypeScript e Grove già collegati, così il tuo team può concentrarsi sul servizio di cui hanno bisogno i residenti del New Jersey.",
  primaryActionLabel: "Esplora Grove",
  featureIntroduction:
    "Questo modello segue la struttura delle pagine e i modelli dei componenti definiti da Grove, offrendo ai team un'esperienza del New Jersey familiare e accessibile.",
  featureHeading: "Dedica la configurazione alle decisioni importanti",
  accessibleFeature: {
    title: "Accessibile per impostazione predefinita",
    description:
      "Riferimenti semantici, controlli utilizzabili da tastiera e verifiche WCAG automatizzate creano una base solida.",
  },
  consistencyFeature: {
    title: "Coerente con il New Jersey",
    description:
      "Grove fornisce il linguaggio visivo condiviso, i modelli di interazione, le icone e le convenzioni dei servizi pubblici.",
  },
  developmentFeature: {
    title: "Pronto per lo sviluppo",
    description:
      "App Router, TypeScript 7, Biome e gli spazi di lavoro pnpm sono configurati per un lavoro di prodotto mirato.",
  },
  operationsFeature: {
    title: "Pronto per l'esercizio",
    description:
      "Dipendenze bloccate, build ripetibili, destinazioni container e comandi CI riducono l'incertezza della configurazione.",
  },
  callToActionHeading: "Costruisci sulla base condivisa di New Jersey",
  callToActionIntroduction:
    "Usa le indicazioni e i componenti di Grove per creare un servizio coerente e accessibile per i residenti di New Jersey.",
  callToActionLabel: "Esplora la documentazione Grove",
} satisfies HomeMessages;
