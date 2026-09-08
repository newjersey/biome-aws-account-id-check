import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalizeHref } from "@/i18n/navigation";
import { routePaths } from "@/routes/routePaths";

function AboutPage() {
  const { t } = useTranslation(["about", "pages"]);
  const localizeHref = useLocalizeHref();
  return (
    <div>
      <h1>{t("about:heading")}</h1>
      <p>{t("about:body")}</p>
      <Link to={localizeHref(routePaths.home)}>{t("pages:home")}</Link>
    </div>
  );
}

export default AboutPage;
