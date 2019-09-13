

export type Language = "fr" | "en" | "ar" | "zh" | "es" | "ru"

export const allLanguages : Language[] = ["fr","en","ar","zh","es","ru"]
export const defaultLanguage = "en" as Language

export type IntlConfig = {
  intl: {
    languages:Language[]
    required?:Language[]
    default: Language,
    loadPath: string,
    debug:boolean
  }
}

export const defaultConfig  = {
  
  default: defaultLanguage,
  loadPath: 'locale/{{lng}}_{{ns}}.json',
  languages: allLanguages,     // support all languages by default
  required: [defaultLanguage],
  debug:false
}

export const fullnameOf = (lang:Language) => {

  switch (lang) {

    case "en" : return "English"
    case "fr" : return "French"
    case "es" : return "Spanish"
    case "zh" : return "Chinese"
    case "ru" : return "Russion"
    case "ar" : return "Arabic"
  }
}