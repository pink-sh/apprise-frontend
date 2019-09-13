import { BaseState } from "apprise-frontend/state";
import { intlstateapi } from "./state";


export const intlapi = (s:BaseState) => ({

    ...intlstateapi(s)


})