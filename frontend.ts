
import { callapi } from "./call";
import { configapi } from "./config";
import { intlapi } from "./intl";
import { BaseState } from "./state";
import { userapi } from "./user/user";
import { slideoutapi } from "./scaffold";


export const givenBase = (s:BaseState) => ({

    call: callapi(s),
    users: userapi(s),
    config: configapi(s),
    intl: intlapi(s),
    slideout: slideoutapi(s)

})