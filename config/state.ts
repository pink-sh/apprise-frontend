import { BaseConfig, BaseState, change, failWith, through } from "apprise-frontend";
import { givenBase } from "apprise-frontend/frontend";
import { withBaseConfig } from "./model";


export type ConfigState = {
  config:BaseConfig
}

export const initialConfig : ConfigState = {

  config: undefined!
}

export const configapi = (s: BaseState ) => ({

  isDefined: () => s.config !== undefined,
  
  //  wraps with API and returns
  get : () => withBaseConfig(s.config!),

  set:  (c: BaseConfig) => change(s).with( s => s.config = c ) ,

  fetch: (prefix:string): Promise<BaseConfig> => {

        console.log("loading configuration...")

        return givenBase(s).call.atPath(`${prefix}/config.json`).get()
                            .then(through(validate))
                            .then(through(c=>c.prefix=prefix) )
                            .then(through(configapi(s).set))
  
  }

})



////    helpers


const validate = (config:BaseConfig) => {

  try {
    config.services || failWith("no services defined")


  }
  catch(e) {
    failWith(`configuration is invalid: ${e}.`)
  }
}



