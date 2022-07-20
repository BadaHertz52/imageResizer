"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./assets/main.css");
const ai_1 = require("../node_modules/react-icons/ai");
const gi_1 = require("../node_modules/react-icons/gi");
const si_1 = require("../node_modules/react-icons/si");
const App = () => {
    const root = document.getElementById("root");
    const innerBody = document.getElementById("inner_body");
    const imgLoad = document.getElementById("imgLoad");
    const [url, setUrl] = (0, react_1.useState)(null);
    const initialImgStyle = {
        width: "100%",
        height: "auto"
    };
    const initialImgLoadStyle = {
        width: "80%",
        height: "auto"
    };
    const [imgStyle, setImgStyle] = (0, react_1.useState)(initialImgStyle);
    const [imgLoadStyle, setImgLoadStyle] = (0, react_1.useState)(initialImgLoadStyle);
    (0, react_1.useEffect)(() => {
        imgStyle !== initialImgStyle &&
            setImgStyle(initialImgStyle);
        imgLoadStyle !== initialImgLoadStyle &&
            setImgLoadStyle(initialImgLoadStyle);
    }, [url]);
    const drag = (0, react_1.useRef)(false);
    const left = "left";
    const right = "right";
    const top = "top";
    const bottom = "bottom";
    const dragDirection = (0, react_1.useRef)(left);
    const previousClient = (0, react_1.useRef)({
        x: 0,
        y: 0
    });
    const onChangeFile = (event) => {
        const files = event.target.files;
        if (files !== null) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setUrl(fileUrl);
        }
        else {
            console.log("There is no file");
        }
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
        if (drag.current) {
            const changeX = event.clientX - previousClient.current.x;
            const changeY = event.clientY - previousClient.current.y;
            const imageDoc = document.getElementById("image");
            if (imageDoc !== null) {
                const imgWidth = imageDoc.offsetWidth;
                const imgHeight = imageDoc.offsetWidth;
                const width = dragDirection.current === left ?
                    imgWidth - changeX
                    :
                        imgWidth + changeX;
                const height = dragDirection.current === bottom ?
                    imgHeight - changeY
                    :
                        imgHeight + changeY;
                if (innerBody !== null && root !== null) {
                    const innerPadding = window.getComputedStyle(innerBody).getPropertyValue('padding');
                    const padding = Number(innerPadding.slice(0, innerPadding.indexOf("px")));
                    const innerWidth = innerBody.clientWidth - padding * 2;
                    const innerHeight = innerBody.clientHeight;
                    const maxHeight = root.offsetHeight * 0.9;
                    const style = {
                        width: width,
                        height: height,
                    };
                    if (width >= innerWidth) {
                        drag.current = false;
                        style.width = innerWidth;
                    }
                    ;
                    if (innerHeight >= maxHeight && imgLoad !== null) {
                        const innerBodyTop = innerBody.clientTop;
                        const imgLoadTop = imgLoad.clientTop;
                        const targetHeight = maxHeight - (imgLoadTop - innerBodyTop);
                        drag.current = false;
                        style.height = targetHeight;
                    }
                    ;
                    if (width < 150 || height < 150) {
                        drag.current = false;
                        width < 150 ? style.width = 150 : style.width = width;
                        height < 150 ? style.height = 150 : style.height = height;
                    }
                    setImgStyle(style);
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
        if (drag.current && imgStyle !== undefined) {
            drag.current = false;
            previousClient.current = {
                x: 0,
                y: 0
            };
            setImgLoadStyle(imgStyle);
        }
        ;
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "inner", onMouseMove: onMouseMoveImgLoad, onMouseUp: onMouseUpImgLoad }, { children: [(0, jsx_runtime_1.jsx)("header", { children: "Image Resizer" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "inner_body" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "loader" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ id: "loaderActualBtn", htmlFor: 'loaderInput' }, { children: "Upload image file" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'fileType' }, { children: "jpeg, jpg and png is possible" })), (0, jsx_runtime_1.jsx)("input", { id: "loaderInput", type: "file", accept: "image/jpeg, image/jpg, image/png", onChange: onChangeFile })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "imgLoad", style: imgLoadStyle }, { children: url !== null &&
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'resizerBtns diagonal' }, { children: [(0, jsx_runtime_1.jsx)("button", { className: 'leftTop', onMouseDown: (event) => onMouseDownResizerBtn(event, left) }), (0, jsx_runtime_1.jsx)("button", { className: 'rightTop', onMouseDown: (event) => onMouseDownResizerBtn(event, top) }), (0, jsx_runtime_1.jsx)("button", { className: 'leftBottom', onMouseDown: (event) => onMouseDownResizerBtn(event, right) }), (0, jsx_runtime_1.jsx)("button", { className: 'rightBottom', onMouseDown: (event) => onMouseDownResizerBtn(event, bottom) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'resizerBtns horizontal' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'left ', onMouseDown: (event) => onMouseDownResizerBtn(event, left) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'top ', onMouseDown: (event) => onMouseDownResizerBtn(event, top) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'right', onMouseDown: (event) => onMouseDownResizerBtn(event, right) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'bottom ', onMouseDown: (event) => onMouseDownResizerBtn(event, bottom) }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'resizerPointer' }) }))] })), (0, jsx_runtime_1.jsx)("img", { id: "image", src: url, alt: "uploadedPhoto", style: imgStyle })] }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "footer" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "copyRight" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u00A9 2022.\u00A0" }), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: 'name' }, { children: ["BadaHertz52", (0, jsx_runtime_1.jsx)(gi_1.GiWhaleTail, {})] }))] })), (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: 'https://github.com/settings/profile', "aria-details": "link to go writer(=badahertz52\r\n          )'s githug profile" }, { children: [(0, jsx_runtime_1.jsx)(ai_1.AiFillGithub, {}), "Github"] })), (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: 'https://velog.io/@badahertz52', "aria-details": "link to go writer(=badahertz52\r\n          )'s blog" }, { children: [(0, jsx_runtime_1.jsx)(si_1.SiBlogger, {}), "blog"] }))] }))] })));
};
exports.default = App;
