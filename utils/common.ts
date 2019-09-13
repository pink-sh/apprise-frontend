
import clonedeep from "lodash.clonedeep"
import deepequal from "fast-deep-equal"

export type ValOrGen<T> = T | (() => T)

export const asGenerator = (v:any) : Function => (typeof v === "function") ? v : () => v

export const wait = <T> (ms:any) => (x:T) => new Promise<T>(v => setTimeout(() => v(x), ms));

export  const randomNumber = (range : number=100) => 
  Math.floor(Math.random() * range)

export  const random = (thing:string, range : number=100) => 
  thing + randomNumber(range+1)
  
export const failWith = (msg:any) => {
  throw msg;
}

export const through = <T> (fn:(t:T)=>any) => (a:T) :Promise<T> => {
  fn(a);    // process side-effects
  return Promise.resolve(a); // pass the data further
 };

 export const modelLike = <T> (t:T) : T => (Object.keys(t).reduce( (o,k) => { o[k]=undefined ; return o }, {} ) as any)
 
 
 export const deepclone = <T> (t:T) => {
      return clonedeep(t) as T
 }


 export const deepequals = <T> (t1:T,t2:T) => {
  return deepequal(t1,t2)
}


type anyfunc = ((...[any]) => any) | any 
export const all = (...fs) => t =>  fs.reduce( (t,f)=>f(t),t)