import { IntlConfig } from "apprise-frontend";



export enum Mode { dev="dev", prod="prod"}

export type BaseConfig = IntlConfig & {
  mode: Mode
  prefix:string
  services: { [key: string]:ServiceConfig }

}

export type ServiceConfig = {

  prefix: string
  default?: boolean

}


export const withBaseConfig =  <T extends BaseConfig>(self:T) => ({ 
  
  ...self,

  service: (name:string) : ServiceConfig  => {

                const service = self.services[name]
                
                if (!service) 
                  throw new Error(`unknown service '${name}'`);
              
                return service;
  },

  defaultService: () : ServiceConfig => {
  
                      for (let k in self.services)
                        if (self.services[k].default)
                          return self.services[k]
                      
                    
                      const keys = Object.keys(self.services)
                    
                      if (keys.length === 1)
                        return self.services[keys[0]]
                      
                      throw new Error("no default service!"); 
                    
    }

})