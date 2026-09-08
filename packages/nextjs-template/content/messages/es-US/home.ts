/**
 * Provides United States Spanish homepage messages.
 */

import type { HomeMessages } from "@/content/messages/types";

export const home = {
  metadataTitle: "New Jersey Digital Service Starter",
  metadataDescription:
    "Una plantilla accesible de Next.js creada con el sistema de diseño Grove de New Jersey.",
  heroHeadingLead: "Una base de New Jersey",
  heading: "Cree servicios públicos claros y accesibles",
  introduction:
    "Comience con Next.js, TypeScript y Grove ya conectados para que su equipo pueda concentrarse en el servicio que necesitan los residentes de New Jersey.",
  primaryActionLabel: "Explorar Grove",
  featureIntroduction:
    "Esta plantilla sigue la estructura de página y los patrones de componentes establecidos por Grove para que los equipos comiencen con una experiencia de New Jersey conocida y accesible.",
  featureHeading: "Dedique la configuración a las decisiones importantes",
  accessibleFeature: {
    title: "Accesible de forma predeterminada",
    description:
      "Las regiones semánticas, los controles compatibles con teclado y las verificaciones automáticas de WCAG establecen una base sólida.",
  },
  consistencyFeature: {
    title: "Coherente con New Jersey",
    description:
      "Grove proporciona el lenguaje visual compartido, los patrones de interacción, los íconos y las convenciones de servicio público.",
  },
  developmentFeature: {
    title: "Listo para desarrollar",
    description:
      "App Router, TypeScript 7, Biome y los espacios de trabajo de pnpm están configurados para un trabajo de producto enfocado.",
  },
  operationsFeature: {
    title: "Listo para operar",
    description:
      "Las dependencias fijadas, las compilaciones repetibles, los contenedores y los comandos de CI reducen la incertidumbre de configuración.",
  },
  callToActionHeading: "Construya sobre la base compartida de New Jersey",
  callToActionIntroduction:
    "Use la orientación y los componentes de Grove para crear un servicio coherente y accesible para los residentes de New Jersey.",
  callToActionLabel: "Explorar la documentación de Grove",
} satisfies HomeMessages;
