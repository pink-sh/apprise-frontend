import { givenBase } from "apprise-frontend/frontend";
import { BaseState } from "apprise-frontend/state";

const logged = "/logged"

export const usercalls = (s:BaseState) => ({

    fetchLogged: () => givenBase(s).call.at(logged).get()

})