import { MultilangDto } from "apprise-frontend/components";
import { Language, fullnameOf } from "apprise-frontend/intl";


export type Validation = {

    status?: "success" | "error" | "warning"
    msg?: any
    help?: any
}


export type ValidationReport = {

    [key:string] : any
}

export const error = (msg:any) => ({status:"error",msg}) as Validation
export const success = (msg?:any) => ({status:"success",msg}) as Validation
export const warning = (msg:any) => ({status:"warning",msg}) as Validation

export const invalidChars = " _:!?/\\*;,."

type ValidationCheck<T>  = {
    predicate: (t:T) => boolean
    msg: any
}

export const empty : ValidationCheck<string> = {
    
    predicate: (s:string)  => !s || !s || s.trim().length === 0  ,
    msg: "Cannot be empty."   

}

export const notdefined : ValidationCheck<any> = {
    
    predicate: (s:any)  => !s,
    msg: "Cannot be empty."   

}


export const languages  = (required:Language[]) : ValidationCheck<MultilangDto> => ({
    
    predicate: (v:MultilangDto)  => required.some(l=>!v[l]) ,
    msg: required.length===1?  `${fullnameOf(required[0])} is mandatory.` : `Some languages are mandatory (${required.map(fullnameOf).join(",")}).`   

})

export const uniqueWith = <T> (all:T[],uniqueCheck: (t:T)=>boolean) : ValidationCheck<any>  => ({
    
    predicate: (s:T) => all.some(uniqueCheck),
    msg:"Already taken, choose another." 

})


export const containsAny = (chars:string) : ValidationCheck<string> => ({
    
       predicate: (s:string)  => !empty.predicate(s) && s.split('').some(c=>chars.includes(c)),
       msg: "Contains invalid characters."   

})


export const containsInvalid = <T> ( f: (t:T) => ValidationReport ) : ValidationCheck<T[]> => ({

    predicate: (ts:T[]) => ts.reduce( (result,t)=> f(t).errors()>0 || result ,false as boolean),
    msg:"Some elemens are invalid."

})


export const invalidCharacters = containsAny(invalidChars)


export const checkIt =  () => _check(null,[])

export const check = <T> (t:T) => _check(t,[])

const _check = <T> (t:T, checks:ValidationCheck<T>[]) => ({

            with : (check:ValidationCheck<T>, msg?:any ) => _check(t,[...checks, msg?{...check,msg} : check]),

            now: (help?:string) => _check(t,checks).nowOr(help),

            nowOr: (successmsg?:string, help?:any) => {
                
                
                const failedCheck = checks.find(p=>p.predicate(t))
                return { ...(failedCheck ? error(failedCheck.msg) : success(successmsg)), help}
            }
    })



export type ReportMethods =  {

    errors: () => number

}




export const withReport =  <T extends ValidationReport>(self:T) : T & ReportMethods => ({

    ...self,

    errors: () => Object.values(self).filter(c=>c.status==="error").length

})