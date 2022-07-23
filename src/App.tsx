import React, { ChangeEvent, CSSProperties, MouseEvent, useEffect, useRef, useState } from 'react';
import './assets/main.css';
import {AiFillGithub, AiOutlineClose} from '../node_modules/react-icons/ai';
import {GiWhaleTail} from '../node_modules/react-icons/gi'; 
import {SiBlogger} from '../node_modules/react-icons/si';
import {IoHelpCircleOutline} from '../node_modules/react-icons/io5';
import {IoIosCloseCircleOutline} from '../node_modules/react-icons/io';

const App =()=>{
  const root =document.getElementById("root");
  const canvas =document.getElementById("canvas");
  const loader =document.getElementById("loader");
  const [url, setUrl]=useState<string|null>(null);
  const [widthInput, setWidthInput]=useState<string|null>(null);
  const [heightInput,setHeightInput]=useState<string|null>(null);
  const minWidth =100;
  const minHeight =100;
  const [maxSize, setMaxSize]=useState<{width:number|null, height: number|null}>({
    width :null,
    height:null 
  })
  const [imgLoadStyle, setImgLoadStyle]=useState<CSSProperties>();

  const drag =useRef<boolean>(false);
  const left ="left";
  const right ="right" ;
  const top ="top";
  const bottom ="bottom";
  type directionType = typeof left |typeof right | typeof top | typeof bottom|null ; 
  const dragDirection =useRef<directionType>(null);
  type clientType={
    x:number,
    y:number
  }
  const previousClient =useRef<clientType>({
    x:0,
    y:0
  });
  const moreDirection =document.getElementById("moreDirection");
  const onChangeWidthInput=(event:ChangeEvent<HTMLInputElement>)=>{
    const value =event.target.value; 
    setWidthInput(value);
  };
  const onChangeHeightInput=(event:ChangeEvent<HTMLInputElement>)=>{
    const value =event.target.value;
    setHeightInput(value);
  };
  const resizerByKeypressBtn =(event:MouseEvent)=>{
    event.preventDefault();
    const style:CSSProperties ={
      width: widthInput === null? "auto" : `${widthInput}px`,
      height: heightInput === null? "auton": `${heightInput}px` 
    };
    setImgLoadStyle(style);
  };
  const onMouseOverActualBtn =(event:MouseEvent)=>{
    const currentTarget =event.currentTarget;
    const fileType =currentTarget.nextElementSibling;
    fileType?.classList.toggle("on");
  };
  const onMouseOutActualBtn =(event:MouseEvent)=>{
    const currentTarget =event.currentTarget;
    const fileType =currentTarget.nextElementSibling;
    fileType?.classList.contains("on") && fileType?.classList.remove("on");
  }
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
  const onClickMoreDirectionBtn=(event:MouseEvent)=>{
    const sizeBord =document.getElementById("sizeBord");
    if(moreDirection !==null){
      onMouseOverMoreDirectionBtn(event);
      moreDirection.classList.toggle("on");
      const sizeBordHeight= sizeBord?.clientHeight;
      if(sizeBord !==undefined){
        moreDirection.setAttribute("style",`height: ${sizeBordHeight}px`);
      };
      const currentTarget= event.currentTarget;
      const btnExplainBubble =currentTarget.getElementsByClassName("btnExplainBubble")[0];
      btnExplainBubble.classList.contains("on")&& btnExplainBubble.classList.remove("on");
    }
  };
  function onMouseOverMoreDirectionBtn (event:MouseEvent){
    if(!moreDirection?.classList.contains("on")){
      const currentTarget= event.currentTarget;
      const btnExplainBubble =currentTarget.getElementsByClassName("btnExplainBubble")[0];
      btnExplainBubble.classList.toggle("on");
    }
  };
  const onClickMoreDirectionCloseBtn=()=>{
    moreDirection?.classList.remove("on");
  }
  const onMouseDownResizerBtn=(event:MouseEvent, direction:directionType)=>{
    drag.current =true ;
    previousClient.current ={
      x: event.clientX,
      y: event.clientY
    };
    dragDirection.current = direction ;
  };

  const onMouseMoveImgLoad=(event:MouseEvent<HTMLDivElement>)=>{
    if(drag.current){
      const changeX = event.clientX - previousClient.current.x
      const changeY =event.clientY - previousClient.current.y ;
      const imageDoc =document.getElementById("image");
      if(imageDoc !==null){
        const imgWidth= imageDoc.offsetWidth;
        const imgHeight= imageDoc.offsetWidth;
        
        const width = 
        dragDirection.current?.includes(left)? 
        imgWidth -changeX 
        :
        imgWidth + changeX;

        const height =
        dragDirection.current?.includes(top)?
        imgHeight -changeY
        :
        imgHeight + changeY ;

        if(canvas!==null && maxSize.height !==null  &&maxSize.width!==null){
          const style :CSSProperties =
          {
            width: width ,
            height : height,
          }
          ;
          console.log("mex", maxSize, width, height)
          if(width>= maxSize.width){
            style.width =maxSize.width;
          };
        
          if(height>= maxSize.height){
            style.height = maxSize.height;
          };
          if(width < minWidth || height < minHeight){
            width< 100 ? style.width = minWidth : style.width =width;
            height< 100 ? style.height= minHeight: style.height =height;
          }
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
    if(drag.current){
      drag.current = false;
      dragDirection.current= null;
      previousClient.current ={
        x:0,
        y:0
      };
    };
  };
  useEffect(()=>{
    if(canvas !==null && root !==null && loader !==null){
      const innerPadding =window.getComputedStyle(canvas).getPropertyValue('padding');
      const padding =Number(innerPadding.slice(0, innerPadding.indexOf("px"))) ; 
      const cavasWidth = canvas.clientWidth - padding*2 ;
      const maxHeight =root.offsetHeight *0.6  ;
      const targetHeight = maxHeight - loader.clientHeight -padding *2;
      setMaxSize({
        width:cavasWidth,
        height:targetHeight
      })

    };
  },[canvas, root ,loader]);
return(
  <div 
    id="inner"
    onMouseMove={onMouseMoveImgLoad}
    onMouseUp={onMouseUpImgLoad}  
  >
    <header>Image Resizer</header>
    <div id='directions'>
      <div className='firstDirection'>
        You can change the size of the picture by dragging mouse or enter the desired size.
        <button 
          className='moreDirectionBtn btn'
          onClick={onClickMoreDirectionBtn}
          onMouseOver={onMouseOverMoreDirectionBtn}
          >
          <IoHelpCircleOutline/>
          <div className='btnExplainBubble'>
            Press button to show more direction 
          </div>
        </button>
      </div>
      <div 
        className='moreDirection'
        id='moreDirection'
      >
        <button 
          className='moreDirectionCloseBtn btn'
          onClick={onClickMoreDirectionCloseBtn}
        >
          <IoIosCloseCircleOutline/>
        </button>
        <div className='moreDirectionInner'>
          <p>
            When you change the size using the mouse, the size of the picture changes while maintaining the ratio of the original picture.
          </p>
          <p>
            If you waant to change size by dragging mouse,
            <br/>
            Put your mouse over the top ,bottom, left or right of the picuture.
          </p>
        </div>
      </div>
 
    </div>
    {/* {url !==null &&} */}
    
    <form  id='resizerByKeypress'>
      <div className='sizeInput'>
        <label>width : </label>
        <input
          type="text"
          name='widthInput'
          id="widthInput"
          onChange={onChangeWidthInput}
        />
        <div>px</div>
      </div>
      <div className='sizeInput'>
        <AiOutlineClose/>
        <label>height : </label>
        <input
          type="text"
          name='heightInput'
          id="heightInput"
          onChange={onChangeHeightInput}
        />
        <div>px</div>
      </div>
      <button
        onClick={resizerByKeypressBtn}
        className="resizerByKeypressBtn"
      >
        Resizer
      </button>
    </form>
    <div id="inner_body">
      <div id="loader">
        <label
          id="loaderActualBtn"
          htmlFor='loaderInput'
          onMouseEnter={onMouseOverActualBtn}
          onMouseOut={onMouseOutActualBtn}
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
      <div id="load">
        <div 
            id="imgLoad"
            style={imgLoadStyle}
          >
          {url !==null &&
          <>
          <div className='resizerBtns '>
            <button 
              className='left '
              onMouseDown={(event)=>onMouseDownResizerBtn(event ,left)}
            >
              <div className='resizerPointer'>
              </div>
            </button>
            <button 
              className='top '
              onMouseDown={(event)=>onMouseDownResizerBtn(event, top)}
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
            />
          </>
          }
        </div>
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