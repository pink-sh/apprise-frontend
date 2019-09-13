import { Badge, Icon } from 'antd';
import { SearchField } from 'apprise-frontend';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FilteredVTable, GivenVTable } from 'react-virtualized-table';
import { Props as FilteredVTableProps } from 'react-virtualized-table/dist/types/filtered';
import { Item } from 'react-virtualized-table/dist/types/model';
import { ActionButtons } from './Action';
import './styles.scss';







const Counter = ({count})=><Badge overflowCount={100000000} showZero count={count} />
const IconSortAsc = ()=><Icon type="sort-ascending" />
const IconSortDesc = ()=><Icon type="sort-descending" />

type Props<T> = FilteredVTableProps<T> & {
    affixRef?:any,
    actions?: (i:Item<T>) => React.ReactElement[],
    actionsWidth?: number
    onChangeSelection?: any
    stickiesOffset?: number
    onClickLinkTo: (item:T, val:any)=>string
}

const defaultStickiesOffset = 64;   // matches topbar, not ideal to set it, but clients that do not use topbar can at least override it.

export class Table<T> extends React.Component<Props<T>> {

    render(){

        const {scrollElement, columns, items, ...p} = this.props
        const {actions, actionsWidth, onClickLinkTo, onChangeSelection, stickiesOffset=defaultStickiesOffset} = this.props

        const cols = actions === undefined ? columns: columns.concat({
                
                    name:'actions',
                    title: <span>Actions <Icon type="bars" style={{fontSize: '14pt'}} /></span>,
                    className: 'actions-col',
                    width: actionsWidth || 160,
                    render: (unused,item,unused2)=><ActionButtons>{actions(item)}</ActionButtons>  
                })
        
        onClickLinkTo && GivenVTable.column(columns[0]).withRender((val,item) => 
                <Link className="linked-col-anchor" to={onClickLinkTo(item,val)}>
                        <span className="linked-col" >{val} <Icon type="link"/></span>
                </Link>
        )

       

        return (
                <div className="table">
                    <FilteredVTable   customComponents={{
                        Counter,
                        SearchField,
                        IconSortAsc,
                        IconSortDesc
                    }}
                    columns={cols}
                    stickyOffset={stickiesOffset}
                    // stickyFilter
                    // stickyHead
                    selectable
                    onChangeSelection={onChangeSelection}
                    items={items}
                    key={items.length}
                    {...p}/>
                 </div>
        )
    }
}