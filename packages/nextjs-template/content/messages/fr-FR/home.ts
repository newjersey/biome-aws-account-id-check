/**
 * Provides France French homepage messages.
 */

import type { HomeMessages } from "@/content/messages/types";

export const home = {
  metadataTitle: "New Jersey Digital Service Starter",
  metadataDescription:
    "Un modèle Next.js accessible construit avec le système de conception Grove de New Jersey.",
  heroHeadingLead: "Une fondation de New Jersey",
  heading: "Créez des services publics clairs et accessibles",
  introduction:
    "Commencez avec Next.js, TypeScript et Grove déjà connectés afin que votre équipe puisse se concentrer sur le service dont les habitants de New Jersey ont besoin.",
  primaryActionLabel: "Découvrir Grove",
  featureIntroduction:
    "Ce modèle suit la structure de page et les modèles de composants établis par Grove afin que les équipes commencent avec une expérience de New Jersey familière et accessible.",
  featureHeading: "Consacrez la configuration aux décisions importantes",
  accessibleFeature: {
    title: "Accessible par défaut",
    description:
      "Les repères sémantiques, les commandes utilisables au clavier et les contrôles WCAG automatisés établissent une base solide.",
  },
  consistencyFeature: {
    title: "Cohérent avec New Jersey",
    description:
      "Grove fournit le langage visuel partagé, les modèles d'interaction, les icônes et les conventions des services publics.",
  },
  developmentFeature: {
    title: "Prêt pour le développement",
    description:
      "App Router, TypeScript 7, Biome et les espaces de travail pnpm sont configurés pour un travail produit ciblé.",
  },
  operationsFeature: {
    title: "Prêt pour l'exploitation",
    description:
      "Les dépendances épinglées, les builds reproductibles, les cibles de conteneur et les commandes CI réduisent les incertitudes de configuration.",
  },
  callToActionHeading: "Construisez sur la fondation commune de New Jersey",
  callToActionIntroduction:
    "Utilisez les recommandations et les composants de Grove pour créer un service cohérent et accessible aux habitants de New Jersey.",
  callToActionLabel: "Consulter la documentation Grove",
} satisfies HomeMessages;
