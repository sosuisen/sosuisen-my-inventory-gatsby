import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ItemRow from '../components/ItemRow'
import { getLocalDateAndTime } from '../utils/date';
import indexStyle from './index.module.css';
import { FiArrowUpCircle } from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { GiCardboardBox } from "react-icons/gi";

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
      <div id='top' className={indexStyle.sosuibako}>
        <div className={indexStyle.lastModifiedDate}>最終更新：{getLocalDateAndTime(lastModifiedDate)}</div>
        <div className={indexStyle.title}>
          疏水箱
        </div>
        <div className={indexStyle.description}>
          どの箱になにが入ってるかの記録です。
        </div>
        {orderedBoxes.map(box => (
          <a style={{textDecoration: 'none'}} href={`#${box._id}`}>
            <div className={indexStyle.boxIndex}>{box.name}</div>
          </a>
          ))
        }
        <br style={{clear: 'both'}} />
        {orderedBoxes.map(box => (
          <div className={indexStyle.boxContents} key={box._id}>
            <div id={box._id} className={indexStyle.boxRow}>
            <a href={`#${box._id}`}>
              <div className={indexStyle.boxLink}>
                <div className={indexStyle.boxIcon}><GiCardboardBox /></div>
                <div className={indexStyle.boxName}>{box.name}</div>
              </div>
            </a>
            <a href={`#top`}><div className={indexStyle.gototop}><FiArrowUpCircle style={{fontSize: '20px'}}/></div></a></div>
            {
              box.items.map((itemId, index) => (<ItemRow key={itemId} item={itemHash[itemId]} index={index}></ItemRow>))
            }
          </div>))
        }
        <hr style={{width: '980px', marginLeft: '0px', marginTop: '24px', border: 'none', height: '2px', backgroundColor: '#c08070'}}/>        
        <div className={indexStyle.footnote}>
          <div style={{float: 'left', marginRight:  '7px'}}><FcAbout style={{fontSize: '24px'}}/></div>
          <div style={{marginTop: '4px', float: 'left'}}>Powered by <a href='https://github.com/sosuisen/git-documentdb'>GitDocumentDB</a></div>
          <div style={{clear: 'both'}}>          
          - Data source: <a href='https://github.com/sosuisen/sosuisen-my-inventory'>https://github.com/sosuisen/sosuisen-my-inventory</a><br />
          - Site generator: <a href='https://github.com/sosuisen/sosuisen-my-inventory-gatsby'>https://github.com/sosuisen/sosuisen-my-inventory-gatsby</a>
          </div>
        </div>        
      </div>

    </main>
  )
}

export default IndexPage
