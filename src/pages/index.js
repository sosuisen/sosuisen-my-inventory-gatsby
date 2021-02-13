import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ItemRow from '../components/ItemRow'

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
          疏水箱。
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
