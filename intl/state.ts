import { BaseState, change, defaultConfig } from "apprise-frontend";
import { givenBase } from "apprise-frontend/frontend";
import i18next, { i18n } from "i18next";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import { Language, defaultLanguage } from "./model";
import { all } from "apprise-frontend/utils";

export type IntlState = {
  
  intl: i18n
  language:Language
    
}

export const initialIntl: IntlState = {

  intl: undefined!,
  language: defaultLanguage
}


export const intlstateapi = (s:BaseState) => ({

  currentLanguage: () => s.intl.language as Language,
  
  setCurrentLanguage: (l:Language) => all(s.intl.changeLanguage(l),change(s).with(t=>t.language=l)),

  set: (intl:i18next.i18n) => change(s).with(s => s.intl = intl),
  get: () => s.intl,
 
  isInitialized: () => s.intl !== undefined,

  init: () => {

    console.log("initialising intl...")
  
    const config = givenBase(s).config.get();
  
    const conf = { ...defaultConfig, ...config.intl }
    
    const deflang = conf.default 
    
    const path = `/${config.prefix}/${conf.loadPath}`
  
    var error: any = undefined;
  
    return i18next
     .use(XHR)
     .use(initReactI18next) // passes i18n down to react-i18next
     .init({
         // both seem required even if there's no language detection
         lng: deflang,          
         fallbackLng: deflang,  
         react: {
          useSuspense: false
        },
  
         debug:conf.debug,
         backend: { loadPath: path },
         interpolation: {  escapeValue: false } // react already safe from XSS
     
      }, 
        //  throwing errors from here won't propagae to thenables (must be caught)
        //  so we track the error manually and throw from the first thenable.
        e => { if (e) error = new Error(e)}   
        ).then(()=> { if (error) throw error })
   
      .then(()=>intlstateapi(s).set(i18next))
  }
  
})

