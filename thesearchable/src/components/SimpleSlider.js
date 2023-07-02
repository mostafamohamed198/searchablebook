import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import MyImage from '../../../media/entrycover/226.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SimpleSlider(props) {
    const [catEnt, setCatEnt] = React.useState([])
    React.useEffect(function(){
        fetch('/catentries/' + props.catid)
        .then(res => res.json())
        .then(data => {
            data.map(object =>{
                let objectdata = {
                    id: object.id,
                    title: object.title,
                    entryCover: object.entryCover
                }
                setCatEnt(oldArr => [...oldArr, objectdata]);
            })
        })
    },[])

    const allCatEnt = catEnt.map(ent => {
        const cover =  `${ent.entryCover}`
       
         const link  = `/entry/${ent.id}`
        return(
            <div >
                <Link  to={link}>
            <div  className="LP--product--card">
            <div className="LP--PD--media">
              <span className="LP--PD--media--tigger">
              <img src={cover}className="LP--PD--media--image"/>
              </span>
            </div>
       
            <div className="LP--PD--info">
             {ent.title}
            </div>
          </div>
          </Link>
          </div>
        )
    })

    function collapsedWidth(){
      const windowWidth = React.useRef(window.innerWidth);
      if (windowWidth.current >= 390 ){
              return(
                3
              )
      }
      else if (windowWidth.current >= 800 ){
        return(
          2
        )
}

      else{
              return(
                1
              )
      }
     
    }
const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: collapsedWidth(),
    slidesToScroll: collapsedWidth()
    };
  return (
    <div  className="Simple--slider">
   
    <Slider {...settings}>
    {allCatEnt}
    </Slider>
  </div>
  );
}