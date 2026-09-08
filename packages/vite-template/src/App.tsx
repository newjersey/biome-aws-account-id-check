import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Identifier from "@/components/Identifier/Identifier";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

function App() {
  const { locale = DEFAULT_LOCALE } = useParams<{ locale: Locale }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [i18n, locale]);

  return (
    <>
      <Banner />
      <Header />
      <main>
        <section className="grid-container usa-section">
          <Outlet />
        </section>
      </main>

      <footer role="contentinfo">
        <Footer />
        <Identifier />
      </footer>
    </>
  );
}

export default App;
