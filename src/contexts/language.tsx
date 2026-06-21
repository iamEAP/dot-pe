import React from "react"

export type LanguageState = {
  langKey: string
  isTranslated: boolean
}

export type LanguageContextValue = [
  LanguageState,
  React.Dispatch<React.SetStateAction<LanguageState>>,
]

export const LanguageContext = React.createContext<LanguageContextValue>([
  { langKey: "en", isTranslated: false },
  () => {},
])
