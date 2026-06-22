import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      "Fast-forward to {{date}}": "Fast-forward to {{date}}",
      "Rewind to {{date}}": "Rewind to {{date}}",
      "There will be more": "There will be more",
      "There was more": "There was more",
      "More {{category}}": "More {{category}}",
      "Browse by category": "Browse by category",
      "Not Found": "Not Found",
      "You just hit a page that doesn't exist":
        "You just hit a page that doesn't exist",
    },
  },
  sv: {
    translation: {
      "Fast-forward to {{date}}": "Spola framåt till {{date}}",
      "Rewind to {{date}}": "Spola tillbaka till {{date}}",
      "There will be more": "Det kommer mer",
      "There was more": "Det fanns mer",
      "More {{category}}": "Mer {{category}}",
      "Browse by category": "Bläddra efter kategori",
      "Not Found": "Ej Hittad",
      "You just hit a page that doesn't exist":
        "Du hittade precis en sida som inte finns",
    },
  },
}

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
