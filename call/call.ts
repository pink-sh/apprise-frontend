

import { givenBase } from "apprise-frontend/frontend";
import axios, { AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter";
import { BaseState } from "../state";
import { through } from "../utils";

const axiosapi = axios.create({timeout:30000}); // todo
export const mock = new MockAdapter(axiosapi);



export const callapi = (s:BaseState) => ({
  
  //  use to call target services, path is prefixed.
  at: <T>(path:string, targetName?:string) => {

    const config = givenBase(s).config.get();
   
    const target = targetName ? config.service(targetName) : config.defaultService();
    const prefix = target.prefix;
    const fqpath = `/${prefix}${path}`;
  
    return callapi(s).atPath(fqpath)
  },

  //  use to fetch static resources, path is prefixed.
  staticAt: (path:string) => {

    const config = givenBase(s).config.get();
    
    return callapi(s).atPath(`/ ${config.prefix}${path}` )
 
  },

  // use to call without prefixing
  atPath: (path:string) => ({

    get: <T>(config?:AxiosRequestConfig) => axiosapi.get<T>(path,config).catch(through(handleError)).then(r => r.data),
    post: <T>(data?:any,config?:AxiosRequestConfig) => axiosapi.post<T>(path,data,config).then(r=>r.data),
    put: <T>(data?:any,config?:AxiosRequestConfig) => axiosapi.put<T>(path,data,config).then(r=>r.data),
    delete: <T>(config?:AxiosRequestConfig) => axiosapi.delete<T>(path,config).then(r=>r.data)
  })

})

const handleError = (e:any) => {    
  

  if (e.response) {

    e.details = e.message
    e.message= `Service says: ${ e.response.data.reason || e.response.data || e.message }`
 
}  
  else 

    e.message = e.request ? `service is not reponding: ${e.message}` : `can't call service: ${e.message}`;
 
  throw e;
}