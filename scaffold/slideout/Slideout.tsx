import { Drawer as AntDrawer } from "antd";
import { DrawerProps } from "antd/lib/drawer";
import { BaseState, slideoutapi } from "apprise-frontend";
import { connect } from "apprise-frontend/state/helpers";
import * as React from "react";
import "./styles.scss";




const $Slideout = (props:BaseState) => {

  const slideout = slideoutapi(props);
  const opts = slideout.props();


return  <Drawer title={ opts.title} visible={slideout.isOpen()}  onClose={slideout.close} >
      
      {slideout.props().content}
      
        </Drawer>
}


type Props = DrawerProps & {

    children: any
  
}

export const Drawer = ( props: Props) => {

  const {children,closable=false,width=250} = props

  return <AntDrawer className="slideout" {...props} closable={closable} width={width} placement="right">

      {children}

    </AntDrawer>

}

export const GlobalSlideout = connect($Slideout);