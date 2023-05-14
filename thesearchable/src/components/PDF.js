// import React, { Component } from "react";
// import ReactMarkdown from "react-markdown";
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
// import {Route, Link, Routes, useParams} from 'react-router-dom';
// import ReactPDF from '@react-pdf/renderer';

// import { render } from "react-dom";

// export default function PDF(){
//   const [numPages, setNumPages] = React.useState(null);
//   const [pageNumber, setPageNumber] = React.useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }
//     const params = useParams()
//     const [theEntry, setTheEntry] = React.useState()
//     const [theTitle, setTheTitle] = React.useState()
//     const [bibilography, setBibilography] = React.useState()
//     React.useEffect(function(){
//         fetch('/entries/' + params.id)
//         .then(res => res.json())
//         .then(data => {
//         setTheEntry(`${data.body}`)
//         setTheTitle(`${data.title}`)
//         setBibilography(`${data.bibiliography}`)})
  
//      },[])

//     //  const styles = StyleSheet.create({
     
//     //     page: {
//     //       flexDirection: 'row',
          
//     //       backgroundColor: '#E4E4E4'
//     //     },
//     //     section: {
//     //       margin: 10,
//     //       padding: 10,
//     //       flexGrow: 1
//     //     }
//     //   });
// return(
//   <div>
//   <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//     <Page pageNumber={pageNumber} />
//   </Document>
//   <p>
//     Page {pageNumber} of {numPages}
//   </p>
// </div>
// //     <Document>
// //     <Page size="A4" style={styles.page}>
// //       <View style={styles.section}>
// //         <Text>
// //             <div className="CTP--div">
       
    
// //        <div className='wrapper'>
    
// //         <div>
   
// //             <div className='details' >
             
// //                 <div className="DP--logo">العنوان , اللوجو</div>
// //                 <hr />
// //                 <div className="DP--container">
// //                     <div className="DP--TC">
// //                 <div className="DP--title">{theTitle}</div>
// //                 <ReactMarkdown className="DP--content">{theEntry}</ReactMarkdown>
// //                 </div>
// //                 <div className="DP--bibilography">
// //                     <div className="DP--doc--info">
// //                         معلومات عن المقال: 
// //                     </div>
// //                     <div>
// //                         <div className="DP--bib--title">المرجع: </div>
// //                         <div className="DP--bib--content">{bibilography}</div>
// //                     </div>
// //                 </div>
// //                 </div>
                
// //             </div>
            
// //         </div>
// //     </div>
// //       </div>
// //       </Text>
// //       </View>
      
// //     </Page>
// //   </Document>
    
// )
// }

// // export default class PDF extends Component {
// //   constructor(props) {
// //     super(props);
// //   }

// //   render() {
// //          const styles = StyleSheet.create({
// //         page: {
// //           flexDirection: 'row',
// //           backgroundColor: '#E4E4E4'
// //         },
// //         section: {
// //           margin: 10,
// //           padding: 10,
// //           flexGrow: 1
// //         }
// //       });
// //     return (
// //           <Document>
// //     <Page size="A4" style={styles.page}>
// //       <View style={styles.section}>
// //         <Text>Section #1</Text>
// //       </View>
// //       <View style={styles.section}>
// //         <Text>Section #2</Text>
// //       </View>
// //     </Page>
// //   </Document>
 

  
 
// //     );
// //   }
// // }

// // const appDiv = document.getElementById("app");
// // render(<PDF />, appDiv);

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import React from "react";
import ReactMarkdown from "react-markdown";
import {Route, Link, Routes, useParams} from 'react-router-dom';
// Create styles

const styles = StyleSheet.create({
  page: {

    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
    position: 'absolute',
    top: '0',
    right:'0'
  },
});

// Create Document Component
export default function PDF() {

      const params = useParams()
    const [theEntry, setTheEntry] = React.useState()
    const [theTitle, setTheTitle] = React.useState()
    const [bibilography, setBibilography] = React.useState()
    React.useEffect(function(){
        fetch('/entries/' + params.id)
        .then(res => res.json())
        .then(data => {
        setTheEntry(`${data.body}`)
        setTheTitle(`${data.title}`)
        setBibilography(`${data.bibiliography}`)})
  
     },[])
     console.log(theTitle)
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {/* <Text> */}
            <Text>{theTitle}</Text>
            <div className='details' >
             
             <div className="DP--logo">العنوان , اللوجو</div>
             <hr />
             <div className="DP--container">
                 <div className="DP--TC">
             <div className="DP--title">{theTitle}</div>
             <ReactMarkdown className="DP--content">{theEntry}</ReactMarkdown>
             </div>
             <div className="DP--bibilography">
                 <div className="DP--doc--info">
                     معلومات عن المقال: 
                 </div>
                 <div>
                     <div className="DP--bib--title">المرجع: </div>
                     <div className="DP--bib--content">{bibilography}</div>
                 </div>
             </div>
             </div>
             
         </div>
         
            {/* </Text> */}
          </View>
          <View style={styles.section}>
            <Text>World</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
    
