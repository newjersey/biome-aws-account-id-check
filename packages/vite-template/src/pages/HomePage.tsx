import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalizeHref } from "@/i18n/navigation";
import { routePaths } from "@/routes/routePaths";

function HomePage() {
  const { t } = useTranslation(["home", "pages"]);
  const localizeHref = useLocalizeHref();
  return (
    <div>
      <h1>{t("home:heading")}</h1>
      <p>{t("home:body")}</p>
      <Link to={localizeHref(routePaths.about)}>{t("pages:about")}</Link>
    </div>
  );
}

export default HomePage;
