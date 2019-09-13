import { BaseState, change, SlideoutProps } from "apprise-frontend";



export const slideoutapi = (s:BaseState) => ({

  isOpen:() => s.slideout.open,
  props: () => s.slideout.props,
  openWith: (props:SlideoutProps) => change(s).with( draft=> draft.slideout = { open:true, props}),
  close: () => change(s).with( draft=>draft.slideout.open=false ),
})