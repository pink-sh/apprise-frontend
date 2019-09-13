import * as React from "react"
import { Collapse, Modal, notification } from "antd";

type  DialogProps = {

    message:string, 
    title?:string, 
    okText?:string,
    cancelText?:string,
    width?:number

}

export type ErrorProps = DialogProps & {   
    allowReload?: boolean,
    details?:string, 
    onClose?: (close:Function)=>any
} 

export type ConfirmProps =  DialogProps & {
    message: string,
    title?: string,
    onOk?: (ok:Function)=>any
}

export const showError = ( e:Error, props:Partial<ErrorProps> ) => {
    showFailure( { message:e.message, details:(e as any).details || (e.stack && e.stack.toString()), ...props} as ErrorProps)
}

export const showFailure = (props:ErrorProps)  => {

    const {title, message, details, allowReload=false, okText, cancelText="Reload",onClose, width } = props;
                         
    return Modal.error({  
                         title: title || "Oh no, it's a crash.", 
                         onOk : onClose,  
                         width,
                         cancelText,
                         okText,
                         onCancel: ()=>window.location.reload(),
                         okCancel: allowReload,
                         cancelButtonProps: { type:"reload" as any },
                         content:   <Collapse  bordered={false}>
                                        <Collapse.Panel  style={{ whiteSpace: 'pre-wrap' }} header={message} key="1">
                                            {details && details.toString()}
                                        </Collapse.Panel>
                                    </Collapse>
    })
}

export const askConsent = (props:ConfirmProps) => {
    const {message, okText, cancelText,title="Confirm Action", width,onOk} = props

    return Modal.warning({
        title: title,
        onOk : onOk,
        okText,
        width,
        okCancel:true,
        cancelText,
        content: message
    })
}


type NotifyProps = {
    message:string
    description?:string
}
export const notify = ({message,description}:NotifyProps) => notification.success({
    duration: 2,
    placement:"bottomRight",
    message,
    description
})