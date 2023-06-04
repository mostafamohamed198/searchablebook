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
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font
} from "@react-pdf/renderer";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
import Html from 'react-pdf-html';
import {Route, Link, Routes, useParams} from 'react-router-dom';

const styles = StyleSheet.create({
  page: {

    color: "black",
  },
  title: {
    fontSize:"20px"
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
     const mark = <ReactMarkdown className="SE--markdown--content" rehypePlugins={[rehypeRaw, remarkGfm]} remarkPlugins={[remarkGfm]} >ال</ReactMarkdown>
     const html = `
   
<html dir="rtl" lang="ar">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">


<body style="text-align: right" > 
  
  لببنميبتمشكسكمس
   </body>

</html>
     `
  return (
    <PDFViewer     style={styles.viewer}>
   <Document>
    <Page>
      <Html>
      {html}

      </Html>
      </Page>
      </Document>
    </PDFViewer>
  );
}



      // {/* Start of the document*/}
      // <Document>
      //   {/*render a single page*/}
      //   <Page size="A4" style={styles.page}>
      //     <View style={styles.section}>
      //       {/* <Text> */}
      //       <Text>{theTitle}</Text>
        
      //       <div className='details' >
             
      //        <div className="DP--logo">العنوان , اللوجو</div>
      //        <hr />
      //        <div className="DP--container">
      //            <div className="DP--TC">
      //        <div className="DP--title">{theTitle}</div>
            
      //        <Text>
      //        <ReactMarkdown className="DP--content">{theEntry}</ReactMarkdown>
      //        </Text>
      //        </div>
      //        <div className="DP--bibilography">
      //            <div className="DP--doc--info">
      //                معلومات عن المقال: 
      //            </div>
      //            <div>
      //                <div className="DP--bib--title">المرجع: </div>
      //                <div className="DP--bib--content">{bibilography}</div>
      //            </div>
      //        </div>
      //        </div>
             
      //    </div>
         
      //       {/* </Text> */}
      //     </View>
      //     <View style={styles.section}>
      //       <Text>Worldd</Text>
      //       <Text style={styles.title}><ReactMarkdown className="DP--content" children={theEntry}></ReactMarkdown></Text>
      //       <Text style={styles.title}><div>dfj;lfjas</div><div>{theEntry}</div></Text>
      //     </View>
      //   </Page>
      // </Document>
    
// export default function PDF(){
//   const html = `<html>
//   <body>
//   <div>working</div>
//   </body>
//   </html>
//   `
//     return(
//       <Document>
//       <Page>
//         <Html>{html}</Html>
//       </Page>
//     </Document>
//     )

// }


// import { jsPDF } from "jspdf";
// import React, { useRef } from "react";
// import SingleEntry from "./SingleEntry";
// import { renderToString } from "react-dom/server";

// export default function PDF (){
//   const pdfRef = useRef(null);
//   const createPDF = async () => {
//     const content = pdfRef.current;

//     const The = () => (
//       <div>
//         the;asdfljk;lsdfkld;sjafjdsdfl;sdfsggsfhsdfdfjl;jkl
//       </div>
//     )
    
//     const string = renderToString(<The />);
//   const pdf = new jsPDF("p", "mm", "a4");
//   pdf.html(The);
//   pdf.save("pdf");
// }; 
// return(
//   <button onClick={createPDF} type="button">Downloadd</button>
// )
// }

// working example would be something like this:

// import React, { useRef } from 'react';
// import { jsPDF } from 'jspdf';
// import Html from 'react-pdf-html';
// import Themarkdown from './themark';
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Font
// } from "@react-pdf/renderer";
// import ReactDOMServer from 'react-dom/server';
// import html2canvas from 'html2canvas';
// import SingleEntry from './SingleEntry';
// // import Lateef from '../../../Lateef-Medium-normal';
// const PDF = () => {  
//   const stylesheet = {
//     // clear margins for all <p> tags
//     p: {
//       margin: 0,
//     },
//     // add pink background color to elements with class="special"
//     ['.special']: {
//       backgroundColor: 'pink',
//     },
//   };
//   const element = (
  
//       <body>
//         <h1>الللل</h1>
//         <h2 style={{ backgroundColor: 'pink' }}>Heading 2</h2>
//         ...
//       </body>
    
//   ); 
//   const html = ReactDOMServer.renderToStaticMarkup(element);
//   return (
//     <Document>
//       <Page>
//         <Html stylesheet={stylesheet}>{html}</Html>
//       </Page>
//     </Document>
//   );
  
// //   const createPDF = async () => {
// //     const pdf = new jsPDF("portrait", "pt", "a4");
// //     const data = document.querySelector("#pdf");
// //     pdf.html(`<div>working</div>`).then(() => {
// //       pdf.save("shipping_label.pdf");
// //     });
// //   }; 
// //   return ( <div className="shipping">
// //   <h1>Download Shipping Label</h1>
// //   <p>Nihil quam soluta sed enim aut omnis voluptatem reprehenderit.</p>
// //   <div id="pdf">
// //       <p>TO: John Citizen</p>
// //       <p>123 Random Street</p>
// //       <p>Oak Creek, Colorado (CO), 80467</p>
    
// //   </div>
// //   <button onClick={createPDF} type="button">Downloaxd</button>
// // </div>);
// const reportTemplateRef = useRef(null);

// 	const handleGeneratePdf = () => {
//     html2canvas(document.getElementById('SEforpdf'))
//     .then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const doc = new jsPDF({
//         format: 'a4',
//         unit: 'px',
//       });
//   doc.addImage(imgData, 'PNG', 0, 0);
//     doc.save("download.pdf");  
//     })
		

// 		// Adding the fonts.
// 		// doc.setFont('Arial', 'normal');

//     // doc.setFont('Lateef', 'normal');
// 	// 	doc.html(reportTemplateRef.current, {
// 	// 		async callback(doc) {
// 	// 			await doc.save('document');
// 	// 		},
// 	// 	});
// 	};

// 	return (
// 		<div>
// 			<button className="button" onClick={handleGeneratePdf}>
// 				Generate PDF
// 			</button>
// 			<div ref={reportTemplateRef}>
// 				<Themarkdown />
//         <SingleEntry/>
// 			</div>
// 		</div>
// 	);
// };

// export default PDF;