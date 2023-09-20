import React from "react";
import {
    BrowserRouter as Router,

    Link,

  } from "react-router-dom";
import { MenuItem, SubMenu} from 'react-pro-sidebar';
export default function Chapter(props){
  const [opened, setOpened] = React.useState(false)
  // console.log(props)
  // console.log('chapter working')
 // console.log(`activeEntry=${props.id} selectedEntryId=${props.selectedEntryId}  chapterid = ${props.chapterid} title= ${props.title}`)
  function returnTOC (){
   if (props.activeEntry == props.chapterid){
    // console.log(props.activeEntry)
    // return (
    //   props.tableofContent()
    // )
    const headingsmap = props.headingsArray.map((heading, index, elements) => {
      const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
    
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
  
        }
        
      };
      if (heading.text != 'Footnotes'){
  
        
      return (
        <a onClick={() => scrollToSection(heading.id)} >
          {/* <a href={`#${heading.id}`}> */}
           {/* <MenuItem  key={heading.id} style={{ marginRight: `${heading.level - 2}em` }} >{heading.text}</MenuItem> */}
           <MenuItem  key={heading.id} style={{fontSize:'18px', paddingRight: `${30 + (heading.level * 8)}px` , color: 'rgb(81, 81, 81)', }} >{heading.text}</MenuItem>
        </a>
      )
      }
  
  })
  return(
    <nav>
        <ul>
          {headingsmap}
        </ul>
      </nav>
    )


   }
  }
// console.log(`chapterid is ${props.chapterid}`)
  function chapterClickedFunction(){
    props.chapterClicked(`${props.chapterid}`)
    setOpened(!opened)
    // console.log('chapter clicked')
  }
// console.log(`${props.chapterClicked}`)
// console.log('chapteerrrr')

    const url = `/entry/${props.chapterid}`
       return(
          // <SubMenu label={props.title} style={{fontSize: '16px', paddingRight: '30px', outline: 'none'}} component={<Link to= {url} />}>{returnTOC()}</SubMenu>
          <SubMenu  label={props.title} open={opened} defaultOpen={false} style={{paddingRight: '35px', fontSize: '18px', color:'rgb(81, 81, 81)', fontWeight: props.activeEntry == props.chapterid ? '700' : '500'}} component={<Link to= {url} onClick={chapterClickedFunction} />}>{returnTOC()}</SubMenu>
          // onClick={props.chapterClicked}
       )
}