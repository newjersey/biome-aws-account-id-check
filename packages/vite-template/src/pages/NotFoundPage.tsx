import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalizeHref } from "@/i18n/navigation";
import { routePaths } from "@/routes/routePaths";

function NotFoundPage() {
  const { t } = useTranslation("notfound");
  const localizeHref = useLocalizeHref();

  return (
    <div>
      <h1 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">{t("heading")}</h1>
      <p className="usa-intro">{t("message")}</p>
      <p>{t("message2")}</p>
      <p>{t("message3")}</p>
      <div className="margin-y-5">
        <Link to={localizeHref(routePaths.home)} className="usa-button">
          {t("hometext")}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
