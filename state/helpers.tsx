import * as React from "react";
import { BaseState } from "./model";
import produce from "immer";

//  the React context that manages state propagation
const StateContext = React.createContext<BaseState >(null as any);

//  the React Provider that holds the state
export const StateProvider = StateContext.Provider;


//  ----------    state handling

//  custom hook that stores the state (intended for root compo <App>)
export const useCreateState = <S extends BaseState>(initialState: S) : S => {
  
  const [state, update] = React.useState(initialState);

  //  cannot store this in state directly, as it's read-only, write-protected.
  //  keep it instead as a global, which enables  better typing too.
  updater = fun => update( produce(draft => void( fun(draft)) ))

  return state;
};

//  holds the draft mutating function
let updater: <S extends BaseState>(fun:Updater<S>) =>void;

//  used by clients to change state. 
//  delegates to React-based updater using fluent and type-friendly API.
export const change = <S extends BaseState> (s:S) => ({ with:(u:Updater<S>) => updater(u) } )



//    ------    state injection  

//  connects any Component to the global state, injecting it as props. 
//  pptionally, instructs re-renders only when specific parts of the state change.
export const connect = <S extends BaseState>(Component: (props: S) => JSX.Element | null, specs?: DepSpec<S> | DepSpec<S> []) => {

  //  no specs? re-renders on each state change
  specs = specs || [props=>props] 
  
  //  one spec? normalise into singleton array
  let normalisedspecs = specs instanceof Array ? specs : [specs] 

  // return connected wrapper, but names it first for better debugging in stack traces 
  const Connected = (props) => {

      // pull state from Context
      const state = React.useContext(StateContext) as S;

      // gather change specifications as paths into the state
      let deps = normalisedspecs.map(f=>f({...props,...state}));

      //  memoises the rendering of the origiinal component, conditionally to change speifications.
      return React.useMemo(() => <Component  {...props} {...state} />, 
      // eslint-disable-next-line
      deps);
  }

  return Connected;
};



//  --------  helpers

// the internal type of the draft-mutating function.
type Updater<S extends BaseState> = (s:S)=>void

// the internal type of a dependency specification
type DepSpec<T extends BaseState> =  (state: T) => any
