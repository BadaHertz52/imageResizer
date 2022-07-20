import React, { ChangeEvent, CSSProperties, MouseEvent, useEffect, useRef, useState } from 'react';
import './assets/main.css';
import {AiFillGithub} from '../node_modules/react-icons/ai';
import {GiWhaleTail} from '../node_modules/react-icons/gi'; 
import {SiBlogger} from '../node_modules/react-icons/si';

const App =()=>{
  const root =document.getElementById("root");
  const innerBody =document.getElementById("inner_body");
  const imgLoad= document.getElementById("imgLoad");
  const [url, setUrl]=useState<string|null>(null);
  const initialImgStyle:CSSProperties ={
    width:"100%",
    height:"auto"
  };
  const initialImgLoadStyle :CSSProperties ={
    width:"80%",
    height:"auto"};
  const [imgStyle, setImgStyle]=useState<CSSProperties>(initialImgStyle);
  const [imgLoadStyle, setImgLoadStyle]=useState<CSSProperties>(initialImgLoadStyle);
  useEffect(()=>{
    imgStyle !==initialImgStyle &&
    setImgStyle(initialImgStyle);
    imgLoadStyle !== initialImgLoadStyle &&
    setImgLoadStyle(initialImgLoadStyle);
  },[url]);
  const drag =useRef<boolean>(false);
  const left ="left";
  const right ="right" ;
  const top ="top";
  const bottom ="bottom";
  type directionType = typeof left |typeof right | typeof top | typeof bottom ;
  const dragDirection =useRef<directionType>(left);

  type clientType={
    x:number,
    y:number
  }
  const previousClient =useRef<clientType>({
    x:0,
    y:0
  });

  const onChangeFile=(event:ChangeEvent<HTMLInputElement>)=>{
    const files =event.target.files; 
    if(files !==null){
      const file =files[0];
      const fileUrl = URL.createObjectURL(file);
      setUrl(fileUrl);
    }else{
      console.log("There is no file")
    }
  };
  const onMouseDownResizerBtn=(event:MouseEvent, direction:directionType)=>{
    drag.current =true ;
    previousClient.current ={
      x: event.clientX,
      y: event.clientY
    };
    dragDirection.current= direction ;
  };
  const onMouseMoveImgLoad=(event:MouseEvent<HTMLDivElement>)=>{
    if(drag.current){
      const changeX = event.clientX - previousClient.current.x ;
      const changeY =event.clientY - previousClient.current.y ;
      const imageDoc =document.getElementById("image");

      if(imageDoc !==null){
        const imgWidth= imageDoc.offsetWidth;
        const imgHeight= imageDoc.offsetWidth;
        
        const width = 
        dragDirection.current === left? 
        imgWidth -changeX 
        :
        imgWidth + changeX;

        const height =
        dragDirection.current ===bottom?
        imgHeight -changeY
        :
        imgHeight + changeY ;

        if(innerBody !==null && root !==null){
          const innerPadding =window.getComputedStyle(innerBody).getPropertyValue('padding');
          const padding =Number(innerPadding.slice(0, innerPadding.indexOf("px"))) ; 
          const innerWidth = innerBody.clientWidth - padding*2 ;
          const innerHeight =innerBody.clientHeight ;
          const maxHeight =root.offsetHeight *0.9  
          const style :CSSProperties ={
            width: 
              width ,
            height : height,
          };
          if(width>= innerWidth){
            drag.current = false;
            style.width =innerWidth;
          };
          if(innerHeight >= maxHeight && imgLoad !==null){
            const innerBodyTop = innerBody.clientTop;
            const imgLoadTop = imgLoad.clientTop;
            const targetHeight = maxHeight - (imgLoadTop -innerBodyTop);
            drag.current =false;
            style.height = targetHeight;
          };
          if(width < 150 || height < 150){
            drag.current =false;
            width< 150 ? style.width =150 : style.width =width;
            height< 150 ? style.height=150 : style.height =height;
          }
          setImgStyle(style);
          setImgLoadStyle(style);
        }else{
          console.log("Can't find inner")
        }

      }else{
        console.log( "image is null")
      }
    };
  };

  const onMouseUpImgLoad=(event:MouseEvent<HTMLDivElement>)=>{
    if(drag.current && imgStyle !==undefined){
      drag.current = false;
      previousClient.current ={
        x:0,
        y:0
      };
      setImgLoadStyle(imgStyle)
    };
  };

return(
  <div 
    id="inner"
    onMouseMove={onMouseMoveImgLoad}
    onMouseUp={onMouseUpImgLoad}  
  >
    <header>Image Resizer</header>
    <div id="inner_body">
      <div id="loader">
          <label
            id="loaderActualBtn"
            htmlFor='loaderInput'
          >
            Upload image file
          </label>
          <div className='fileType'>
              jpeg, jpg and png is possible
          </div>
        <input
          id="loaderInput"
          type="file"
          accept ="image/jpeg, image/jpg, image/png"
          onChange={onChangeFile}
        />
      </div>
      {/* {url !==null &&
        <div id='resizderExplain'>
          <p>
            You can change the size of the picture by dragging the top, bottom, and bottom buttons.
          </p>
          <p>
            Drag the left and right buttons to change the horizontal and vertical size of the picture.
          </p>
          <p>
            Drag the up and down buttons only changes the portrait size of the picture.
          </p>
        </div>
      } */}
      <div 
          id="imgLoad"
          style={imgLoadStyle}
        >
        {url !==null &&
        <>
        <div className='resizerBtns ratio'>
          <button 
            className='leftTop'
            onMouseDown={(event)=>onMouseDownResizerBtn(event,left)}
          >
          </button>
          <button 
            className='rightTop'
            onMouseDown={(event)=>onMouseDownResizerBtn(event,top)}
          >
          </button>
          <button 
            className='leftBottom'
            onMouseDown={(event)=>onMouseDownResizerBtn(event,right)}
          >
          </button>
          <button 
            className='rightBottom'
            onMouseDown={(event)=>onMouseDownResizerBtn(event, bottom)}
          >
          </button>
        </div>

        <div className='resizerBtns horizontal'>
          <button 
            className='left '
            onMouseDown={(event)=>onMouseDownResizerBtn(event,left)}
          >
            <div className='resizerPointer'>
            </div>
          </button>
          <button 
            className='top '
            onMouseDown={(event)=>onMouseDownResizerBtn(event,top)}
          >
            <div className='resizerPointer'>
            </div>
          </button>
          <button 
            className='right'
            onMouseDown={(event)=>onMouseDownResizerBtn(event,right)}
          >
            <div className='resizerPointer'>
            </div>
          </button>
          <button 
            className='bottom '
            onMouseDown={(event)=>onMouseDownResizerBtn(event, bottom)}
          >
            <div className='resizerPointer'>
            </div>
          </button>
        </div>
          <img
            id="image"
            src={url}
            alt="uploadedPhoto"
            style={imgStyle}
          />
        </>
        }
      </div>
    </div>
    <div id="footer">
      <div id="copyRight">
        <span>© 2022.&nbsp;</span>
        <span className='name'>
          BadaHertz52
          <GiWhaleTail/>
        </span>
      </div>
      <a
        href='https://github.com/settings/profile'
        aria-details="link to go writer(=badahertz52
          )'s githug profile"
      >
        <AiFillGithub/>
        Github
      </a>
      <a
        href='https://velog.io/@badahertz52'
        aria-details="link to go writer(=badahertz52
          )'s blog"
      >
        <SiBlogger/>
        blog
      </a>
    </div>
  </div>
)
};

export default App