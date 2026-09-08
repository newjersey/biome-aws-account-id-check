import { useTranslation } from "react-i18next";

const Identifier = () => {
  const { t } = useTranslation("common");
  const currentYear = new Date().getFullYear();

  return (
    <div className="usa-identifier">
      <section
        className="usa-identifier__section usa-identifier__section--masthead"
        aria-label="Agency identifier"
      >
        <div className="usa-identifier__container">
          <div className="usa-identifier__logos">
            <a href={t("govUrl")} className="usa-identifier__logo">
              <img
                className="usa-identifier__logo-img"
                src="/images/nj-logo-gray-20.png"
                alt="the State of New Jersey logo"
              />
            </a>
          </div>

          <div className="usa-identifier__identity">
            <p className="usa-identifier__identity-disclaimer">
              {t("identifier.officialWebsite")} <a href={t("govUrl")}>{t("stateName")}</a>.
            </p>
          </div>
        </div>
      </section>
      <nav className="usa-identifier__section usa-identifier__section--required-links">
        <div className="usa-identifier__container">
          <ul className="usa-identifier__required-links-list">
            <li className="usa-identifier__required-links-item">
              <a href={t("govAboutUrl")} className="usa-identifier__required-link">
                {t("governor")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a href={t("govLtAboutUrl")} className="usa-identifier__required-link">
                {t("ltGovernor")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a href={t("govUrl")} className="usa-identifier__required-link usa-link">
                {t("identifier.njhome")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a
                href={t("identifier.servicesUrl")}
                className="usa-identifier__required-link usa-link"
              >
                {t("identifier.services")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a
                href={t("identifier.departmentsUrl")}
                className="usa-identifier__required-link usa-link"
              >
                {t("identifier.departments")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a href={t("identifier.faqsUrl")} className="usa-identifier__required-link usa-link">
                {t("identifier.faqs")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a
                href={t("identifier.contactUrl")}
                className="usa-identifier__required-link usa-link"
              >
                {t("identifier.contact")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a
                href={t("identifier.privacyUrl")}
                className="usa-identifier__required-link usa-link"
              >
                {t("identifier.privacy")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a href={t("identifier.legalUrl")} className="usa-identifier__required-link usa-link">
                {t("identifier.legal")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a
                href={t("identifier.accessibilityUrl")}
                className="usa-identifier__required-link usa-link"
              >
                {t("identifier.accessibility")}
              </a>
            </li>
            <li className="usa-identifier__required-links-item">
              <a href={t("identifier.opraUrl")} className="usa-identifier__required-link usa-link">
                {t("identifier.opra")}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section className="usa-identifier__section usa-identifier__section--usagov">
        <div className="usa-identifier__container">
          <div className="usa-identifier__usagov-description">
            &copy; {currentYear} {t("stateName")}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Identifier;
