import * as React from "react";


export type childrenapi = {

    type: (type:any) => childrenapi
    byTypes: (typemap: [string,any][],tail?:string) => {[type:string]:any[]}
    filterType: (predicate: (val: any) => boolean) => childrenapi

    with: (predicate : (props:any) => boolean ) => childrenapi 
    filter: (prop:string, predicate: (val:any) => boolean) => childrenapi 
    byProps: (propmap: [[string, (props:any) => boolean]], tail?:string)  => {[type:string]:any[]},
   
    get: () => any
    toArray: () => any[]

   
    mapProps: () => any[]
    mapProp: (prop:string) => any[] 
   
} 

export const childrenIn = ({children}) =>  givenChildren(children);


export const givenChildren = (children:any)  => {

    const api = (all:any[]) : childrenapi  => ({

        type: (t) => api( all.filter(c => c.type === t) ),
      
        filterType: (predicate) => api(all.filter(c=>predicate(c.type))),
      
        byTypes: (typemap,tail="other") => all.reduce( (map,c) =>  {

                const match = typemap.find( p => p[1] === c.type) 
                if (match) 
                    add(map,match[0],c) 
                else 
                    add(map,tail,c)

                return map;
        }        
        , {}),

        with: (predicate) => api( all.filter(c => predicate(c.props)) ),
        filter: (prop, predicate) => api( all.filter(c => predicate(c.props[prop])) ),
        byProps: (propmap,tail="other") => all.reduce((map,c)=>{

            propmap.forEach(p=> p[1](c.props) ? add(map,p[0],c) : add(map,tail,c) )
            return map;
        },{}),

        get: () => all[0],
        toArray: () => all,
    
        mapProps: () => all.map(c=>c.props),
        mapProp: (prop) => all.map(c => c.props[prop]).filter(p=>p)
        
    })
   
    return api(React.Children.toArray(children))


}


const add= (map:Object,k:any,v:any) =>   {

        map[k] = map[k] ? [...map[k],v] :[v]
        
        return map;
    

        
}