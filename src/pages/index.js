import * as React from "react"
import { graphql, StaticQuery, useStaticQuery } from "gatsby"

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
      <title>Home Page</title>
      <div>
        {orderedBoxes.map(box => (
          <div>
            <p>{box.name}</p>
            {
              box.items.map(itemId => (
                <ul>
                  <li>{itemHash[itemId].name}, {itemHash[itemId].created_date}, {itemHash[itemId].takeout ? '持出中' : '-'}</li>
                </ul>
              ))
            }
          </div>))
        }
      </div>
    </main>
  )
}

export default IndexPage
