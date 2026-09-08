/**
 * Provides United States English homepage messages.
 */

import type { HomeMessages } from "@/content/messages/types";

export const home = {
  metadataTitle: "New Jersey Digital Service Starter",
  metadataDescription: "An accessible Astro starter built with New Jersey's Grove design system.",
  heroHeadingLead: "A New Jersey foundation",
  heading: "Build clear, accessible public services",
  introduction:
    "Start with Astro, TypeScript, and Grove already connected so your team can focus on the service New Jersey residents need.",
  primaryActionLabel: "Explore Grove",
  featureIntroduction:
    "This starter follows Grove's established page shell and component patterns so teams begin with a familiar, accessible New Jersey experience.",
  featureHeading: "Spend setup time on decisions that matter",
  accessibleFeature: {
    title: "Accessible by default",
    description:
      "Semantic landmarks, keyboard-friendly controls, and automated WCAG checks establish a strong baseline.",
  },
  consistencyFeature: {
    title: "Consistent with New Jersey",
    description:
      "Grove supplies the shared visual language, interaction patterns, icons, and public-service conventions.",
  },
  developmentFeature: {
    title: "Ready to develop",
    description:
      "Astro, TypeScript, Biome, and pnpm workspaces are configured for focused product work.",
  },
  operationsFeature: {
    title: "Ready to operate",
    description:
      "Pinned dependencies, repeatable builds, container targets, and CI commands reduce setup uncertainty.",
  },
  callToActionHeading: "Build on New Jersey's shared foundation",
  callToActionIntroduction:
    "Use Grove's guidance and components to create a consistent, accessible service for New Jersey residents.",
  callToActionLabel: "Explore Grove documentation",
} satisfies HomeMessages;
