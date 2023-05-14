import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

export const ComponentToPrint = React.forwardRef((props, ref) => {

    return (
      <div className="CTP--div" ref={ref}>
       
    
       <div className='wrapper'>
    
        <div>

            <div className='details' >
             
                <div className="DP--logo">العنوان , اللوجو</div>
                <hr />
                <div className="DP--container">
                    <div className="DP--TC">
                <div className="DP--title">{props.title}</div>
                <ReactMarkdown className="DP--content">{props.content}</ReactMarkdown>
                </div>
                <div className="DP--bibilography">
                    <div className="DP--doc--info">
                        معلومات عن المقال: 
                    </div>
                    <div>
                        <div className="DP--bib--title">المرجع: </div>
                        <div className="DP--bib--content">{props.bibilography}</div>
                    </div>
                </div>
                </div>
                
            </div>
            
        </div>
    </div>
      </div>
    );
  });