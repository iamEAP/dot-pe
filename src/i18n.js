import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      "Fast-forward to {{date}}": "Fast-forward to {{date}}",
      "Rewind to {{date}}": "Rewind to {{date}}",
      "There will probably be more": "There will probably be more",
      "There was probably more": "There was probably more",
      "Not Found": "Not Found",
      "You just hit a page that doesn't exist":
        "You just hit a page that doesn't exist",
    },
  },
  sv: {
    translation: {
      "Fast-forward to {{date}}": "Spola framåt till {{date}}",
      "Rewind to {{date}}": "Spola tillbaka till  {{date}}",
      "There will probably be more": "Det kommer nog att finnas fler",
      "There was probably more": "Det fanns nog fler",
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
