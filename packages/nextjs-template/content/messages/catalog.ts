/**
 * Composes localized topic modules into the next-intl message catalog.
 */

import { footer as arSaFooter } from "@/content/messages/ar-SA/footer";
import { home as arSaHome } from "@/content/messages/ar-SA/home";
import { identifier as arSaIdentifier } from "@/content/messages/ar-SA/identifier";
import { shell as arSaShell } from "@/content/messages/ar-SA/shell";
import { footer as enUsFooter } from "@/content/messages/en-US/footer";
import { home as enUsHome } from "@/content/messages/en-US/home";
import { identifier as enUsIdentifier } from "@/content/messages/en-US/identifier";
import { shell as enUsShell } from "@/content/messages/en-US/shell";
import { footer as esUsFooter } from "@/content/messages/es-US/footer";
import { home as esUsHome } from "@/content/messages/es-US/home";
import { identifier as esUsIdentifier } from "@/content/messages/es-US/identifier";
import { shell as esUsShell } from "@/content/messages/es-US/shell";
import { footer as frFrFooter } from "@/content/messages/fr-FR/footer";
import { home as frFrHome } from "@/content/messages/fr-FR/home";
import { identifier as frFrIdentifier } from "@/content/messages/fr-FR/identifier";
import { shell as frFrShell } from "@/content/messages/fr-FR/shell";
import { footer as itItFooter } from "@/content/messages/it-IT/footer";
import { home as itItHome } from "@/content/messages/it-IT/home";
import { identifier as itItIdentifier } from "@/content/messages/it-IT/identifier";
import { shell as itItShell } from "@/content/messages/it-IT/shell";
import { footer as ruRuFooter } from "@/content/messages/ru-RU/footer";
import { home as ruRuHome } from "@/content/messages/ru-RU/home";
import { identifier as ruRuIdentifier } from "@/content/messages/ru-RU/identifier";
import { shell as ruRuShell } from "@/content/messages/ru-RU/shell";
import type { AppMessages } from "@/content/messages/types";
import { footer as zhCnFooter } from "@/content/messages/zh-CN/footer";
import { home as zhCnHome } from "@/content/messages/zh-CN/home";
import { identifier as zhCnIdentifier } from "@/content/messages/zh-CN/identifier";
import { shell as zhCnShell } from "@/content/messages/zh-CN/shell";
import type { AppLocale } from "@/i18n/locales";

export const MESSAGE_CATALOG = {
  "ar-SA": {
    shell: arSaShell,
    home: arSaHome,
    footer: arSaFooter,
    identifier: arSaIdentifier,
  },
  "zh-CN": {
    shell: zhCnShell,
    home: zhCnHome,
    footer: zhCnFooter,
    identifier: zhCnIdentifier,
  },
  "en-US": {
    shell: enUsShell,
    home: enUsHome,
    footer: enUsFooter,
    identifier: enUsIdentifier,
  },
  "es-US": {
    shell: esUsShell,
    home: esUsHome,
    footer: esUsFooter,
    identifier: esUsIdentifier,
  },
  "fr-FR": {
    shell: frFrShell,
    home: frFrHome,
    footer: frFrFooter,
    identifier: frFrIdentifier,
  },
  "it-IT": {
    shell: itItShell,
    home: itItHome,
    footer: itItFooter,
    identifier: itItIdentifier,
  },
  "ru-RU": {
    shell: ruRuShell,
    home: ruRuHome,
    footer: ruRuFooter,
    identifier: ruRuIdentifier,
  },
} satisfies Record<AppLocale, AppMessages>;
