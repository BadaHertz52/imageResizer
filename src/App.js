"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./assets/main.css");
const ai_1 = require("../node_modules/react-icons/ai");
const gi_1 = require("../node_modules/react-icons/gi");
const si_1 = require("../node_modules/react-icons/si");
const io5_1 = require("../node_modules/react-icons/io5");
const io_1 = require("../node_modules/react-icons/io");
const App = () => {
    const root = document.getElementById("root");
    const canvas = document.getElementById("canvas");
    const canvasTop = document.getElementById("canvas_top");
    const [url, setUrl] = (0, react_1.useState)(null);
    const [fileName, setFileName] = (0, react_1.useState)(null);
    const [widthInput, setWidthInput] = (0, react_1.useState)(null);
    const [heightInput, setHeightInput] = (0, react_1.useState)(null);
    const minWidth = 100;
    const minHeight = 100;
    const [maxSize, setMaxSize] = (0, react_1.useState)({
        width: null,
        height: null
    });
    const [imgLoadStyle, setImgLoadStyle] = (0, react_1.useState)();
    const [imageSize, setImageSize] = (0, react_1.useState)(null);
    const [notification, setNotification] = (0, react_1.useState)(null);
    const drag = (0, react_1.useRef)(false);
    const left = "left";
    const right = "right";
    const top = "top";
    const bottom = "bottom";
    const dragDirection = (0, react_1.useRef)(null);
    const previousClient = (0, react_1.useRef)({
        x: 0,
        y: 0
    });
    const moreDirection = document.getElementById("moreDirection");
    const makeNotificationForMax = (what, maxSize) => {
        return (`The ${what} of the image can't exceed ${maxSize}px.If you want to increase the maximum width, increase the screen size.`);
    };
    const makeNotificationForMin = (what, minSize) => {
        return (`The ${what} of the image has to be greater than or equal to  ${minSize}px. Try again. `);
    };
    const onChangeWidthInput = (event) => {
        const value = event.target.value;
        setWidthInput(Number(value));
    };
    const onChangeHeightInput = (event) => {
        const value = event.target.value;
        setHeightInput(Number(value));
        ;
    };
    const resizerByKeypressBtn = (event) => {
        event.preventDefault();
        if (widthInput !== null || heightInput !== null) {
            const style = {
                width: widthInput === null ? "auto" : `${widthInput}px`,
                height: heightInput === null ? "auto" : `${heightInput}px`
            };
            if (maxSize.height !== null && maxSize.width !== null) {
                const heightCondition = heightInput !== null ? minHeight <= heightInput && heightInput <= maxSize.height : true;
                const widthCondition = widthInput !== null ? minWidth <= widthInput && widthInput <= maxSize.width : true;
                const changeImgSize = () => {
                    setImgLoadStyle(style);
                    setNotification(null);
                };
                const notifyHeight = () => {
                    if (heightInput !== null && maxSize.height !== null) {
                        heightInput > maxSize.height &&
                            setNotification(makeNotificationForMax("height", maxSize.height));
                        heightInput < minHeight &&
                            setNotification(makeNotificationForMin("height", minHeight));
                    }
                };
                const notifyWidth = () => {
                    if (widthInput !== null && maxSize.width !== null) {
                        widthInput > maxSize.width &&
                            setNotification(makeNotificationForMax("width", maxSize.width));
                        widthInput < minWidth &&
                            setNotification(makeNotificationForMin("width", minWidth));
                    }
                };
                if (heightInput == null && widthInput !== null) {
                    widthCondition ?
                        changeImgSize() :
                        notifyWidth();
                }
                ;
                if (heightInput !== null && widthInput == null) {
                    heightCondition ?
                        changeImgSize() :
                        notifyHeight();
                }
                ;
                if (heightInput !== null && widthInput !== null) {
                    if (heightCondition && widthCondition) {
                        changeImgSize();
                    }
                    else {
                        if (!heightCondition) {
                            notifyHeight();
                        }
                        ;
                        if (!widthCondition) {
                            notifyWidth();
                        }
                    }
                }
            }
            setWidthInput(null);
            setHeightInput(null);
        }
        else {
            setNotification("Please enter a number");
        }
    };
    const onMouseOverActualBtn = (event) => {
        const currentTarget = event.currentTarget;
        const downloader = document.getElementById("downloader");
        const fileType = currentTarget.nextElementSibling;
        fileType === null || fileType === void 0 ? void 0 : fileType.classList.toggle("on");
        const rootWidth = root === null || root === void 0 ? void 0 : root.offsetWidth;
        if (downloader !== null && rootWidth !== undefined && rootWidth < 600) {
            fileType === null || fileType === void 0 ? void 0 : fileType.setAttribute("style", `height:${downloader.clientHeight}`);
            downloader.setAttribute("style", "display:none");
        }
    };
    const onMouseOutActualBtn = (event) => {
        const currentTarget = event.currentTarget;
        const fileType = currentTarget.nextElementSibling;
        (fileType === null || fileType === void 0 ? void 0 : fileType.classList.contains("on")) && (fileType === null || fileType === void 0 ? void 0 : fileType.classList.remove("on"));
        const downloader = document.getElementById("downloader");
        if (downloader !== null) {
            downloader.setAttribute("style", "display:block");
        }
    };
    const onChangeFile = (event) => {
        setImgLoadStyle(undefined);
        const files = event.target.files;
        if (files !== null) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setUrl(fileUrl);
            setFileName(file.name);
        }
        else {
            console.log("There is no file");
        }
    };
    const onClickMoreDirectionBtn = (event) => {
        const sizeBord = document.getElementById("sizeBord");
        if (moreDirection !== null) {
            onMouseOverMoreDirectionBtn(event);
            moreDirection.classList.toggle("on");
            sizeBord === null || sizeBord === void 0 ? void 0 : sizeBord.setAttribute("style", "display:none");
            const currentTarget = event.currentTarget;
            const btnExplainBubble = currentTarget.getElementsByClassName("btnExplainBubble")[0];
            btnExplainBubble.classList.contains("on") && btnExplainBubble.classList.remove("on");
        }
    };
    function onMouseOverMoreDirectionBtn(event) {
        if (!(moreDirection === null || moreDirection === void 0 ? void 0 : moreDirection.classList.contains("on"))) {
            const currentTarget = event.currentTarget;
            const btnExplainBubble = currentTarget.getElementsByClassName("btnExplainBubble")[0];
            btnExplainBubble.classList.toggle("on");
        }
    }
    ;
    const onClickMoreDirectionCloseBtn = () => {
        moreDirection === null || moreDirection === void 0 ? void 0 : moreDirection.classList.remove("on");
        const sizeBord = document.getElementById("sizeBord");
        sizeBord === null || sizeBord === void 0 ? void 0 : sizeBord.setAttribute("style", "display:flex");
    };
    const onMouseDownResizerBtn = (event, direction) => {
        drag.current = true;
        previousClient.current = {
            x: event.clientX,
            y: event.clientY
        };
        dragDirection.current = direction;
    };
    const onMouseMoveImgLoad = (event) => {
        var _a, _b;
        if (drag.current) {
            const changeX = event.clientX - previousClient.current.x;
            const changeY = event.clientY - previousClient.current.y;
            const imageDoc = document.getElementById("image");
            if (imageDoc !== null) {
                const imgWidth = imageDoc.offsetWidth;
                const imgHeight = imageDoc.offsetWidth;
                const width = ((_a = dragDirection.current) === null || _a === void 0 ? void 0 : _a.includes(left)) ?
                    imgWidth - changeX
                    :
                        imgWidth + changeX;
                const height = ((_b = dragDirection.current) === null || _b === void 0 ? void 0 : _b.includes(top)) ?
                    imgHeight - changeY
                    :
                        imgHeight + changeY;
                if (canvas !== null && maxSize.height !== null && maxSize.width !== null) {
                    const style = {
                        width: width,
                        height: height,
                    };
                    if (width >= maxSize.width) {
                        style.width = maxSize.width;
                    }
                    ;
                    if (height >= maxSize.height) {
                        style.height = maxSize.height;
                    }
                    ;
                    if (width < minWidth || height < minHeight) {
                        width < 100 ? style.width = minWidth : style.width = width;
                        height < 100 ? style.height = minHeight : style.height = height;
                    }
                    setImgLoadStyle(style);
                }
                else {
                    console.log("Can't find inner");
                }
            }
            else {
                console.log("image is null");
            }
        }
        ;
    };
    const onMouseUpImgLoad = (event) => {
        if (drag.current) {
            drag.current = false;
            dragDirection.current = null;
            previousClient.current = {
                x: 0,
                y: 0
            };
            drawImgCanvas();
        }
        ;
    };
    const closeNotification = (event) => {
        setNotification(null);
        setWidthInput(null);
        setHeightInput(null);
    };
    const downloadImg = () => {
        const downlink = document.getElementById("downlink");
        const downloadCanvas = document.getElementById("downloadCanvas");
        const canvasUrl = downloadCanvas.toDataURL();
        downlink.href = canvasUrl;
        if (fileName !== null) {
            const dotIndex = fileName.indexOf(".");
            const name = fileName.slice(0, dotIndex);
            const fileType = fileName.slice(dotIndex);
            const reName = `${name}_resizer${fileType}`;
            downlink.download = reName;
        }
        downlink.click();
    };
    function drawImgCanvas() {
        const downloadCanvas = document.getElementById("downloadCanvas");
        const ctx = downloadCanvas.getContext('2d');
        if (ctx !== null && imgLoadStyle !== undefined && url !== null) {
            ctx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);
            const newImg = new Image();
            const width = Number(imgLoadStyle.width);
            const height = Number(imgLoadStyle.height);
            downloadCanvas.width = width;
            downloadCanvas.height = height;
            newImg.onload = () => {
                ctx.drawImage(newImg, 0, 0, width, height);
            };
            newImg.src = url;
        }
    }
    ;
    const getMaxSize = () => {
        if (canvas !== null && root !== null && canvasTop !== null) {
            const innerPadding = window.getComputedStyle(canvas).getPropertyValue('padding');
            const padding = Number(innerPadding.slice(0, innerPadding.indexOf("px")));
            const cavasWidth = canvas.clientWidth - padding * 2;
            const maxHeight = root.offsetHeight * 0.6;
            const targetHeight = maxHeight - canvasTop.clientHeight - padding * 2;
            setMaxSize({
                width: Math.floor(cavasWidth),
                height: Math.floor(targetHeight)
            });
        }
        ;
    };
    window.onresize = () => getMaxSize();
    (0, react_1.useEffect)(() => {
        getMaxSize();
    }, [canvas, root, canvasTop]);
    (0, react_1.useEffect)(() => {
        const imageDoc = document.getElementById("image");
        if (imgLoadStyle !== undefined) {
            const width = imageDoc === null || imageDoc === void 0 ? void 0 : imageDoc.clientWidth;
            const height = imageDoc === null || imageDoc === void 0 ? void 0 : imageDoc.clientHeight;
            imageDoc !== null &&
                setImageSize({
                    width: width,
                    height: height
                });
        }
        else {
            setImageSize(null);
        }
    }, [imgLoadStyle]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "inner", onMouseMove: onMouseMoveImgLoad, onMouseUp: onMouseUpImgLoad }, { children: [(0, jsx_runtime_1.jsx)("header", Object.assign({ id: "pageHeader" }, { children: "Image Resizer" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: 'directions' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'firstDirection' }, { children: ["You can change the size of the picture by dragging mouse or enter the desired size.", (0, jsx_runtime_1.jsxs)("button", Object.assign({ className: 'moreDirectionBtn btn', onClick: onClickMoreDirectionBtn, onMouseOver: onMouseOverMoreDirectionBtn }, { children: [(0, jsx_runtime_1.jsx)(io5_1.IoHelpCircleOutline, {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'btnExplainBubble' }, { children: "Press button to show more direction" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'moreDirection', id: 'moreDirection' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'moreDirectionCloseBtn btn', onClick: onClickMoreDirectionCloseBtn }, { children: (0, jsx_runtime_1.jsx)(io_1.IoIosCloseCircleOutline, {}) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'moreDirectionInner' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "When you change the size using the mouse, the size of the picture changes." }), (0, jsx_runtime_1.jsx)("p", { children: "If you waant to change size by dragging mouse, Put your mouse over the top ,bottom, left or right of the picuture." })] }))] }))] })), url !== null &&
                        (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "sizeBord" }, { children: [(0, jsx_runtime_1.jsxs)("form", Object.assign({ id: 'resizerByKeypress' }, { children: [(0, jsx_runtime_1.jsx)("header", { children: " Size Form" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'sizeInput' }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: 'widthInput' }, { children: "width \u00A0:" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: 'widthInput', id: "widthInput", placeholder: 'number', value: widthInput === null ? "" : widthInput, onChange: onChangeWidthInput }), (0, jsx_runtime_1.jsx)("div", { children: "px" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'sizeInput' }, { children: [(0, jsx_runtime_1.jsx)(ai_1.AiOutlineClose, {}), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: 'heightInput' }, { children: "height :" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: 'heightInput', id: "heightInput", placeholder: 'number', value: heightInput === null ? "" : heightInput, onChange: onChangeHeightInput }), (0, jsx_runtime_1.jsx)("div", { children: "px" })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: resizerByKeypressBtn, className: "resizerByKeypressBtn" }, { children: "Resizer" }))] })), maxSize.height !== null && maxSize.width !== null &&
                                    (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "sizeDirection" }, { children: [(0, jsx_runtime_1.jsx)("header", { children: "Size Information" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'sizes' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "maxSize" }, { children: [(0, jsx_runtime_1.jsx)("header", { children: "Maximum" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'size' }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["width: \u00A0", maxSize.width, "px"] }), (0, jsx_runtime_1.jsxs)("div", { children: ["height: \u00A0", maxSize.height, "px"] })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "minSize" }, { children: [(0, jsx_runtime_1.jsx)("header", { children: "Minium" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "size" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["width : \u00A0", minWidth, "px"] }), (0, jsx_runtime_1.jsxs)("div", { children: ["height : \u00A0", minHeight, "px"] })] }))] })), imageSize !== null &&
                                                        (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "imgSize" }, { children: [(0, jsx_runtime_1.jsx)("header", { children: "Photo size" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "size" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["width : \u00A0", imageSize.width, "px"] }), (0, jsx_runtime_1.jsxs)("div", { children: ["height: \u00A0", imageSize.height, "px"] })] }))] }))] }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "canvas" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: 'canvas_top' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "loader" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ id: "loaderActualBtn", htmlFor: 'loaderInput', onMouseEnter: onMouseOverActualBtn, onMouseOut: onMouseOutActualBtn }, { children: "Upload image file" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'fileType' }, { children: "jpeg, jpg and png is possible" })), (0, jsx_runtime_1.jsx)("input", { id: "loaderInput", type: "file", accept: "image/jpeg, image/jpg, image/png", onChange: onChangeFile })] })), imgLoadStyle !== undefined &&
                                        (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "downloader" }, { children: [(0, jsx_runtime_1.jsxs)("button", Object.assign({ className: 'downloadBtn', onClick: downloadImg }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Download" }), (0, jsx_runtime_1.jsx)(ai_1.AiOutlineDownload, {})] })), (0, jsx_runtime_1.jsx)("a", { id: "downlink", href: '/' })] }))] })), url !== null &&
                                (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "load" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "imgLoad", style: imgLoadStyle }, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'resizerBtns ' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'left ', onMouseDown: (event) => onMouseDownResizerBtn(event, left) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'top ', onMouseDown: (event) => onMouseDownResizerBtn(event, top) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'right', onMouseDown: (event) => onMouseDownResizerBtn(event, right) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'bottom ', onMouseDown: (event) => onMouseDownResizerBtn(event, bottom) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) }))] })), (0, jsx_runtime_1.jsx)("img", { id: "image", src: url, alt: "uploadedPhoto" })] }) })), (0, jsx_runtime_1.jsx)("canvas", { id: "downloadCanvas", style: imgLoadStyle })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "footer" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "copyRight" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u00A9 2022.\u00A0" }), (0, jsx_runtime_1.jsxs)("a", Object.assign({ className: 'name', href: 'https://github.com/settings/profile', "aria-details": "link to go writer(=badahertz52\r\n            )'s githug profile" }, { children: ["BadaHertz52", (0, jsx_runtime_1.jsx)(gi_1.GiWhaleTail, {})] }))] })), (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: 'https://github.com/BadaHertz52/imageResizer', "aria-details": "link to go  this project's github site " }, { children: [(0, jsx_runtime_1.jsx)(ai_1.AiFillGithub, {}), "\u00A0 Github"] })), (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: 'https://velog.io/@badahertz52/Image-resizer-by-java-script', "aria-details": "link to go writer blog about thie project" }, { children: [(0, jsx_runtime_1.jsx)(si_1.SiBlogger, {}), "\u00A0 blog"] }))] }))] })), notification !== null &&
                (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "notification" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "inner" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'closeNotificationBtn', onClick: closeNotification }, { children: (0, jsx_runtime_1.jsx)(io_1.IoIosCloseCircleOutline, {}) })), (0, jsx_runtime_1.jsxs)("header", { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDE1E" }), (0, jsx_runtime_1.jsx)("span", { children: "Notifiction" })] }), notification] })) }))] }));
};
exports.default = App;
