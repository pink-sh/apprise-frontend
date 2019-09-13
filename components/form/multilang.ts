import { Language, defaultLanguage } from "apprise-frontend/intl";
import { BaseState } from "apprise-frontend/state";
import { givenBase } from "apprise-frontend/frontend";


export type MultilangDto = {

    [key in Language]? : string

}

export type Multilang = MultilangDto & {
   
    inCurrent: () => string
    in: (lang:Language) => string
    setCurrent: (val:string) => Multilang
    setIn: (lang:Language) => { to: (val:string) => Multilang}
}

export const withMultilang= (s:BaseState) => (self:MultilangDto) : Multilang => ({

    ...self,

    inCurrent: () => withMultilang(s)(self).in(givenBase(s).intl.currentLanguage()),

    in: lang => self[lang]! || self[defaultLanguage]!,

    setCurrent: val => withMultilang(s)(self).setIn(givenBase(s).intl.currentLanguage()).to(val),

    setIn: lang => ({

        to: val => {

            self[lang]=val
            return withMultilang(s)(self);

        }
    })

})