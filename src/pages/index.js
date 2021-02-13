import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ItemRow from '../components/ItemRow'
import { getLocalDateAndTime } from '../utils/date';

// markup
const IndexPage = () => {
  const dbResult = useStaticQuery(graphql`
  query {
      allItemJson {
        edges {
          node {
            _id
            name
            created_date
            modified_date
            takeout
          }
        }
      }
      allBoxJson {
        edges {
          node {
            _id
            name
            items
          }
        }
      }
      workJson {
        _id
        boxOrder
        currentBox
      }      
    }  
  `);
  const itemHash = dbResult.allItemJson.edges.reduce((result, current) => {
    result[current.node._id.replace('item/','')] = current.node;
    return result;
  }, {});
  const sortedItemEdges = [...dbResult.allItemJson.edges].sort((a, b) => {
    if(a.node.modified_date > b.node.modified_date) return -1;
    if(a.node.modified_date < b.node.modified_date) return 1
    else return 0;
  });
  const lastModifiedDate = sortedItemEdges[0].node.modified_date;

  const boxHash = dbResult.allBoxJson.edges.reduce((result, current) => {
    result[current.node._id.replace('box/','')] = current.node;
    return result;
  }, {});
  const orderedBoxes = dbResult.workJson.boxOrder.map(boxId => boxHash[boxId]);

  return (
    <main>
      <title>疏水箱</title>
      <div id='top' style={{width: '1000px', marginLeft: 'auto', marginRight: 'auto'}}>
        <p>
          疏水箱。　　　<span style={{fontSize: '12px', color: '#909090'}}>最終更新：{getLocalDateAndTime(lastModifiedDate)}</span>
        </p>
        {orderedBoxes.map(box => (
          <span>[<a href={`#${box._id}`}>{box.name}</a>]&nbsp;&nbsp;</span>
          ))
        }
        {orderedBoxes.map(box => (
          <div key={box._id}>
            <p id={box._id}><a href={`#${box._id}`}>{box.name}</a>&nbsp;&nbsp;<a href={`#top`}>↑</a></p>
            {
              box.items.map((itemId, index) => (<ItemRow key={itemId} item={itemHash[itemId]} index={index}></ItemRow>))
            }
          </div>))
        }
      </div>
    </main>
  )
}

export default IndexPage
