import { Spin, Skeleton, Icon } from "antd";
import * as React from "react";
import { asGenerator, ValOrGen } from "apprise-frontend";

type Props = {

  showOn: ValOrGen<boolean>
  renderIf?: ValOrGen<boolean>
  placeholder?: Placeholder
  className?: string
  style?: React.CSSProperties
  children?:any

}

export enum Placeholder { list, text, none }

export const Spinner = (props : Props) => {

  const {showOn,renderIf,className,style,children,placeholder=Placeholder.none } = props;

  const show = asGenerator(showOn)
  const render = asGenerator( renderIf===undefined ? !show() : renderIf)    
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return  <Spin className="bullseye" spinning={show()} delay={200} indicator={antIcon} >
              {render() ? <div>{children}</div> : <div className={className} style={style}>{renderPlaceholder(placeholder)}</div>}
          </Spin> 
                      
            
};

const renderPlaceholder = (p:Placeholder)  => {

  switch (p) {
    case Placeholder.list : return <><Skeleton avatar active/><Skeleton avatar active/></>
    case Placeholder.text : return <Skeleton active/>
    default: return null
  }
}

