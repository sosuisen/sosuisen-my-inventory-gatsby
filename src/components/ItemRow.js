import React from 'react';
import ItemRowStyle from './ItemRow.module.css';

const getLocalDateAndTime = (utcDateAndTime) => {
  const regularUTC = utcDateAndTime.replace(
    /^(\d\d\d\d-\d\d-\d\d).(\d\d:\d\d:\d\d)/,
    '$1 $2'
  );
  const offset = new Date().getTimezoneOffset();
  const utcMsec = Date.parse(regularUTC);
  const localMsec = utcMsec - offset * 60 * 1000;

  return new Date(localMsec).toISOString().replace(/^(.+?)T(.+?)\..+?$/, '$1 $2');
};

const ItemRow = (props) => {
  return (<div className={props.index % 2 === 0 ? `${ItemRowStyle.row} ${ItemRowStyle.color_bg}` : ItemRowStyle.row}>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.takeout}`}>
      {props.item.takeout ? '*' : '-'}
    </div>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.name}`}>{props.item.name}</div>
    <div className={`${ItemRowStyle.col} ${ItemRowStyle.modified_date}`}>
      {getLocalDateAndTime(props.item.modified_date).substr(0, 16)}
    </div>
  </div>);
};

export default ItemRow
