import { userstateapi } from "./state";
import { BaseState } from "apprise-frontend/state";


export const userapi = (s:BaseState) => ({

    ...userstateapi(s),

    // todo
    pageActions:{},
    actions:{},

})