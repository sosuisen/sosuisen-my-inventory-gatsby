import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ItemRow from '../components/ItemRow'
import { getLocalDateAndTime } from '../utils/date';
import indexStyle from './index.module.css';

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
    result[current.node._id] = current.node;
    return result;
  }, {});
  const sortedItemEdges = [...dbResult.allItemJson.edges].sort((a, b) => {
    if(a.node.modified_date > b.node.modified_date) return -1;
    if(a.node.modified_date < b.node.modified_date) return 1
    else return 0;
  });
  const lastModifiedDate = sortedItemEdges[0].node.modified_date;

  const boxHash = dbResult.allBoxJson.edges.reduce((result, current) => {
    result[current.node._id] = current.node;
    return result;
  }, {});
  const orderedBoxes = dbResult.workJson.boxOrder.map(boxId => boxHash[boxId]);

  return (
    <main>
      <title>疏水箱</title>
      <div id='top' className={indexStyle.top}>
        <div className={indexStyle.lastModifiedDate}>最終更新：{getLocalDateAndTime(lastModifiedDate)}</div>
        <div className={indexStyle.title}>
          疏水箱
        </div>
        <div className={indexStyle.description}>
          どの箱になにが入ってるかの記録です。
        </div>
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
        <hr />        
        <div className={indexStyle.footnote}>
          Powered by <a href='https://github.com/sosuisen/git-documentdb'>GitDocumentDB</a><br />
          - Data source: <a href='https://github.com/sosuisen/sosuisen-my-inventory'>https://github.com/sosuisen/sosuisen-my-inventory</a><br />
          - Site generator: <a href='https://github.com/sosuisen/sosuisen-my-inventory-gatsby'>https://github.com/sosuisen/sosuisen-my-inventory-gatsby</a>
        </div>        
      </div>

    </main>
  )
}

export default IndexPage
