import React from 'react';
import ItemRowStyle from './ItemRow.module.css';
import { getLocalDateAndTime } from '../utils/date';
import { GoLink } from 'react-icons/go';
import { BiExport } from 'react-icons/bi';

const ItemRow = (props) => {
  return (<div className={props.index % 2 === 0 ? `${ItemRowStyle.row} ${ItemRowStyle.color_bg}` : ItemRowStyle.row}>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.takeout}`} title={props.item.takeout ? '持ち出し中' : 'はこのなかにいる'}>
      {props.item.takeout ? <BiExport style={{color: '#ff0000', marginTop: '-4px', fontSize: '24px'}} /> : '-'}
    </div>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.name}`} title={props.item.name}>
      <a name={props.item._id} href={`#${props.item._id}`} style={{textDecoration: 'none'}}><GoLink /></a>
      &nbsp;&nbsp;{props.item.name}
    </div>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.modified_date}`}>
      {getLocalDateAndTime(props.item.modified_date).substr(0, 16)}
    </div>
  </div>);
};

export default ItemRow
