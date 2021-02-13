import React from 'react';
import ItemRowStyle from './ItemRow.module.css';
import { getLocalDateAndTime } from '../utils/date';

const ItemRow = (props) => {
  return (<div className={props.index % 2 === 0 ? `${ItemRowStyle.row} ${ItemRowStyle.color_bg}` : ItemRowStyle.row}>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.takeout}`}>
      {props.item.takeout ? '持出中' : '-'}
    </div>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.name}`}><a name={props.item._id} href={`#${props.item._id}`} style={{textDecoration: 'none'}}>■</a>&nbsp;{props.item.name}</div>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.modified_date}`}>
      {getLocalDateAndTime(props.item.modified_date).substr(0, 16)}
    </div>
  </div>);
};

export default ItemRow
