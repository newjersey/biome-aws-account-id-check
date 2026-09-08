/**
 * Provides Mainland China Simplified Chinese homepage messages.
 */

import type { HomeMessages } from "@/content/messages/types";

export const home = {
  metadataTitle: "New Jersey Digital Service Starter",
  metadataDescription: "使用 New Jersey Grove 设计系统构建的无障碍 Next.js 入门模板。",
  heroHeadingLead: "New Jersey 基础",
  heading: "构建清晰、无障碍的公共服务",
  introduction:
    "从已连接的 Next.js、TypeScript 和 Grove 开始，让您的团队专注于 New Jersey 居民需要的服务。",
  primaryActionLabel: "探索 Grove",
  featureIntroduction:
    "此模板遵循 Grove 已建立的页面框架和组件模式，让团队从熟悉、无障碍的 New Jersey 体验开始。",
  featureHeading: "把设置时间用于重要决策",
  accessibleFeature: {
    title: "默认无障碍",
    description: "语义化地标、键盘友好控件和自动 WCAG 检查构成坚实基础。",
  },
  consistencyFeature: {
    title: "与 New Jersey 保持一致",
    description: "Grove 提供共享的视觉语言、交互模式、图标和公共服务规范。",
  },
  developmentFeature: {
    title: "可立即开发",
    description: "App Router、TypeScript 7、Biome 和 pnpm 工作区已为专注的产品工作配置完成。",
  },
  operationsFeature: {
    title: "可立即运行",
    description: "固定依赖项、可重复构建、容器目标和 CI 命令可减少设置的不确定性。",
  },
  callToActionHeading: "基于 New Jersey 的共享基础进行构建",
  callToActionIntroduction: "使用 Grove 的指南和组件，为 New Jersey 居民创建一致、无障碍的服务。",
  callToActionLabel: "浏览 Grove 文档",
} satisfies HomeMessages;
