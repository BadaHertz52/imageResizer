import React, { ChangeEvent, CSSProperties, MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import './assets/main.css';
import {AiFillGithub, AiOutlineClose, AiOutlineDownload} from '../node_modules/react-icons/ai';
import {GiWhaleTail} from '../node_modules/react-icons/gi'; 
import {SiBlogger} from '../node_modules/react-icons/si';
import {IoHelpCircleOutline} from '../node_modules/react-icons/io5';
import {IoIosCloseCircleOutline} from '../node_modules/react-icons/io';

const App =()=>{
  const root =document.getElementById("root");
  const canvas =document.getElementById("canvas");
  const canvasTop =document.getElementById("canvas_top");
  const [url, setUrl]=useState<string|null>(null);
  const [fileName, setFileName]=useState<string|null>(null);
  const [widthInput, setWidthInput]=useState<number|null>(null);
  const [heightInput,setHeightInput]=useState<number|null>(null);
  const minWidth :number =100;
  const minHeight : number=100;
  const [maxSize, setMaxSize]=useState<{width:number|null, height: number|null}>({
    width :null,
    height:null 
  })
  const [imgLoadStyle, setImgLoadStyle]=useState<CSSProperties>();
  const [imageSize, setImageSize]=useState<{width: number , height: number}| null>(null);
  const [notification, setNotification]=useState<string|null>(null);
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
  const makeNotificationForMax=(what:string, maxSize:number):string=>{
    return(
      `The ${what} of the image can't exceed ${maxSize}px.If you want to increase the maximum width, increase the screen size.`
    )
  };

  const makeNotificationForMin =(what:string, minSize:number):string=>{
    return(
      `The ${what} of the image has to be greater than or equal to  ${minSize}px. Try again. `
    )
  }
  const onChangeWidthInput=(event:ChangeEvent<HTMLInputElement>)=>{
    const value =event.target.value; 
    setWidthInput(Number(value)) ; 
  };
  const onChangeHeightInput=(event:ChangeEvent<HTMLInputElement>)=>{
    const value =event.target.value;
    setHeightInput(Number(value));
    ;
  };
  const resizerByKeypressBtn =(event:MouseEvent)=>{
    event.preventDefault();
    if(widthInput !==null || heightInput !==null){
      const style:CSSProperties ={
        width: widthInput === null? "auto" : `${widthInput}px`,
        height: heightInput === null? "auto": `${heightInput}px` 
      };
      if(maxSize.height !==null && maxSize.width !==null){
        const heightCondition = heightInput !==null?  minHeight <= heightInput && heightInput <= maxSize.height : true;

        const widthCondition = widthInput !==null? minWidth <= widthInput && widthInput <= maxSize.width: true ;
        const changeImgSize=()=>{
          setImgLoadStyle(style);
          setNotification(null);
        };
        const notifyHeight =()=>{
          if(heightInput !== null  && maxSize.height !==null){
            heightInput> maxSize.height &&
            setNotification(makeNotificationForMax("height", maxSize.height));
  
            heightInput< minHeight &&
            setNotification(makeNotificationForMin("height", minHeight));
          } 
        };
        const notifyWidth=()=>{
          if(widthInput!== null && maxSize.width!==null){
            widthInput > maxSize.width  &&
            setNotification
            (makeNotificationForMax("width", maxSize.width));

            widthInput < minWidth &&
            setNotification(
              makeNotificationForMin("width", minWidth)
            );
          }
        }
          if(heightInput==null && widthInput !==null){
            widthCondition ?
            changeImgSize():
            notifyWidth();
          };
          if(heightInput  !==null && widthInput ==null){
            heightCondition?
            changeImgSize():
            notifyHeight();
          };
          if(heightInput !==null && widthInput!==null){
            if(heightCondition && widthCondition){
              changeImgSize();
            }else{
              if(!heightCondition){
                notifyHeight();
              };
              if(!widthCondition){
                notifyWidth();
              }
            }
          }
      }
      setWidthInput(null);
      setHeightInput(null);
    }else{
      setNotification("Please enter a number")
    }

  };
  const onMouseOverActualBtn =(event:MouseEvent)=>{
    const currentTarget =event.currentTarget;
    const downloader =document.getElementById("downloader");
    const fileType =currentTarget.nextElementSibling;
    fileType?.classList.toggle("on");
    const rootWidth =root?.offsetWidth;
    if(downloader !==null && rootWidth !==undefined && rootWidth < 600){
      fileType?.setAttribute("style",`height:${downloader.clientHeight}px` );
      downloader.setAttribute("style", "display:none");
    }
  };
  const onMouseOutActualBtn =(event:MouseEvent)=>{
    const currentTarget =event.currentTarget;
    const fileType =currentTarget.nextElementSibling;
    fileType?.classList.contains("on") && fileType?.classList.remove("on");
    const downloader =document.getElementById("downloader");
    if(downloader !==null){
      downloader.setAttribute("style", "display:block");
    }
  }
  const onChangeFile=(event:ChangeEvent<HTMLInputElement>)=>{
    setImgLoadStyle(undefined);
    root?.setAttribute("style","height:100%");
    const files =event.target.files; 
    if(files !==null){
      const file =files[0];
      const fileUrl = URL.createObjectURL(file);
      setUrl(fileUrl);
      setFileName(file.name)
    }else{
      console.log("There is no file")
    }
  };
  const onClickMoreDirectionBtn=(event:MouseEvent)=>{
    const sizeBord =document.getElementById("sizeBord");
    const currentTarget= event.currentTarget;
    currentTarget.parentElement?.nextElementSibling?.classList.toggle("on");

    const btnExplainBubble =currentTarget.getElementsByClassName("btnExplainBubble")[0];
    btnExplainBubble.classList.contains("on")&& btnExplainBubble.classList.remove("on");
    sizeBord?.setAttribute("style","display:none");
  };

  function onMouseOverMoreDirectionBtn (event:MouseEvent){
    const currentTarget= event.currentTarget;
    const moreDirection =currentTarget.parentElement?.nextElementSibling;
    if(!moreDirection?.classList.contains("on")){
      const btnExplainBubble =currentTarget.getElementsByClassName("btnExplainBubble")[0];
      btnExplainBubble.classList.toggle("on");
    }
  };
  const onClickMoreDirectionCloseBtn=(event:MouseEvent)=>{
    const currentTarget=event.currentTarget;
    currentTarget.parentElement?.classList.remove("on");
    const sizeBord =document.getElementById("sizeBord");
    sizeBord?.setAttribute("style","display:flex");
  };
  const readyResizeImg =(clientX:number, clientY:number, direction:directionType)=>{
    drag.current =true ;
    previousClient.current ={
      x: clientX,
      y: clientY
    };
    dragDirection.current = direction ;
  };
  const onMouseDownResizerBtn=(event:MouseEvent, direction:directionType)=>{
    readyResizeImg(event.clientX, event.clientY, direction);
  };  
  const onTouchStartResizerBtn =(event:TouchEvent, direction:directionType)=>{
    const changeTouche =event.changedTouches[0];
    readyResizeImg(changeTouche.clientX, changeTouche.clientY, direction);
  };
  /**
   * mouse, touch 의 움직임에 따라 imgLoad의 크기,높이를 변경하는 함수
   * @param clientX 
   * @param clientY 
   */
  const resizeImgLoad =(clientX:number, clientY:number)=>{
    if(drag.current){
      const changeX = clientX - previousClient.current.x
      const changeY =clientY - previousClient.current.y ;
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
  const onMouseMoveImgLoad=(event:MouseEvent<HTMLDivElement>)=>{
    resizeImgLoad(event.clientX, event.clientY);
  };
  const onTouchMoveImgLoad =(event:TouchEvent<HTMLDivElement>)=>{
    resizeImgLoad(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
  };
  const endResizeImgLoad=()=>{
    if(drag.current){
      drag.current = false;
      dragDirection.current= null;
      previousClient.current ={
        x:0,
        y:0
      };
      drawImgCanvas();
    };
  };

  const closeNotification=(event:MouseEvent)=>{
    setNotification(null);
    setWidthInput(null);
    setHeightInput(null);
  };
  const downloadImg=()=>{
    const downlink =document.getElementById("downlink") as HTMLAnchorElement ;
    const downloadCanvas =document.getElementById("downloadCanvas") as HTMLCanvasElement;
    const canvasUrl =downloadCanvas.toDataURL();
    downlink.href =canvasUrl;
    if(fileName!==null){
      const dotIndex = fileName.indexOf(".");
      const name =fileName.slice(0, dotIndex);
      const fileType =fileName.slice(dotIndex);
      const reName =`${name}_resizer${fileType}`;
      downlink.download = reName;
    }
    downlink.click();
  };
  function drawImgCanvas(){
    const downloadCanvas =document.getElementById("downloadCanvas") as HTMLCanvasElement;
    const ctx =downloadCanvas.getContext('2d');
    if(ctx !==null && imgLoadStyle !== undefined && url !==null){
      ctx.clearRect(0,0, downloadCanvas.width, downloadCanvas.height);
      const newImg = new Image();
      const width = Number(imgLoadStyle.width);
      const height= Number(imgLoadStyle.height);
      downloadCanvas.width =width;
      downloadCanvas.height =height;
      newImg.onload=()=>{
        ctx.drawImage(newImg,0,0 , width, height );
      };
      newImg.src =url; 
    }
  };
  const getMaxSize=()=>{
    if(canvas !==null && root !==null && canvasTop !==null){
      const innerPadding =window.getComputedStyle(canvas).getPropertyValue('padding');
      const padding =Number(innerPadding.slice(0, innerPadding.indexOf("px"))) ; 
      const cavasWidth = canvas.clientWidth - padding*2 ;
      const maxHeight =root.offsetHeight *0.6  ;
      const targetHeight = maxHeight - canvasTop.clientHeight -padding *2;
      setMaxSize({
        width:Math.floor(cavasWidth) ,
        height:Math.floor(targetHeight)
      })

    };
  };
  window.onresize =()=> getMaxSize()
  useEffect(()=>{
    getMaxSize();
  },[canvas, root ,canvasTop]);
  useEffect(()=>{
    const imageDoc =document.getElementById("image");
    if(imgLoadStyle !==undefined){

      const width =imageDoc?.clientWidth;
      const height =imageDoc?.clientHeight;

      imageDoc !==null && 
      setImageSize({
        width:width as number, 
        height: height as number 
      });
    }else{
      setImageSize(null);
    }
  },[imgLoadStyle]);
return(
  <>
  <div 
    id="inner"
    onMouseMove={onMouseMoveImgLoad}
    onTouchMove={onTouchMoveImgLoad}
    onMouseUp={endResizeImgLoad}
    onTouchEnd={endResizeImgLoad}  
  >
    <header
      id="pageHeader"
    >
      Image Resizer
    </header>
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
            When you change the size using the mouse, the size of the picture changes.
          </p>
          <p>
            If you waant to change size by dragging mouse,
            Put your mouse over the top ,bottom, left or right of the picuture.
          </p>
        </div>
      </div>
    </div>
    {url !==null &&
    <div id="sizeBord">
      <form  id='resizerByKeypress'>
        <header> Size Form</header>
        <div className='sizeInput'>
          <label
            htmlFor='widthInput'
          >
            width &nbsp;:

          </label>
          <input
            type="number"
            name='widthInput'
            id="widthInput"
            placeholder='number'
            value={widthInput===null? "": widthInput}
            onChange={onChangeWidthInput}
          />
          <div>px</div>
        </div>
        <div className='sizeInput'>
          <AiOutlineClose/>
          <label
            htmlFor='heightInput'
          >
            height : 
          </label>
          <input
            type="number"
            name='heightInput'
            id="heightInput"
            placeholder='number'
            value={heightInput===null? "": heightInput}
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
      {maxSize.height !== null && maxSize.width!==null &&
        <div id="sizeDirection">
          <header>
              Size Information
          </header>
          <div className='sizes'>
            <div  id="maxSize">
              <header>
                Maximum
              </header>
              <div className='size'>
                <div>
                    width:
                    &nbsp;
                    {maxSize.width}px
                </div>
                <div>
                    height:
                    &nbsp;
                    {maxSize.height}px
                </div>
              </div>
            </div>
            <div id="minSize">
              <header>Minium</header>
              <div className="size">
                <div>
                  width :
                  &nbsp;
                  {minWidth}px
                </div>
                <div>
                    height : 
                    &nbsp;
                    {minHeight}px
                </div>
              </div>
            </div>
            {imageSize !==null &&
              <div id="imgSize">
                <header>Photo size</header>
                <div className="size">
                  <div>
                    width : 
                    &nbsp;
                    {imageSize.width}
                    px                
                  </div>
                  <div>
                    height:
                    &nbsp;
                    {imageSize.height}
                    px
                  </div>
                </div>
              </div>  
            }
            </div>
        </div>
      }
    </div>
    }

    <div id="canvas">
      <div id='canvas_top'>
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
        {imgLoadStyle !==undefined &&
        <div
          id="downloader"
        >
          <button
            className='downloadBtn'
            onClick={downloadImg}
          >
            <span>
              Download
            </span>
            <AiOutlineDownload/>
            
          </button>
          <a
            id="downlink"
            href='/'
          >
          </a>
        </div>
        }
      </div>

      {url !==null &&
      <div id="load">
        <div 
            id="imgLoad"
            style={imgLoadStyle}
          >
          <>
          <div className='resizerBtns '>
            <button 
              className='left '
              onMouseDown={(event)=>onMouseDownResizerBtn(event ,left)}
              onTouchStart={(event)=>onTouchStartResizerBtn(event, left)}
            >
              <div className='resizerPointer'>
              </div>
            </button>
            <button 
              className='top '
              onMouseDown={(event)=>onMouseDownResizerBtn(event, top)}
              onTouchStart={(event)=>onTouchStartResizerBtn(event, top)}
            >
              <div className='resizerPointer'>
              </div>
            </button>
            <button 
              className='right'
              onMouseDown={(event)=>onMouseDownResizerBtn(event,right)}
              onTouchStart={(event)=>onTouchStartResizerBtn(event, right)}
            >
              <div className='resizerPointer'>
              </div>
            </button>
            <button 
              className='bottom '
              onMouseDown={(event)=>onMouseDownResizerBtn(event, bottom)}
              onTouchStart={(event)=>onTouchStartResizerBtn(event, bottom)}
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
        </div>
        <canvas
          id="downloadCanvas"
          style={imgLoadStyle}
        >
        </canvas>
      </div>
      }
    </div>
    <div id="footer">
    <div id="copyRight">
        <span>© 2022.&nbsp;</span>
        <a 
          className='name'
          href='https://github.com/settings/profile'
          aria-details="link to go writer(=badahertz52
            )'s githug profile"
        >
          BadaHertz52
          <GiWhaleTail/>
        </a>
      </div>
      <a
        href='https://github.com/BadaHertz52/imageResizer'
        aria-details="link to go  this project's github site "
      >
        <AiFillGithub/>
        &nbsp;
        Github
      </a>
      <a
        href='https://velog.io/@badahertz52/Image-resizer-by-java-script'
        aria-details="link to go writer blog about thie project"
      >
        <SiBlogger/>
        &nbsp;
        blog
      </a>
    </div>

  </div>
  {notification!==null &&
      <div id="notification">
        <div className="inner">
          <button
            className='closeNotificationBtn'
            onClick={closeNotification}
          >
            <IoIosCloseCircleOutline/>
          </button>
          <header>
            <span>😞</span>
            <span>Notifiction</span>
          </header>
          {notification}
        </div>
      </div>
  }
  </>
)
};

export default App