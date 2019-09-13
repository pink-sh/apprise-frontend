import { BaseState, change } from "apprise-frontend";
import { usercalls } from "./calls";
import { LoggedUser, withLoggedUser } from "./model";



export type UserState = {

  logged : LoggedUser
  users: {}

};

export const initialUsers: UserState =  {

  logged: undefined!,
  users: {}
}


export const userstateapi = (s: BaseState) => ({

  logged: withLoggedUser(s.logged),

  setLogged: (u : LoggedUser) => change(s).with(s => s.logged = u) ,
 
  isLogged: ()=> s.logged !==undefined,
 
  fetchLogged: () => {

                  console.log("fetching logged user...")

                  return usercalls(s).fetchLogged().then(userstateapi(s).setLogged)
                }

});
