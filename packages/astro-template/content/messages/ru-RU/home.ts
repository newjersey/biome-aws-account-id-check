/**
 * Provides Russia Russian homepage messages.
 */

import type { HomeMessages } from "@/content/messages/types";

export const home = {
  metadataTitle: "New Jersey Digital Service Starter",
  metadataDescription:
    "Доступный шаблон Astro, созданный с использованием дизайн-системы Grove штата New Jersey.",
  heroHeadingLead: "Основа New Jersey",
  heading: "Создавайте понятные и доступные государственные услуги",
  introduction:
    "Начните с уже подключенных Astro, TypeScript и Grove, чтобы ваша команда могла сосредоточиться на услуге, необходимой жителям New Jersey.",
  primaryActionLabel: "Изучить Grove",
  featureIntroduction:
    "Этот шаблон следует установленной Grove структуре страниц и шаблонам компонентов, чтобы команды начинали со знакомого и доступного интерфейса New Jersey.",
  featureHeading: "Тратьте время настройки на важные решения",
  accessibleFeature: {
    title: "Доступность по умолчанию",
    description:
      "Семантические области, элементы управления с клавиатуры и автоматические проверки WCAG создают прочную основу.",
  },
  consistencyFeature: {
    title: "Соответствие New Jersey",
    description:
      "Grove предоставляет общий визуальный язык, шаблоны взаимодействия, значки и стандарты государственных услуг.",
  },
  developmentFeature: {
    title: "Готово к разработке",
    description:
      "Astro, TypeScript, Biome и рабочие пространства pnpm настроены для целенаправленной работы над продуктом.",
  },
  operationsFeature: {
    title: "Готово к эксплуатации",
    description:
      "Закрепленные зависимости, воспроизводимые сборки, контейнерные цели и команды CI снижают неопределенность настройки.",
  },
  callToActionHeading: "Создавайте на общей основе New Jersey",
  callToActionIntroduction:
    "Используйте рекомендации и компоненты Grove, чтобы создать единообразную и доступную услугу для жителей New Jersey.",
  callToActionLabel: "Открыть документацию Grove",
} satisfies HomeMessages;
