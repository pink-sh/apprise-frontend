import { random } from "apprise-frontend";
import { Action, withAction } from "apprise-frontend";


export type User = {
  username: String;
  details: {
    firstname:string
    lastname:string
    email:string
  }
};


export type LoggedUser = User & {
  actions: Action[];
};

export const randomUser = () : LoggedUser => 
  ({ username : random("user"), details:{firstname:random("John-"),lastname:random("Doe-"),email:random("john.doe@apprise.com")},actions: [] } )


export const withLoggedUser = ( self: LoggedUser) => ({

    ...self,

    can: (action:Action) => self.actions.some( a=> withAction(action).impliedBy(a) ),
    canAny: (actions:Action[]) => self.actions.some(withLoggedUser(self).can)

    //  todo: user api

})