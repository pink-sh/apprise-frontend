import { showError } from "apprise-frontend";
import { FieldProps } from "apprise-frontend/components";
import { askConsent, deepclone, deepequals } from "apprise-frontend/utils";
import produce from "immer";
import debounce from "lodash.debounce";
import * as React from "react";

export type loadDirectives = {

  unless?: boolean,
  when?: boolean,
  error: string,
  task: () => Promise<any>
}


//  manageses loadng state on behalf of a task
export const useLoadingEffect = ({unless=false,when=true,task,error}: loadDirectives ) => {

  const [loading,setLoading] = React.useState(false);
  const [failed,setFailed] = React.useState(false);

  // eslint-disable-next-line
  React.useEffect( () => {
    
    if (loading || failed || unless || !when ) 
           return

     Promise.resolve(setLoading(true))
           .then( task )
           .catch(e=> {
              showError(e,{title:error, okText:"Retry", onClose: close=> { setFailed(false); close() }})
              setFailed(true);
           })
           .then(()=>setLoading(false))
        
  });

  return loading;
}



export type FormState<T> = {

  edited:T
  original:T
  initial:T

  dirty:boolean
  readonly:boolean

  onReset:boolean

  set: (f: (t: T, ...[any]) => any) => (...[any]) => void
  reset: (t:T,confirm?:boolean) => void
  prepareProps: <T extends FieldProps> (props:T) => T
}

export const useEditingState = <T> ( original:T, initial:T = original, readonly : boolean = false ) : FormState<T>  => {

      const [edited,setedited] = React.useState(deepclone(original))
      const [resetted,setReset] = React.useState(false)

      

      React.useEffect(()=> {
        if (resetted) setReset(false)
      },[resetted])
      
      const reset = (t:T, confirm : boolean=true) => {

        const doreset = () => {setReset(true); setedited(initial)}
      
          if (confirm)
            askConsent( {title:"Discard all changes.", 
              message: "This cannot be reverted: do you really want to discard all unsaved changes?", 
              okText: "Yes, discard all  changes now.",
              onOk: doreset
            })
          else
            doreset()
     }          

     const prepareProps = <T extends FieldProps>(props:T) => {

          const dynaprops = {...props as any}

          if (dynaprops.onChange) 
              dynaprops.onChange = debounce(dynaprops.onChange,100)

              

          return dynaprops as T;

     }
     
     
     const dirty = !deepequals(edited,initial )
    
     const set = (f:(t:T, ...[args])=>any) => (...[args]) => setedited(produce(edited,t =>void(f(t as any,args)) ))

     return {edited, set, reset, prepareProps, dirty, original, initial, onReset: resetted,  readonly }

}


export type ListState<T> = {

  selected:T[]
  setSelected: React.Dispatch<React.SetStateAction<T[]>>
  resetSelected: () => void
  noSelection:boolean
}


export const useListState = <T> () : ListState<T>  => {

    const [selected,setSelected] = React.useState<T[]>([])

    const resetSelected = ()=>setSelected([])
    const noSelection = selected.length===0 

     return {selected, setSelected, resetSelected, noSelection }

}