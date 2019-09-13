

import enUS from "antd/es/locale/en_US"
import frFR from "antd/es/locale/fr_FR"
import caES from "antd/es/locale/ca_ES"
import ruRU from "antd/es/locale/ru_RU"
import zhCN from "antd/es/locale/zh_CN"
import arEG from "antd/es/locale/ar_EG"
import { Language } from "apprise-frontend/intl";


export const localeFrom = (lang:Language)  => {

  switch(lang) {

    case "en": return enUS
    case "fr": return frFR
    case "es": return caES
    case "ar": return arEG
    case "ru": return ruRU
    case "zh": return zhCN

    default: throw new Error(`Unsupported language '${lang}'`);
  }

}