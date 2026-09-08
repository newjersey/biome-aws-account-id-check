/**
 * Defines the topic contracts implemented by every localized message set.
 */

export interface NavigationItem {
  /** Text displayed for the link. */
  readonly label: string;
  /** Link destination. */
  readonly href: string;
  /** Whether the link identifies the current page. */
  readonly isCurrent?: boolean;
}

export interface SocialLink extends NavigationItem {
  /** Public path to the decorative icon displayed for the link. */
  readonly iconPath: string;
}

export interface LanguageSelectorMessages {
  /** Accessible label for language navigation. */
  readonly navigationLabel: string;
  /** Label displayed on the language selector trigger. */
  readonly buttonLabel: string;
  /** Hidden label identifying the selected language. */
  readonly currentLanguageLabel: string;
}

export interface ShellMessages {
  /** Label for the skip navigation link. */
  readonly skipLinkLabel: string;
  /** Accessible label for the Official Site Banner. */
  readonly officialSiteBannerLabel: string;
  /** Alternative text for the state seal. */
  readonly stateSealAlt: string;
  /** Official-site link text. */
  readonly officialSiteLabel: string;
  /** Current governor and lieutenant governor link text. */
  readonly governorLabel: string;
  /** Label for the state updates link. */
  readonly updatesLabel: string;
  /** Name displayed in the site header. */
  readonly siteName: string;
  /** Label displayed on the mobile navigation button. */
  readonly menuLabel: string;
  /** Accessible label for the navigation close button. */
  readonly closeNavigationLabel: string;
  /** Accessible label for primary navigation. */
  readonly navigationLabel: string;
  /** Label for the home navigation item. */
  readonly homeLabel: string;
  /** Label for the foundation navigation item. */
  readonly foundationLabel: string;
  /** Label for the next-steps navigation item. */
  readonly nextStepsLabel: string;
  /** Label for the Grove documentation navigation item. */
  readonly groveDocumentationLabel: string;
  /** Content displayed by the language selector. */
  readonly languageSelector: LanguageSelectorMessages;
}

export interface StarterFeature {
  /** Short feature heading. */
  readonly title: string;
  /** Plain-language explanation of the feature. */
  readonly description: string;
}

export interface HomeMessages {
  /** Browser and social title for the starter page. */
  readonly metadataTitle: string;
  /** Browser and social description for the starter page. */
  readonly metadataDescription: string;
  /** Introductory line displayed in the hero heading. */
  readonly heroHeadingLead: string;
  /** Main page heading. */
  readonly heading: string;
  /** Supporting introduction below the main heading. */
  readonly introduction: string;
  /** Label for the primary Grove documentation link. */
  readonly primaryActionLabel: string;
  /** Introductory statement for the feature section. */
  readonly featureIntroduction: string;
  /** Heading for the feature section. */
  readonly featureHeading: string;
  /** Accessible-by-default feature content. */
  readonly accessibleFeature: StarterFeature;
  /** New Jersey consistency feature content. */
  readonly consistencyFeature: StarterFeature;
  /** Development-readiness feature content. */
  readonly developmentFeature: StarterFeature;
  /** Operational-readiness feature content. */
  readonly operationsFeature: StarterFeature;
  /** Heading for the landing-page call to action. */
  readonly callToActionHeading: string;
  /** Supporting text for the landing-page call to action. */
  readonly callToActionIntroduction: string;
  /** Label for the landing-page call-to-action link. */
  readonly callToActionLabel: string;
}

export interface FooterMessages {
  /** Label for the return-to-top link. */
  readonly returnToTopLabel: string;
  /** Accessible label for footer navigation. */
  readonly navigationLabel: string;
  /** Label for the foundation footer link. */
  readonly foundationLabel: string;
  /** Label for the next-steps footer link. */
  readonly nextStepsLabel: string;
  /** Label for the Grove documentation footer link. */
  readonly groveDocumentationLabel: string;
  /** Agency name displayed in the Grove footer. */
  readonly agencyName: string;
  /** Heading displayed above agency contact links. */
  readonly contactHeading: string;
  /** Public website label displayed in the footer. */
  readonly contactWebsiteLabel: string;
  /** Public email address displayed in the footer. */
  readonly contactEmailLabel: string;
  /** Accessible label for the agency GitHub link. */
  readonly githubLabel: string;
  /** Accessible label for the Grove Storybook link. */
  readonly storybookLabel: string;
}

export interface IdentifierMessages {
  /** Accessible label for the agency identifier. */
  readonly label: string;
  /** Alternative text for the identifier logo. */
  readonly logoAlt: string;
  /** Text preceding the State of New Jersey link. */
  readonly disclaimerPrefix: string;
  /** State of New Jersey link text. */
  readonly stateName: string;
  /** Accessible label for required state links. */
  readonly navigationLabel: string;
  /** Governor link text. */
  readonly governorLabel: string;
  /** Lieutenant governor link text. */
  readonly lieutenantGovernorLabel: string;
  /** New Jersey home link text. */
  readonly homeLabel: string;
  /** Services directory link text. */
  readonly servicesLabel: string;
  /** Departments and agencies link text. */
  readonly departmentsLabel: string;
  /** Frequently asked questions link text. */
  readonly faqLabel: string;
  /** Contact link text. */
  readonly contactLabel: string;
  /** Privacy notice link text. */
  readonly privacyLabel: string;
  /** Legal statement link text. */
  readonly legalLabel: string;
  /** Accessibility link text. */
  readonly accessibilityLabel: string;
  /** Open Public Records Act link text. */
  readonly recordsLabel: string;
  /** Accessible label for the copyright section. */
  readonly copyrightLabel: string;
  /** Copyright statement containing a `{year}` placeholder. */
  readonly copyright: string;
}

export interface AppMessages {
  /** Application-shell messages. */
  readonly shell: ShellMessages;
  /** Homepage messages. */
  readonly home: HomeMessages;
  /** Footer messages. */
  readonly footer: FooterMessages;
  /** State identifier messages. */
  readonly identifier: IdentifierMessages;
}
