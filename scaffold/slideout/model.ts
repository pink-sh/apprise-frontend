import { ReactNode } from "react";



export type SlideoutProps = {
  
  title: React.ReactNode
  width?:string|number
  content: ReactNode
}

export type SlideoutModel = {

  open : boolean
  props: SlideoutProps
}

export type SlideoutState = {

  slideout : SlideoutModel
}

export const initialSlideout : SlideoutState = {

    slideout: {
      open: false, 
      props: {
        title: "", 
        content: undefined!
      }
    }
  }

//{ open:true, props: userprofileSlideout }

